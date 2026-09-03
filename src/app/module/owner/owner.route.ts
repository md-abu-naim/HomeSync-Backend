import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { OwnerController } from "./owner.controller";
import { upload } from "../../lib/multer";
import { validationRequest } from "../../utils/validationRequest";
import { createPropertyValidationSchema, updatePropertyValidationSchema } from "./owner.validation";

const router = Router();

router.post(
    "/property", upload.single('image'),
    validationRequest(createPropertyValidationSchema),
    auth(Role.OWNER),
    OwnerController.createProperty
);

router.get(
    "/my-properties",
    auth(Role.OWNER),
    OwnerController.getMyProperties
);

router.patch(
    "/property/:propertyId",
    upload.single("image"),
    validationRequest(updatePropertyValidationSchema),
    auth(Role.OWNER),
    OwnerController.updateProperty
);

router.delete("/property/:propertyId", auth(Role.OWNER), OwnerController.deleteProperty);

export const OwnerRoutes = router;