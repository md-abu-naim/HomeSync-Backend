import z from "zod";
import { PropertyType } from "../../../../generated/prisma/enums";

export const createPropertyValidationSchema = z.object({
    title: z
        .string({
            message: "Title is required",
        })
        .trim()
        .min(3, "Title must be at least 3 characters long"),

    description: z
        .string()
        .trim()
        .optional(),

    propertyType: z
        .enum([
            PropertyType.HOUSE,
            PropertyType.APARTMENT,
            PropertyType.HOSTEL,
            PropertyType.ROOM,
        ], {
            message: "Invalid property type",
        })
        .optional(),

    address: z
        .string({
            message: "Address is required",
        })
        .trim()
        .min(5, "Address must be at least 5 characters long"),

    city: z
        .string()
        .trim()
        .optional(),

    area: z
        .string()
        .trim()
        .optional(),

    latitude: z
        .number({
            message: "Latitude must be a number",
        })
        .optional(),

    longitude: z
        .number({
            message: "Longitude must be a number",
        })
        .optional(),

    imageUrl: z
        .string()
        .url("Invalid image URL")
        .optional(),
});

export const updatePropertyValidationSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    propertyType: z
        .enum([
            PropertyType.HOUSE,
            PropertyType.APARTMENT,
            PropertyType.ROOM,
        ], {
            message: "Invalid property type",
        })
        .optional(),

    address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters long")
        .optional(),

    city: z
        .string()
        .trim()
        .optional(),

    area: z
        .string()
        .trim()
        .optional(),

    latitude: z
        .number({
            message: "Latitude must be a number",
        })
        .optional(),

    longitude: z
        .number({
            message: "Longitude must be a number",
        })
        .optional(),
});