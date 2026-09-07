import { Role } from "../../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcryptjs'

export const seedTesterAdmin = async () => {
    try {
        const isAdminExists = await prisma.user.findFirst({
            where: {
                role: Role.ADMIN
            }
        })

        if (isAdminExists) {
            console.log("Admin Already Exists!");
            return
        }

        const name = config.tester_admin_name
        const email = config.tester_admin_email
        const password = config.tester_admin_password

        if (!name || !email || !password) {
            throw new Error("Name, Email, Password is missing from .env!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.ADMIN,
                isEmailVerified: true
            }
        })

        console.log("Tester Admin Created!");
    } catch (error) {
        console.log(error);

        await prisma.user.delete({
            where: {
                email: config.tester_admin_email
            }
        })
    }
}

export const seedTesterOwner = async () => {
    try {
        const isOwnerExists = await prisma.user.findFirst({
            where: {
                role: Role.OWNER
            }
        })

        if (isOwnerExists) {
            console.log("Owner Already Exists!");
            return
        }

        const name = config.tester_owner_name
        const email = config.tester_owner_email
        const password = config.tester_owner_password

        if (!name || !email || !password) {
            throw new Error("Name, Email, Password is missing from .env!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.OWNER,
                isEmailVerified: true,
                owner: {
                    create: {
                        phone: "1025555",
                        address: "Dhaka",
                    }
                }
            }
        })

        console.log("Tester Owner Created!");
    } catch (error) {
        console.log(error);

        await prisma.user.delete({
            where: {
                email: config.tester_owner_email
            }
        })
    }
}
export const seedTesterTenant = async () => {
    try {
        const isTenantExists = await prisma.user.findFirst({
            where: {
                role: Role.TENANT
            }
        })

        if (isTenantExists) {
            console.log("Tenant Already Exists!");
            return
        }

        const name = config.tester_tenant_name
        const email = config.tester_tenant_email
        const password = config.tester_tenant_password

        if (!name || !email || !password) {
            throw new Error("Name, Email, Password is missing from .env!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.TENANT,
                isEmailVerified: true,
                tenant: {
                    create: {
                        phone: "1025555",
                        occupation: "Something",
                        bio: "I am a Tenant",
                        maxBudget: 10000,
                        minBudget: 500,
                        preferredLocation: "Noakhali"
                    }
                }
            }
        })

        console.log("Tester Tenant Created!");
    } catch (error) {
        console.log(error);

        await prisma.user.delete({
            where: {
                email: config.tester_tenant_email
            }
        })
    }
}