import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient ({
    log:["error","warn","query"],
});

export default prisma;