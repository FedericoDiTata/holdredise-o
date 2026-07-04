import type { ReactNode } from "react"
import "./section-tag.css"

type Props = {
  children: ReactNode
  /** Sticker negro (para secciones accent). Default: accent. */
  dark?: boolean
}

/**
 * Sticker de sección: reemplaza las divisiones dobles de labels mono
 * (que quedaban genéricas). Es una etiqueta chica accent, levemente
 * rotada, montada sobre el borde superior de la sección como una
 * calcomanía pegada sobre la costura.
 */
export function SectionTag({ children, dark = false }: Props) {
  return (
    <span className={"grot-tag" + (dark ? " grot-tag--dark" : "")}>
      {children}
    </span>
  )
}
