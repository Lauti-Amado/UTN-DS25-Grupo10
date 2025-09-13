import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await prisma.usuario.create({
    data: {
      nombre: "Administrador",
      nombreUsuario: "admin",
      mail: "admin@miapp.com",
      contraseña: hashedPassword,
      rolPostulante: false,
      esAdmin: true,
    },
  });

  console.log("✅ Usuario ADMIN creado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
