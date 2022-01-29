/*
  Warnings:

  - Added the required column `title` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "completed" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TodoList" ADD COLUMN     "title" TEXT NOT NULL;
