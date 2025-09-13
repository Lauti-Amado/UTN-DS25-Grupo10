/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "rolPostulante" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "fotoperfil" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Formulario" (
    "postuladoId" INTEGER NOT NULL,
    "ofertaId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("postuladoId","ofertaId")
);

-- CreateTable
CREATE TABLE "public"."Oferta" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "sueldo" INTEGER,
    "modalidad" TEXT NOT NULL,
    "horario" TIMESTAMP(3)[],
    "creadorId" INTEGER NOT NULL,

    CONSTRAINT "Oferta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Proyecto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tecnologiasUsadas" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creadorId" INTEGER NOT NULL,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_mail_key" ON "public"."Usuario"("mail");

-- AddForeignKey
ALTER TABLE "public"."Formulario" ADD CONSTRAINT "Formulario_postuladoId_fkey" FOREIGN KEY ("postuladoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Formulario" ADD CONSTRAINT "Formulario_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "public"."Oferta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Oferta" ADD CONSTRAINT "Oferta_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proyecto" ADD CONSTRAINT "Proyecto_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
