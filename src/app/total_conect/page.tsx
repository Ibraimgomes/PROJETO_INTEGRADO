'use client';

import BarraNavegacao from "@/components/BarraNavegacao";
import SecaoPrincipal from "@/components/SecaoPrincipal";
import Beneficios from "@/components/Beneficios";
import Precos from "@/components/Precos";
import Rodape from "@/components/Rodape";

export default function PaginaTotalConect() {
    return (
        <main>

            <SecaoPrincipal />

            <Beneficios />

            <Precos />

            <Rodape />
        </main>
    );
}
