/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_isbn_key" ON "Inventory"("isbn");
