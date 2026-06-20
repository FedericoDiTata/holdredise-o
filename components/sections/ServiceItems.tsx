import "./service-items.css"

type Props = {
  items: readonly string[]
}

/**
 * Lista editorial de capacidades por servicio. Filas grandes con número
 * (01, 02, ...) separadas por hairline. Sin íconos, sin cards — el peso
 * lo lleva la tipografía y el espaciado.
 */
export function ServiceItems({ items }: Props) {
  return (
    <ul className="hold-service-items" role="list">
      {items.map((item, i) => (
        <li key={item} className="hold-service-items__row">
          <span className="hold-service-items__num" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="hold-service-items__text">{item}</p>
        </li>
      ))}
    </ul>
  )
}
