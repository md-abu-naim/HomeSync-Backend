import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validationRequest } from "../../utils/validationRequest";
import { AuthValidation } from "./auth.validation";
const router = Router();

router.post("/register", validationRequest(AuthValidation.registerUserValidationSchema), AuthController.createUser);
router.post("/verify-email", validationRequest(AuthValidation.verifyUserEmailValidationSchema), AuthController.verifyUserEmail);
router.post("/login", validationRequest(AuthValidation.loginUserValidationSchema), AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post('/google', AuthController.googleLogin)

export const AuthRoutes = router;
