// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Evita múltiplas instâncias em hot-reload no dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // opcional: log de queries em dev
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
