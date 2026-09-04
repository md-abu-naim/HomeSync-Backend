import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.services";

const createRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.propertyId;
    const userId = req.user?.userId;

    const result = await RoomServices.createRoom(propertyId as string, userId as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Room Created Successfully",
        data: result,
    });
});

const getPropertyRooms = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.propertyId;

    const result = await RoomServices.getPropertyRooms(propertyId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Property Rooms Retrieved Successfully",
        data: result,
    });
});

const getRoomById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const roomId = req.params.id;

    const result = await RoomServices.getRoomById(roomId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room Retrieved Successfully",
        data: result,
    });
});

const updateRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.params.id;
    const userId = req.user?.userId;

    const result = await RoomServices.updateRoom(roomId as string, userId as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room Updated Successfully",
        data: result,
    });
}
);

export const RoomController = {
    createRoom, getPropertyRooms,
    getRoomById, updateRoom
};