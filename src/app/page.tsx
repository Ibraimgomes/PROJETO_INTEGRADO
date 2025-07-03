// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center">
        Projeto Integrado I – Cadastro de Profissionais
      </h1>

      <Link
        href="/cadastro"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Ir para Cadastro
      </Link>
    </main>
  );
}
