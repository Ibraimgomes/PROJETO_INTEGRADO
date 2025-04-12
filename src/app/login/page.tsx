'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      senha
    })

    if (res?.ok) {
      router.push('/admin')
    } else {
      setErro('E-mail ou senha incorretos teste.')
    }
  }

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">TESTE V2</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Senha"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Entrar
        </button>
        {erro && <p className="text-red-600 mt-2">{erro}</p>}
      </form>
    </main>
  )
}
