import { Role } from "../../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'

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
export const seedTesterTechnician = async () => {
    try {
        const isAdminExists = await prisma.user.findFirst({
            where: {
                role: Role.TECHNICIAN
            }
        })

        if (isAdminExists) {
            console.log("Technician Already Exists!");
            return
        }

        const name = config.tester_technician_name
        const email = config.tester_technician_email
        const password = config.tester_technician_password

        if (!name || !email || !password) {
            throw new Error("Name, Email, Password is missing from .env!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.TECHNICIAN,
                isEmailVerified: true
            }
        })

        console.log("Tester Technician Created!");
    } catch (error) {
        console.log(error);

        await prisma.user.delete({
            where: {
                email: config.tester_technician_email
            }
        })
    }
}
export const seedTesterCustomer = async () => {
    try {
        const isAdminExists = await prisma.user.findFirst({
            where: {
                role: Role.CUSTOMER
            }
        })

        if (isAdminExists) {
            console.log("Customer Already Exists!");
            return
        }

        const name = config.tester_customer_name
        const email = config.tester_customer_email
        const password = config.tester_customer_password

        if (!name || !email || !password) {
            throw new Error("Name, Email, Password is missing from .env!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.CUSTOMER,
                isEmailVerified: true
            }
        })

        console.log("Tester Customer Created!");
    } catch (error) {
        console.log(error);

        await prisma.user.delete({
            where: {
                email: config.tester_customer_email
            }
        })
    }
}