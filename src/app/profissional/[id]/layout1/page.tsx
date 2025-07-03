import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout1Client from "@/components/Layout1Client";
import { Idioma } from "@/types/idioma";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function Layout1Page(props: Props) {
  const { params } = props;

  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });

  if (!prof) return notFound();

  return <Layout1Client prof={prof} idiomas={["PT", "DE", "ES", "SV", "EN"]} />;
}
