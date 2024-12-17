/*
  Warnings:

  - The values [EVALUATION] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EvalCategoryType" AS ENUM ('RATING', 'FEEDBACK');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('MULTIPLE_CHOICE');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "isCorrect" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "type" SET DEFAULT 'MULTIPLE_CHOICE';

-- CreateTable
CREATE TABLE "EvalQuestion" (
    "id" TEXT NOT NULL,
    "type" "EvalCategoryType" NOT NULL,
    "category" TEXT NOT NULL,
    "questions" TEXT[],

    CONSTRAINT "EvalQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvalResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "evalQuestionId" TEXT NOT NULL,
    "rating" INTEGER,
    "feedback" TEXT,

    CONSTRAINT "EvalResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponse_userId_cycleId_key" ON "EvalResponse"("userId", "cycleId");

-- AddForeignKey
ALTER TABLE "EvalResponse" ADD CONSTRAINT "EvalResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResponse" ADD CONSTRAINT "EvalResponse_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResponse" ADD CONSTRAINT "EvalResponse_evalQuestionId_fkey" FOREIGN KEY ("evalQuestionId") REFERENCES "EvalQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
