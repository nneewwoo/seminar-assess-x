/*
  Warnings:

  - A unique constraint covering the columns `[userId,evalId,evalQuestionId]` on the table `EvalResponse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,evalId,evalQuestionId]` on the table `EvalResponseDraft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evalId` to the `EvalResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evalId` to the `EvalResponseDraft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EvalResponse_userId_evalQuestionId_key";

-- DropIndex
DROP INDEX "EvalResponseDraft_userId_evalQuestionId_key";

-- AlterTable
ALTER TABLE "EvalResponse" ADD COLUMN     "evalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EvalResponseDraft" ADD COLUMN     "evalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponse_userId_evalId_evalQuestionId_key" ON "EvalResponse"("userId", "evalId", "evalQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponseDraft_userId_evalId_evalQuestionId_key" ON "EvalResponseDraft"("userId", "evalId", "evalQuestionId");

-- AddForeignKey
ALTER TABLE "EvalResponseDraft" ADD CONSTRAINT "EvalResponseDraft_evalId_fkey" FOREIGN KEY ("evalId") REFERENCES "Eval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResponse" ADD CONSTRAINT "EvalResponse_evalId_fkey" FOREIGN KEY ("evalId") REFERENCES "Eval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
