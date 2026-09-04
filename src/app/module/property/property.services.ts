import { Prisma, PropertyStatus } from "../../../../generated/prisma/client";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus  from "http-status";

const getAllProperties = async (query: IQuery) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

    const andConditions: Prisma.PropertyWhereInput[] = [
        {
            isDeleted: false,
        },
        {
            status: PropertyStatus.ACTIVE,
        },
    ];

    if (query.searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    address: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    city: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    area: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (query.propertyType) {
        andConditions.push({
            propertyType: query.propertyType,
        });
    }

    if (query.city) {
        andConditions.push({
            city: {
                equals: query.city,
                mode: "insensitive",
            },
        });
    }

    if (query.area) {
        andConditions.push({
            area: {
                equals: query.area,
                mode: "insensitive",
            },
        });
    }

    if (query.minRooms) {
        andConditions.push({
            totalRooms: {
                gte: Number(query.minRooms),
            },
        });
    }

    if (query.maxRooms) {
        andConditions.push({
            totalRooms: {
                lte: Number(query.maxRooms),
            },
        });
    }

    const allProperties = await prisma.property.findMany({
        where: {
            AND: andConditions,
        },
        take: limit,
        skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            owner: true
        }
    });

    const totalPropertyCount = await prisma.property.count({
        where: {
            AND: andConditions,
        },
    });

    return {
        data: allProperties,
        meta: {
            page,
            limit,
            total: totalPropertyCount,
            totalPages: Math.ceil(totalPropertyCount / limit),
        },
    };
};

const getPropertyById = async (propertyId: string) => {
    const property = await prisma.property.findFirst({
        where: {
            id: propertyId,
            isDeleted: false,
            status: "ACTIVE",
        },
        include: {
            owner: true,
            rooms: true,
        },
    });

    if (!property) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Property Not Found"
        );
    }

    return property;
};

export const PropertyServices = {
    getAllProperties, getPropertyById
}