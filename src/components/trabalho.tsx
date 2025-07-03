// File: src/components/AdminPanel.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Carrega o componente de mapa apenas no cliente (não SSR)
const MapaEndereco = dynamic(() => import('./MapaEndereco'), { ssr: false })

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
    // Aguarda carregamento da sessão
    if (status === 'loading') return

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

    // Carrega lojas após validações
    carregarLojas()
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
      const method = modoEdicao ? 'PUT' : 'POST'
      const url = modoEdicao ? `/api/lojas/${modoEdicao}` : '/api/lojas'
      const res = await fetch(url, { method, body: formData })
      if (!res.ok) throw new Error()
      setMensagem(modoEdicao ? 'Loja atualizada com sucesso!' : 'Loja criada com sucesso!')
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
    setLogoPreview(store.imagem.startsWith('data:') ? store.imagem : `/logos/${store.imagem}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <header className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Logado como: <strong>{session?.user.name || 'Modo Visual'}</strong>
          </p>
          {!modoVisual && (
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 hover:underline text-sm">
              Sair
            </button>
          )}
        </header>

        <section className="bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            {modoEdicao ? 'Editar Loja' : 'Cadastrar Nova Loja'}
          </h1>
          {mensagem && <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">{mensagem}</div>}
          <form onSubmit={enviarFormulario} className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Nome" value={formulario.nome || ''} onChange={e => atualizarCampo('nome', e.target.value)} className="input" required />
            <input type="text" placeholder="Descrição" value={formulario.descricao || ''} onChange={e => atualizarCampo('descricao', e.target.value)} className="input" required />
            <input type="text" placeholder="Categoria" value={formulario.categoria || ''} onChange={e => atualizarCampo('categoria', e.target.value)} className="input" required />
            <input type="url" placeholder="Link do site" value={formulario.link || ''} onChange={e => atualizarCampo('link', e.target.value)} className="input" required />
            <MapaEndereco endereco={formulario.endereco || ''} setEndereco={v => atualizarCampo('endereco', v)} />
            <input type="text" placeholder="Horário" value={formulario.horarioFuncionamento || ''} onChange={e => atualizarCampo('horarioFuncionamento', e.target.value)} className="input sm:col-span-2" required />
            <input type="file" accept="image/*" onChange={handleFileChange} className="sm:col-span-2" />
            {logoPreview && <Image src={logoPreview} alt="Preview" width={128} height={128} className="rounded shadow mt-2" />}
            <input type="text" placeholder="Nome do cliente" value={formulario.clienteNome || ''} onChange={e => atualizarCampo('clienteNome', e.target.value)} className="input" required />
            <input type="email" placeholder="Email do cliente" value={formulario.clienteEmail || ''} onChange={e => atualizarCampo('clienteEmail', e.target.value)} className="input" required />
            {!modoVisual && <input type="password" placeholder="Senha do cliente" value={formulario.clienteSenha || ''} onChange={e => atualizarCampo('clienteSenha', e.target.value)} className="input sm:col-span-2" required />}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">{modoEdicao ? 'Atualizar' : 'Cadastrar'}</button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lojas Cadastradas</h2>
          {lojas.length === 0 ? (
            <p className="text-gray-500">Nenhuma loja cadastrada.</p>
          ) : (
            lojas.map(store => (
              <div key={store.id} className={`p-4 border rounded-xl shadow-sm ${!store.visivel ? 'bg-red-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold">{store.nome}</h3>
                    <p className="text-sm text-gray-600">{store.descricao}</p>
                    <p className="text-xs text-blue-600">{store.link}</p>
                    {store.endereco && <p className="text-sm text-gray-700 mt-1">📍 {store.endereco}</p>}
                    {store.horarioFuncionamento && <p className="text-sm text-gray-600 italic">🕒 {store.horarioFuncionamento}</p>}
                    {!store.visivel && <span className="text-red-500 font-semibold block mt-1">[Oculta]</span>}
                    {store.imagem && <Image src={`/logos/${store.imagem}`} alt="Logo" width={64} height={64} className="rounded mt-2" />}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm">
                    <button onClick={() => startEdit(store)} className="text-yellow-600 hover:underline">Editar</button>
                    <button onClick={() => toggleVisibilidade(store.id, !store.visivel)} className="text-blue-600 hover:underline">{store.visivel ? 'Ocultar' : 'Reativar'}</button>
                    <button onClick={() => confirmarExcluir(store.id)} className="text-red-600 hover:underline">Excluir</button>
                  </div>
                </div>
                {confirmarExcluirId === store.id && (
                  <div className="mt-2 p-4 bg-red-100 rounded">
                    <p>Tem certeza que deseja excluir?</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => excluirLoja(store.id)} className="bg-red-600 text-white px-3 py-1 rounded">Sim</button>
                      <button onClick={() => setConfirmarExcluirId(null)} className="px-3 py-1 rounded border">Não</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}

