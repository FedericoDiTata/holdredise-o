import { SectionTag } from "./SectionTag"
import "./why-grot.css"

const RAZONES = [
  {
    titulo: "Nos involucramos",
    texto:
      "Entramos en tu negocio como si fuera nuestro. No tercerizamos el cuidado.",
  },
  {
    titulo: "Estrategia antes que estética",
    texto:
      "Lo lindo sin un porqué no sirve. Cada decisión tiene una intención.",
  },
  {
    titulo: "Equipo multidisciplinario",
    texto: "Más de 15 personas, una sola visión sosteniendo cada proyecto.",
  },
  {
    titulo: "Sin humo",
    texto: "Resultados que se miden, no que se prometen.",
  },
] as const

const DELAYS = [undefined, "0.15", "0.3", "0.4"] as const

/**
 * Por qué elegirnos: claim grande + 4 columnas que se levantan del
 * piso con FLIP 3D (data-reveal="flip" + perspective en el grid).
 */
export function WhyGrot() {
  return (
    <section className="grot-why grot-cover" aria-label="Por qué elegirnos">
      <SectionTag spot="center">Por qué elegirnos</SectionTag>

      <h2 className="grot-why__claim" data-reveal="up">
        No somos un proveedor más.
      </h2>

      <div className="grot-why__grid">
        {RAZONES.map((r, i) => (
          <div
            key={r.titulo}
            className="grot-why__col"
            data-reveal="flip"
            data-reveal-delay={DELAYS[i]}
          >
            <span className="grot-why__marker" aria-hidden />
            <h3 className="grot-why__titulo">{r.titulo}</h3>
            <p className="grot-why__texto">{r.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
