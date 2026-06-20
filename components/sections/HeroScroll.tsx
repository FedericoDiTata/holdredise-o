"use client"

import { useRef } from "react"
import type { ReactNode } from "react"
import type { MotionValue } from "framer-motion"
import { useScroll, useTransform, motion } from "framer-motion"
import "./hero-scroll.css"

type IntroProps = {
  scrollYProgress: MotionValue<number>
  eyebrow?: ReactNode
  title: ReactNode
  sub?: ReactNode
}

function IntroSection({ scrollYProgress, eyebrow, title, sub }: IntroProps) {
  /* Encoge y rota levemente al scrollear hacia abajo, como si la card
     "se alejara" para dar paso a la galería. */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3])

  return (
    <motion.div
      style={{ scale, rotate }}
      className="hold-hero-scroll__intro"
    >
      <div className="hold-hero-scroll__grid" aria-hidden />
      <div className="hold-hero-scroll__intro-inner">
        {eyebrow ? (
          <p className="hold-hero-scroll__intro-eyebrow">{eyebrow}</p>
        ) : null}
        <h2 className="hold-hero-scroll__intro-title">{title}</h2>
        {sub ? <p className="hold-hero-scroll__intro-sub">{sub}</p> : null}
      </div>
    </motion.div>
  )
}

type GalleryProps = {
  scrollYProgress: MotionValue<number>
  title: ReactNode
  meta?: ReactNode
  images: readonly string[]
}

function GallerySection({
  scrollYProgress,
  title,
  meta,
  images,
}: GalleryProps) {
  /* Entra escala 0.85 → 1 + rotate 3 → 0, espejo de la intro. */
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [3, 0])

  return (
    <motion.div
      style={{ scale, rotate }}
      data-hero-theme="dark"
      className="hold-hero-scroll__gallery"
    >
      <div
        className="hold-hero-scroll__grid hold-hero-scroll__grid--dark"
        aria-hidden
      />
      <div className="hold-hero-scroll__gallery-inner">
        <div className="hold-hero-scroll__gallery-head">
          <h2 className="hold-hero-scroll__gallery-title">{title}</h2>
          {meta ? (
            <span className="hold-hero-scroll__gallery-meta">{meta}</span>
          ) : null}
        </div>
        <div className="hold-hero-scroll__gallery-grid">
          {images.map((label, i) => (
            <div key={i} className="hold-hero-scroll__gallery-card">
              <span className="hold-hero-scroll__gallery-card-label">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

type Props = {
  introEyebrow?: ReactNode
  introTitle: ReactNode
  introSub?: ReactNode
  galleryTitle: ReactNode
  galleryMeta?: ReactNode
  /** 4 labels para los placeholders de la galería. */
  images: readonly string[]
}

/**
 * Bloque scroll-driven adaptado del hero-scroll-animation de 21st.dev.
 * Dos secciones: intro blanca sticky que se encoge + galería oscura
 * que entra desde abajo escalando. El section oscuro tiene
 * data-hero-theme="dark" para que el nav se ponga claro mientras lo
 * cubre. Total 200vh de altura.
 *
 * Pensado para ir inmediatamente después del PageHeroTextured de las
 * páginas de servicio.
 */
export function HeroScroll({
  introEyebrow,
  introTitle,
  introSub,
  galleryTitle,
  galleryMeta,
  images,
}: Props) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={container} className="hold-hero-scroll">
      <IntroSection
        scrollYProgress={scrollYProgress}
        eyebrow={introEyebrow}
        title={introTitle}
        sub={introSub}
      />
      <GallerySection
        scrollYProgress={scrollYProgress}
        title={galleryTitle}
        meta={galleryMeta}
        images={images}
      />
    </section>
  )
}
