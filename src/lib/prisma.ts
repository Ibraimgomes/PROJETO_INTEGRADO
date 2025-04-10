// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Isso evita erros de redefinição de tipo no TypeScript
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // 👈 opcional: log de queries no dev
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
