import { Eye, Filter, MessageCircle } from "lucide-react"
import { BorderTrace } from "@/components/effects/BorderTrace"
import { SplitText } from "@/components/effects/SplitText"
import { ShaderAnimation } from "@/components/ui/ShaderAnimation"
import "./bloque-cita.css"

/* Las 3 buzzwords del bloque cita — con íconos editoriales que las
 * "anclan" sin caer en clichés tech (megáfono / cohete / gráfico). */
const KEYWORDS = [
  { Icon: Eye, label: "awareness" },
  { Icon: MessageCircle, label: "engagement" },
  { Icon: Filter, label: "funnel" },
] as const

/**
 * Sección bajo el hero:
 *
 *   "Algún día alguien te va a querer cobrar caro por decirte"
 *
 *   [Eye · awareness]  [MessageCircle · engagement]  [Filter · funnel]
 *
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  Nosotras preferimos {no venderte humo},                │
 *   │  {nos involucramos en tu negocio}.                      │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Animaciones via `data-reveal` (CSS + IntersectionObserver, robusto
 * en SSR). El título usa SplitText (motion propio), las cards el
 * BorderTrace SVG, los highlights del panel un CSS background sweep.
 */
export function BloqueCita() {
  return (
    <section className="hold-bloque-cita">
      <h2 className="hold-bloque-cita__titulo">
        <SplitText
          text="Algún día alguien te va a querer cobrar caro por decirte"
          granularity="word"
          stagger={0.055}
          delayChildren={0.1}
        />
      </h2>

        <div className="hold-bloque-cita__keywords">
          {KEYWORDS.map(({ Icon, label }, i) => (
            <article
              key={label}
              className="hold-bloque-cita__keyword"
              data-reveal="scale"
              data-reveal-delay={
                i === 0 ? "0.2" : i === 1 ? "0.3" : "0.4"
              }
            >
              <BorderTrace
                delay={0.4 + i * 0.1}
                duration={0.75}
                fadeOut
              />
              <span
                className="hold-bloque-cita__keyword-icon"
                aria-hidden
              >
                <Icon size={28} strokeWidth={1.4} />
              </span>
              <span className="hold-bloque-cita__keyword-label">
                {label}
              </span>
            </article>
          ))}
        </div>

      <aside
        className="hold-bloque-cita__panel"
        data-reveal="up"
        data-reveal-delay="0.2"
      >
        <ShaderAnimation opacity={0.85} />
        <div className="hold-bloque-cita__panel-overlay">
          <p className="hold-bloque-cita__panel-text">
            <span className="hold-bloque-cita__panel-line">
              Nosotras preferimos{" "}
              <em className="hold-bloque-cita__hl">no venderte humo</em>,
            </span>
            <span className="hold-bloque-cita__panel-line">
              <em className="hold-bloque-cita__hl">
                nos involucramos en tu negocio
              </em>
              .
            </span>
          </p>
        </div>
      </aside>
    </section>
  )
}
