/*
  Warnings:

  - You are about to drop the column `attended` on the `votes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "attendance" ALTER COLUMN "attended" SET DEFAULT false;

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "attended";
