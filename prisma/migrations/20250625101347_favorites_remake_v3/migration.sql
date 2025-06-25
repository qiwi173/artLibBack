/*
  Warnings:

  - You are about to drop the `_ArtistToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToUser" DROP CONSTRAINT "_GenreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToUser" DROP CONSTRAINT "_GenreToUser_B_fkey";

-- DropTable
DROP TABLE "_ArtistToUser";

-- DropTable
DROP TABLE "_GenreToUser";

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "userId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtist_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "FavoriteGenre" (
    "userId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "FavoriteGenre_pkey" PRIMARY KEY ("userId","genreId")
);

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteGenre" ADD CONSTRAINT "FavoriteGenre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteGenre" ADD CONSTRAINT "FavoriteGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
