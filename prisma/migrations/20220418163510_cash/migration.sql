-- CreateTable
CREATE TABLE "Usercash" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Usercash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usercash" ADD CONSTRAINT "Usercash_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
