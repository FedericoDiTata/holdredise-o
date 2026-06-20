/**
 * Loading skeleton para el detalle de curso. Bg blanco coherente con
 * el hero editorial (no oscuro como las páginas de servicio). */
export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
      }}
      aria-hidden
    />
  )
}
