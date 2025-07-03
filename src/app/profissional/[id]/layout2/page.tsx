import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout2Client from "@/components/Layout2Client";
import { Idioma } from "@/types/idioma";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function Layout2Page(props: Props) {
  const { params } = props;

  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });

  if (!prof) return notFound();

  return <Layout2Client prof={prof} idiomas={["PT", "DE", "ES", "SV", "EN"]} />;
}
