import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

type Props = {
  /** Texto del label centrado (se renderiza en mayúsculas, monospace). */
  label?: string
  /** Hex del color del hatch — default: var(--surface-2). */
  color?: string
  /** Aspect ratio CSS (ej. "3/4", "16/9"). */
  ratio?: string
  /** Altura fija opcional (sobreescribe ratio). */
  height?: number | string
  className?: string
  style?: CSSProperties
}

export function Placeholder({ label, color, ratio, height, className, style }: Props) {
  const hatchColor = color ?? "rgba(29, 29, 27, 0.07)"
  const labelColor = color ? "rgba(255, 255, 255, 0.85)" : "var(--muted)"

  return (
    <div
      role="img"
      aria-label={label ?? "Placeholder"}
      className={cn(className)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: height ? undefined : ratio,
        height,
        background: color ?? "transparent",
        backgroundImage: `repeating-linear-gradient(
          135deg,
          ${hatchColor} 0 8px,
          transparent 8px 16px
        )`,
        border: "1px solid var(--hairline)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {label ? (
        <span
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: labelColor,
            padding: "4px 10px",
            mixBlendMode: color ? "normal" : "multiply",
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
