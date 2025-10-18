-- AlterTable
ALTER TABLE "public"."usuario" ADD COLUMN     "expiracionToken" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
