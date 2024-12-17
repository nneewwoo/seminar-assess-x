/*
  Warnings:

  - You are about to drop the column `feedback` on the `EvalResponse` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Eval` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EvalType" AS ENUM ('RATING', 'FEEDBACK');

-- DropIndex
DROP INDEX "EvalResponse_userId_cycleId_evalQuestionId_key";

-- AlterTable
ALTER TABLE "Eval" DROP COLUMN "type",
ADD COLUMN     "type" "EvalType" NOT NULL;

-- AlterTable
ALTER TABLE "EvalResponse" DROP COLUMN "feedback",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "textAnswer" TEXT;

-- DropEnum
DROP TYPE "EvalCategoryType";

-- CreateTable
CREATE TABLE "EvalResponseDraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "evalQuestionId" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "rating" INTEGER,
    "textAnswer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvalResponseDraft_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EvalResponseDraft" ADD CONSTRAINT "EvalResponseDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResponseDraft" ADD CONSTRAINT "EvalResponseDraft_evalQuestionId_fkey" FOREIGN KEY ("evalQuestionId") REFERENCES "EvalQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResponseDraft" ADD CONSTRAINT "EvalResponseDraft_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
