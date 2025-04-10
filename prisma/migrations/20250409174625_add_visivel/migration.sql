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
    "visivel" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Loja" ("categoria", "descricao", "id", "imagem", "link", "nome") SELECT "categoria", "descricao", "id", "imagem", "link", "nome" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
