import { Button } from "@/components/ui/Button"
import { waUrl } from "@/data/content"
import "./custom-training.css"

const TIPOS: readonly string[] = [
  "Programas in-company para equipos completos",
  "Capacitaciones a medida para áreas específicas",
  "Workshops intensivos para founders y líderes",
  "Mentorías corporativas mensuales con seguimiento",
] as const

/**
 * Bloque "Capacitaciones Personalizadas" — reemplaza el ServicePlanFeature
 * en /academy. Mismo split visual (oscuro / claro) pero sin pricing:
 * el monto depende del alcance y se cotiza después de una charla.
 */
export function CustomTraining() {
  return (
    <section
      className="hold-custom-training"
      aria-label="Capacitaciones personalizadas"
    >
      <div className="hold-custom-training__intro">
        <p className="hold-custom-training__label">Capacitaciones</p>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 className="hold-custom-training__heading">
            Capacitaciones <em>a medida.</em>
          </h3>
          <p className="hold-custom-training__lead">
            ¿Tu equipo necesita una formación específica? Diseñamos cursos
            cerrados según el momento, el rubro y los objetivos de tu negocio.
          </p>
        </div>

        <div className="hold-custom-training__meta">
          <span className="hold-custom-training__meta-dot" aria-hidden />
          <span>Cotización a medida · Sin compromiso</span>
        </div>
      </div>

      <div className="hold-custom-training__details">
        <p className="hold-custom-training__details-label">Formatos disponibles</p>
        <h4 className="hold-custom-training__details-title">
          Elegí el alcance y nos adaptamos.
        </h4>

        <ul className="hold-custom-training__list" role="list">
          {TIPOS.map((tipo, i) => (
            <li key={tipo} className="hold-custom-training__item">
              <span className="hold-custom-training__item-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{tipo}</span>
            </li>
          ))}
        </ul>

        <div className="hold-custom-training__cta">
          <Button
            size="large"
            href={waUrl(
              "Hola, me interesa coordinar una capacitación personalizada de HOLD Academy.",
            )}
            external
            ariaLabel="Cotizar capacitación personalizada por WhatsApp"
          >
            Cotizar capacitación
          </Button>
        </div>
      </div>
    </section>
  )
}
