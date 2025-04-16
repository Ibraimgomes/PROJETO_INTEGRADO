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
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
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
  instagram,
  whatsapp,
  facebook,
}: Parceiro) {
  const [expandir, setExpandir] = useState(false);
  const caminhoImagem = imagem.startsWith('http') ? imagem : `/logos/${imagem}`;

  return (
    <motion.div
      className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-2xl p-6 shadow-[12px_12px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => setExpandir(!expandir)}
      onMouseEnter={() => setExpandir(true)}
      onMouseLeave={() => setExpandir(false)}
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

        {/* Redes sociais */}
        <div className="flex justify-center gap-3 mt-4">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-blue-100 transition"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1..." />
              </svg>
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-blue-100 transition"
            >
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.91 11.91..." />
              </svg>
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-blue-100 transition"
            >
              <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.67 0H1.33C.6 0 0..." />
              </svg>
            </a>
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
