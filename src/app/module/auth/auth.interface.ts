import { Role } from "../../../../generated/prisma/enums";

export interface IRegisterUser {
    name: string;
    email: string;
    password: string
    role: Role;
    profileUrl?: string
    tenant?: ITenant,
    owner?: IOwner
}

export interface ITenant {
    phone?: string
    occupation: string
    bio?: string
}

export interface IOwner {
    phone?: string,
    address?: string
}

export interface IVerifyUserEmail {
    email: string
    otp: string
}

export interface ILoginUserPayload {
    email: string,
    password: string
}

export interface IRequestUser {
    userId: string;
    email: string;
    name: string;
    role: Role;
}

export interface IGoogleLoginPayload {
    idToken: string
}