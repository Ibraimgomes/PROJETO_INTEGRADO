// components/Beneficios.tsx
const beneficios = [
  { titulo: "Agendamentos Online", icone: "📅" },
  { titulo: "WhatsApp Integrado", icone: "💬" },
  { titulo: "Boletos Automáticos", icone: "💸" },
  { titulo: "Sites Personalizados", icone: "🌐" },
];

export default function Beneficios() {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-12">Benefícios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {beneficios.map((beneficio, indice) => (
          <div key={indice} className="p-6 border rounded-xl shadow hover:shadow-md">
            <div className="text-4xl mb-4">{beneficio.icone}</div>
            <h3 className="text-lg font-semibold text-gray-700">{beneficio.titulo}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
