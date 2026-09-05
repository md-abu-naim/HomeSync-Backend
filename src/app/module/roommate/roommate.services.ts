import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { ICreatePreferencePayload, IUpdatePreferencePayload } from "./roommate.interface";
import httpStatus from "http-status";

const createPreference = async (userId: string, payload: ICreatePreferencePayload) => {
    const tenant = await prisma.tenant.findUnique({
        where: {
            userId,
            isDeleted: false
        },
    });

    if (!tenant) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Tenant Profile Not Found"
        );
    }

    const existingPreference = await prisma.roommate.findUnique({
        where: {
            tenantId: tenant.id,
        },
    });

    if (existingPreference) {
        throw new AppError(
            httpStatus.CONFLICT, "Roommate Preference Already Exists"
        );
    }

    const preference = await prisma.roommate.create({
        data: {
            tenantId: tenant.id,
            gender: payload.gender,
            minBudget: payload.minBudget,
            maxBudget: payload.maxBudget,
            preferredLocation: payload.preferredLocation,
            smokingAllowed: payload.smokingAllowed,
            petsAllowed: payload.petsAllowed,
        },
    });

    return preference;
};

const getMyPreference = async (userId: string) => {
    const tenant = await prisma.tenant.findUnique({
        where: {
            userId,
        },
    });

    if (!tenant) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Tenant Profile Not Found"
        );
    }

    const preference = await prisma.roommate.findUnique({
        where: {
            tenantId: tenant.id,
        }
    });

    if (!preference) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Roommate Preference Not Found"
        );
    }

    return preference;
}

const updatePreference = async (userId: string,  payload: IUpdatePreferencePayload) => {
    const tenant = await prisma.tenant.findUnique({
        where: {
            userId,
        },
    });

    if (!tenant) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Tenant Profile Not Found"
        );
    }

    const existingPreference = await prisma.roommate.findUnique({
        where: {
            tenantId: tenant.id,
        },
    });

    if (!existingPreference) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Roommate Preference Not Found"
        );
    }

    const updatedPreference = await prisma.roommate.update({
        where: {
            tenantId: tenant.id,
        },
        data: {
            ...payload,
        },
    });

    return updatedPreference;
};

export const RoommateServices = {
    createPreference, getMyPreference,
    updatePreference
}