/*
  Warnings:

  - The values [VILLA,STUDIO] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyType_new" AS ENUM ('APARTMENT', 'HOUSE', 'HOSTEL', 'ROOM');
ALTER TABLE "public"."properties" ALTER COLUMN "propertyType" DROP DEFAULT;
ALTER TABLE "properties" ALTER COLUMN "propertyType" TYPE "PropertyType_new" USING ("propertyType"::text::"PropertyType_new");
ALTER TYPE "PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "public"."PropertyType_old";
ALTER TABLE "properties" ALTER COLUMN "propertyType" SET DEFAULT 'HOUSE';
COMMIT;
