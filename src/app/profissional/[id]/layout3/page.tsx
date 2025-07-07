// src/app/profissional/[id]/layout3/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout3Client from "@/components/Layout3Client";
import { Idioma } from "@/types/idioma";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
  searchParams: { lang?: string };
}

export default async function Layout3Page({ params, searchParams }: Props) {
  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });
  if (!prof) return notFound();

  const langParam = searchParams.lang?.toUpperCase() || "";
  const activeLang = (["PT","DE","ES","SV","EN"].includes(langParam)
    ? (langParam as Idioma)
    : "PT") as Idioma;

  return (
    <Layout3Client
      prof={prof}
      idiomas={["PT","DE","ES","SV","EN"]}
      activeLang={activeLang}
    />
  );
}
