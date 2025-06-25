/*
  Warnings:

  - You are about to drop the `_ArtistToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToGenre" DROP CONSTRAINT "_FavoritesToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToGenre" DROP CONSTRAINT "_FavoritesToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_user_id_fkey";

-- DropTable
DROP TABLE "_ArtistToFavorites";

-- DropTable
DROP TABLE "_FavoritesToGenre";

-- DropTable
DROP TABLE "favorites";

-- CreateTable
CREATE TABLE "favorite_artists" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_genres" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteArtistsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteArtistsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoriteGenresToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteGenresToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoriteGenresToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteGenresToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArtistToFavoriteArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistToFavoriteArtists_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavoriteArtistsToUser_B_index" ON "_FavoriteArtistsToUser"("B");

-- CreateIndex
CREATE INDEX "_FavoriteGenresToGenre_B_index" ON "_FavoriteGenresToGenre"("B");

-- CreateIndex
CREATE INDEX "_FavoriteGenresToUser_B_index" ON "_FavoriteGenresToUser"("B");

-- CreateIndex
CREATE INDEX "_ArtistToFavoriteArtists_B_index" ON "_ArtistToFavoriteArtists"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteArtistsToUser" ADD CONSTRAINT "_FavoriteArtistsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "favorite_artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteArtistsToUser" ADD CONSTRAINT "_FavoriteArtistsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteGenresToGenre" ADD CONSTRAINT "_FavoriteGenresToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "favorite_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteGenresToGenre" ADD CONSTRAINT "_FavoriteGenresToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteGenresToUser" ADD CONSTRAINT "_FavoriteGenresToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "favorite_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteGenresToUser" ADD CONSTRAINT "_FavoriteGenresToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavoriteArtists" ADD CONSTRAINT "_ArtistToFavoriteArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavoriteArtists" ADD CONSTRAINT "_ArtistToFavoriteArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "favorite_artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
