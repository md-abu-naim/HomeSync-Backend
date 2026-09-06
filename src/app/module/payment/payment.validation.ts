import z from "zod";

export const createPaymentValidationSchema = z.object({
    rentalId: z
        .string({ message: "Rental ID is required" })
        .min(1, "Rental ID is required"),
});