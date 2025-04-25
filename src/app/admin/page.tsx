'use client'

export const dynamic = 'force-dynamic'




import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BarraNavegacao from '@/components/BarraNavegacao'
import MapaEndereco from '@/components/MapaEndereco'

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

export default function PaginaAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formulario, setFormulario] = useState<Partial<Loja> & {
    clienteNome?: string
    clienteEmail?: string
    clienteSenha?: string
  }>({})
  const [lojas, setLojas] = useState<Loja[]>([])
  const [modoEdicao, setModoEdicao] = useState<null | number>(null)
  const [mensagem, setMensagem] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

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

    if (status === 'authenticated' || modoVisual) {
      carregarLojas()
    }
  }, [status, session])

  async function carregarLojas() {
    try {
      const res = await fetch("/api/lojas?admin=true")
      const data = await res.json()
      if (Array.isArray(data)) setLojas(data)
      else setMensagem("Erro ao carregar lojas.")
    } catch {
      setMensagem("Erro ao conectar com o servidor.")
    }
  }

  function atualizarCampo(campo: string, valor: string) {
    setFormulario((dados) => ({ ...dados, [campo]: valor }))
  }

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(formulario).forEach(([key, val]) => {
      if (val) formData.append(key, val.toString())
    })
    formData.append('visivel', 'true')
    if (logo) formData.append('logo', logo)

    try {
      const res = await fetch('/api/lojas', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error()

      setMensagem("Loja salva com sucesso!")
      setFormulario({})
      setLogo(null)
      setLogoPreview(null)
      setModoEdicao(null)
      carregarLojas()
    } catch {
      setMensagem("Erro ao salvar loja.")
    }
  }

  async function ocultarLoja(id: number) {
    await fetch(`/api/lojas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visivel: false })
    })
    carregarLojas()
  }

  async function reativarLoja(id: number) {
    await fetch(`/api/lojas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visivel: true })
    })
    carregarLojas()
  }

  async function excluirLoja(id: number) {
    if (confirm("Tem certeza que deseja excluir esta loja?")) {
      await fetch(`/api/lojas/${id}`, { method: "DELETE" })
      carregarLojas()
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <header className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Logado como: <strong>{session?.user?.name || 'Modo Visual'}</strong>
          </p>
          {!modoVisual && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-600 hover:underline text-sm"
            >
              Sair
            </button>
          )}
        </header>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            {modoEdicao ? "Editar Loja" : "Cadastrar Nova Loja"}
          </h1>

          {mensagem && (
            <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">
              {mensagem}
            </div>
          )}

          <form onSubmit={enviarFormulario} className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Nome" value={formulario.nome || ""} onChange={(e) => atualizarCampo("nome", e.target.value)} className="input" required />
            <input type="text" placeholder="Descrição" value={formulario.descricao || ""} onChange={(e) => atualizarCampo("descricao", e.target.value)} className="input" required />
            <input type="text" placeholder="Categoria" value={formulario.categoria || ""} onChange={(e) => atualizarCampo("categoria", e.target.value)} className="input" required />
            <input type="url" placeholder="Link do site" value={formulario.link || ""} onChange={(e) => atualizarCampo("link", e.target.value)} className="input" required />

            <MapaEndereco
              endereco={formulario.endereco || ''}
              setEndereco={(valor) => atualizarCampo('endereco', valor)}
            />


            <input type="text" placeholder="Horário de funcionamento" value={formulario.horarioFuncionamento || ""} onChange={(e) => atualizarCampo("horarioFuncionamento", e.target.value)} className="input sm:col-span-2" required />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setLogo(file)
                  setLogoPreview(URL.createObjectURL(file))
                }
              }}
              className="sm:col-span-2"
            />
            {logoPreview && <img src={logoPreview} alt="Preview" className="w-32 rounded shadow mt-2" />}

            <input type="text" placeholder="Nome do cliente" value={formulario.clienteNome || ""} onChange={(e) => atualizarCampo("clienteNome", e.target.value)} className="input" required />
            <input type="email" placeholder="Email do cliente" value={formulario.clienteEmail || ""} onChange={(e) => atualizarCampo("clienteEmail", e.target.value)} className="input" required />

            {!modoVisual && (
              <input type="password" placeholder="Senha do cliente" value={formulario.clienteSenha || ""} onChange={(e) => atualizarCampo("clienteSenha", e.target.value)} className="input sm:col-span-2" required />
            )}

            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">
              {modoEdicao ? "Atualizar Loja" : "Cadastrar Loja"}
            </button>
          </form>
        </div>

        {/* Lista */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lojas Cadastradas</h2>
          {lojas.length === 0 ? (
            <p className="text-gray-500">Nenhuma loja cadastrada ainda.</p>
          ) : (
            lojas.map((loja) => (
              <div key={loja.id} className={`p-4 border rounded-xl shadow-sm ${!loja.visivel ? 'bg-red-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold">{loja.nome}</h3>
                    <p className="text-sm text-gray-600">{loja.descricao}</p>
                    <p className="text-xs text-blue-600">{loja.link}</p>
                    {loja.endereco && <p className="text-sm text-gray-700 mt-1">📍 {loja.endereco}</p>}
                    {loja.horarioFuncionamento && <p className="text-sm text-gray-600 italic">🕒 {loja.horarioFuncionamento}</p>}
                    {!loja.visivel && <span className="text-red-500 font-semibold block mt-1">[Loja Oculta]</span>}
                    {loja.imagem && (
                      <img src={`/logos/${loja.imagem}`} alt="Logo" className="w-16 mt-2 rounded" />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm">
                    <button onClick={() => setModoEdicao(loja.id)} className="text-yellow-600 hover:underline">Editar</button>
                    <button
                      onClick={() => loja.visivel ? ocultarLoja(loja.id) : reativarLoja(loja.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {loja.visivel ? "Ocultar" : "Reativar"}
                    </button>
                    <button onClick={() => excluirLoja(loja.id)} className="text-red-600 hover:underline">Excluir</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
