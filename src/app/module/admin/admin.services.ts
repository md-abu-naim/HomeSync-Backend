import { Prisma } from "../../../../generated/prisma/client";
import { PaymentStatus, Role, UserStatus } from "../../../../generated/prisma/enums";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";


const getUsers = async (query: IQuery) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

    const andConditions: Prisma.UserWhereInput[] = [
        {
            isDeleted: false,
        },
    ];

    if (query.searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: query.searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (query.role) {
        andConditions.push({
            role: query.role,
        });
    }

    if (query.status) {
        andConditions.push({
            status: query.status,
        });
    }

    const allUsers = await prisma.user.findMany({
        where: {
            AND: andConditions,
        },
        take: limit,
        skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
        omit: {
            password: true
        }
    });

    const totalUserCount = await prisma.user.count({
        where: {
            AND: andConditions,
        },
    });

    return {
        data: allUsers,
        meta: {
            page,
            limit,
            total: totalUserCount,
            totalPages: Math.ceil(totalUserCount / limit),
        },
    };
};

const updateUserRole = async (id: string, role: Role) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { role },
    });

    return updatedUser
};

const updateUserStatus = async (id: string, status: UserStatus) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { status },
    })

    return updatedUser
};

const deleteUser = async (id: string) => {
    await prisma.user.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    })

    return null
};

const getDashboardStats = async () => {
    const [users, owners, tenants, properties, rooms, applications, payments] =
        await Promise.all([
            prisma.user.count({ where: { isDeleted: false } }),
            prisma.user.count({ where: { role: Role.OWNER, isDeleted: false } }),
            prisma.user.count({ where: { role: Role.TENANT, isDeleted: false } }),
            prisma.property.count({ where: { isDeleted: false } }),
            prisma.room.count({ where: { isDeleted: false } }),
            prisma.rental.count(),
            prisma.payment.count({ where: { status: PaymentStatus.PAID } }),
        ]);

    return {
        users,
        owners,
        tenants,
        properties,
        rooms,
        applications,
        payments,
    };
};

export const AdminServices = {
    getUsers, updateUserRole,
    updateUserStatus, deleteUser,
    getDashboardStats
};