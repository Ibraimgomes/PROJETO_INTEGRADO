import Logo from "@/components/Logo";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Globe,
  Zap,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "ProfessionalPage • Conectando Profissionais ao Mundo",
  description:
    "Plataforma para criação de páginas profissionais multilíngues. Conecte-se com pacientes globalmente nas áreas de medicina, psicologia, nutrição e educação.",
};
//
export default function HomePage() {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilíngue",
      description: "Suporte completo para múltiplos idiomas",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Profissional",
      description: "Layouts otimizados para profissionais de saúde",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rápido",
      description: "Configure sua página em minutos",
    },
  ];

  const benefits = [
    "Interface intuitiva e moderna",
    "SEO otimizado para melhor visibilidade",
    "Responsivo em todos os dispositivos",
    "Integração com redes sociais",
    "Sistema de agendamento integrado",
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center space-y-8">
          <span className="inline-flex items-center px-6 py-3 rounded-full bg-primary/30 text-primary-200 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Plataforma confiável para profissionais
          </span>

          <Logo className="scale-125" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Conectando Profissionais ao Mundo
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Crie sua página profissional multilíngue em minutos <br />
            e amplie seu alcance globalmente.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            {/* 1️⃣  Redireciona direto para o Passo 1 do cadastro */}
            <Link
              href="/cadastro/step/1"
              className="group inline-flex items-center justify-center px-10 py-4 rounded-xl
                        bg-gradient-to-r from-accent to-yellow-400 text-gray-900 font-semibold
                        shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              Criar minha página
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Demonstração continua ancorando na própria página */}
            <a
              href="#layouts"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl
                        border border-slate-600 hover:border-accent text-slate-200 font-medium
                        hover:bg-slate-800 transition">
              Ver demonstração
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-slate-800/50 backdrop-blur flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Recursos Principais</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-center">
              Ferramentas poderosas para impulsionar sua presença profissional
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-14 lg:gap-20 justify-items-center">
            {features.map((f, i) => (
              <div
                key={i}
                className="w-72 flex flex-col items-center text-center p-8 rounded-2xl bg-slate-800 shadow-sm hover:shadow-md transition border border-slate-700 hover:border-slate-600 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary-300 mb-6">
                  {f.icon}
                </span>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYOUTS */}
      <section id="layouts" className="py-24 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Escolha seu Layout Ideal</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Templates profissionais para diferentes áreas
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14 xl:gap-20 justify-items-center max-w-6xl mx-auto">
            {[
              {
                name: "Layout Médico",
                desc: "Ideal para consultórios e clínicas",
                feats: ["Agenda integrada", "Área do paciente", "Histórico médico"],
                color: "from-blue-500 to-blue-600",
                icon: <Users className="w-10 h-10" />,
              },
              {
                name: "Layout Psicológico",
                desc: "Focado em terapia e bem-estar",
                feats: ["Sessões online", "Diário do paciente", "Recursos terapêuticos"],
                color: "from-purple-500 to-purple-600",
                icon: <Globe className="w-10 h-10" />,
              },
              {
                name: "Layout Educacional",
                desc: "Para educadores e instrutores",
                feats: ["Cursos online", "Material didático", "Progresso do aluno"],
                color: "from-green-500 to-green-600",
                icon: <Zap className="w-10 h-10" />,
              },
            ].map((l, idx) => (
              <div
                key={idx}
                className="w-80 group bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-slate-700 hover:border-slate-600 transform hover:-translate-y-1"
              >
                <div className={`w-full h-52 bg-gradient-to-br ${l.color} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                      {l.icon}
                    </div>
                    <p className="font-semibold">Preview em breve</p>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3">{l.name}</h3>
                  <p className="text-slate-400 mb-6">{l.desc}</p>

                  <ul className="space-y-3 mb-8">
                    {l.feats.map((ft) => (
                      <li key={ft} className="flex items-center text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        {ft}
                      </li>
                    ))}
                  </ul>

                  {/* <button className="w-full py-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition font-medium">
                    Escolher Layout
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-28 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Por que escolher o ProfessionalPage?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Benefícios que fazem a diferença na sua presença digital
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-12 lg:gap-6 justify-items-center">
            {benefits.map((b) => (
              <div
                key={b}
                className="w-80 h-15 flex items-center p-8 bg-slate-800 rounded-xl shadow-sm border border-slate-700 hover:border-slate-600 transition"
              >
                <CheckCircle className="w-6 h-6 text-accent mr-4" />
                <span className="text-slate-300 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-slate-950 text-slate-400 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Logo showText />
            <p className="text-slate-500 max-w-2xl mx-auto">
              Conectando profissionais ao mundo através de páginas multilíngues
              elegantes e funcionais.
            </p>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-sm">
                © {new Date().getFullYear()} ProfessionalPage. Todos os direitos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
