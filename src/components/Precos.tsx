// components/Precos.tsx
const planos = [
  {
    nome: "Básico",
    preco: "R$29/mês",
    recursos: ["Site com domínio personalizado", "Integração com WhatsApp"],
  },
  {
    nome: "Pro",
    preco: "R$59/mês",
    recursos: ["Tudo do Básico", "Agendamentos", "Notificações por WhatsApp"],
  },
  {
    nome: "Premium",
    preco: "R$99/mês",
    recursos: ["Tudo do Pro", "Boletos automáticos", "Análises mensais"],
  },
];

export default function Precos() {
  return (
    <section id="planos" className="py-16 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-12">Planos</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {planos.map((plano, indice) => (
          <div key={indice} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{plano.nome}</h3>
            <p className="text-blue-600 text-2xl font-semibold mb-4">{plano.preco}</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plano.recursos.map((recurso, idx) => (
                <li key={idx}>✔️ {recurso}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Assinar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
