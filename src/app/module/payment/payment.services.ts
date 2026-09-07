import httpStatus from "http-status";
import { IPaymentPayload } from "./payment.interface";
import { PaymentStatus } from "../../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { getBkashIdToken } from "../../lib/bkash";
import { RequestUser } from "../user/user.interface";

const createPayment = async (payload: IPaymentPayload, user: RequestUser) => {
    const transactionResult = await prisma.$transaction(async (tx) => {
        const rental = await tx.rental.findUnique({
            where: {
                id: payload.rentalId,
            },
            include: {
                room: true,
                property: true,
                tenant: true,
            },
        });

        if (!rental) {
            throw new AppError(
                httpStatus.NOT_FOUND, "Rental Application Not Found"
            );
        }


        if (rental.tenant.userId !== user.userId) {
            throw new AppError(
                httpStatus.FORBIDDEN, "You are not allowed to pay for this application"
            );
        }


        if (rental.status !== "APPROVED") {
            throw new AppError(
                httpStatus.BAD_REQUEST, "Only approved applications can be paid"
            );
        }

        const existingPayment = await tx.payment.findUnique({
            where: {
                rentalId: rental.id,
            },
        });


        if (existingPayment?.status === PaymentStatus.PAID) {
            throw new AppError(
                httpStatus.BAD_REQUEST, "Payment Already Completed"
            );
        }

        const bkashIdToken = await getBkashIdToken();


        if (!bkashIdToken) {
            throw new AppError(
                httpStatus.BAD_GATEWAY, "No Bkash Access Token Found"
            );
        }

        const amount = rental.room.amount.toString();

        const merchantInvoiceNumber = `${rental.id}-${Date.now()}`;

        const bkashPaymentCreateResponse = await fetch(
            `${config.bkash_base_url}/tokenized/checkout/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: bkashIdToken,
                    "X-App-Key": config.bkash_app_key,
                },
                body: JSON.stringify({
                    mode: "0011",
                    payerReference: user.email,
                    callbackURL: `${config.bkash_callBack_url}/payments/bkash/callback`,
                    amount: amount,
                    currency: "BDT",
                    intent: "sale",
                    merchantInvoiceNumber,
                }),
            }
        )

        const bkashCreatePaymentResult = await bkashPaymentCreateResponse.json();

        if (bkashCreatePaymentResult.statusCode !== "0000") {
            throw new AppError(
                httpStatus.BAD_GATEWAY, bkashCreatePaymentResult.statusMessage || "bKash Payment Creation Failed"
            );
        }

        let payment;

        if (existingPayment) {
            payment = await tx.payment.update({
                where: {
                    id: existingPayment.id,
                },
                data: {
                    amount: rental.room.amount,
                    currency: "BDT",
                    merchantInvoiceNumber,
                    bkashPaymentId: bkashCreatePaymentResult.paymentID,
                    payerReference: user.email,
                    gatewayResponse: bkashCreatePaymentResult,
                    status: PaymentStatus.UNPAID,
                    paidAt: null,
                },
            });
        } else {
            payment = await tx.payment.create({
                data: {
                    userId: user.userId,
                    propertyId: rental.propertyId,
                    roomId: rental.roomId,
                    rentalId: rental.id,
                    amount: rental.room.amount,
                    currency: "BDT",
                    merchantInvoiceNumber,
                    bkashPaymentId: bkashCreatePaymentResult.paymentID,
                    payerReference: user.email,
                    gatewayResponse: bkashCreatePaymentResult,
                    status: PaymentStatus.UNPAID,
                },
            })
        }

        return {
            paymentId: payment.id,
            paymentUrl: bkashCreatePaymentResult.bkashURL,
        };
    })

    return transactionResult;
};

const bkashCallback = async (query: Record<string, any>) => {
    const transactionResult = await prisma.$transaction(async (tx) => {
        const paymentId = query.paymentID;

        if (!paymentId) {
            throw new AppError(httpStatus.BAD_REQUEST, "Payment Id Missing");
        }

        const status = query.status;

        if (!status) {
            throw new AppError(httpStatus.BAD_REQUEST, "Payment Status is Missing");
        }

        const bkashIdToken = await getBkashIdToken();

        if (!bkashIdToken) {
            throw new AppError(httpStatus.BAD_GATEWAY, "No Bkash Access Token Found!");
        }

        const executedPaymentResponse = await fetch(
            `${config.bkash_base_url}/tokenized/checkout/execute`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: bkashIdToken,
                    "X-App-Key": config.bkash_app_key,
                },
                body: JSON.stringify({
                    paymentID: paymentId,
                }),
            },
        );

        const executedPaymentResult = await executedPaymentResponse.json();

        if (status === "success") {

            console.log("Payment ID:", paymentId);
            console.log("Execute Result:", executedPaymentResult);

            const payment = await tx.payment.findUnique({
                where: {
                    bkashPaymentId: paymentId,
                },
            });

            if (!payment) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    "Payment Not Found!"
                );
            }

            const rental = await tx.rental.findUnique({
                where: {
                    id: payment.rentalId,
                },
                include: {
                    room: true,
                    property: true,
                    tenant: true,
                },
            });

            if (!rental) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    "Rental Application Not Found!"
                );
            }

            const updatedPayment = await tx.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    status: PaymentStatus.PAID,
                    bkashTrxId: executedPaymentResult.trxID,
                    paidAt: executedPaymentResult.paymentExecuteTime,
                    gatewayResponse: executedPaymentResult,
                },
            })

            return {
                payment: updatedPayment,
                executedPaymentResult,
                redirectUrl: `${config.frontend_url}/payment/success?paymentId=${payment.id}`,
            };
        } else if (status === "failure") {
            await tx.payment.update({
                where: {
                    bkashPaymentId: paymentId,
                },
                data: {
                    status: PaymentStatus.FAILED,
                    gatewayResponse: executedPaymentResult,
                },
            });

            return {
                executedPaymentResult,
                redirectUrl: `${config.frontend_url}/payment/failed?paymentId=${paymentId}`,
            };
        } else if (status === "cancel") {
            await tx.payment.update({
                where: {
                    bkashPaymentId: paymentId,
                },
                data: {
                    status: PaymentStatus.CANCELLED,
                    gatewayResponse: executedPaymentResult,
                },
            });

            return {
                executedPaymentResult,
                redirectUrl: `${config.frontend_url}/payment/cancelled?paymentId=${paymentId}`,
            };
        } else {
            return {
                executedPaymentResult,
                redirectUrl: `${config.frontend_url}/payment/failed?paymentId=${paymentId}`,
            };
        }
    },
        {
            maxWait: 10000,
            timeout: 30000,
        }
    );

    return transactionResult;
};

const getPaymentById = async (paymentId: string, userId: string) => {
    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId,
        },
        include: {
            application: true,
            property: true,
            room: true,
        },
    })

    if (!payment) {
        throw new AppError(
            httpStatus.NOT_FOUND, "Payment Not Found"
        );
    }

    if (payment.userId !== userId) {
        throw new AppError(
            httpStatus.FORBIDDEN, "You are not allowed to view this payment"
        );
    }

    return payment;
};


export const PaymentServices = {
    getBkashIdToken,
    createPayment,
    bkashCallback,
    getPaymentById,
};