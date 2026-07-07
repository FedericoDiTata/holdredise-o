import { BirraGrot } from "@/components/grotesco/BirraGrot"
import { CierreGrot } from "@/components/grotesco/CierreGrot"
import { FoundersGrot } from "@/components/grotesco/FoundersGrot"
import { HeroGrot } from "@/components/grotesco/HeroGrot"
import { IntroLoader } from "@/components/grotesco/IntroLoader"
import { PinScroll } from "@/components/grotesco/PinScroll"
import { ServiciosGrot } from "@/components/grotesco/ServiciosGrot"
import { StatsGrot } from "@/components/grotesco/StatsGrot"
import { WhyGrot } from "@/components/grotesco/WhyGrot"

/**
 * Home grotesca one-scroll. Orden:
 *   Hero (grid system + typewriter de frases)
 *   Stats (contadores con bordes)
 *   Punchline pineada (queda sticky, lo siguiente se monta encima)
 *   Trabajos (halftone grid) ← tapa la punchline al scrollear
 *   Servicios (Brands / Talents / Performance)
 *   Por qué elegirnos
 *   Founders
 *   La birra (cita + strip de 2 fotos)
 *   Cierre + contacto
 *
 * El footer (FooterGrot) y la nav (NavGrotesco) viven en el layout.
 */
export default function Home() {
  return (
    <>
      <IntroLoader />
      <HeroGrot />
      <StatsGrot />
      <PinScroll />
      <ServiciosGrot />
      <WhyGrot />
      <FoundersGrot />
      <BirraGrot />
      <CierreGrot />
    </>
  )
}
