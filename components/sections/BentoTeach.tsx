import "./bento-teach.css"

type BentoItem = {
  title: string
  /** Categoría editorial corta (ej. "Curso", "Workshop", "Mentoría"). */
  category: string
  /** Descripción opcional debajo del título (para bloques tipo "Por qué elegirnos"). */
  desc?: string
}

type Props = {
  items: readonly BentoItem[]
}

/**
 * Bento grid asimétrico de 6 piezas. La primera celda ocupa 7 cols x 2
 * rows (hero); las otras 5 distribuidas en 5 + 4 + 4 + 4. Cada celda:
 * imagen placeholder con hatch + overlay del acento al hover + número,
 * chip de categoría y título.
 *
 * Cuando lleguen las imágenes reales, reemplazar el `__media` por un
 * <img> o <Image /> de next/image con object-cover.
 */
export function BentoTeach({ items }: Props) {
  const cells = items.slice(0, 6)
  const count = Math.max(4, Math.min(6, cells.length))
  return (
    <div className="hold-bento-teach" data-count={count}>
      {cells.map((item, i) => (
        <article key={item.title} className="hold-bento-teach__cell">
          <div className="hold-bento-teach__media" aria-hidden />
          <div className="hold-bento-teach__overlay" aria-hidden />
          <div className="hold-bento-teach__content">
            <div className="hold-bento-teach__head">
              <span className="hold-bento-teach__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hold-bento-teach__category">{item.category}</span>
            </div>
            <div className="hold-bento-teach__body">
              <h3 className="hold-bento-teach__title">{item.title}</h3>
              {item.desc ? (
                <p className="hold-bento-teach__desc">{item.desc}</p>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
