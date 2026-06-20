import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import "./marquee.css"

type Props = {
  /** Items que se repiten en loop. Para un loop "frase + flecha" usar
   *  un solo item: ["Lo que hacemos ↓"] — la marquee se encarga de
   *  repetirlo seamless. */
  items: readonly string[]
  /** Duración total de un loop completo. Default 22s. */
  durationSec?: number
  /** Color del separador (cuadrado entre items). Default: --accent. */
  separatorColor?: string
  /** Variante invertida (fondo negro, texto blanco). */
  invert?: boolean
  /** Variante "accent" (fondo --accent, texto blanco bold).
   *  Pensado para frases tipo loop "Lo que hacemos ↓" / "¿Quiénes somos?". */
  accent?: boolean
  /** Items en italic 400 — más editorial. */
  italic?: boolean
  className?: string
}

/* Cuántas veces repetimos el set completo de items. Con 6 copias y translate
 * -50%, la pista siempre supera 3x el viewport, así que NUNCA se ve espacio
 * vacío al borde derecho durante el cycle, incluso con items cortos y pocos. */
const REPEATS = 6

/**
 * Marquee infinita seamless. Tres variantes:
 * - default: bg --bg, texto --fg, separator --accent
 * - invert: bg --fg, texto --bg
 * - accent: bg --accent, texto blanco bold (pensado para frases loop)
 */
export function MarqueeBand({
  items,
  durationSec = 22,
  separatorColor,
  invert = false,
  accent = false,
  italic = false,
  className,
}: Props) {
  const styleVars = {
    "--marquee-duration": `${durationSec}s`,
    "--marquee-sep": separatorColor ?? undefined,
  } as CSSProperties

  // 6 copias del set completo → pista larga + seamless en -50%.
  const repeated = Array.from({ length: REPEATS }, () => items).flat()

  return (
    <div
      className={cn(
        "hold-marquee",
        invert && "hold-marquee--invert",
        accent && "hold-marquee--accent",
        className,
      )}
      style={styleVars}
      aria-hidden
    >
      <div className="hold-marquee__viewport">
        <div className="hold-marquee__track">
          {repeated.map((item, i) => (
            <span
              key={i}
              className={cn(
                "hold-marquee__item",
                italic && "hold-marquee__item--em",
              )}
            >
              {item}
              <span className="hold-marquee__sep" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
