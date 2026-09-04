import z from "zod";
import { RoomAvailability, RoomType } from "../../../../generated/prisma/enums";

export const createRoomValidationSchema = z.object({
    roomNumber: z
        .string({
            message: "Room number is required",
        })
        .trim()
        .min(1, "Room number is required"),

    title: z
        .string()
        .trim()
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    roomType: z
        .enum([
            RoomType.SINGLE,
            RoomType.DOUBLE,
            RoomType.SHARED,
        ], {
            message: "Invalid room type",
        })
        .optional(),

    amount: z
        .coerce
        .number({
            message: "Amount must be a number",
        })
        .positive("Amount must be greater than 0"),

    securityDeposit: z
        .coerce
        .number({
            message: "Security deposit must be a number",
        })
        .nonnegative("Security deposit cannot be negative")
        .optional(),

    capacity: z
        .coerce
        .number({
            message: "Capacity must be a number",
        })
        .int("Capacity must be an integer")
        .positive("Capacity must be greater than 0")
        .optional(),
});

export const updateRoomValidationSchema = z.object({
    roomNumber: z
        .string()
        .trim()
        .min(1, "Room number cannot be empty")
        .optional(),

    title: z
        .string()
        .trim()
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    roomType: z
        .enum([
            RoomType.SINGLE,
            RoomType.DOUBLE,
            RoomType.SHARED,
        ], {
            message: "Invalid room type"
        })
        .optional(),

    amount: z
        .coerce
        .number({ message: "Amount must be a number" })
        .positive("Amount must be greater than 0")
        .optional(),

    securityDeposit: z
        .coerce
        .number({ message: "Security deposit must be a number" })
        .nonnegative("Security deposit cannot be negative")
        .optional(),

    capacity: z
        .coerce
        .number({ message: "Capacity must be a number" })
        .int("Capacity must be an integer")
        .positive("Capacity must be greater than 0")
        .optional(),
});

export const updateRoomAvailabilityValidationSchema = z.object({
    availability: z.enum([
        RoomAvailability.AVAILABLE,
        RoomAvailability.OCCUPIED,
        RoomAvailability.RESERVED,
    ], {
        message: "Invalid room availability"
    }),
});