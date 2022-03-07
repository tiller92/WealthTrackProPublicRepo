-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userstocks" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Userstocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usercrypto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Usercrypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userrealestae" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Userrealestae_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userdebt" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "interest" INTEGER NOT NULL,
    "debt" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Userdebt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Userstocks" ADD CONSTRAINT "Userstocks_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usercrypto" ADD CONSTRAINT "Usercrypto_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userrealestae" ADD CONSTRAINT "Userrealestae_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userdebt" ADD CONSTRAINT "Userdebt_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
