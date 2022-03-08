/*
  Warnings:

  - You are about to alter the column `shares` on the `Usercrypto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `interest` on the `Userdebt` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `debt` on the `Userdebt` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `value` on the `Userrealestate` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `shares` on the `Userstocks` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Usercrypto" ALTER COLUMN "shares" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Userdebt" ALTER COLUMN "interest" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "debt" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Userrealestate" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Userstocks" ALTER COLUMN "shares" SET DATA TYPE DECIMAL(65,30);
