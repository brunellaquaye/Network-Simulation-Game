/*
  Warnings:

  - You are about to drop the `_DeviceConnections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_DeviceConnections" DROP CONSTRAINT "_DeviceConnections_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DeviceConnections" DROP CONSTRAINT "_DeviceConnections_B_fkey";

-- DropTable
DROP TABLE "public"."_DeviceConnections";

-- CreateTable
CREATE TABLE "DeviceConnection" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceConnection_fromId_toId_key" ON "DeviceConnection"("fromId", "toId");

-- AddForeignKey
ALTER TABLE "DeviceConnection" ADD CONSTRAINT "DeviceConnection_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceConnection" ADD CONSTRAINT "DeviceConnection_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
