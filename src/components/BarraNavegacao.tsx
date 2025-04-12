// components/BarraNavegacao.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function BarraNavegacao() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
      <div className="text-xl font-bold text-blue-600">TotalConect</div>

      {/* Menu desktop */}
      <ul className="hidden md:flex gap-6 text-gray-700">
        <li><Link href="/">CameTáOn</Link></li>
        <li><Link href="/totalconect">TotalConect</Link></li>
        <li><Link href="#planos">Planos</Link></li>
        <li><Link href="#contato">Contato</Link></li>
        <li><Link href="/login-cliente">Para Empresas</Link></li>
        <li><Link href="/login">Admin</Link></li>

      </ul>

      {/* Botão do menu mobile */}
      <button className="md:hidden" onClick={() => setMenuAberto(!menuAberto)}>
        {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 p-4 text-gray-700 z-50 md:hidden">
          <li><Link href="/" onClick={() => setMenuAberto(false)}>CameTáOn</Link></li>
          <li><Link href="/totalconect" onClick={() => setMenuAberto(false)}>TotalConect</Link></li>
          <li><Link href="#planos" onClick={() => setMenuAberto(false)}>Planos</Link></li>
          <li><Link href="#contato" onClick={() => setMenuAberto(false)}>Contato</Link></li>
          <li><Link href="/login-cliente">Cliente</Link></li>
          <li><Link href="/login">Admin</Link></li>

        </ul>
      )}
    </nav>
  );
}
