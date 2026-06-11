/*
  Warnings:

  - The values [ENTRY,EXIT,ADJUSTMENT] on the enum `MovementType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CASH,CREDIT_CARD,DEBIT_CARD] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,COMPLETED,CANCELED] on the enum `PurchaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [UNIT,LITER] on the enum `UnitMeasure` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductsCategory" AS ENUM ('CERVEJA', 'VINHOS', 'DESTILADOS', 'REFRIGERANTES', 'SUCO', 'AGUA');

-- AlterEnum
BEGIN;
CREATE TYPE "MovementType_new" AS ENUM ('ENTRO', 'SAIDA', 'AJUSTE');
ALTER TABLE "StockMovement" ALTER COLUMN "movementType" TYPE "MovementType_new" USING ("movementType"::text::"MovementType_new");
ALTER TYPE "MovementType" RENAME TO "MovementType_old";
ALTER TYPE "MovementType_new" RENAME TO "MovementType";
DROP TYPE "MovementType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO');
ALTER TABLE "Purchase" ALTER COLUMN "payment" TYPE "PaymentMethod_new" USING ("payment"::text::"PaymentMethod_new");
ALTER TABLE "Sale" ALTER COLUMN "payment" TYPE "PaymentMethod_new" USING ("payment"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PurchaseStatus_new" AS ENUM ('PENDENTE', 'COMPLETO', 'CANCELADO');
ALTER TABLE "Purchase" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Purchase" ALTER COLUMN "status" TYPE "PurchaseStatus_new" USING ("status"::text::"PurchaseStatus_new");
ALTER TYPE "PurchaseStatus" RENAME TO "PurchaseStatus_old";
ALTER TYPE "PurchaseStatus_new" RENAME TO "PurchaseStatus";
DROP TYPE "PurchaseStatus_old";
ALTER TABLE "Purchase" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UnitMeasure_new" AS ENUM ('UNIDADE', 'KG', 'LITRO', 'FARDO');
ALTER TABLE "Product" ALTER COLUMN "unitMeasure" TYPE "UnitMeasure_new" USING ("unitMeasure"::text::"UnitMeasure_new");
ALTER TYPE "UnitMeasure" RENAME TO "UnitMeasure_old";
ALTER TYPE "UnitMeasure_new" RENAME TO "UnitMeasure";
DROP TYPE "UnitMeasure_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductsCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';

-- DropTable
DROP TABLE "Category";
