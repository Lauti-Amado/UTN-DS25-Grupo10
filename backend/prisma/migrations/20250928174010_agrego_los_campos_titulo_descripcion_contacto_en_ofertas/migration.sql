/*
  Warnings:

  - Added the required column `contacto` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Oferta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Oferta" ADD COLUMN     "contacto" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
