/*
  Warnings:

  - You are about to drop the column `paymentProvider` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentUrl` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[merchantInvoiceNumber]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalId_fkey";

-- DropIndex
DROP INDEX "payments_paymentProvider_idx";

-- DropIndex
DROP INDEX "payments_transactionId_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentProvider",
DROP COLUMN "paymentUrl",
DROP COLUMN "transactionId",
ADD COLUMN     "bkashTrxId" TEXT,
ADD COLUMN     "gatewayResponse" JSONB,
ADD COLUMN     "merchantInvoiceNumber" TEXT,
ADD COLUMN     "payerReference" TEXT,
ADD COLUMN     "paymentGateway" "PaymentProvider" NOT NULL DEFAULT 'BKASH',
ADD COLUMN     "refundAmount" DECIMAL(10,2),
ADD COLUMN     "refundReason" TEXT,
ADD COLUMN     "refundTrxId" TEXT,
ADD COLUMN     "refundedAt" TEXT,
ALTER COLUMN "paidAt" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_merchantInvoiceNumber_key" ON "payments"("merchantInvoiceNumber");

-- CreateIndex
CREATE INDEX "payments_paymentGateway_idx" ON "payments"("paymentGateway");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
