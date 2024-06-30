-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_clientId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
