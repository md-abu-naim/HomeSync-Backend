import { ApplicationStatus } from "../../../../generated/prisma/enums";

export interface ICreateApplicationPayload {
    roomId: string;
    message?: string;
    proposedMoveIn?: string;
}

export interface IUpdateApplicationStatusPayload {
    status: ApplicationStatus;
    reviewNote?: string;
}