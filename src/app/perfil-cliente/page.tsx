'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilCliente() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login-cliente')
    } else if (session?.user.role !== 'cliente') {
      router.push('/')
    }
  }, [status, session])

  if (status === 'loading') return <p className="text-center mt-10">Carregando perfil...</p>

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Meu Perfil</h1>

      <div className="space-y-2">
        <p><strong>Nome:</strong> {session?.user.name}</p>
        <p><strong>Email:</strong> {session?.user.email}</p>
        <p><strong>Função:</strong> {session?.user.role}</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/login-cliente' })}
        className="mt-6 text-red-600 underline"
      >
        Sair da conta
      </button>
    </main>
  )
}
