'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Instagram, Facebook, Phone, Globe } from 'lucide-react';

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
  site?: string;
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
  site,
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
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-pink-100 transition"
            >
              <Instagram className="w-5 h-5 text-pink-500" />
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-green-100 transition"
            >
              <Phone className="w-5 h-5 text-green-600" />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-blue-100 transition"
            >
              <Facebook className="w-5 h-5 text-blue-700" />
            </a>
          )}
          {site && (
            <a
              href={site}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#f0f2f5] flex items-center justify-center hover:bg-gray-200 transition"
            >
              <Globe className="w-5 h-5 text-gray-700" />
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
