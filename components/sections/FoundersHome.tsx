import { Founders } from "./Founders"

/**
 * Wrapper liviano que reusa Founders sin el bio multi-párrafo —
 * para la home, donde solo van foto + nombre + rol. El bio largo
 * sigue activo en /nosotros via Founders default.
 */
export function FoundersHome() {
  return <Founders showBio={false} />
}
