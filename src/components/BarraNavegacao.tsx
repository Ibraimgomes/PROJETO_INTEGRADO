'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function BarraNavegacao() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [mostrarNav, setMostrarNav] = useState(true)
  const [scrollAnterior, setScrollAnterior] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollAtual = window.scrollY
      setMostrarNav(scrollAtual < scrollAnterior || scrollAtual < 50)
      setScrollAnterior(scrollAtual)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollAnterior])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${mostrarNav ? 'translate-y-0' : '-translate-y-full'
        } bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900"
        >
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          TotalConect
        </Link>

        <ul className="hidden md:flex gap-8 text-base font-medium text-gray-800">
          <li><Link href="/" className="hover:text-blue-600 transition">CameTáOn</Link></li>
          <li><Link href="/total_conect" className="hover:text-blue-600 transition">TotalConect</Link></li>
          <li><Link href="/total_conect#planos" className="hover:text-blue-600 transition">Planos</Link></li>
          <li><Link href="/total_conect#contato" className="hover:text-blue-600 transition">Contato</Link></li>
          <li><Link href="/login-cliente" className="hover:text-blue-600 transition">Para Empresas</Link></li>
          <li><Link href="/login" className="hover:text-blue-600 transition">Admin</Link></li>
        </ul>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {menuAberto && (
        <ul className="md:hidden bg-white/90 backdrop-blur-md px-6 py-6 flex flex-col gap-4 text-base font-medium text-gray-800 transition-all border-t border-gray-200">
          <li><Link href="/" onClick={() => setMenuAberto(false)}>CameTáOn</Link></li>
          <li><Link href="/total_conect" onClick={() => setMenuAberto(false)}>TotalConect</Link></li>
          <li><Link href="/total_conect#planos" onClick={() => setMenuAberto(false)}>Planos</Link></li>
          <li><Link href="/total_conect#contato" onClick={() => setMenuAberto(false)}>Contato</Link></li>
          <li><Link href="/login-cliente" onClick={() => setMenuAberto(false)}>Para Empresas</Link></li>
          <li><Link href="/login" onClick={() => setMenuAberto(false)}>Admin</Link></li>
        </ul>
      )}
    </nav>
  )
}
