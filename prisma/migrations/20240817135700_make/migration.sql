-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "prepTime" DROP NOT NULL,
ALTER COLUMN "cookTime" DROP NOT NULL;
