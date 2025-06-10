/*
  Warnings:

  - You are about to drop the column `artistId` on the `arts` table. All the data in the column will be lost.
  - You are about to drop the column `museumId` on the `arts` table. All the data in the column will be lost.
  - The `materials` column on the `arts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `artist_id` to the `arts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `arts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `museum_id` to the `arts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('normal', 'premium', 'admin');

-- CreateEnum
CREATE TYPE "Materials" AS ENUM ('Живопись', 'Графика', 'Смешанное');

-- DropForeignKey
ALTER TABLE "arts" DROP CONSTRAINT "arts_artistId_fkey";

-- DropForeignKey
ALTER TABLE "arts" DROP CONSTRAINT "arts_museumId_fkey";

-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_userId_fkey";

-- AlterTable
ALTER TABLE "arts" DROP COLUMN "artistId",
DROP COLUMN "museumId",
ADD COLUMN     "artist_id" TEXT NOT NULL,
ADD COLUMN     "genreId" TEXT NOT NULL,
ADD COLUMN     "museum_id" TEXT NOT NULL,
DROP COLUMN "materials",
ADD COLUMN     "materials" "Materials";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "user_role" "UserRole" NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "genre_name" TEXT NOT NULL,
    "genre_description" TEXT,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoritesToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArtistToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistToFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CommunityToExhibition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommunityToExhibition_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavoritesToGenre_B_index" ON "_FavoritesToGenre"("B");

-- CreateIndex
CREATE INDEX "_ArtistToFavorites_B_index" ON "_ArtistToFavorites"("B");

-- CreateIndex
CREATE INDEX "_CommunityToExhibition_B_index" ON "_CommunityToExhibition"("B");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arts" ADD CONSTRAINT "arts_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arts" ADD CONSTRAINT "arts_museum_id_fkey" FOREIGN KEY ("museum_id") REFERENCES "museums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arts" ADD CONSTRAINT "arts_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToGenre" ADD CONSTRAINT "_FavoritesToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToGenre" ADD CONSTRAINT "_FavoritesToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToExhibition" ADD CONSTRAINT "_CommunityToExhibition_A_fkey" FOREIGN KEY ("A") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToExhibition" ADD CONSTRAINT "_CommunityToExhibition_B_fkey" FOREIGN KEY ("B") REFERENCES "exhibitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
