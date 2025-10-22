/*
  Warnings:

  - The `difficulty` column on the `Scenario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "Scenario" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "difficulty" NOT NULL DEFAULT 'easy';
