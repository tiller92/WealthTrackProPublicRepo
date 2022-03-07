/*
  Warnings:

  - You are about to drop the `Userrealestae` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Userrealestae" DROP CONSTRAINT "Userrealestae_ownerName_fkey";

-- DropTable
DROP TABLE "Userrealestae";

-- CreateTable
CREATE TABLE "Userrealestate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Userrealestate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Userrealestate" ADD CONSTRAINT "Userrealestate_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
