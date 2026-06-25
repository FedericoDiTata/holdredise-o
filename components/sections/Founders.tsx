import { Placeholder } from "@/components/ui/Placeholder"
import { founders } from "@/data/content"
import { cn } from "@/lib/utils"
import "./founders.css"

type Props = {
  /** Mostrar el bio multi-párrafo (default true).
   *  En la home (FoundersHome wrapper) lo pasamos en false para un
   *  layout más sobrio — solo foto + nombre + rol. */
  showBio?: boolean
  /** Layout compacto para la home: foto cuadrada 1/1, gaps menores. */
  compact?: boolean
}

/**
 * Bloque editorial de fundadoras side-by-side: foto + nombre completo +
 * rol + (opcional) bio multi-párrafo. En modo compact (home) las fotos
 * son cuadradas y la densidad sube; en /nosotros el modo default deja
 * las fotos verticales 4/5 + bio largo debajo.
 */
export function Founders({ showBio = true, compact = false }: Props = {}) {
  const ratio = compact ? "1/1" : "4/5"
  return (
    <div className={cn("hold-founders", compact && "hold-founders--compact")}>
      {founders.map((f, i) => (
        <article
          key={f.nombre}
          className="hold-founder"
          data-reveal="up"
          data-reveal-delay={i === 0 ? "0.1" : "0.3"}
        >
          <div className="hold-founder__photo-wrap">
            <Placeholder ratio={ratio} label={`Foto · ${f.nombre}`} />
          </div>
          <div className="hold-founder__meta">
            <span className="hold-founder__num">co-founder</span>
            <h3 className="hold-founder__name">{f.nombre}</h3>
            <span className="hold-founder__role">{f.rol}</span>
            {showBio && f.bio ? (
              <div className="hold-founder__bio">
                {f.bio.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
