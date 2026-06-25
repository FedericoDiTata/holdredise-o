import { Founders } from "./Founders"

/**
 * Wrapper de Founders para la home: pasa `showBio=false` y `compact`
 * para una variante más densa (foto cuadrada, gaps menores). Las
 * articles internas usan `data-reveal` para fade-up al scroll —
 * sistema CSS robusto, no depende de framer-motion.
 */
export function FoundersHome() {
  return <Founders showBio={false} compact />
}
