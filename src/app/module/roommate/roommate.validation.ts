import z from "zod";
import { Gender } from "../../../../generated/prisma/enums";

export const createPreferenceValidationSchema = z.object({
    preferredGender: z
        .enum([
            Gender.MALE,
            Gender.FEMALE,
            Gender.OTHER,
        ], {
            message: "Invalid preferred gender",
        })
        .optional(),

    minBudget: z
        .coerce
        .number({
            message: "Minimum budget must be a number",
        })
        .nonnegative("Minimum budget cannot be negative")
        .optional(),

    maxBudget: z
        .coerce
        .number({
            message: "Maximum budget must be a number",
        })
        .positive("Maximum budget must be greater than 0")
        .optional(),

    preferredLocation: z
        .string()
        .trim()
        .optional(),

    smokingAllowed: z
        .boolean()
        .optional(),

    petsAllowed: z
        .boolean()
        .optional(),
});