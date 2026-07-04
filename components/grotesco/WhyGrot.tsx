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

/**
 * Por qué elegirnos: bloque accent con el claim grande y 4 columnas de
 * razones separadas por hairlines. Marcadores cuadrados, sin números.
 */
export function WhyGrot() {
  return (
    <section className="grot-why grot-cover" aria-label="Por qué elegirnos">
      <SectionTag>Por qué elegirnos</SectionTag>

      <h2 className="grot-why__claim">No somos un proveedor más.</h2>

      <div className="grot-why__grid">
        {RAZONES.map((r) => (
          <div key={r.titulo} className="grot-why__col">
            <span className="grot-why__marker" aria-hidden />
            <h3 className="grot-why__titulo">{r.titulo}</h3>
            <p className="grot-why__texto">{r.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
