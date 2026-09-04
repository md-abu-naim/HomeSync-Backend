import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validationRequest } from "../../utils/validationRequest";
import { createPreferenceValidationSchema } from "./roommate.validation";
import { RoommateController } from "./roommate.controller";

const router = Router()

router.post(
    "/preferences",
    auth(Role.TENANT), validationRequest(createPreferenceValidationSchema),
    RoommateController.createPreference
);

export const RoommateRouters = router