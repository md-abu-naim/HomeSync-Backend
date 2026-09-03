import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.services";
import { AppError } from "../../utils/AppError";

const createUser = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body

	await AuthService.createUser(payload);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User Varifaction OTP Sent",
		data: null
	});
});

const verifyUserEmail = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body

	const result = await AuthService.verifyUserEmail(payload);

	const { accessToken, refreshToken, user, tenant } = result;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24,
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	});

		sendResponse(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: "Patient Ragistaion Successfully",
			data: {
				accessToken,
				refreshToken,
				user,
				tenant,
			},
		});
	});

	const loginUser = catchAsync(async (req: Request, res: Response) => {
		const payload = req.body;
		const result = await AuthService.loginUser(payload);
		const { accessToken, refreshToken } = result;

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24,
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User logged in successfully",
			data: {
				accessToken,
				refreshToken,
			},
		});
	});

	const refreshToken = catchAsync(async (req: Request, res: Response) => {
		if (!req.cookies.refreshToken) {
			throw new AppError(httpStatus.BAD_REQUEST, "Refresh token is missing");
		}
		const result = await AuthService.refreshToken(req.cookies.refreshToken);
		const { accessToken, refreshToken: newRefreshToken } = result;

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24,
		});
		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7, 
		});

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "New tokens generated successfully",
			data: {
				accessToken,
				refreshToken: newRefreshToken,
			},
		});
	});

	const googleLogin = catchAsync(async (req: Request, res: Response) => {
		const payload = req.body

		const result = await AuthService.googleLoginIntoDB(payload)

		const { accessToken, refreshToken } = result;

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "New tokens generated successfully",
			data: {accessToken, refreshToken}
		});
	});

	export const AuthController = {
		createUser, verifyUserEmail,
		loginUser,
		refreshToken,
		googleLogin
	};