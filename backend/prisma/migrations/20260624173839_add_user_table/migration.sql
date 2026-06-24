-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createdBy_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "createdBy" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
