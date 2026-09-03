/*
  Warnings:

  - The values [CUSTOMER,TECHNICIAN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gatewayResponse` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `trxId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `technicians` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rentalId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'HOUSE', 'VILLA', 'STUDIO', 'HOSTEL');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE', 'SHARED');

-- CreateEnum
CREATE TYPE "RoomAvailability" AS ENUM ('AVAILABLE', 'RESERVED', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('BKASH', 'STRIPE', 'SSLCOMMERZ');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('RENT', 'SECURITY_DEPOSIT', 'BOOKING_FEE');

-- CreateEnum
CREATE TYPE "SleepSchedule" AS ENUM ('EARLY_BIRD', 'NIGHT_OWL', 'FLEXIBLE');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('OWNER', 'TENANT', 'ADMIN');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'TENANT';
COMMIT;

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'DELETED';

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_requestId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_customerId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_requestId_fkey";

-- DropForeignKey
ALTER TABLE "service_requests" DROP CONSTRAINT "service_requests_customerId_fkey";

-- DropForeignKey
ALTER TABLE "service_requests" DROP CONSTRAINT "service_requests_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "service_requests" DROP CONSTRAINT "service_requests_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "technicians" DROP CONSTRAINT "technicians_userId_fkey";

-- DropIndex
DROP INDEX "payments_requestId_key";

-- DropIndex
DROP INDEX "payments_trxId_key";

-- DropIndex
DROP INDEX "users_role_status_idx";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "gatewayResponse",
DROP COLUMN "provider",
DROP COLUMN "requestId",
DROP COLUMN "trxId",
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentProvider" "PaymentProvider" NOT NULL DEFAULT 'BKASH',
ADD COLUMN     "paymentUrl" TEXT,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "rentalId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "role" SET DEFAULT 'TENANT';

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "service_requests";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "technicians";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "TechnicianStatus";

-- CreateTable
CREATE TABLE "roommates" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "gender" "Gender",
    "smokingAllowed" BOOLEAN NOT NULL DEFAULT false,
    "petsAllowed" BOOLEAN NOT NULL DEFAULT false,
    "preferredLocation" TEXT,
    "minBudget" DECIMAL(10,2),
    "maxBudget" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roommates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "propertyType" "PropertyType" NOT NULL DEFAULT 'HOUSE',
    "address" TEXT NOT NULL,
    "city" TEXT,
    "area" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "totalRooms" INTEGER NOT NULL DEFAULT 0,
    "status" "PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_applications" (
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

    CONSTRAINT "rental_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "roomType" "RoomType" NOT NULL DEFAULT 'SINGLE',
    "amount" DECIMAL(10,2) NOT NULL,
    "securityDeposit" DECIMAL(10,2),
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "currentOccupants" INTEGER NOT NULL DEFAULT 0,
    "availability" "RoomAvailability" NOT NULL DEFAULT 'AVAILABLE',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "occupation" TEXT,
    "bio" TEXT,
    "gender" "Gender",
    "preferredLocation" TEXT,
    "minBudget" DECIMAL(10,2),
    "maxBudget" DECIMAL(10,2),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roommates_tenantId_key" ON "roommates"("tenantId");

-- CreateIndex
CREATE INDEX "roommates_tenantId_idx" ON "roommates"("tenantId");

-- CreateIndex
CREATE INDEX "roommates_gender_idx" ON "roommates"("gender");

-- CreateIndex
CREATE INDEX "roommates_preferredLocation_idx" ON "roommates"("preferredLocation");

-- CreateIndex
CREATE INDEX "roommates_minBudget_maxBudget_idx" ON "roommates"("minBudget", "maxBudget");

-- CreateIndex
CREATE UNIQUE INDEX "owners_userId_key" ON "owners"("userId");

-- CreateIndex
CREATE INDEX "owners_userId_idx" ON "owners"("userId");

-- CreateIndex
CREATE INDEX "properties_ownerId_idx" ON "properties"("ownerId");

-- CreateIndex
CREATE INDEX "properties_city_idx" ON "properties"("city");

-- CreateIndex
CREATE INDEX "properties_area_idx" ON "properties"("area");

-- CreateIndex
CREATE INDEX "properties_propertyType_idx" ON "properties"("propertyType");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "properties"("status");

-- CreateIndex
CREATE INDEX "properties_isDeleted_idx" ON "properties"("isDeleted");

-- CreateIndex
CREATE INDEX "properties_createdAt_idx" ON "properties"("createdAt");

-- CreateIndex
CREATE INDEX "rental_applications_tenantId_idx" ON "rental_applications"("tenantId");

-- CreateIndex
CREATE INDEX "rental_applications_propertyId_idx" ON "rental_applications"("propertyId");

-- CreateIndex
CREATE INDEX "rental_applications_roomId_idx" ON "rental_applications"("roomId");

-- CreateIndex
CREATE INDEX "rental_applications_status_idx" ON "rental_applications"("status");

-- CreateIndex
CREATE INDEX "rental_applications_createdAt_idx" ON "rental_applications"("createdAt");

-- CreateIndex
CREATE INDEX "rooms_propertyId_idx" ON "rooms"("propertyId");

-- CreateIndex
CREATE INDEX "rooms_availability_idx" ON "rooms"("availability");

-- CreateIndex
CREATE INDEX "rooms_roomType_idx" ON "rooms"("roomType");

-- CreateIndex
CREATE INDEX "rooms_amount_idx" ON "rooms"("amount");

-- CreateIndex
CREATE INDEX "rooms_isDeleted_idx" ON "rooms"("isDeleted");

-- CreateIndex
CREATE INDEX "rooms_createdAt_idx" ON "rooms"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_propertyId_roomNumber_key" ON "rooms"("propertyId", "roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_userId_key" ON "tenants"("userId");

-- CreateIndex
CREATE INDEX "tenants_userId_idx" ON "tenants"("userId");

-- CreateIndex
CREATE INDEX "tenants_gender_idx" ON "tenants"("gender");

-- CreateIndex
CREATE INDEX "tenants_preferredLocation_idx" ON "tenants"("preferredLocation");

-- CreateIndex
CREATE INDEX "tenants_minBudget_maxBudget_idx" ON "tenants"("minBudget", "maxBudget");

-- CreateIndex
CREATE UNIQUE INDEX "payments_rentalId_key" ON "payments"("rentalId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_propertyId_idx" ON "payments"("propertyId");

-- CreateIndex
CREATE INDEX "payments_roomId_idx" ON "payments"("roomId");

-- CreateIndex
CREATE INDEX "payments_paymentProvider_idx" ON "payments"("paymentProvider");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_isDeleted_idx" ON "users"("isDeleted");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- AddForeignKey
ALTER TABLE "roommates" ADD CONSTRAINT "roommates_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_applications" ADD CONSTRAINT "rental_applications_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_applications" ADD CONSTRAINT "rental_applications_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_applications" ADD CONSTRAINT "rental_applications_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
