/*
  Warnings:

  - You are about to drop the column `is_archived` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "is_archived",
ADD COLUMN     "is_done" BOOLEAN NOT NULL DEFAULT false;
