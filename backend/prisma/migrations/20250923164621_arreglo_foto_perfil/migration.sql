/*
  Warnings:

  - You are about to drop the column `imagenPerfil` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."usuario" DROP COLUMN "imagenPerfil",
ADD COLUMN     "fotoPerfil" TEXT;
