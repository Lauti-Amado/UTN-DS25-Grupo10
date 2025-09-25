/*
  Warnings:

  - A unique constraint covering the columns `[nombreUsuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombreUsuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."usuario" ADD COLUMN     "esAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nombreUsuario" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nombreUsuario_key" ON "public"."usuario"("nombreUsuario");
