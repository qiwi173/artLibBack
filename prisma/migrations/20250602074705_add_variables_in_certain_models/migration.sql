-- AlterTable
ALTER TABLE "arts" ALTER COLUMN "cost" DROP NOT NULL,
ALTER COLUMN "sales_history" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'normal';
