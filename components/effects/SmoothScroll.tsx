"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/**
 * Lenis smooth scroll integrado con GSAP ScrollTrigger.
 * Montado una sola vez en el root layout. No renderiza nada.
 *
 * - Lenis maneja el scroll suave del browser.
 * - GSAP ticker dirige el RAF de Lenis (única source of truth de la animación).
 * - ScrollTrigger.update se engancha al scroll de Lenis para que los triggers
 *   se sincronicen con el scroll suavizado en lugar del nativo.
 * - Al cambiar de pathname, fuerza scroll a 0 inmediato. Sin esto, navegar
 *   entre páginas con scroll preserva la posición — incómodo en multi-page.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Respeta reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReducedMotion) return

    // Desactivar scroll-restoration nativo del browser para evitar
    // que pelee con Lenis en navegaciones de back/forward.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    const onScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onScroll)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger después de que Lenis está vivo
    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* Scroll a top en cada cambio de ruta. Usa Lenis si está activo
     (reduced-motion off) o scroll nativo como fallback. immediate:true
     hace el salto sin animación — es lo esperado al navegar entre
     páginas, no querés ver el scroll bajando suavemente desde donde
     estabas. */
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [pathname])

  return null
}
