import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout3Client from "@/components/Layout3Client";
import { Idioma } from "@/types/idioma";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function Layout3Page(props: Props) {
  const { params } = props;

  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });

  if (!prof) return notFound();

  return <Layout3Client prof={prof} idiomas={["PT", "DE", "ES", "SV", "EN"]} />;
}
