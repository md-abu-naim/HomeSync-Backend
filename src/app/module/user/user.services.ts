import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { IUpdateUserPayload, RequestUser } from "./user.interface";

const getMe = async (user: RequestUser) => {
	const isUserExists = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			tenant: user.role === "TENANT",
			owner: user.role === "OWNER"
		},
		omit: {
			password: true,
		},
	});

	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	return isUserExists;
};

const updateMyProfile = async (user: RequestUser, payload: IUpdateUserPayload) => {
	const { name, tenant: tenantData, owner: ownerData } = payload

	const isUserExists = await prisma.user.findUnique({
		where: {
			id: user.userId
		}
	})

	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not Found')
	}

	if (isUserExists.status === 'BLOCKED' || isUserExists.isDeleted) {
		throw new Error('user is already deleted')
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: user.userId
		},
		data: {
			name,
			tenant: user.role === "TENANT" ? {
				update: {
					phone: tenantData?.phone,
					occupation: tenantData?.occupation,
					bio: tenantData?.bio,
					preferredLocation: tenantData?.preferredLocation,
					maxBudget: tenantData?.maxBudget,
					minBudget: tenantData?.minBudget
				}
			} : undefined,
			owner: user.role === "OWNER" ? {
				update: {
					phone: ownerData?.phone,
					address: ownerData?.address
				}
			} : undefined
		},
		include: {
			tenant: user.role === "TENANT",
			owner: user.role === "OWNER"
		}
	})

	return updatedUser
}

const getUserById = async (userId: string) => {
	const isUserExists = await prisma.user.findUnique({
		where: {
			id: userId
		},
		omit: {
			password: true
		}
	})

	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not Found')
	}

	if (isUserExists.status === 'BLOCKED' || isUserExists.isDeleted) {
		throw new Error('user is already deleted')
	}

	return isUserExists
}

export const UserServices = {
	getMe, updateMyProfile, getUserById
}