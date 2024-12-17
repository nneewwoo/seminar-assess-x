/*
  Warnings:

  - Added the required column `updatedAt` to the `EvalResponseDraft` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `EvalResponseDraft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EvalResponseDraft" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0;
