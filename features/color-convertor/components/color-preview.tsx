import { Pipette } from 'lucide-react'
import { ColorFormatOption } from '../types'

interface Props {
  sourceColor: string
  selected: ColorFormatOption
}

const ColorPreview = ({ sourceColor, selected }: Props) => {

  const hasColor = Boolean(sourceColor.trim())

  return (
    <div className="grid flex-1 gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Live preview</p>
        <p className="font-mono text-xs leading-5 text-muted-foreground tabular-nums">
          {hasColor ? sourceColor : "Waiting for a color"}
        </p>
      </div>

      <div
        role="img"
        aria-label={
          hasColor
            ? `Live preview of ${sourceColor}`
            : "Empty color preview. Enter a color to see the result."
        }
        className="relative isolate min-h-52 flex-1 overflow-hidden rounded-[1.6rem] ring-1 ring-border sm:min-h-64"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "repeating-conic-gradient(var(--border) 0% 25%, var(--card) 0% 50%)",
            backgroundSize: "1.25rem 1.25rem",
          }}
        />

        {hasColor ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-[background-color] duration-200"
            style={{ backgroundColor: sourceColor }}
          />
        ) : (
          <div className="relative flex h-full min-h-52 flex-col items-center justify-center gap-3 px-6 text-center sm:min-h-64">
            <div className="rounded-[1.5rem] bg-card/95 px-5 py-4 shadow-sm ring-1 ring-border">
              <span className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                <Pipette className="size-5" aria-hidden="true" />
              </span>
              <p className="max-w-xs text-sm leading-6 text-foreground">
                Enter a color below to preview the converted value.
              </p>
            </div>
          </div>
        )}

        {hasColor ? (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent p-4 pt-10">
            <p className="font-heading text-lg font-semibold text-white drop-shadow-sm">
              {sourceColor}
            </p>
            <p className="text-sm text-white/85">Preview · {selected.label} target</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ColorPreview