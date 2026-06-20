import type { ReactNode } from "react"
import { ShaderAnimation } from "./ShaderAnimation"
import "./page-hero-textured.css"

type Props = {
  /** Eyebrow text (ej. "Educación · 01"). */
  eyebrow: string
  /** Título grande del hero (H1). Acepta <em> para italic + acento. */
  titulo: ReactNode
  /** Sub/intro opcional. */
  intro?: ReactNode
  /** CTAs (típicamente 1-2 botones). */
  actions?: ReactNode
}

/**
 * Hero oscuro para páginas internas con shader Three.js de líneas
 * concéntricas coloreadas con la paleta HOLD + trail residual debajo.
 *
 * Altura fija (72svh) y contenido centrado verticalmente — las 3
 * páginas de servicio se ven idénticas independientemente del largo
 * del título.
 */
export function PageHeroTextured({
  eyebrow,
  titulo,
  intro,
  actions,
}: Props) {
  return (
    <>
      <header className="hold-hero-textured" data-hero-theme="dark">
        <ShaderAnimation />
        <div className="hold-hero-textured__softener" aria-hidden />
        <div className="hold-hero-textured__grain" aria-hidden />
        <div className="hold-hero-textured__vignette" aria-hidden />

        <div className="hold-hero-textured__content">
          <p className="hold-hero-textured__eyebrow">{eyebrow}</p>
          <h1 className="hold-hero-textured__title">{titulo}</h1>
          {intro ? (
            <p className="hold-hero-textured__intro">{intro}</p>
          ) : null}
          {actions ? (
            <div className="hold-hero-textured__actions">{actions}</div>
          ) : null}
        </div>
      </header>

      {/* Trail residual: banda de transición con fade del negro al bg
          y grano sutil para conectar el hero con la sección siguiente. */}
      <div className="hold-hero-trail" aria-hidden>
        <div className="hold-hero-trail__grain" />
      </div>
    </>
  )
}
