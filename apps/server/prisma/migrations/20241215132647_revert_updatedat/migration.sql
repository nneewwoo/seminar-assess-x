/*
  Warnings:

  - Made the column `updatedAt` on table `EvalResponseDraft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EvalResponseDraft" ALTER COLUMN "updatedAt" SET NOT NULL;
