/*
  Warnings:

  - You are about to drop the column `createdById` on the `Device` table. All the data in the column will be lost.
  - The `difficulty` column on the `Scenario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sessionId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Log" DROP CONSTRAINT "Log_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."State" DROP CONSTRAINT "State_userId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "createdById";

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "sessionId" INTEGER NOT NULL,
ALTER COLUMN "deviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Scenario" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'easy';

-- DropTable
DROP TABLE "public"."State";

-- DropEnum
DROP TYPE "public"."difficulty";

-- CreateTable
CREATE TABLE "SimulationSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "scenarioId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "score" INTEGER NOT NULL DEFAULT 0,
    "lastState" JSONB,

    CONSTRAINT "SimulationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionDevice" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ipAddress" TEXT,
    "pingRate" DOUBLE PRECISION NOT NULL,
    "latency" DOUBLE PRECISION NOT NULL,
    "trafficLoad" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'online',
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionDevice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SimulationSession" ADD CONSTRAINT "SimulationSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulationSession" ADD CONSTRAINT "SimulationSession_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDevice" ADD CONSTRAINT "SessionDevice_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SimulationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SimulationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "SessionDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
