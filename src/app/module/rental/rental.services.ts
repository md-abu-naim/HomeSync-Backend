import httpStatus from 'http-status'
import { ICreateApplicationPayload, IUpdateApplicationStatusPayload } from "./rental.interface";
import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/AppError';
import { ApplicationStatus } from '../../../../generated/prisma/enums';

const createApplication = async (userId: string, payload: ICreateApplicationPayload) => {
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

    const room = await prisma.room.findFirst({
        where: {
            id: payload.roomId,
            isDeleted: false,
        },
    });

    if (!room) {
        throw new AppError(httpStatus.NOT_FOUND, "Room Not Found")
    }

    if (room.availability !== "AVAILABLE") {
        throw new AppError(
            httpStatus.BAD_REQUEST, "Room is not available"
        );
    }

    const existingApplication = await prisma.rental.findFirst({
        where: {
            tenantId: tenant.id,
            roomId: room.id,
            status: {
                not: "REJECTED",
            },
        },
    });

    if (existingApplication) {
        throw new AppError(
            httpStatus.CONFLICT, "You have already applied for this room"
        );
    }

    const application = await prisma.rental.create({
        data: {
            tenantId: tenant.id,
            propertyId: room.propertyId,
            roomId: room.id,
            message: payload.message,
            proposedMoveIn: payload.proposedMoveIn
                ? new Date(payload.proposedMoveIn)
                : undefined,
            status: ApplicationStatus.PENDING,
        },
    });

    return application;
}

const getMyApplications = async (userId: string) => {
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

    const applications = await prisma.rental.findMany({
        where: {
            tenantId: tenant.id,
        },
        include: {
            property: true,
            room: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return applications;
}

const getApplicationById = async (userId: string, applicationId: string) => {
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

    const application = await prisma.rental.findFirst({
        where: {
            id: applicationId,
            tenantId: tenant.id,
        },
        include: {
            property: true,
            room: true,
        },
    });

    if (!application) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Application Not Found"
        );
    }

    return application;
};

const cancelApplication = async (userId: string, applicationId: string) => {
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

    const application = await prisma.rental.findFirst({
        where: {
            id: applicationId,
            tenantId: tenant.id,
        },
    });

    if (!application) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Application Not Found"
        );
    }

    if (application.status !== "PENDING") {
        throw new AppError(
            httpStatus.BAD_REQUEST, "Only pending applications can be cancelled"
        );
    }

    const cancelledApplication = await prisma.rental.update({
        where: {
            id: applicationId,
        },
        data: {
            status: "CANCELLED",
        },
    });

    return cancelledApplication;
};

const getPropertyApplications = async (userId: string, propertyId: string) => {
    const owner = await prisma.owner.findUnique({
        where: {
            userId,
        },
    });

    if (!owner) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Owner Profile Not Found"
        );
    }

    const property = await prisma.property.findFirst({
        where: {
            id: propertyId,
            ownerId: owner.id,
            isDeleted: false,
        },
    });

    if (!property) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Property Not Found or You are not the owner"
        );
    }

    const applications = await prisma.rental.findMany({
        where: {
            propertyId,
        },
        include: {
            tenant: true,
            room: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return applications;
};

const updateApplicationStatus = async (userId: string, applicationId: string, payload: ApplicationStatus) => {
    const owner = await prisma.owner.findUnique({
        where: {
            userId,
        },
    });

    if (!owner) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Owner Profile Not Found"
        );
    }

    const application = await prisma.rental.findFirst({
        where: {
            id: applicationId,
            property: {
                ownerId: owner.id,
                isDeleted: false,
            },
        },
    });

    if (!application) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Application Not Found or You are not the owner"
        );
    }

    console.log(payload);

    const updatedApplication = await prisma.rental.update({
        where: {
            id: applicationId,
        },
        data: {
            status: payload,
        },
    });

    return updatedApplication;
};

export const RentalServices = {
    createApplication, getMyApplications,
    getApplicationById, cancelApplication,
    getPropertyApplications, updateApplicationStatus
}