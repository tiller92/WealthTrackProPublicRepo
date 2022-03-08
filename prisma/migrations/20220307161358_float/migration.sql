/*
  Warnings:

  - You are about to alter the column `shares` on the `Usercrypto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `interest` on the `Userdebt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `debt` on the `Userdebt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Userrealestate` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `shares` on the `Userstocks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Usercrypto" ALTER COLUMN "shares" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Userdebt" ALTER COLUMN "interest" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "debt" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Userrealestate" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Userstocks" ALTER COLUMN "shares" SET DATA TYPE DOUBLE PRECISION;
