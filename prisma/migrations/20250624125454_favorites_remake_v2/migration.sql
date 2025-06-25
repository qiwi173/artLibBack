/*
  Warnings:

  - You are about to drop the `_ArtistToFavoriteArtists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteArtistsToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteGenresToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteGenresToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite_artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite_genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToFavoriteArtists" DROP CONSTRAINT "_ArtistToFavoriteArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavoriteArtists" DROP CONSTRAINT "_ArtistToFavoriteArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteArtistsToUser" DROP CONSTRAINT "_FavoriteArtistsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteArtistsToUser" DROP CONSTRAINT "_FavoriteArtistsToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteGenresToGenre" DROP CONSTRAINT "_FavoriteGenresToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteGenresToGenre" DROP CONSTRAINT "_FavoriteGenresToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteGenresToUser" DROP CONSTRAINT "_FavoriteGenresToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteGenresToUser" DROP CONSTRAINT "_FavoriteGenresToUser_B_fkey";

-- DropTable
DROP TABLE "_ArtistToFavoriteArtists";

-- DropTable
DROP TABLE "_FavoriteArtistsToUser";

-- DropTable
DROP TABLE "_FavoriteGenresToGenre";

-- DropTable
DROP TABLE "_FavoriteGenresToUser";

-- DropTable
DROP TABLE "favorite_artists";

-- DropTable
DROP TABLE "favorite_genres";

-- CreateTable
CREATE TABLE "_ArtistToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GenreToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GenreToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtistToUser_B_index" ON "_ArtistToUser"("B");

-- CreateIndex
CREATE INDEX "_GenreToUser_B_index" ON "_GenreToUser"("B");

-- AddForeignKey
ALTER TABLE "_ArtistToUser" ADD CONSTRAINT "_ArtistToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToUser" ADD CONSTRAINT "_ArtistToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
