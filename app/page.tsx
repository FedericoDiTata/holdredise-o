import { HeroShader } from "@/components/sections/HeroShader"
import { ServiciosPreview } from "@/components/sections/ServiciosPreview"
import { NosotrosPreview } from "@/components/sections/NosotrosPreview"
import { ClientesPreview } from "@/components/sections/ClientesPreview"
import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { HeroScrollStack } from "@/components/effects/HeroScrollStack"

/* Marquees azules con frase + flecha en loop (referencia: lpm.community).
   Un solo item se repite N veces para que se vea como un mantra. */
const MARQUEE_TOP = ["Lo que hacemos ↓"] as const
const MARQUEE_MID = ["¿Quiénes somos?"] as const

export default function Home() {
  return (
    <>
      <HeroScrollStack
        hero={<HeroShader />}
        next={
          <>
            <MarqueeBand items={MARQUEE_TOP} accent durationSec={28} />
            <ServiciosPreview />
          </>
        }
      />
      <ClientesPreview />
      <MarqueeBand items={MARQUEE_MID} accent durationSec={28} />
      <NosotrosPreview />
    </>
  )
}
