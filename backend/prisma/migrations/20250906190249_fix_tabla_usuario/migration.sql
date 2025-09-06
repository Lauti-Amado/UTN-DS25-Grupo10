/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Formulario" DROP CONSTRAINT "Formulario_postuladoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Oferta" DROP CONSTRAINT "Oferta_creadorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Proyecto" DROP CONSTRAINT "Proyecto_creadorId_fkey";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "rolPostulante" BOOLEAN NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_mail_key" ON "public"."usuario"("mail");

-- AddForeignKey
ALTER TABLE "public"."Formulario" ADD CONSTRAINT "Formulario_postuladoId_fkey" FOREIGN KEY ("postuladoId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Oferta" ADD CONSTRAINT "Oferta_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proyecto" ADD CONSTRAINT "Proyecto_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
