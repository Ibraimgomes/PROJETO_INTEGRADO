'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export interface Parceiro {
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

export default function CardParceiro({
  nome,
  descricao,
  link,
  imagem = 'placeholder.jpg',
  avaliacao = 4.6,
  categoria = 'Serviços',
  distancia = '1.2 km',
}: Parceiro) {
  const caminhoImagem = imagem.startsWith('http') ? imagem : `/logos/${imagem}`;
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full max-w-xs h-[320px] bg-white rounded-[32px] p-1 shadow-[0_70px_30px_-50px_#cbd5e1] transition-all duration-500 group overflow-hidden"
    >
      {/* Botão de ação (ex: email ou link) */}
      <button className="absolute top-4 right-4 bg-transparent z-20">
        <Mail className="w-5 h-5 text-pink-400 hover:text-pink-600 transition" />
      </button>

      {/* Imagem de perfil/loja */}
      <div
        className={`absolute w-[calc(100%-8px)] h-[calc(100%-8px)] top-1 left-1 rounded-[29px] border transition-all duration-500 overflow-hidden ${hover
            ? 'w-[100px] h-[100px] top-3 left-3 z-30 rounded-full border-4 border-pink-300'
            : 'z-10 border-transparent'
          }`}
      >
        <img
          src={caminhoImagem}
          alt={`Logo de ${nome}`}
          className={`object-cover w-full h-full transition-all duration-500 ${hover ? 'scale-150 object-top' : ''
            }`}
        />
      </div>

      {/* Área inferior que sobe no hover */}
      <div
        className={`absolute left-1 right-1 bg-pink-300 bottom-1 rounded-[29px] z-20 transition-all duration-500 shadow-inner ${hover ? 'top-[90px] rounded-t-[80px]' : 'top-[82%]'
          }`}
      >
        <div className="px-6 pt-4 pb-3 text-white">
          <span className="block font-bold text-lg truncate">{nome}</span>
          <span className="block text-sm mt-1">{descricao}</span>

          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex gap-3 items-center">
              <span className="font-bold">★ {avaliacao.toFixed(1)}</span>
              <span>{categoria}</span>
              <span>{distancia}</span>
            </div>
            <a
              href={link}
              target="_blank"
              className="bg-white text-pink-500 text-[10px] px-3 py-1 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition"
            >
              Ver mais
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
