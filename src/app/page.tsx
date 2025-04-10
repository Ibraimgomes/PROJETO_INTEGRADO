'use client';

import { useState, useEffect } from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import HeroCameTaOn from "@/components/HeroCameTaOn";
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
  "Todos", "Beleza", "Saúde", "Restaurante", "Mercado", "Auto", "Tecnologia",
  "Padaria", "Barbearia", "Moda", "Serviços", "Pet Shop", "Educação"
];

export default function PaginaPrincipalCametaOn() {
  const [busca, setBusca] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [lojas, setLojas] = useState<Loja[]>([]);

  // 🔄 Carrega as lojas da API com verificação extra de segurança
  useEffect(() => {
    async function carregarLojas() {
      try {
        const res = await fetch("/api/lojas");

        // Evita erro se o status não for 200
        if (!res.ok) {
          console.error("Erro na resposta da API:", res.status);
          setLojas([]);
          return;
        }

        const data = await res.json();

        // Garante que só aceita array
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

  // ✅ Protege o uso do .filter() contra valores inválidos
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
    <main>
      <BarraNavegacao />
      <HeroCameTaOn aoBuscar={(texto) => setBusca(texto)} categorias={categorias} />

      <section className="py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lojasExibidas.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
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
        <div className="text-center mb-12">
          <button
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="bg-blue-700 hover:bg-blue-800 font-semibold underline text-white px-4 py-2 rounded"
          >
            {mostrarTodos ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      )}

      <section className="py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-16">
        <img
          src="/img/sejaMembro.PNG"
          alt="Ilustração convite para parceiros"
          className="w-64 md:w-80"
        />
        <div className="max-w-sm text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Impulsione sua marca com o CameTáOn
          </h2>
          <p className="text-gray-600 mb-6">
            Cadastre seu negócio e seja encontrado por novos clientes da sua região.
          </p>
          <a
            href="/totalconect"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Saiba mais
          </a>
        </div>
      </section>

      <Rodape />
    </main>
  );
}
