import { Router } from "express";
import { AuthController } from "./auth.controller";
const router = Router();

router.post("/register", AuthController.createUser);
router.post("/verify-email",  AuthController.verifyUserEmail);
// router.post("/login", validationRequest(patientValidation.patientLoginZod), AuthController.loginUser);
// router.get(
// 	"/me",
// 	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
// 	AuthController.getMe,
// );
// router.post("/refresh-token", AuthController.refreshToken);
// router.post('/google', AuthController.googleLogin)
// router.post('/forgot-password', validationRequest(patientValidation.forgotPasswordZod), AuthController.forgotPassword)
// router.post('/reset-password', validationRequest(patientValidation.resetPasswordZOd), AuthController.resetPassword)
export const AuthRoutes = router;
