import type { ServicioSlug } from "@/types"
import { Placeholder } from "@/components/ui/Placeholder"
import "./casos-grid.css"

const SERVICIO_NOMBRE: Record<ServicioSlug, string> = {
  academy: "Hold Academy",
  "redes-sociales": "Redes Sociales",
  performance: "Performance",
}

type Caso = {
  servicio: ServicioSlug
  marca: string
  titulo: string
  metricValue: string
  metricLabel: string
}

/* Placeholder hasta que pasen los casos reales. */
const CASOS: readonly Caso[] = [
  {
    servicio: "performance",
    marca: "Marca · 01",
    titulo: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    metricValue: "+218%",
    metricLabel: "ROAS en 3 meses",
  },
  {
    servicio: "redes-sociales",
    marca: "Marca · 02",
    titulo: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    metricValue: "2.4x",
    metricLabel: "Alcance orgánico mensual",
  },
  {
    servicio: "academy",
    marca: "Marca · 03",
    titulo: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
    metricValue: "+120",
    metricLabel: "Profesionales formados",
  },
  {
    servicio: "performance",
    marca: "Marca · 04",
    titulo: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    metricValue: "−38%",
    metricLabel: "Costo por adquisición",
  },
] as const

/**
 * Grilla 2x2 de casos de éxito placeholder. Cada caso: imagen ratio
 * 16/10 + chip de servicio + marca + título + métrica grande.
 */
export function CasosGrid() {
  return (
    <div className="hold-casos">
      {CASOS.map((c, i) => (
        <article key={i} className="hold-caso">
          <div className="hold-caso__media">
            <Placeholder ratio="16/10" label={`Caso · ${String(i + 1).padStart(2, "0")}`} />
          </div>
          <div className="hold-caso__body">
            <div className="hold-caso__head">
              <span className="hold-caso__chip">
                {SERVICIO_NOMBRE[c.servicio]}
              </span>
              <span className="hold-caso__brand">{c.marca}</span>
            </div>
            <h3 className="hold-caso__title">{c.titulo}</h3>
            <div className="hold-caso__metric">
              <span className="hold-caso__metric-value">{c.metricValue}</span>
              <span className="hold-caso__metric-label">{c.metricLabel}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
