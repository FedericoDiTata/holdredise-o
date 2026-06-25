import type { ReactNode } from "react"
import { Button } from "@/components/ui/Button"
import { ParticleAnimation } from "@/components/ui/ParticleAnimation"
import { WHATSAPP_URL } from "@/data/content"
import "./cta-band.css"

type Props = {
  /** Microtexto arriba del título (opcional). */
  eyebrow?: string
  /** Título grande. Acepta <em> para italic. */
  title: ReactNode
  /** Sub opcional. */
  sub?: ReactNode
  /** Texto del CTA primario. Default: "Hablemos". */
  ctaLabel?: string
  /** Href del CTA primario. Default: WhatsApp. */
  ctaHref?: string
  /** Si el href es externo. */
  ctaExternal?: boolean
  /** "default" = bg negro (var(--fg)). "accent" = bg --accent. */
  variant?: "default" | "accent"
}

/**
 * Banda de cierre full-width. Va al final de páginas internas para
 * empujar al usuario a iniciar conversación. Sin gradients, sin shapes:
 * solo tipografía grande + 1 CTA.
 */
export function CTABand({
  eyebrow,
  title,
  sub,
  ctaLabel = "Hablemos",
  ctaHref = WHATSAPP_URL,
  ctaExternal = true,
  variant = "default",
}: Props) {
  return (
    <section className="hold-cta-band" data-variant={variant}>
      {variant === "default" ? <ParticleAnimation /> : null}
      <div className="hold-cta-band__inner">
        {eyebrow ? (
          <p className="hold-cta-band__eyebrow" data-reveal="up">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className="hold-cta-band__title"
          data-reveal="blur"
          data-reveal-delay="0.1"
        >
          {title}
        </h2>
        {sub ? (
          <p
            className="hold-cta-band__sub"
            data-reveal="up"
            data-reveal-delay="0.3"
          >
            {sub}
          </p>
        ) : null}
        <div
          className="hold-cta-band__actions"
          data-reveal="up"
          data-reveal-delay="0.4"
        >
          <Button
            size="large"
            href={ctaHref}
            external={ctaExternal}
            ariaLabel={ctaLabel}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
