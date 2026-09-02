import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
const router = Router();

router.post("/register", AuthController.createUser);
router.post("/verify-email",  AuthController.verifyUserEmail);
router.post("/login", AuthController.loginUser);
router.get(
	"/me",
	auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post('/google', AuthController.googleLogin)

export const AuthRoutes = router;
