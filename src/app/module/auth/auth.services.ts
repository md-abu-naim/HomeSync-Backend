import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import crypto from 'crypto'
import ejs from 'ejs'
import path from "path";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { redisClient } from "../../lib/redis";
import { transporter } from "../../lib/nodemailer";
import config from "../../config";
import { IGoogleLoginPayload, ILoginUserPayload, IRegisterUser, IRequestUser, IVerifyUserEmail } from "./auth.interface";
import { AuthProvider, Role, UserStatus } from "../../../../generated/prisma/enums";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import { googleClient } from "../../lib/googleAuth";
import { TokenPayload } from "google-auth-library";

const createUser = async (payload: IRegisterUser) => {
	const { name, password, role, tenant: tenantData } = payload;
	const email = payload.email.trim().toLowerCase();

	const isUserExists = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExists) {
		throw new AppError(httpStatus.CONFLICT, "User with this email already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 8);

	const otp = crypto.randomInt(100000, 1000000)
	const otpKey = `user-registation-otp:${email}`

	await redisClient.set(otpKey, otp, {
		expiration: {
			type: 'EX',
			value: 5 * 60
		}
	})

	const userRegistationKey = `user-registation-data:${email}`
	const redisUserPayload = {
		name, email, password: hashedPassword, role, tenant: tenantData
	}

	await redisClient.set(userRegistationKey, JSON.stringify(redisUserPayload), {
		expiration: {
			type: 'EX',
			value: 5 * 60
		}
	})

	const tamplatePath = path.join(process.cwd(), 'src/app/tamplates/user-registation-otp.ejs')

	const html = await ejs.renderFile(tamplatePath, {
		name,
		otp
	})

	await transporter.sendMail({
		from: '"HomeSync Platform" <no-reply@home-sync.com>',
		to: email,
		subject: "Action Required: Verify Your HomeSync Account",
		html
	})
};

const verifyUserEmail = async (payload: IVerifyUserEmail) => {
	const email = payload.email.trim().toLowerCase();
	const otp = payload.otp

	const isUserExists = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExists?.status === "BLOCKED") {
		throw new AppError(httpStatus.FORBIDDEN, 'User is blocked')
	}

	if (isUserExists?.isDeleted || isUserExists?.status === "DELETED") {
		throw new AppError(httpStatus.FORBIDDEN, "User is deleted")
	}


	if (isUserExists?.isEmailVerified) {
		throw new AppError(httpStatus.CONFLICT, "User already verified")
	}

	const otpKey = `user-registation-otp:${email}`

	const redisOtp = await redisClient.get(otpKey)

	if (!redisOtp) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP')
	}

	if (redisOtp !== otp) {
		throw new AppError(httpStatus.BAD_REQUEST, "OTP does not match")
	}

	await redisClient.del([otpKey])

	const userRegistationKey = `user-registation-data:${email}`
	const redisUserData = await redisClient.get(userRegistationKey)

	if (!redisUserData) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Does not exists')
	}

	const userPayload: IRegisterUser = JSON.parse(redisUserData)

	const profile = userPayload.role === Role.TENANT
		? {
			tenant: {
				create: {
					phone: userPayload.tenant?.phone || "",
					occupation: userPayload.tenant?.occupation || "",
					bio: userPayload.tenant?.bio || "",
				},
			},
		}
		: {
			owner: {
				create: {
					phone: userPayload.owner?.phone || "",
					address: userPayload.owner?.address || "",
				},
			},
		};

	const include = userPayload.role === "TENANT"
		? { tenant: true }
		: { owner: true };

	const createdUser = await prisma.user.create({
		data: {
			name: userPayload.name,
			email: userPayload.email,
			password: userPayload.password,
			role: userPayload.role,
			status: UserStatus.ACTIVE,
			isEmailVerified: true,

			...profile
		},
		omit: { password: true },
		include
	});

	await redisClient.del([userRegistationKey])

	const tamplatePath = path.join(process.cwd(), 'src/app/tamplates/welcome-email.ejs')

	const html = await ejs.renderFile(tamplatePath, {
		name: createdUser.name,
		loginUrl: config.frontend_url
	})

	await transporter.sendMail({
		from: '"HomeSync Platform" <no-reply@home-sync.com>',
		to: email,
		subject: "Welcome to HomeSync!",
		html
	})

	const { tenant, ...user } = createdUser;
	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		user,
		tenant,
		accessToken,
		refreshToken,
	};
}

