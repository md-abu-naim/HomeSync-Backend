import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validationRequest } from "../../utils/validationRequest";
import { createPreferenceValidationSchema, updatePreferenceValidationSchema } from "./roommate.validation";
import { RoommateController } from "./roommate.controller";

const router = Router()

router.post(
    "/preferences",
    auth(Role.TENANT), validationRequest(createPreferenceValidationSchema),
    RoommateController.createPreference
);
router.get("/preferences/me", auth(Role.TENANT), RoommateController.getMyPreference)
router.patch(
    "/preferences/update", auth(Role.TENANT),
    validationRequest(updatePreferenceValidationSchema),
    RoommateController.updatePreference
)
router.get("/matches", auth(Role.TENANT), RoommateController.findMatches)
router.get("/:id", auth(Role.TENANT), RoommateController.getTenantProfile)

export const RoommateRouters = router