import { Role } from "../../../../generated/prisma/enums";

export interface RequestUser {
	email: string;
	name: string;
	userId: string;
	role: Role;
}

export interface IUpdateTenantPayload {
	phone?: string
	occupation?: string
	bio?: string
	preferredLocation?: string
	maxBudget?: number
	minBudget?: number
}

export interface IUpdateOwnerPayload {
	phone?: string
	address?: string
}

export interface IUpdateUserPayload {
	name?: string,
	imageUrl?: string,
	imagePublicId?: string,
	tenant?: IUpdateTenantPayload
	owner?: IUpdateOwnerPayload
}