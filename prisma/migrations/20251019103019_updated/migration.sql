/*
  Warnings:

  - The `status` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('online', 'offline');

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'online';
