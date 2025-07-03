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

export default function Layout2Client({
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
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <LanguageSwitcher
        idiomas={idiomas}
        ativo={idiomaAtivo}
        setAtivo={setIdiomaAtivo}
      />

      <header className="bg-gray-800 p-8 shadow-md">
        <h1 className="text-4xl font-bold text-blue-400">{t.nome}</h1>
        <p className="mt-2 text-gray-300">{t.descricao}</p>
      </header>

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Serviços</h2>
        <p>{t.servicos}</p>
      </section>

      <footer className="p-8 bg-gray-800">
        <p>
          <strong>Contato:</strong> {prof.email} • {prof.phone}
        </p>
        <p className="mt-1">{t.endereco}</p>
      </footer>
    </main>
  );
}
