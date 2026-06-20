import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trabajá con Nosotros | HOLD",
  description:
    "Sumate a HOLD. Próximamente: formulario para creadores, freelancers y marcas que quieran trabajar con nosotros.",
}

export default function TrabajaConNosotrosPage() {
  return (
    <main className="section-container">
      <p className="t-micro">Sumate al equipo</p>
      <h1 className="t-h1" style={{ marginTop: 24 }}>
        Trabajá con <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>nosotros</em>.
      </h1>
      <p
        className="t-lead"
        style={{ color: "var(--muted)", marginTop: 24, maxWidth: 640 }}
      >
        Estamos armando el formulario para que nos cuentes quién sos y qué hacés.
        Mientras tanto, escribinos directo por WhatsApp o mail — está al pie.
      </p>
    </main>
  )
}
