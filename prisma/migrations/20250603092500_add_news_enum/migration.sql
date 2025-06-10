/*
  Warnings:

  - The `status` column on the `news` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('not_approved', 'approved');

-- AlterTable
ALTER TABLE "news" DROP COLUMN "status",
ADD COLUMN     "status" "NewsStatus" NOT NULL DEFAULT 'not_approved';
