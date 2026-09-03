import { PropertyType } from "../../../../generated/prisma/enums";

export interface ICreatePropertyPayload {
    title: string;
    description?: string;
    propertyType?: PropertyType;
    address: string;
    city?: string;
    area?: string;
    latitude?: number;
    longitude?: number;
    totalRooms: number
}

export interface IUpdatePropertyPayload {
    title?: string;
    description?: string;
    propertyType?: PropertyType;
    address?: string;
    city?: string;
    area?: string;
    latitude?: number;
    longitude?: number;
    totalRooms: number
}