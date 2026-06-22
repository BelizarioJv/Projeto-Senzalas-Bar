-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "purchaseId" INTEGER,
ADD COLUMN     "saleId" INTEGER;

-- CreateIndex
CREATE INDEX "StockMovement_purchaseId_idx" ON "StockMovement"("purchaseId");

-- CreateIndex
CREATE INDEX "StockMovement_saleId_idx" ON "StockMovement"("saleId");

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
