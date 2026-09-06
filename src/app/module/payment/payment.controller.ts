import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.services";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!

    const result = await PaymentServices.createPayment(req.body, user)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment Created Successfully",
        data: result,
    });
})

const bkashCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await PaymentServices.bkashCallback(req.query);

    return res.redirect(
        result.redirectUrl
    );
})

const getPaymentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.id;
    const userId = req.user?.userId;

    const result = await PaymentServices.getPaymentById(paymentId as string, userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment Retrieved Successfully",
        data: result,
    });
});


export const PaymentController = {
    createPayment, bkashCallback, getPaymentById,
};