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

const getMyPreference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RoommateServices.getMyPreference(userId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Roommate Preference Retrieved Successfully",
        data: result,
    });
})

const updatePreference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RoommateServices.updatePreference(userId as string, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Roommate Preference Updated Successfully",
        data: result,
    });
})

const findMatches = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const result = await RoommateServices.findMatches(userId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Roommate Matches Retrieved Successfully",
        data: result,
    });
})

const getTenantProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.params.id;

    const result = await RoommateServices.getTenantProfile(tenantId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tenant Profile Retrieved Successfully",
        data: result,
    });
})

export const RoommateController = {
    createPreference, getMyPreference,
    updatePreference, findMatches, getTenantProfile
}