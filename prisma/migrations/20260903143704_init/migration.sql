/*
  Warnings:

  - You are about to drop the column `imagePulicId` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "imagePulicId",
ADD COLUMN     "imagePublicId" TEXT NOT NULL DEFAULT '';
