"use client";
import { Dispatch, SetStateAction } from "react";
import { Idioma } from "@/types/idioma";


interface Props {
  idiomas: readonly Idioma[];
  ativo: Idioma;
  setAtivo: Dispatch<SetStateAction<Idioma>>;
}



export default function LanguageSwitcher({ idiomas, ativo, setAtivo }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {idiomas.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`px-3 py-1 rounded border ${ativo === lang ? "bg-blue-600 text-white" : "bg-white"}`}
          onClick={() => setAtivo(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
