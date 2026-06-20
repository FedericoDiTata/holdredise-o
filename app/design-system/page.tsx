import type { Metadata } from "next"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Chip } from "@/components/ui/Chip"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { PageHero } from "@/components/ui/PageHero"
import { Placeholder } from "@/components/ui/Placeholder"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { servicios } from "@/data/content"

export const metadata: Metadata = {
  title: "Design System | HOLD (dev)",
  robots: { index: false, follow: false },
}

const COLORS = [
  { name: "Star White", hex: "#FAFFFA", role: "Fondo principal" },
  { name: "Black", hex: "#1D1D1B", role: "Tipografía / fondo oscuro" },
  { name: "Cool Gray", hex: "#C7C9C7", role: "Separadores · 420 C" },
  { name: "Coral", hex: "#E96951", role: "Academy · 486 C" },
  { name: "Warm Red", hex: "#F9423A", role: "Performance · CTAs intensos" },
  { name: "Soft Pink", hex: "#EBBDD9", role: "Acento suave · 243 C" },
  { name: "Bright Blue", hex: "#2B63FF", role: "Redes Sociales · 285 C" },
] as const

const TYPE_SCALE = [
  { name: "Display", spec: "128 / 118 · 300", className: "t-display" },
  { name: "H1", spec: "72 / 71 · 400", className: "t-h1" },
  { name: "H2", spec: "48 / 50 · 400", className: "t-h2" },
  { name: "H3", spec: "28 / 32 · 500", className: "t-h3" },
  { name: "Lead", spec: "22 / 32 · 400", className: "t-lead" },
  { name: "Body", spec: "16 / 25 · 400", className: "t-body" },
  { name: "Small", spec: "13 / 20 · 400", className: "t-small" },
  { name: "Micro", spec: "11 / 15 · 500 · uppercase", className: "t-micro" },
] as const

function Block({
  numero,
  titulo,
  children,
}: {
  numero: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginTop: 120 }}>
      <SectionHeader numero={numero} titulo={titulo} />
      <div style={{ marginTop: 48 }}>{children}</div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 32,
        padding: "24px 0",
        borderTop: "1px solid var(--hairline)",
        alignItems: "start",
      }}
    >
      <p className="t-micro" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        {children}
      </div>
    </div>
  )
}

