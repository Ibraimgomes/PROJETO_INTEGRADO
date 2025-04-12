import { Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Rodape() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">TotalConect</h2>
          <p className="text-sm text-gray-400 max-w-sm">
            Conectando negócios locais a clientes com soluções digitais práticas, personalizadas e eficazes.
          </p>
        </div>

        {/* Navegação + Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-2">Navegação</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white transition">Início</a></li>
              <li><a href="/total_conect#planos" className="hover:text-white transition">Planos</a></li>
              <li><a href="/total_conect#contato" className="hover:text-white transition">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Acesso</h3>
            <ul className="space-y-1">
              <li><a href="/login" className="hover:text-white transition">Área Admin</a></li>
              <li><a href="/login-cliente" className="hover:text-white transition">Área do Cliente</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Redes Sociais</h3>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/5599999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-12 px-4">
        &copy; {new Date().getFullYear()} TotalConect. Todos os direitos reservados.
      </div>
    </footer>
  )
}
