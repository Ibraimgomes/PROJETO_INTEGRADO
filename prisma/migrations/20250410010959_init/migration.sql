/*
  Warnings:

  - Added the required column `clienteId` to the `Loja` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "visivel" BOOLEAN NOT NULL DEFAULT true,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Loja_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loja" ("categoria", "descricao", "id", "imagem", "link", "nome", "visivel") SELECT "categoria", "descricao", "id", "imagem", "link", "nome", "visivel" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
