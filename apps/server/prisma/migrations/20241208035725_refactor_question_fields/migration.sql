/*
  Warnings:

  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - Added the required column `label` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "text",
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "title" TEXT NOT NULL;
