import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MagneticHover } from "@/components/effects/MagneticHover"
import { cn } from "@/lib/utils"
import "./button.css"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link"
export type ButtonSize = "default" | "large"

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  /** Se renderiza una flecha → al final con animación de hover. */
  arrow?: boolean
  /** Color de acento para el hover de primary (default: var(--accent) = coral). */
  accentColor?: string
  className?: string
  ariaLabel?: string
}

type AsLinkProps = CommonProps & {
  href: string
  /** Si true, abre en pestaña nueva con noopener noreferrer. */
  external?: boolean
  type?: never
  onClick?: never
}

type AsButtonProps = CommonProps & {
  href?: never
  external?: never
  type?: "button" | "submit"
}

type Props = AsLinkProps | AsButtonProps

function ButtonInner({
  variant = "primary",
  size = "default",
  children,
  arrow = false,
  className,
}: {
  variant: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  arrow: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        `hold-btn hold-btn--${variant}`,
        size === "large" && "hold-btn--large",
        className,
      )}
      data-arrow={arrow ? "true" : undefined}
    >
      <span className="hold-btn__label">{children}</span>
      {arrow ? (
        <ArrowRight
          className="hold-btn__arrow"
          size={size === "large" ? 18 : 16}
          strokeWidth={1.75}
          aria-hidden
        />
      ) : null}
    </span>
  )
}

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "default",
    children,
    arrow = true,
    accentColor,
    className,
    ariaLabel,
  } = props

  const inner = (
    <ButtonInner variant={variant} size={size} arrow={arrow} className={className}>
      {children}
    </ButtonInner>
  )

  // primary recibe el efecto magnético del DS.
  const wrapped = variant === "primary" ? <MagneticHover>{inner}</MagneticHover> : inner

  // Estilos en variables custom para que primary pueda virar al accentColor en hover.
  const styleVars = accentColor
    ? ({ "--btn-accent": accentColor } as React.CSSProperties)
    : undefined

  if ("href" in props && props.href) {
    const isExternal = props.external ?? props.href.startsWith("http")
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}
    if (isExternal) {
      return (
        <a
          href={props.href}
          aria-label={ariaLabel}
          style={styleVars}
          className="hold-btn-root"
          {...linkProps}
        >
          {wrapped}
        </a>
      )
    }
    return (
      <Link
        href={props.href}
        aria-label={ariaLabel}
        style={styleVars}
        className="hold-btn-root"
      >
        {wrapped}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? "button"}
      aria-label={ariaLabel}
      style={styleVars}
      className="hold-btn-root"
    >
      {wrapped}
    </button>
  )
}
