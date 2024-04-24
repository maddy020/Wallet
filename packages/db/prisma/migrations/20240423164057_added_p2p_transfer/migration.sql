-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('Pending', 'Success', 'Failed');

-- CreateTable
CREATE TABLE "p2pTransfer" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "TransferStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "p2pTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
