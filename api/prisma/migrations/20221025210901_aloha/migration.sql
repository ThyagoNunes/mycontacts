/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_categoryId_key" ON "contacts"("categoryId");
