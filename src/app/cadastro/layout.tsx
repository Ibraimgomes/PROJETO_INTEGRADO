//src/app/cadastro/layout.tsx
import { WizardProvider } from "@/components/wizard/WizardProvider";

export const metadata = {
  title: "Cadastro • ProfessionalPage",
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // O provider é client component; o Next cria automaticamente um boundary.
  return <WizardProvider>{children}</WizardProvider>;
}
