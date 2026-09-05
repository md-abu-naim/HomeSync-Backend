import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { RentalServices } from "./rental.services";

const createApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RentalServices.createApplication(userId as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Rental Application Created Successfully",
        data: result,
    });
})

const getApplicationById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const applicationId = req.params.id;

    const result = await RentalServices.getApplicationById(userId as string, applicationId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Application Retrieved Successfully",
        data: result,
    });
})

const cancelApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const applicationId = req.params.id;

    const result = await RentalServices.cancelApplication(userId as string, applicationId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Application Cancelled Successfully",
        data: result,
    });
})

export const RentalController = {
    createApplication, getApplicationById,
    cancelApplication
}