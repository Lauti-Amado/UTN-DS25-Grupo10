import { PrismaClient } from "@prisma/client";

// Evitar múltiples instancias en desarrollo/hot-reload
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ["error", "warn", "query"] : ["error", "warn"],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;