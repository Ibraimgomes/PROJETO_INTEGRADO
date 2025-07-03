"use client";

import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Idioma } from "@/types/idioma";

interface ProfissionalComTrad {
  id: string;
  email: string;
  phone: string;
  translations: {
    language: Idioma;
    nome: string;
    descricao: string;
    servicos: string;
    endereco: string;
  }[];
}

export default function Layout3Client({
  prof,
  idiomas,
}: {
  prof: ProfissionalComTrad;
  idiomas: Idioma[];
}) {
  const [idiomaAtivo, setIdiomaAtivo] = useState<Idioma>("PT");
  const t =
    prof.translations.find((tr) => tr.language === idiomaAtivo) ??
    prof.translations[0];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6 space-y-4">
        <LanguageSwitcher
          idiomas={idiomas}
          ativo={idiomaAtivo}
          setAtivo={setIdiomaAtivo}
        />
        <div>
          <h1 className="text-2xl font-bold">{t.nome}</h1>
          <p className="mt-1 text-sm">{t.descricao}</p>
        </div>
        <div className="mt-auto text-sm">
          <p>{prof.email}</p>
          <p>{prof.phone}</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Serviços</h2>
        <p className="mb-8">{t.servicos}</p>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-medium mb-2">Endereço</h3>
          <p>{t.endereco}</p>
        </div>
      </main>
    </div>
  );
}
