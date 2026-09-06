import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { Role } from "../../../../generated/prisma/enums";
import {createPaymentValidationSchema,} from "./payment.validation";
import { auth } from "../../middleware/checkAuth";
import { validationRequest } from "../../utils/validationRequest";

const router = Router();

router.post(
    "/create", auth(Role.TENANT),
    validationRequest(  createPaymentValidationSchema),
    PaymentController.createPayment
)
router.get( "/bkash/callback", PaymentController.bkashCallback)
router.get( "/:id", auth(Role.TENANT), PaymentController.getPaymentById)

export const PaymentRoutes = router;