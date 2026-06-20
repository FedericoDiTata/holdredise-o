"use client"

import { useEffect } from "react"

/**
 * Observer global que aplica la clase `in` a cualquier elemento marcado con
 * `data-reveal` cuando entra al viewport. Pareja del CSS de globals.css.
 *
 * Uso (Server Component OK):
 *   <h2 data-reveal>...</h2>
 *   <p data-reveal data-reveal-delay="0.2">...</p>
 *
 * Mountado una vez en el root layout. Reescanea el DOM cuando hay cambios de
 * ruta (App Router muta children sin re-mount del layout).
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const elements = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))

    if (prefersReducedMotion) {
      // Mostrar todo de una sin animar
      elements().forEach((el) => el.classList.add("in"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    )

    const observed = new WeakSet<Element>()
    const observeAll = () => {
      for (const el of elements()) {
        if (!observed.has(el) && !el.classList.contains("in")) {
          observer.observe(el)
          observed.add(el)
        }
      }
    }

    observeAll()

    // Re-scan periódicamente para cubrir cambios de ruta y contenido dinámico
    const mutation = new MutationObserver(() => observeAll())
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])

  return null
}
