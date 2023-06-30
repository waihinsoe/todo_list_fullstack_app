/*
  Warnings:

  - You are about to drop the column `name` on the `todos` table. All the data in the column will be lost.
  - Added the required column `date` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `users_id` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "users_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
