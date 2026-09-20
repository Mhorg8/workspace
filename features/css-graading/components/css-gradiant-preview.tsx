import { Palette } from "lucide-react"

type CssGradiantPreviewProps = {
  css: string | null
  colorCount: number
  label: string
}

export function CssGradiantPreview({ css, colorCount, label }: CssGradiantPreviewProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Live preview</p>
        <p className="text-xs leading-5 text-muted-foreground">
          {colorCount === 0 ? "Waiting for colors" : colorCount === 1 ? "Solid fill" : label}
        </p>
      </div>

      <div
        role="img"
        aria-label={
          css
            ? `Live preview of ${label}`
            : "Empty gradient preview. Add colors to see the result."
        }
        className="relative isolate min-h-52 overflow-hidden rounded-[1.6rem] ring-1 ring-border sm:min-h-64"
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
        {css ? (
          <div aria-hidden="true" className="absolute inset-0" style={{ background: css }} />
        ) : (
          <div className="relative flex h-full min-h-52 flex-col items-center justify-center gap-3 px-6 text-center sm:min-h-64">
            <div className="rounded-[1.5rem] bg-card/95 px-5 py-4 shadow-sm ring-1 ring-border">
              <span className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                <Palette className="size-5" aria-hidden="true" />
              </span>
              <p className="max-w-xs text-sm leading-6 text-foreground">
                Add at least two colors to see a live gradient.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
