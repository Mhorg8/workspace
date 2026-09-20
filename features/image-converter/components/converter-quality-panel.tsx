"use client"

import { Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

import { MAX_QUALITY, MIN_QUALITY } from "../constants"

type ConverterQualityPanelProps = {
  qualityId: string
  quality: number
  isBusy: boolean
  readyCount: number
  onQualityChange: (quality: number) => void
  onConvert: () => void
}

export function ConverterQualityPanel({
  qualityId,
  quality,
  isBusy,
  readyCount,
  onQualityChange,
  onConvert,
}: ConverterQualityPanelProps) {
  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-4">
        <label htmlFor={qualityId} className="font-heading text-lg font-semibold">
          WebP quality
        </label>
        <p id={`${qualityId}-help`} className="mt-1 text-sm leading-6 text-muted-foreground">
          Higher quality keeps more detail and a larger file.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{MIN_QUALITY}</span>
        <span className="font-heading text-3xl font-semibold tabular-nums text-primary">
          {quality}
        </span>
        <span className="text-sm font-medium text-muted-foreground">{MAX_QUALITY}</span>
      </div>

      <input
        id={qualityId}
        type="range"
        min={MIN_QUALITY}
        max={MAX_QUALITY}
        step={1}
        value={quality}
        disabled={isBusy}
        aria-describedby={`${qualityId}-help`}
        aria-valuetext={`${quality} percent`}
        onChange={(event) => onQualityChange(Number(event.target.value))}
        className="quality-slider w-full"
      />

      <Button
        size="lg"
        className="mt-5 h-12 w-full cursor-pointer rounded-full text-base"
        disabled={isBusy || readyCount === 0}
        onClick={onConvert}
      >
        {isBusy ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Sparkles className="size-4" aria-hidden="true" />
        )}
        {isBusy
          ? "Converting…"
          : readyCount > 0
            ? `Convert ${readyCount} to WebP`
            : "Convert to WebP"}
      </Button>
    </section>
  )
}
