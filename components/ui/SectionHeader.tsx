import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  /** Número de sección (ej "01"). Opcional — si no se pasa, el header
   *  ocupa una sola columna sin el bloque izquierdo. */
  numero?: string
  /** Eyebrow secundario debajo del número (ej "Qué enseñamos"). Opcional. */
  eyebrow?: string
  titulo: ReactNode
  intro?: ReactNode
  className?: string
}

export function SectionHeader({
  numero,
  eyebrow,
  titulo,
  intro,
  className,
}: Props) {
  const hasMeta = Boolean(numero || eyebrow)

  return (
    <header
      className={cn("hold-section-header", className)}
      style={{
        display: "grid",
        gridTemplateColumns: hasMeta ? "120px 1fr" : "1fr",
        gap: 32,
        paddingTop: 24,
        borderTop: "1px solid var(--fg)",
      }}
    >
      {hasMeta ? (
        <div data-reveal>
          {numero ? <p className="t-micro">{numero}</p> : null}
          {eyebrow ? (
            <p
              className="t-micro"
              style={{ marginTop: 8, color: "var(--muted)" }}
            >
              {eyebrow}
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <h2 className="t-h2" style={{ maxWidth: 900 }} data-reveal>
          {titulo}
        </h2>
        {intro ? (
          <p
            className="t-lead"
            style={{ marginTop: 24, color: "var(--muted)", maxWidth: 720 }}
            data-reveal
            data-reveal-delay="0.1"
          >
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  )
}
