/*
  Warnings:

  - You are about to drop the `rental_applications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "rental_applications" DROP CONSTRAINT "rental_applications_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "rental_applications" DROP CONSTRAINT "rental_applications_roomId_fkey";

-- DropForeignKey
ALTER TABLE "rental_applications" DROP CONSTRAINT "rental_applications_tenantId_fkey";

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "gender" SET DEFAULT 'MALE';

-- DropTable
DROP TABLE "rental_applications";

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "message" TEXT,
    "proposedMoveIn" TIMESTAMP(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rentals_tenantId_idx" ON "rentals"("tenantId");

-- CreateIndex
CREATE INDEX "rentals_propertyId_idx" ON "rentals"("propertyId");

-- CreateIndex
CREATE INDEX "rentals_roomId_idx" ON "rentals"("roomId");

-- CreateIndex
CREATE INDEX "rentals_status_idx" ON "rentals"("status");

-- CreateIndex
CREATE INDEX "rentals_createdAt_idx" ON "rentals"("createdAt");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
