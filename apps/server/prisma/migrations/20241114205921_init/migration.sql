-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('MULTIPLE_CHOICE', 'EVALUATION');

-- CreateEnum
CREATE TYPE "cycle_period_type" AS ENUM ('VOTING', 'PRE_TEST', 'SEMINAR', 'POST_TEST', 'EVAL', 'IDLE');

-- CreateEnum
CREATE TYPE "response_period" AS ENUM ('VOTING', 'PRE_TEST', 'POST_TEST', 'EVAL');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycle" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seminar" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number_of_votes" INTEGER NOT NULL DEFAULT 0,
    "cycle_id" INTEGER NOT NULL,

    CONSTRAINT "seminar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" "question_type" NOT NULL,
    "seminar_id" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "response" (
    "id" SERIAL NOT NULL,
    "period" "response_period" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "selected_option_id" INTEGER,
    "cycle_id" INTEGER NOT NULL,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycle_period" (
    "id" SERIAL NOT NULL,
    "current_period" "cycle_period_type" NOT NULL,
    "cycle_id" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "cycle_period_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "response_user_id_cycle_id_period_key" ON "response"("user_id", "cycle_id", "period");

-- CreateIndex
CREATE UNIQUE INDEX "cycle_period_cycle_id_current_period_key" ON "cycle_period"("cycle_id", "current_period");

-- AddForeignKey
ALTER TABLE "seminar" ADD CONSTRAINT "seminar_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_seminar_id_fkey" FOREIGN KEY ("seminar_id") REFERENCES "seminar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option" ADD CONSTRAINT "option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "option"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cycle_period" ADD CONSTRAINT "cycle_period_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
