//  src/app/profissional/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout1Client from "@/components/Layout1Client";
import Layout2Client from "@/components/Layout2Client";
import Layout3Client from "@/components/Layout3Client";
import { Idioma } from "@/types/idioma";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
  searchParams: { lang?: string };
}

export default async function ProfissionalPage(props: Props) {
  // obrigatoriamente await props para acessar params e searchParams
  const { params, searchParams } = await props;
  const { id } = params;

  // busca os dados do profissional
  const prof = await prisma.profissional.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!prof) return notFound();

  // determina idioma ativo via query ?lang=XX ou fallback PT
  const langParam = typeof searchParams.lang === 'string'
    ? searchParams.lang.toUpperCase()
    : '';
  const activeLang = (['PT','DE','ES','SV','EN'].includes(langParam)
    ? langParam
    : 'PT') as Idioma;

  // renderiza o layout escolhido pelo profissional
  switch (prof.layout) {
    case 'L1':
      return (
        <Layout1Client
          prof={prof}
          idiomas={['PT','DE','ES','SV','EN']}
          activeLang={activeLang}
        />
      );
    case 'L2':
      return (
        <Layout2Client
          prof={prof}
          idiomas={['PT','DE','ES','SV','EN']}
          activeLang={activeLang}
        />
      );
    case 'L3':
      return (
        <Layout3Client
          prof={prof}
          idiomas={['PT','DE','ES','SV','EN']}
          activeLang={activeLang}
        />
      );
    default:
      return notFound();
  }
}
