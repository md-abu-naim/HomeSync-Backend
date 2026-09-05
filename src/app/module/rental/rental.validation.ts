import z from "zod";

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