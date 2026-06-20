import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  /**
   * - default: outline + texto fg
   * - solid: bg negro + texto blanco (ej. servicio activo)
   * - accent: bg color de acento + texto blanco (ej. servicio destacado)
   * - dot: outline + dot de color al inicio (estados: En vivo, Próximamente, etc.)
   */
  variant?: "default" | "solid" | "accent" | "dot"
  /** Hex del acento — usado por variant="accent" como bg, o por variant="dot" como color del dot. */
  color?: string
  className?: string
  as?: "span" | "button"
  onClick?: () => void
  ariaLabel?: string
}

export function Chip({
  children,
  variant = "default",
  color,
  className,
  as = "span",
  onClick,
  ariaLabel,
}: Props) {
  const Tag = as
  const isButton = as === "button"

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: 500,
    letterSpacing: "0.02em",
    border: "1px solid var(--hairline)",
    background: "transparent",
    color: "var(--fg)",
    cursor: isButton ? "pointer" : "default",
    transition: `background var(--dur-fast) var(--ease-hold), border-color var(--dur-fast) var(--ease-hold), color var(--dur-fast) var(--ease-hold)`,
    fontFamily: "inherit",
  }

  const variantStyle: React.CSSProperties =
    variant === "solid"
      ? { background: "var(--fg)", color: "var(--bg)", borderColor: "var(--fg)" }
      : variant === "accent" && color
        ? { background: color, color: "#fff", borderColor: color }
        : {}

  const dot =
    variant === "dot" ? (
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          background: color ?? "var(--fg)",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      />
    ) : null

  return (
    <Tag
      type={isButton ? "button" : undefined}
      onClick={isButton ? onClick : undefined}
      aria-label={ariaLabel}
      className={cn(className)}
      style={{ ...baseStyle, ...variantStyle }}
    >
      {dot}
      {children}
    </Tag>
  )
}
