/*
  Warnings:

  - You are about to drop the column `authorId` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `author` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_authorId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
