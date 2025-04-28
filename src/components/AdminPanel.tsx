// File: src/components/AdminPanel.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Importa MapaEndereco sem SSR
const MapaEndereco = dynamic(() => import('@/components/MapaEndereco'), { ssr: false })

const modoVisual = process.env.NEXT_PUBLIC_MODO_VISUAL === '1'

interface Loja {
  id: number
  nome: string
  descricao: string
  categoria: string
  link: string
  imagem: string
  visivel: boolean
  endereco?: string
  horarioFuncionamento?: string
}

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formulario, setFormulario] = useState<Partial<Loja> & {
    clienteNome?: string
    clienteEmail?: string
    clienteSenha?: string
  }>({})
  const [lojas, setLojas] = useState<Loja[]>([])
  const [modoEdicao, setModoEdicao] = useState<number | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [confirmarExcluirId, setConfirmarExcluirId] = useState<number | null>(null)

  useEffect(() => {
    if (!modoVisual) {
      if (status === 'unauthenticated') {
        router.push('/login')
        return
      }
      if (session?.user.role !== 'admin') {
        router.push('/')
        return
      }
    }
    if (status === 'authenticated' || modoVisual) carregarLojas()
  }, [status, session, router])

  async function carregarLojas() {
    try {
      const res = await fetch('/api/lojas?admin=true')
      const data = await res.json()
      if (Array.isArray(data)) setLojas(data)
      else setMensagem('Erro ao carregar lojas.')
    } catch {
      setMensagem('Erro de rede ao carregar lojas.')
    }
  }

  function atualizarCampo(campo: string, valor: string) {
    setFormulario(prev => ({ ...prev, [campo]: valor }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogo(file)
    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(formulario).forEach(([k, v]) => v && formData.append(k, v.toString()))
    formData.append('visivel', 'true')
    if (logo) formData.append('logo', logo)

    try {
      const res = await fetch('/api/lojas', { method: modoEdicao ? 'PUT' : 'POST', body: formData })
      if (!res.ok) throw new Error()
      setMensagem(modoEdicao ? 'Loja atualizada!' : 'Loja criada!')
      setFormulario({})
      setLogo(null)
      setLogoPreview(null)
      setModoEdicao(null)
      carregarLojas()
    } catch {
      setMensagem('Erro ao salvar loja.')
    }
  }

  async function toggleVisibilidade(id: number, visivel: boolean) {
    await fetch(`/api/lojas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visivel }),
    })
    carregarLojas()
  }

  function confirmarExcluir(id: number) {
    setConfirmarExcluirId(id)
  }

  async function excluirLoja(id: number) {
    await fetch(`/api/lojas/${id}`, { method: 'DELETE' })
    setConfirmarExcluirId(null)
    carregarLojas()
  }

  function startEdit(store: Loja) {
    setModoEdicao(store.id)
    setFormulario({
      nome: store.nome,
      descricao: store.descricao,
      categoria: store.categoria,
      link: store.link,
      endereco: store.endereco || '',
      horarioFuncionamento: store.horarioFuncionamento || '',
      clienteNome: session?.user.name,
      clienteEmail: session?.user.email,
    })
    setLogoPreview(`/logos/${store.imagem}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <header className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Logado como: <strong>{session?.user?.name || 'Modo Visual'}</strong>
          </p>
          {!modoVisual && (
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 hover:underline text-sm">
              Sair
            </button>
          )}
        </header>

        {/* Formulário e lista de lojas */}
      </div>
    </main>
  )
}
