import { Role } from "../../../../generated/prisma/enums";

export interface RequestUser {
	email: string;
	name: string;
	userId: string;
	role: Role;
}

export interface IUpdateUserPayload {
	name?: string,
	imageUrl?: string,
	imagePublicId?: string,
	tenant: {
		phone?: string,
		occupation?: string,
		bio?: string,
		preferredLocation?: string,
		maxBudget?: number,
		minBudget?: number
	}
}