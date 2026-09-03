import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { OwnerServices } from "./owner.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const image = req.file || null;
    const data = JSON.parse(req.body.data)
    const userId = req.user?.userId

    const result = await OwnerServices.createProperty(data, userId as string, image)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Property Created Successfully",
        data: result,
    });
})

const getMyProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.userId;

    const result = await OwnerServices.getMyProperties(userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Properties Retrieved Successfully",
        data: result,
    });
});

const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.propertyId;
    const image = req.file || null;
    const data = JSON.parse(req.body.data);
    const userId = req.user?.userId;

    const result = await OwnerServices.updateProperty(propertyId as string, userId as string, data, image);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Property Updated Successfully",
        data: result,
    });
}
);

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.propertyId;
    const userId = req.user?.userId;

    const result = await OwnerServices.deleteProperty(propertyId as string, userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Property Deleted Successfully",
        data: result,
    });
}
);

export const OwnerController = {
    createProperty, getMyProperties,
    updateProperty, deleteProperty
}