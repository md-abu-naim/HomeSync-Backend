import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RoommateServices } from "./roommate.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPreference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RoommateServices.createPreference(userId as string, req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Roommate Preference Created Successfully",
        data: result,
    });
})

export const RoommateController = {
    createPreference
}