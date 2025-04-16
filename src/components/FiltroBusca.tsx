'use client';

import { useState } from "react";

interface FiltroBuscaProps {
    busca: string;
    setBusca: (valor: string) => void;
}

const categorias = [
    "Todos", "Restaurante", "Mercado", "Auto", "Tecnologia",
    "Padaria", "Barbearia", "Moda", "Serviços", "Pet Shop", "Educação"
];

export default function FiltroBusca({ busca, setBusca }: FiltroBuscaProps) {
    const [foco, setFoco] = useState("");

    return (
        <div className="bg-white text-gray-800 py-8 px-6 flex flex-col items-center gap-6">
            <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome ou categoria..."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex flex-wrap justify-center gap-2">
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setBusca(cat);
                            setFoco(cat);
                        }}
                        className={`px-4 py-2 rounded-full border font-medium transition 
              ${foco === cat ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-100"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
