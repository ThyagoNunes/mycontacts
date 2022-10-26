/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_categoryId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "contacts_categoryId_key" ON "contacts"("categoryId");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
