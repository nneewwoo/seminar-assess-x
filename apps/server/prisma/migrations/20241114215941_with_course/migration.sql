/*
  Warnings:

  - Added the required column `course` to the `seminar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seminar" ADD COLUMN     "course" TEXT NOT NULL;
