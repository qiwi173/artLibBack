-- DropForeignKey
ALTER TABLE "arts" DROP CONSTRAINT "arts_museum_id_fkey";

-- AlterTable
ALTER TABLE "arts" ALTER COLUMN "museum_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "arts" ADD CONSTRAINT "arts_museum_id_fkey" FOREIGN KEY ("museum_id") REFERENCES "museums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
