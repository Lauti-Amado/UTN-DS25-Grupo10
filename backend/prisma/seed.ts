import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Crear admin si no existe
  const admin = await prisma.usuario.upsert({
    where: { mail: "admin@gmail.com" },
    update: {},
    create: {
      nombre: "Administrador",
      nombreUsuario: "admin",
      mail: "admin@gmail.com",
      contraseña: hashedPassword,
      rolPostulante: false, 
      esAdmin: true,      
    },
  });

  console.log("Admin creado:", admin);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
