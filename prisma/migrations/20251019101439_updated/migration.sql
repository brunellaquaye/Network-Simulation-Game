/*
  Warnings:

  - A unique constraint covering the columns `[scenarioId,ipAddress]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Device_ipAddress_key";

-- CreateIndex
CREATE UNIQUE INDEX "Device_scenarioId_ipAddress_key" ON "Device"("scenarioId", "ipAddress");
