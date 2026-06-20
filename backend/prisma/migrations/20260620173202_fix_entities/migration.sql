/*
  Warnings:

  - You are about to drop the `SaleItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";

-- DropTable
DROP TABLE "SaleItem";

-- CreateTable
CREATE TABLE "SaleProducts" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "SaleProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaleProducts_saleId_idx" ON "SaleProducts"("saleId");

-- CreateIndex
CREATE INDEX "SaleProducts_productId_idx" ON "SaleProducts"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SaleProducts_saleId_productId_key" ON "SaleProducts"("saleId", "productId");

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
