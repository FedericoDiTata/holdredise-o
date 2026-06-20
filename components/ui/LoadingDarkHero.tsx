import "./loading-dark-hero.css"

/**
 * Skeleton de fallback durante la transición a páginas de servicio.
 * Muestra el hero oscuro plano (sin shader, sin three.js) y un bloque
 * de bg claro abajo para que el usuario no vea un flash blanco mientras
 * el contenido real termina de cargar.
 *
 * Se usa desde los `loading.tsx` de /academy, /redes-sociales y
 * /performance.
 */
export function LoadingDarkHero() {
  return (
    <main className="hold-loading">
      <div
        className="hold-loading__hero"
        data-hero-theme="dark"
        aria-hidden
      >
        <div className="hold-loading__grain" />
      </div>
      <div className="hold-loading__trail" aria-hidden />
    </main>
  )
}
