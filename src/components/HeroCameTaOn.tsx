// components/HeroCameTaOn.tsx
import { useState } from "react";
import { Search } from "lucide-react";

interface HeroCameTaOnProps {
  aoBuscar: (texto: string) => void;
  categorias: string[];
}

export default function HeroCameTaOn({ aoBuscar, categorias }: HeroCameTaOnProps) {
  const [textoBusca, setTextoBusca] = useState("");

  function buscar(valor: string) {
    setTextoBusca(valor);
    aoBuscar(valor);
  }

  return (
    <section className="relative bg-white py-20 px-4 text-center overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        TESTE
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
        Agende serviços, conheça lojas e fale direto com comércios da sua região
      </p>

      <div className="flex justify-center items-center gap-2 max-w-xl mx-auto mb-8">
        <div className="flex items-center w-full bg-gray-100 px-4 py-3 rounded-lg border focus-within:ring-2 focus-within:ring-blue-300">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nome ou categoria"
            value={textoBusca}
            onChange={(e) => buscar(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg font-semibold"
          onClick={() => aoBuscar(textoBusca)}
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categorias.map((categoria, i) => (
          <span
            key={i}
            onClick={() => buscar(categoria)}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            {categoria}
          </span>
        ))}
      </div>
    </section>
  );
}
