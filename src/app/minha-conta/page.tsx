'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MinhaConta() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Se não estiver logado, redireciona pro login do cliente
    if (status === 'unauthenticated') {
      router.push('/login-cliente')
    }

    // Se estiver logado mas não for cliente, redireciona pra home
    if (status === 'authenticated' && session?.user.role !== 'cliente') {
      router.push('/')
    }
  }, [status, session])

  if (status === 'loading') return <p className="text-center mt-10">Verificando sessão...</p>

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Olá, {session?.user.name}!</h1>
      <p className="text-gray-700">Bem-vindo à sua área de cliente.</p>

      {/* Aqui você pode listar pedidos, perfil, histórico etc */}
    </main>
  )
}
