/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Made the column `pingRate` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latency` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trafficLoad` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "pingRate" SET NOT NULL,
ALTER COLUMN "pingRate" SET DEFAULT 10,
ALTER COLUMN "latency" SET NOT NULL,
ALTER COLUMN "latency" SET DEFAULT 500,
ALTER COLUMN "trafficLoad" SET NOT NULL,
ALTER COLUMN "trafficLoad" SET DEFAULT 12,
ALTER COLUMN "ipAddress" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_ipAddress_key" ON "Device"("ipAddress");
