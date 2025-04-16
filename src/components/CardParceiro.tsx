'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Parceiro {
  nome: string;
  descricao: string;
  link: string;
  imagem?: string;
  avaliacao?: number;
  categoria?: string;
  distancia?: string;
  tempo?: string;
  taxa?: string;
  destaque?: string;
}

export default function CardParceiroGlass({
  nome,
  descricao,
  link,
  imagem = 'placeholder.jpg',
  avaliacao = 4.6,
  categoria = 'Serviços',
  distancia = '1.2 km',
  tempo,
  taxa,
  destaque,
}: Parceiro) {
  const [expandir, setExpandir] = useState(false);
  const caminhoImagem = imagem.startsWith('http') ? imagem : `/logos/${imagem}`;

  return (
    <motion.div
      className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-2xl p-6 shadow-[12px_12px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => setExpandir(!expandir)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={caminhoImagem}
            alt={`Logo de ${nome}`}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800">{nome}</h3>
          <p className="text-sm text-gray-500 mb-2">{categoria} • {distancia}</p>
          <p className="text-sm text-blue-700 font-semibold mb-2">★ {avaliacao.toFixed(1)}</p>

          {expandir && (
            <motion.div
              className="text-sm text-gray-700 mt-2 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {destaque && <p className="font-semibold text-blue-500">📌 {destaque}</p>}
              <p>{descricao}</p>
              {tempo && <p>⏱ Tempo estimado: {tempo}</p>}
              {taxa && <p>💰 Taxa: {taxa}</p>}
            </motion.div>
          )}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Ver mais
        </a>
      </div>
    </motion.div>
  );
}
