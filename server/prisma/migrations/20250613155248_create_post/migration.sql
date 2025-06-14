/*
  Warnings:

  - You are about to drop the column `companay` on the `CreatePost` table. All the data in the column will be lost.
  - Added the required column `company` to the `CreatePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreatePost" DROP COLUMN "companay",
ADD COLUMN     "company" TEXT NOT NULL;
