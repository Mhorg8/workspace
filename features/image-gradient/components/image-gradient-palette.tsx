import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type ImageGradientPaletteProps = {
  generated: boolean
  colors: string[]
  removeColor: (color: string) => void
}

export function ImageGradientPalette({
  generated,
  colors,
  removeColor,
}: ImageGradientPaletteProps) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold">Sampled colors</h3>
        <p className="text-xs leading-5 text-muted-foreground">
          {generated ? `${colors.length} stops` : "Waiting for generate"}
        </p>
      </div>

      {generated ? (
        <ul className="flex flex-wrap gap-2">
          {colors.map((stop) => (
            <li
              onClick={() => removeColor(stop)}
              key={stop}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-muted px-3 py-1.5 ring-1 ring-border group"
            >
              <span
                aria-hidden="true"
                className="size-4 rounded-full ring-1 ring-foreground/10"
                style={{ backgroundColor: stop }}
              />
              <span className="font-mono text-xs font-medium">{stop}</span>
              <Button
                className="group-hover:opacity-100 opacity-0 cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => removeColor(stop)}
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-muted-foreground">
          Extracted hex stops will show here after you generate a gradient from the photo.
        </p>
      )}
    </div>
  )
}
