import { Placeholder } from "@/components/ui/Placeholder"
import "./photo-gallery.css"

/* Composición fija de 6 piezas con ratios variados. Cuando lleguen las
   fotos reales, se reemplaza el <Placeholder /> por <Image src=... />. */
const PIEZAS: { ratio: string; label: string }[] = [
  { ratio: "4/3",  label: "Foto · 01" },
  { ratio: "3/4",  label: "Foto · 02" },
  { ratio: "1/1",  label: "Foto · 03" },
  { ratio: "16/9", label: "Foto · 04" },
  { ratio: "3/4",  label: "Foto · 05" },
  { ratio: "4/3",  label: "Foto · 06" },
]

/**
 * Galería editorial asimétrica. Grid 12-col con piezas de distinto
 * col-span y aspect-ratio. Por ahora con placeholders — se reemplazan
 * cuando lleguen las fotos reales.
 */
export function PhotoGallery() {
  return (
    <div className="hold-gallery">
      {PIEZAS.map((p, i) => (
        <div key={i} className="hold-gallery__item">
          <Placeholder ratio={p.ratio} label={p.label} />
        </div>
      ))}
    </div>
  )
}
