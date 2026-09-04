import { Gender } from "../../../../generated/prisma/enums";

export interface ICreatePreferencePayload {
    gender?: Gender;
    minBudget?: number;
    maxBudget?: number;
    preferredLocation?: string;
    smokingAllowed?: boolean;
    petsAllowed?: boolean;
}