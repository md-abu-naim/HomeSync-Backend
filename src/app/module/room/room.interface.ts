import { RoomType } from "../../../../generated/prisma/enums";

export interface ICreateRoomPayload {
    roomNumber: string;
    title?: string;
    description?: string;
    roomType?: RoomType;
    amount: number;
    securityDeposit?: number;
    capacity?: number;
}

export interface IUpdateRoomPayload {
    roomNumber?: string;
    title?: string;
    description?: string;
    roomType?: RoomType;
    amount?: number;
    securityDeposit?: number;
    capacity?: number;
}