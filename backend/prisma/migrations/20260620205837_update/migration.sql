/*
  Warnings:

  - Added the required column `discountPercent` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "discountPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountValue" DOUBLE PRECISION NOT NULL;
