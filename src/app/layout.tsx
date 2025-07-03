// src/app/layout.tsx
export const metadata = {
  title: "Projeto Integrado",
  description: "Profissionais multilíngues",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
