import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validationRequest } from "../../utils/validationRequest";
import { createApplicationValidationSchema, updateApplicationStatusValidationSchema } from "./rental.validation";
import { RentalController } from "./rental.controller";

const router = Router()

router.post(
    "/applications", auth(Role.TENANT),
    validationRequest(createApplicationValidationSchema),
    RentalController.createApplication
)
router.get("/applications/me", auth(Role.TENANT), RentalController.getMyApplications)
router.get("/applications/:id", auth(Role.TENANT), RentalController.getApplicationById)
router.patch("/applications/cancel/:id", auth(Role.TENANT), RentalController.cancelApplication)

router.get("/property/applications/:id", auth(Role.OWNER), RentalController.getPropertyApplications)
router.patch(
    "/applications/status/:id", auth(Role.OWNER),
    validationRequest(updateApplicationStatusValidationSchema),
    RentalController.updateApplicationStatus
);

export const RentalRouters = router