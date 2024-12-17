/*
  Warnings:

  - You are about to drop the column `category` on the `Eval` table. All the data in the column will be lost.
  - Added the required column `title` to the `Eval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eval" DROP COLUMN "category",
ADD COLUMN     "title" TEXT NOT NULL;
