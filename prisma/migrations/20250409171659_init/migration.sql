-- CreateTable
CREATE TABLE "Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imagem" TEXT NOT NULL
);
