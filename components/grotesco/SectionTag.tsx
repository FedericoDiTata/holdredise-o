import type { ReactNode } from "react"
import "./section-tag.css"

type Props = {
  children: ReactNode
  /** Sticker negro (para secciones accent). Default: accent. */
  dark?: boolean
  /** Dónde va pegada la calcomanía sobre la costura de la sección.
   *  Cada spot trae su propia rotación para que se sientan pegadas a
   *  mano, no puestas por sistema. */
  spot?: "left" | "right" | "center"
}

/**
 * Sticker de sección: etiqueta accent montada sobre el borde superior
 * de la sección como calcomanía. Se desparraman por distintos lugares
 * (left / right / center) para acentuar lo grotesco.
 */
export function SectionTag({ children, dark = false, spot = "left" }: Props) {
  return (
    <span
      className={
        `grot-tag grot-tag--${spot}` + (dark ? " grot-tag--dark" : "")
      }
    >
      {children}
    </span>
  )
}
