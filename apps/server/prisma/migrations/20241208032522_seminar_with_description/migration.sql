/*
  Warnings:

  - Added the required column `description` to the `Seminar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seminar" ADD COLUMN     "description" TEXT NOT NULL;
