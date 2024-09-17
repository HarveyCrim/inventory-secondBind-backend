/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `entry_id` on the `Inventory` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `authorId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "author",
DROP COLUMN "entry_id",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "entryId" SERIAL NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("entryId");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
