"use client"

import type { DropzoneState } from "react-dropzone"

import type { GradientKind } from "../types"

import { FormatChip } from "./format-chip"
import { ImageDropzone } from "./image-dropzone"
import { ImageGradientCodePanel } from "./image-gradient-code-panel"
import { ImageGradientPalette } from "./image-gradient-palette"
import { ImageGradientPreview } from "./image-gradient-preview"
import { ImagePreview } from "./image-preview"

type ImageGradientSourcePanelProps = {
  dropzone: DropzoneState
  isBusy: boolean
  previewUrl: string | null
  generated: boolean
  css: string | null
  previewLabel: string
  canCopy: boolean
  onCopy: () => void
  colors: string[]
  kind: GradientKind
  removeColor: (color: string) => void
}

export function ImageGradientSourcePanel({
  dropzone,
  isBusy,
  previewUrl,
  generated,
  css,
  previewLabel,
  canCopy,
  onCopy,
  colors,
  kind,
  removeColor,
}: ImageGradientSourcePanelProps) {
  return (
    <section id="image-gradient" className="input-panel-wrapper col-span-12 md:col-span-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Image Gradient</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Photo in. CSS blend out.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <FormatChip label="PNG" tone="rose" />
            <FormatChip label="JPG" tone="blue" />
            <FormatChip label="CSS" tone="violet" />
          </div>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          Drop a photo, pick linear, radial, or conic, and copy a background that follows the image.
        </p>

        {previewUrl ? (
          <ImagePreview previewUrl={previewUrl} dropzone={dropzone} isBusy={isBusy} />
        ) : (
          <ImageDropzone dropzone={dropzone} isBusy={isBusy} />
        )}

        <ImageGradientPalette generated={generated} colors={colors} removeColor={removeColor} />
        <ImageGradientPreview
          label={previewLabel}
          colors={generated ? colors : []}
          kind={kind}
         
        />
        <ImageGradientCodePanel css={css} canCopy={canCopy} onCopy={onCopy} />
      </div>
    </section>
  )
}
