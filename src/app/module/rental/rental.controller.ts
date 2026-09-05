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

const getMyApplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RentalServices.getMyApplications(userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Applications Retrieved Successfully",
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

const getPropertyApplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const propertyId = req.params.id;

    const result = await RentalServices.getPropertyApplications(userId as string, propertyId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Property Applications Retrieved Successfully",
        data: result,
    });
})

const updateApplicationStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const applicationId = req.params.id;

    const result = await RentalServices.updateApplicationStatus(userId as string, applicationId as string, req.body.status)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Application Status Updated Successfully",
        data: result,
    });
})


export const RentalController = {
    createApplication, getMyApplications,
    getApplicationById, cancelApplication,
    getPropertyApplications, updateApplicationStatus
}