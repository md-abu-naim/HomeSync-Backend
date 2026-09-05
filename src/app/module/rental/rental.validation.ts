import z from "zod";
import { ApplicationStatus } from "../../../../generated/prisma/enums";

export const createApplicationValidationSchema = z.object({
    roomId: z
        .string({ message: "Room ID is required" })
        .min(1, "Room ID is required"),

    message: z
        .string()
        .trim()
        .optional(),

    proposedMoveIn: z
        .string()
        .datetime("Invalid move-in date")
        .optional(),
});

export const updateApplicationStatusValidationSchema = z.object({
    status: z.enum(
        [
            ApplicationStatus.APPROVED,
            ApplicationStatus.REJECTED,
            ApplicationStatus.CANCELLED,
            ApplicationStatus.PENDING,
        ],
        {
            message: "Invalid application status",
        }
    )
});