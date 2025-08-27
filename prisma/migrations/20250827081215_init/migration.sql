/*
  Warnings:

  - Added the required column `name` to the `Parking_spot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Parking_spot" ADD COLUMN     "name" TEXT NOT NULL;
