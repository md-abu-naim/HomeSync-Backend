import z from "zod";

export const updateUserValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .optional(),

    imageUrl: z
        .string()
        .trim()
        .url("Invalid image URL")
        .optional(),

    imagePublicId: z
        .string()
        .trim()
        .optional(),

    tenant: z
        .object({
            phone: z
                .string()
                .trim()
                .optional(),

            occupation: z
                .string()
                .trim()
                .optional(),

            bio: z
                .string()
                .trim()
                .optional(),

            preferredLocation: z
                .string()
                .trim()
                .optional(),

            maxBudget: z
                .number()
                .positive("Maximum budget must be greater than 0")
                .optional(),

            minBudget: z
                .number()
                .positive("Minimum budget must be greater than 0")
                .optional(),
        })
        .optional(),
});