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

const updatePreference = async (userId: string, payload: IUpdatePreferencePayload) => {
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
}

const findMatches = async (userId: string) => {
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

    const preference = await prisma.roommate.findUnique({
        where: {
            tenantId: tenant.id,
            isDeleted: false
        },
    });

    if (!preference) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Please create your roommate preference first"
        );
    }

    const matches = await prisma.roommate.findMany({
        where: {
            tenantId: {
                not: tenant.id,
            },
            gender: preference.gender,
            smokingAllowed: preference.smokingAllowed,
            petsAllowed: preference.petsAllowed,
        },
        include: {
            tenant: true,
        },
    })

    return matches;
};

const getTenantProfile = async (tenantId: string) => {
    const tenant = await prisma.tenant.findUnique({
        where: {
            id: tenantId,
            isDeleted: false
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    imageUrl: true,
                    imagePublicId: true,
                    isEmailVerified: true
                },
            },
            roommate: true,
        },
    });

    if (!tenant) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Tenant Not Found"
        )
    }

    return tenant;
};

export const RoommateServices = {
    createPreference, getMyPreference,
    updatePreference, findMatches, getTenantProfile
}