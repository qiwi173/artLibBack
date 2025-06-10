/*
  Warnings:

  - You are about to drop the column `genreId` on the `arts` table. All the data in the column will be lost.
  - Added the required column `genre_id` to the `arts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "arts" DROP CONSTRAINT "arts_genreId_fkey";

-- AlterTable
ALTER TABLE "arts" DROP COLUMN "genreId",
ADD COLUMN     "genre_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "arts" ADD CONSTRAINT "arts_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
