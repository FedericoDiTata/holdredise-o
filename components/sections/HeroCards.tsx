import type { CSSProperties, ReactNode } from "react"
import { Button } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/data/content"
import "./hero-cards.css"

/* Paleta HOLD — esta animación es excepción al monocromo. */
const HOLD_COLORS = [
  { bg: "#1D1D1B", fg: "#FAFFFA" }, // 0 · Black
  { bg: "#E96951", fg: "#FAFFFA" }, // 1 · Coral
  { bg: "#FAFFFA", fg: "#1D1D1B" }, // 2 · Star White
  { bg: "#2B63FF", fg: "#FAFFFA" }, // 3 · Bright Blue
  { bg: "#EBBDD9", fg: "#1D1D1B" }, // 4 · Soft Pink
  { bg: "#F9423A", fg: "#FAFFFA" }, // 5 · Warm Red
] as const

/* Tipos de contenido posibles en cada card. */
type CardContent =
  | { kind: "glyph"; value: "h" | "o" | "l" | "d" }
  | { kind: "word"; value: string; italic?: boolean }
  | { kind: "number"; value: string }
  | { kind: "block" }
  | { kind: "hatch" }

type CardSpec = {
  col: number
  row: number
  colSpan: number
  rowSpan: number
  rotate: number
  colorIdx: number
  /** Origen de la animación entrance: dirección desde donde viene. */
  enterFrom: "top" | "bottom" | "left" | "right" | "scale"
  content: CardContent
}

const CARDS: readonly CardSpec[] = [
  // Fila superior — protagonistas grandes alternando con accents
  { col: 1, row: 1, colSpan: 3, rowSpan: 2, rotate: -6, colorIdx: 0, enterFrom: "left", content: { kind: "glyph", value: "h" } },
  { col: 4, row: 1, colSpan: 2, rowSpan: 2, rotate: 4, colorIdx: 1, enterFrom: "top", content: { kind: "word", value: "hola", italic: true } },
  { col: 6, row: 1, colSpan: 3, rowSpan: 3, rotate: -2, colorIdx: 3, enterFrom: "scale", content: { kind: "glyph", value: "h" } },
  { col: 9, row: 1, colSpan: 2, rowSpan: 2, rotate: 6, colorIdx: 2, enterFrom: "right", content: { kind: "block" } },
  { col: 11, row: 1, colSpan: 2, rowSpan: 3, rotate: -5, colorIdx: 4, enterFrom: "right", content: { kind: "glyph", value: "h" } },

  // Fila media — mix de palabras y h's
  { col: 1, row: 3, colSpan: 2, rowSpan: 2, rotate: 5, colorIdx: 4, enterFrom: "left", content: { kind: "word", value: "hold" } },
  { col: 3, row: 3, colSpan: 2, rowSpan: 2, rotate: -4, colorIdx: 5, enterFrom: "bottom", content: { kind: "glyph", value: "h" } },
  { col: 5, row: 4, colSpan: 2, rowSpan: 2, rotate: 8, colorIdx: 2, enterFrom: "scale", content: { kind: "hatch" } },
  { col: 9, row: 3, colSpan: 2, rowSpan: 2, rotate: -7, colorIdx: 1, enterFrom: "right", content: { kind: "glyph", value: "h" } },

  // Fila inferior — palabras, número, h's
  { col: 1, row: 5, colSpan: 3, rowSpan: 2, rotate: -6, colorIdx: 3, enterFrom: "left", content: { kind: "hatch" } },
  { col: 4, row: 5, colSpan: 2, rowSpan: 2, rotate: 5, colorIdx: 0, enterFrom: "bottom", content: { kind: "number", value: "01" } },
  { col: 7, row: 5, colSpan: 3, rowSpan: 2, rotate: -3, colorIdx: 5, enterFrom: "bottom", content: { kind: "word", value: "estrategia" } },
  { col: 10, row: 5, colSpan: 3, rowSpan: 2, rotate: 7, colorIdx: 2, enterFrom: "right", content: { kind: "glyph", value: "h" } },
] as const

const STAGGER_S = 0.08
const CARD_DUR_S = 0.7
const ENTRANCE_TOTAL_S = CARDS.length * STAGGER_S + CARD_DUR_S * 0.5

function renderContent(content: CardContent, isBig: boolean): ReactNode {
  switch (content.kind) {
    case "glyph":
      return (
        <span className="hold-hero-cards__glyph">
          {content.value}
        </span>
      )
    case "word":
      return (
        <span
          className="hold-hero-cards__word"
          data-italic={content.italic || undefined}
          data-size={isBig ? "big" : "sm"}
        >
          {content.value}
        </span>
      )
    case "number":
      return (
        <span className="hold-hero-cards__number">{content.value}</span>
      )
    case "block":
      return null
    case "hatch":
      return null
  }
}

/**
 * Hero estilo manual de marca: mural de cards rotadas con contenido variado
 * (h cursiva, palabras de marca, números, color blocks, hatches).
 * Animaciones CSS puras: entrance multi-direccional staggered → drift
 * perpetuo sutil. Hover sobre card: scale up + bring forward.
 */
export function HeroCards() {
  return (
    <section className="hold-hero-cards" aria-label="Inicio">
      <h1 className="hold-hero-cards__sr">Sostener sin perder la esencia.</h1>

      <div className="hold-hero-cards__grid" aria-hidden>
        {CARDS.map((c, i) => {
          const color = HOLD_COLORS[c.colorIdx]
          const isBig = c.colSpan >= 3 || c.rowSpan >= 3
          const styleVars = {
            "--rotate": `${c.rotate}deg`,
            "--delay": `${i * STAGGER_S}s`,
            "--drift-delay": `${ENTRANCE_TOTAL_S + (i % 5) * 0.4}s`,
            "--drift-x": `${((i * 7) % 5) - 2}px`,
            "--drift-y": `${((i * 11) % 5) - 2}px`,
            "--drift-r": `${((i * 13) % 4) - 1.5}deg`,
            gridColumn: `${c.col} / span ${c.colSpan}`,
            gridRow: `${c.row} / span ${c.rowSpan}`,
          } as CSSProperties

          const innerStyle = {
            background: color.bg,
            color: color.fg,
          } as CSSProperties

          return (
            <div
              key={i}
              className="hold-hero-cards__card"
              data-enter={c.enterFrom}
              data-content={c.content.kind}
              style={styleVars}
            >
              <div className="hold-hero-cards__inner" style={innerStyle}>
                {renderContent(c.content, isBig)}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="hold-hero-cards__phrase-wrap"
        style={{ "--delay": `${ENTRANCE_TOTAL_S + 0.05}s` } as CSSProperties}
      >
        <p className="hold-hero-cards__phrase">
          Acá no te tiramos la posta:{" "}
          <em>te acompañamos a crear la tuya.</em>
        </p>
      </div>

      <div className="hold-hero-cards__cta-wrap">
        <div
          className="hold-hero-cards__cta"
          style={{ "--delay": `${ENTRANCE_TOTAL_S + 0.35}s` } as CSSProperties}
        >
          <Button
            size="large"
            href={WHATSAPP_URL}
            external
            ariaLabel="Hablemos por WhatsApp"
          >
            Hablemos
          </Button>
          <Button
            size="large"
            variant="secondary"
            href="#servicios"
            arrow={false}
          >
            Servicios
          </Button>
        </div>
      </div>
    </section>
  )
}
