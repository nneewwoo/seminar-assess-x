/*
  Warnings:

  - A unique constraint covering the columns `[userId,evalQuestionId]` on the table `EvalResponse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,evalQuestionId]` on the table `EvalResponseDraft` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EvalResponse_userId_evalQuestionId_key" ON "EvalResponse"("userId", "evalQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponseDraft_userId_evalQuestionId_key" ON "EvalResponseDraft"("userId", "evalQuestionId");
