import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { ICreateRoomPayload } from "./room.interface";

const createRoom = async ( propertyId: string, userId: string, payload: ICreateRoomPayload) => {

    const owner = await prisma.owner.findUnique({
        where: {
            userId,
        },
    });

    if (!owner) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Owner Profile Not Found"
        );
    }

    const property = await prisma.property.findFirst({
        where: {
            id: propertyId,
            ownerId: owner.id,
            isDeleted: false,
        },
    });

    if (!property) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Property Not Found or You are not the owner"
        );
    }

    const existingRoom = await prisma.room.findUnique({
        where: {
            propertyId_roomNumber: {
                propertyId,
                roomNumber: payload.roomNumber,
            },
        },
    });

    if (existingRoom && !existingRoom.isDeleted) {
        throw new AppError(
            httpStatus.CONFLICT, "Room number already exists in this property"
        );
    }

    const room = await prisma.room.create({
        data: {
            propertyId,
            roomNumber: payload.roomNumber,
            title: payload.title,
            description: payload.description,
            roomType: payload.roomType,
            amount: payload.amount,
            securityDeposit: payload.securityDeposit,
            capacity: payload.capacity ?? 1,
        },
        include: {
            property: true,
        },
    });

    await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            totalRooms: {
                increment: 1,
            },
        },
    });

    return room;
};

const getPropertyRooms = async (propertyId: string) => {
    const property = await prisma.property.findFirst({
        where: {
            id: propertyId,
            isDeleted: false,
        },
    });

    if (!property) {
        throw new AppError(
            httpStatus.NOT_FOUND,"Property Not Found"
        );
    }

    const rooms = await prisma.room.findMany({
        where: {
            propertyId,
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return rooms;
};

export const RoomServices = {
    createRoom, getPropertyRooms
};