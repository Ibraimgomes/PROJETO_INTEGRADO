'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const beneficios = [
  {
    titulo: "Presença online em uma única plataforma",
    descricao: "Seu negócio conectado em um só lugar com agendamentos, WhatsApp, boletos e muito mais.",
    icone: "/icones/plataforma.svg",
  },
  {
    titulo: "Economia de tempo",
    descricao: "Otimize sua operação com soluções integradas e ganhe mais produtividade e controle.",
    icone: "/icones/tempo.svg",
  },
  {
    titulo: "Gestão simplificada",
    descricao: "Gerencie seus atendimentos, pedidos e presença digital com facilidade.",
    icone: "/icones/gestao.svg",
  },
  {
    titulo: "Comunicação direta com o cliente",
    descricao: "WhatsApp integrado, notificações e automações para fidelizar clientes.",
    icone: "/icones/whatsapp.svg",
  },
]

const sliderImagens = [
  '/exemplos/site1.png',
  '/exemplos/site2.png',
  '/exemplos/site3.png',
  '/exemplos/site4.png'
]

export default function Beneficios() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <section className="py-20 bg-white px-4" id="vantagens">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          É bom para o seu negócio
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Carrossel lateral de imagens */}
          <div className="order-2 lg:order-1">
            <Slider {...settings}>
              {sliderImagens.map((src, index) => (
                <div key={index} className="px-4">
                  <Image
                    src={src}
                    alt={`Site ${index + 1}`}
                    width={800}
                    height={450}
                    className="rounded-xl shadow-md mx-auto"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Lista de vantagens */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {beneficios.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Image src={item.icone} alt={item.titulo} width={40} height={40} />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">
                      {item.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
