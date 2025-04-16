'use client';

interface FiltroBuscaProps {
    busca: string;
    setBusca: (valor: string) => void;
}

const categorias = [
    "Todos", "Restaurante", "Mercado", "Auto", "Tecnologia",
    "Padaria", "Barbearia", "Moda", "Serviços", "Pet Shop", "Educação"
];

export default function FiltroBusca({ busca, setBusca }: FiltroBuscaProps) {
    return (
        <section className="bg-[#111] text-white py-10 px-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar por nome ou categoria..."
                    className="w-full px-4 py-3 border border-gray-700 bg-[#1a1a1a] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <div className="flex flex-wrap justify-center gap-2">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setBusca(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition 
                ${busca === cat
                                    ? "bg-blue-700 text-white border-blue-700"
                                    : "bg-[#222] text-gray-300 border-gray-600 hover:bg-blue-800 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