export default function DesignSystemPage() {
  const academy = servicios[0]
  const redes = servicios[1]
  const performance = servicios[2]

  return (
    <main className="section-container">
      <Eyebrow tone="muted">DEV · Solo referencia interna</Eyebrow>

      <h1 className="t-h1" style={{ marginTop: 24 }}>
        Hold — Design System
      </h1>

      <p className="t-lead" style={{ color: "var(--muted)", marginTop: 24, maxWidth: 720 }}>
        Tokens del sistema, escala tipográfica y átomos UI. Esta página es solo
        referencia interna (no indexada). Todos los componentes que ves acá se
        usan en el sitio real.
      </p>

      {/* COLORES */}
      <Block numero="03" titulo="Color">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {COLORS.map((c) => (
            <div key={c.hex} style={{ border: "1px solid var(--hairline)" }}>
              <div style={{ background: c.hex, height: 120 }} aria-hidden />
              <div style={{ padding: 16 }}>
                <p className="t-h3" style={{ fontSize: 18 }}>
                  {c.name}
                </p>
                <p className="t-small" style={{ color: "var(--muted)", marginTop: 4 }}>
                  {c.role}
                </p>
                <p className="t-micro" style={{ marginTop: 8 }}>
                  {c.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* TIPOGRAFÍA */}
      <Block numero="04" titulo="Tipografía">
        {TYPE_SCALE.map((t) => (
          <div
            key={t.name}
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 32,
              padding: "32px 0",
              borderTop: "1px solid var(--hairline)",
              alignItems: "baseline",
            }}
          >
            <div>
              <p className="t-micro">{t.name}</p>
              <p className="t-small" style={{ color: "var(--muted)", marginTop: 4 }}>
                {t.spec}
              </p>
            </div>
            <p className={t.className} style={{ margin: 0 }}>
              Sostener sin perder la esencia.
            </p>
          </div>
        ))}
      </Block>

      {/* COMPONENTES */}
      <Block numero="05" titulo="Componentes">
        <Row label="Eyebrow">
          <Eyebrow>HOLD · Buenos Aires</Eyebrow>
          <Eyebrow tone="default">SECCIÓN ACTIVA</Eyebrow>
          <Eyebrow dotColor={academy.acento}>Educación · 01</Eyebrow>
          <Eyebrow dotColor={redes.acento}>Marcas y negocios · 02</Eyebrow>
          <Eyebrow dotColor={performance.acento}>Resultados medibles · 03</Eyebrow>
        </Row>

        <Row label="Chip · default">
          <Chip>Estrategia</Chip>
          <Chip>Branding</Chip>
          <Chip>Comunidad</Chip>
        </Row>

        <Row label="Chip · solid">
          <Chip variant="solid">Hold Academy</Chip>
          <Chip variant="solid">Activo</Chip>
        </Row>

        <Row label="Chip · accent">
          <Chip variant="accent" color={academy.acento}>
            Academy
          </Chip>
          <Chip variant="accent" color={redes.acento}>
            Redes
          </Chip>
          <Chip variant="accent" color={performance.acento}>
            Performance
          </Chip>
        </Row>

        <Row label="Chip · dot">
          <Chip variant="dot" color="#1FAB54">
            En vivo
          </Chip>
          <Chip variant="dot" color="#F9423A">
            Próximamente
          </Chip>
          <Chip variant="dot" color="#E96951">
            Cupo limitado
          </Chip>
        </Row>

        <Row label="Badge · estados de cursos">
          <Badge estado="Inscripción abierta" />
          <Badge estado="Próximamente" />
          <Badge estado="Cupo limitado" />
        </Row>

        <Row label="Button · primary (magnético)">
          <Button href="https://wa.me/5491159516214" external>
            Hablemos
          </Button>
          <Button href="/academy" accentColor={academy.acento}>
            Ver Academy
          </Button>
          <Button href="/redes-sociales" accentColor={redes.acento}>
            Ver Redes
          </Button>
        </Row>

        <Row label="Button · secondary">
          <Button variant="secondary" href="/academy">
            Ver servicios
          </Button>
          <Button variant="secondary" arrow={false} href="/clientes">
            Casos de éxito
          </Button>
        </Row>

        <Row label="Button · ghost / link">
          <Button variant="ghost" href="/nosotros">
            Conocernos
          </Button>
          <Button variant="link" arrow={false} href="/clientes">
            Leer caso
          </Button>
          <Button variant="link" href="/academy">
            Quiero saber más
          </Button>
        </Row>

        <Row label="Placeholder · ratio 3/4">
          <div style={{ width: 200 }}>
            <Placeholder label="Foto del equipo" ratio="3/4" />
          </div>
          <div style={{ width: 240 }}>
            <Placeholder label="Aula en vivo" ratio="3/4" color={academy.acento} />
          </div>
        </Row>

        <Row label="Placeholder · ratio 16/9">
          <div style={{ width: 320 }}>
            <Placeholder label="Mockup feed" ratio="16/9" color={redes.acento} />
          </div>
          <div style={{ width: 320 }}>
            <Placeholder
              label="Captura de dashboard"
              ratio="16/9"
              color={performance.acento}
            />
          </div>
        </Row>
      </Block>

      {/* SECTION HEADER demo */}
      <Block numero="05·a" titulo="SectionHeader">
        <SectionHeader
          numero="01"
          eyebrow="Educación"
          titulo="Hold Academy"
          intro="Cursos, entrenamientos y mentorías para creadores de contenido, emprendedores y profesionales que quieren dejar de improvisar."
        />
      </Block>

      {/* PAGE HERO demo */}
      <Block numero="05·b" titulo="PageHero">
        <PageHero
          eyebrow="Marcas y negocios · 02"
          eyebrowDot={redes.acento}
          titulo="Redes Sociales"
          intro="Nos hacemos cargo de tu presencia digital con estrategia, contenido, diseño, producción y community management."
          side={<Placeholder label="Mockup de feed" ratio="3/4" color={redes.acento} />}
        />
      </Block>

      <p className="t-small" style={{ marginTop: 96, color: "var(--muted)" }}>
        Próximos componentes (Header, Footer, ServiceCard, CourseRow,
        TestimonialCard) se agregan en Fases 2, 5 y 7.
      </p>
    </main>
  )
}
