import { z } from "zod";
import { Role } from "../../../../generated/prisma/enums";

const registerUserValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .optional(),

    email: z
        .string({
            message: "Email is required",
        })
        .trim()
        .toLowerCase()
        .email("Invalid email address format"),

    password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, { message: "Add an uppercase letter" })
        .regex(/[a-z]/, { message: "Add a lowercase letter" })
        .regex(/[0-9]/, { message: "Add a number" }),

    role: z.enum([Role.OWNER, Role.TENANT], {
        message: "Role must be either OWNER or TENANT",
    }).optional(),

    tenant: z
        .object({
            phone: z.string().trim().optional(),
            occupation: z.string().trim().optional(),
            bio: z.string().trim().optional(),
        })
        .optional(),

    owner: z.object({
        phone: z.string().trim().optional(),
        address: z.string().trim().optional(),
    }).optional()
});

const verifyUserEmailValidationSchema = z.object({
    email: z
        .string({
            message: "Email is required",
        })
        .trim()
        .toLowerCase()
        .email("Invalid email address format"),

    otp: z
        .string({
            message: "OTP is required",
        })
        .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

const loginUserValidationSchema = z.object({
    email: z
        .string({
            message: "Email is required",
        })
        .trim()
        .toLowerCase()
        .email("Invalid email address format"),

    password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, { message: "Add an uppercase letter" })
        .regex(/[a-z]/, { message: "Add a lowercase letter" })
        .regex(/[0-9]/, { message: "Add a number" }),
});

export const AuthValidation = {
    registerUserValidationSchema,
    verifyUserEmailValidationSchema,
    loginUserValidationSchema,
};