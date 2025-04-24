'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import HeroCameTaOn from "@/components/HeroCameTaOn";
import FiltroBusca from "../components/FiltroBusca";


import Rodape from "@/components/Rodape";
import CardParceiro from "@/components/CardParceiro";

interface Loja {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  link: string;
  imagem: string;
}

const categorias = [
  "Todos", "Restaurante", "Mercado", "Auto", "Tecnologia",
  "Padaria", "Barbearia", "Moda", "Serviços", "Pet Shop", "Educação"
];

export default function PaginaPrincipalCametaOn() {
  const [busca, setBusca] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [lojas, setLojas] = useState<Loja[]>([]);

  useEffect(() => {
    async function carregarLojas() {
      try {
        const res = await fetch("/api/lojas");
        if (!res.ok) {
          console.error("Erro na resposta da API:", res.status);
          setLojas([]);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setLojas(data);
        } else {
          console.error("Resposta inesperada:", data);
          setLojas([]);
        }
      } catch (erro) {
        console.error("Erro ao buscar lojas:", erro);
        setLojas([]);
      }
    }

    carregarLojas();
  }, []);

  const lojasFiltradas = Array.isArray(lojas)
    ? lojas.filter((p) => {
      if (busca === "" || busca.toLowerCase() === "todos") return true;
      return (
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busca.toLowerCase())
      );
    })
    : [];

  const quantidadeVisivel = 9;
  const lojasExibidas = mostrarTodos
    ? lojasFiltradas
    : lojasFiltradas.slice(0, quantidadeVisivel);

  return (
    <main className="bg-[#111] text-white">
      <BarraNavegacao />

      <HeroCameTaOn />
      <FiltroBusca busca={busca} setBusca={setBusca} />

      {/* Seção de lojas com fundo branco */}
      <section className="bg-white text-gray-800 py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-colors">
        {lojasExibidas.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            Nenhum parceiro encontrado.
          </p>
        ) : (
          lojasExibidas.map((loja) => (
            <CardParceiro
              key={loja.id}
              nome={loja.nome}
              descricao={loja.descricao}
              link={loja.link}
              imagem={loja.imagem}
              categoria={loja.categoria}
              avaliacao={4.5}
              distancia=""
            />
          ))
        )}
      </section>

      {lojasFiltradas.length > quantidadeVisivel && (
        <div className="text-center mb-12 bg-white py-4">
          <button
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 font-semibold rounded transition"
          >
            {mostrarTodos ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      )}

      <section className="bg-white text-gray-800 py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-16">
        <img
          src="/img/sejaMembro.PNG"
          alt="Ilustração convite para parceiros"
          className="w-64 md:w-80 rounded shadow-md"
        />
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Impulsione sua marca com o CameTáOn
          </h2>
          <p className="text-gray-600 mb-6">
            Cadastre seu negócio e seja encontrado por novos clientes da sua região.
          </p>
          <a
            href="/totalconect"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Saiba mais
          </a>
        </div>
      </section>











      <Rodape />
    </main>
  );
}
