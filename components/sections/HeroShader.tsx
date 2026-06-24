import type { CSSProperties } from "react"
import { Button } from "@/components/ui/Button"
import { HeroParticles3D } from "@/components/effects/HeroParticles3D"
import { WHATSAPP_URL } from "@/data/content"
import { HeroRotatingWord } from "./HeroRotatingWord"
import "./hero-shader.css"

/**
 * Hero simple editorial. Título en 2 renglones forzados (cada span es
 * display:block):
 * - Línea 1: "No solo hacemos contenido," — regular, "solo" en italic
 *   (mismo color, sin accent azul)
 * - Línea 2: "construimos [palabra rotativa]." — bold para cerrar fuerte,
 *   la última palabra rota entre 6 términos del vocabulario de la marca.
 * Animación de fade-up por palabra al cargar; rotator arranca después.
 */
export function HeroShader() {
  return (
    <section className="hold-hero-shader" aria-label="Inicio">
      <HeroParticles3D />

      <h1 className="hold-hero-shader__sr">
        No solo hacemos contenido, construimos marcas.
      </h1>

      <div className="hold-hero-shader__content">
        <h2 className="hold-hero-shader__title" aria-hidden>
          <span
            className="hold-hero-shader__word"
            style={{ "--i": 0 } as CSSProperties}
          >
            No <em>solo</em> hacemos contenido,
          </span>
          <span
            className="hold-hero-shader__word hold-hero-shader__word--strong"
            style={{ "--i": 1 } as CSSProperties}
          >
            construimos <HeroRotatingWord />
          </span>
        </h2>

        <div className="hold-hero-shader__cta">
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
