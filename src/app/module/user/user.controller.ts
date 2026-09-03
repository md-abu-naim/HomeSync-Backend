import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User information is missing in the request");
    }

    const result = await UserServices.getMe(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user
    const payload = req.body

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User information is missing in the request");
    }

    const result = await UserServices.updateMyProfile(user, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id

    const result = await UserServices.getUserById(userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    });
});

export const UserController = {
    getMe, updateMyProfile,
    getUserById, 
}