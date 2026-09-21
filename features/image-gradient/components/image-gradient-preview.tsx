import { Blend } from "lucide-react"

import type { GradientKind } from "../types"
import { buildGradientCss } from "../utils/sample-gradient-css"

type ImageGradientPreviewProps = {
  label: string
  colors: string[]
  kind: GradientKind
}

export function ImageGradientPreview({ label, colors, kind }: ImageGradientPreviewProps) {
  const gradient = buildGradientCss(kind, colors)

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Live preview</p>
        <p className="text-xs leading-5 text-muted-foreground">
          {gradient ? label : "Waiting for generate"}
        </p>
      </div>

      <div
        role="img"
        aria-label={
          gradient
            ? `Live preview of ${label}`
            : "Empty gradient preview. Generate to see the blend."
        }
        className="relative isolate min-h-48 overflow-hidden rounded-[1.6rem] ring-1 ring-border sm:min-h-56 "
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "repeating-conic-gradient(var(--border) 0% 25%, var(--card) 0% 50%)",
            backgroundSize: "1.25rem 1.25rem",
          }}
        />
        {gradient ? (
          <div aria-hidden="true" className="absolute inset-0" style={{ background: gradient }} />
        ) : (
          <div className="relative flex h-full min-h-48 items-center justify-center px-6 text-center sm:min-h-56">
            <div className="rounded-[1.5rem] bg-card/95 px-5 py-4 shadow-sm ring-1 ring-border">
              <span className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                <Blend className="size-5" aria-hidden="true" />
              </span>
              <p className="max-w-xs text-sm leading-6 text-foreground">
                Upload a photo, pick a type, then generate to preview the CSS blend.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
