/*
  Warnings:

  - You are about to drop the column `category` on the `EvalQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `questions` on the `EvalQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EvalQuestion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,cycleId,evalQuestionId]` on the table `EvalResponse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evalId` to the `EvalQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `EvalQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EvalResponse_userId_cycleId_key";

-- AlterTable
ALTER TABLE "EvalQuestion" DROP COLUMN "category",
DROP COLUMN "questions",
DROP COLUMN "type",
ADD COLUMN     "evalId" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Eval" (
    "id" TEXT NOT NULL,
    "type" "EvalCategoryType" NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Eval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponse_userId_cycleId_evalQuestionId_key" ON "EvalResponse"("userId", "cycleId", "evalQuestionId");

-- AddForeignKey
ALTER TABLE "EvalQuestion" ADD CONSTRAINT "EvalQuestion_evalId_fkey" FOREIGN KEY ("evalId") REFERENCES "Eval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
