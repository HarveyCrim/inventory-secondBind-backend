-- CreateTable
CREATE TABLE "Inventory" (
    "entry_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "isbn" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("entry_id")
);
