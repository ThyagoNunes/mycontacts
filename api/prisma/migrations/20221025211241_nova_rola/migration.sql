-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
