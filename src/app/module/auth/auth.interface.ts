import { Role } from "../../../../generated/prisma/enums";

export interface IRegisterUser {
    name: string;
    email: string;
    password: string
    role: Role;
    profileUrl?: string
    customer: ICustomer
}

export interface ICustomer {
    phoneNumber?: string
    address?: string
    city?: string
}


export interface IVerifyUserEmail {
    email: string
    otp: string
}