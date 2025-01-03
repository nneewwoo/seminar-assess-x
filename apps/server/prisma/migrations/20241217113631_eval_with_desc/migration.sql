/*
  Warnings:

  - Added the required column `description` to the `Eval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eval" ADD COLUMN     "description" TEXT NOT NULL;