const loginUser = async (payload: ILoginUserPayload) => {
	const { password } = payload;
	const email = payload.email.trim().toLowerCase();

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
	}

	if (user.isDeleted || user.status === 'DELETED') {
		throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
	}

	if (user.password === null && user.googleId !== null) {
		throw new AppError(httpStatus.CONFLICT, "User already has account registered with google. Try to google login")
	}

	const isPasswordMatched = await bcrypt.compare(password, user.password as string);

	if (!isPasswordMatched) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const refreshToken = async (token: string) => {
	const verifiedRefreshToken = jwtUtils.verifyToken(
		token,
		config.jwt_refresh_secret,
	);

	if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			config.node_env === "development"
				? verifiedRefreshToken.error
				: "Invalid refresh token",
		);
	}

	const data = verifiedRefreshToken.data as JwtPayload;

	const user = await prisma.user.findUnique({
		where: { id: data.userId },
	});

	if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
		throw new AppError(httpStatus.UNAUTHORIZED, "User is inactive or not found");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const googleLoginIntoDB = async (payload: IGoogleLoginPayload) => {
	let googleIdTokenPayload: TokenPayload | null | undefined = null
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: payload.idToken,
			audience: config.google_client_id
		})

		googleIdTokenPayload = ticket.getPayload()
	} catch (error) {
		console.log("Google ID verification field", error);
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or Expired google ID Token")
	}

	if (!googleIdTokenPayload) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or Expired google ID Token")
	}

	if (!googleIdTokenPayload.email) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Email not fount')
	}

	if (!googleIdTokenPayload.name) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Name not fount')
	}

	const isUserExists = await prisma.user.findUnique({
		where: {
			email: googleIdTokenPayload.email,
			role: Role.TENANT,
			googleId: googleIdTokenPayload.sub
		}
	})

	let user = isUserExists

	if (!isUserExists) {
		const isUserExistsWithCredentials = await prisma.user.findUnique({
			where: {
				email: googleIdTokenPayload.email,
				role: Role.TENANT,
				authProvider: AuthProvider.GOOGLE
			}
		})

		if (isUserExistsWithCredentials) {
			if (!isUserExistsWithCredentials.isEmailVerified) {
				throw new AppError(httpStatus.FORBIDDEN, "Email not verified")
			}
			if (isUserExistsWithCredentials.status === UserStatus.BLOCKED) {
				throw new AppError(httpStatus.FORBIDDEN, "User Is Blocked")
			}
			if (isUserExistsWithCredentials.isDeleted) {
				throw new AppError(httpStatus.FORBIDDEN, "User is Deleted")
			}

			user = await prisma.user.update({
				where: {
					id: isUserExistsWithCredentials.id
				},
				data: {
					googleId: googleIdTokenPayload.sub
				}
			})
		} else {
			user = await prisma.user.create({
				data: {
					name: googleIdTokenPayload.name,
					email: googleIdTokenPayload.email,
					role: Role.TENANT,
					googleId: googleIdTokenPayload.sub,
					authProvider: AuthProvider.GOOGLE,
					isEmailVerified: true,
					imageUrl: googleIdTokenPayload.picture || '',
					tenant: {
						create: {}
					}
				}
			})

			const tamplatePath = path.join(process.cwd(), 'src/app/tamplates/welcome-email.ejs')

			const html = await ejs.renderFile(tamplatePath, {
				name: user.name,
				loginUrl: config.frontend_url
			})

			await transporter.sendMail({
				from: '"HomeSync Platform" <no-reply@home-sync.com>',
				to: user.email,
				subject: "Welcome to HomeSync!",
				html
			})
		}
	}

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found")
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new AppError(httpStatus.FORBIDDEN, "User Is Blocked")
	}
	if (user.isDeleted || user.status === 'DELETED') {
		throw new AppError(httpStatus.FORBIDDEN, "User is Deleted")
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
}

export const AuthService = {
	createUser, verifyUserEmail,
	loginUser,
	refreshToken,
	googleLoginIntoDB
};
