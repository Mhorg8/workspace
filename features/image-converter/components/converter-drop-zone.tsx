"use client"

import { ImagePlus } from "lucide-react"
import type { DropzoneState } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { MAX_QUEUE_FILES } from "../constants"

type ConverterDropZoneProps = {
  dropzone: DropzoneState
  isBusy: boolean
}

function FormatChip({ label, tone }: { label: string; tone: "rose" | "blue" | "violet" }) {
  const tones = {
    rose: "bg-[#ffe4e6] text-[#9f1239]",
    blue: "bg-[#dbeafe] text-[#1e3a8a]",
    violet: "bg-[#ede9fe] text-[#5b21b6]",
  }

  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{label}</span>
  )
}

export function ConverterDropZone({ dropzone, isBusy }: ConverterDropZoneProps) {
  const { getRootProps, getInputProps, isDragActive, open } = dropzone

  return (
    <section
      id="converter"
      className="relative overflow-hidden rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-8 lg:col-span-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Drop zone</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              PNG & SVG in. WebP out.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <FormatChip
              label="PNG"
              tone="rose"
            />
            <FormatChip
              label="SVG"
              tone="blue"
            />
            <FormatChip
              label="WebP"
              tone="violet"
            />
          </div>
        </div>

        <div
          {...getRootProps({
            "aria-label": "Upload PNG or SVG images",
            className: cn(
              "flex min-h-56 cursor-pointer flex-col items-center justify-center gap-4 rounded-[1.6rem] border-2 border-dashed px-6 py-10 text-center transition-all duration-200",
              "touch-manipulation outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
              isDragActive
                ? "scale-[1.01] border-accent bg-accent/8"
                : "border-border bg-background/80 hover:border-primary hover:bg-primary/5",
              isBusy && "cursor-not-allowed opacity-60",
            ),
          })}
        >
          <input {...getInputProps()} />
          <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <ImagePlus
              className="size-7"
              aria-hidden="true"
            />
          </span>
          <div className="space-y-1">
            <p className="font-heading text-lg font-semibold">
              {isDragActive ? "Drop images to convert" : "Drag images here or browse"}
            </p>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              PNG and SVG up to 8 MB. Add up to {MAX_QUEUE_FILES} files, then convert them to WebP.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-12 cursor-pointer rounded-full px-5"
            disabled={isBusy}
            onClick={(event) => {
              event.stopPropagation()
              open()
            }}
          >
            Browse files
          </Button>
        </div>
      </div>
    </section>
  )
}
