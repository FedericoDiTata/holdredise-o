import { Placeholder } from "@/components/ui/Placeholder"
import { founders } from "@/data/content"
import "./founders.css"

type Props = {
  /** Mostrar el bio multi-párrafo (default true).
   *  En la home (FoundersHome wrapper) lo pasamos en false para un
   *  layout más sobrio — solo foto + nombre + rol. */
  showBio?: boolean
}

/**
 * Bloque editorial de fundadoras side-by-side: foto vertical 4/5 +
 * nombre completo + rol + (opcional) bio multi-párrafo.
 */
export function Founders({ showBio = true }: Props = {}) {
  return (
    <div className="hold-founders">
      {founders.map((f) => (
        <article key={f.nombre} className="hold-founder">
          <div className="hold-founder__photo-wrap">
            <Placeholder ratio="4/5" label={`Foto · ${f.nombre}`} />
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
