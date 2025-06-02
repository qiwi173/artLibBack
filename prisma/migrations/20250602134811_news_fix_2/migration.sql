/*
  Warnings:

  - You are about to drop the column `authorId` on the `news` table. All the data in the column will be lost.
  - Added the required column `userId` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_authorId_fkey";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
