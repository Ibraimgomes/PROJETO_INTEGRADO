//src/app/layout.tsx
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "ProfessionalPage • Conectando Profissionais ao Mundo",
  description: "Plataforma para criação de páginas profissionais multilíngues. Conecte-se com pacientes globalmente nas áreas de medicina, psicologia, nutrição e educação.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="dark scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
