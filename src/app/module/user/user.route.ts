import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { UserController } from "./user.controller";
import { validationRequest } from "../../utils/validationRequest";
import { updateUserValidationSchema } from "./user.validation";

const router = Router();

router.get(
    "/me",
    auth(Role.ADMIN, Role.OWNER, Role.TENANT),
    UserController.getMe,
);
router.patch('/me/update', auth(Role.ADMIN, Role.OWNER, Role.TENANT), validationRequest(updateUserValidationSchema), UserController.updateMyProfile)
router.get('/:id', auth(Role.ADMIN, Role.OWNER, Role.TENANT), UserController.getUserById)

export const UserRoutes = router;