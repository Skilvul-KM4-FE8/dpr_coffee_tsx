/*
  Warnings:

  - You are about to drop the column `menuId` on the `TransactionItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_menuId_fkey";

-- AlterTable
ALTER TABLE "TransactionItem" DROP COLUMN "menuId",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION;
