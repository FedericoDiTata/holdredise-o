import { Button } from "@/components/ui/Button"
import { equipo } from "@/data/content"
import "./nosotros-preview.css"

export function NosotrosPreview() {
  return (
    <section className="hold-nosotros" aria-label="Nosotros">
      <span className="hold-nosotros__pattern" aria-hidden>
        h
      </span>

      <div className="hold-nosotros__inner">
        <div className="hold-nosotros__col-text">
          <span className="hold-nosotros__eyebrow" data-reveal>
            <span className="hold-nosotros__eyebrow-dot" aria-hidden />
            02 · Nosotros
          </span>

          <h2 className="hold-nosotros__title" data-reveal data-reveal-delay="0.1">
            ¿Quiénes <em>somos?</em>
          </h2>

          <p className="hold-nosotros__body" data-reveal data-reveal-delay="0.2">
            No somos la agencia que te dice que sí a todo. Somos una agencia
            creativa con un equipo multidisciplinario que trabaja desde
            adentro hacia afuera. No partimos de tendencias, partimos de tu
            identidad: eso que ya tenés y que probablemente no estás sabiendo
            decir. Ayudamos a marcas, equipos y creadores a encontrar su voz,
            ordenarla y comunicar con estrategia.
          </p>

          <div className="hold-nosotros__signers" data-reveal data-reveal-delay="0.3">
            {equipo.map((m) => (
              <div key={m.nombre} className="hold-nosotros__signer">
                <span className="hold-nosotros__signer-name">{m.nombre}</span>
                <span className="hold-nosotros__signer-rol">{m.rol}</span>
              </div>
            ))}
          </div>

          <div className="hold-nosotros__cta" data-reveal data-reveal-delay="0.4">
            <Button variant="secondary" href="/nosotros">
              Conocernos
            </Button>
          </div>
        </div>

        <div className="hold-nosotros__col-photo" data-reveal data-reveal-delay="0.2">
          <div className="hold-nosotros__photo" aria-hidden>
            <span className="hold-nosotros__photo-num">02</span>
            <span className="hold-nosotros__photo-tag">Foto del equipo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
