import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PropertyServices } from "./property.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PropertyServices.getAllProperties(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Properties Retrieved Successfully",
        data: result,
    });
});

const getPropertyById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const propertyId = req.params.id;

        const result = await PropertyServices.getPropertyById(propertyId as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Property Retrieved Successfully",
            data: result,
        });
    }
);

export const PropertyController = {
    getAllProperties, getPropertyById
}