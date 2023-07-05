-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_lineThrough" BOOLEAN NOT NULL DEFAULT false;
