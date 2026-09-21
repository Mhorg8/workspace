"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

type ImageGradientSessionPanelProps = {
  hasImage: boolean
  generated: boolean
  kindLabel: string
  canCopy: boolean
  onCopy: () => void
}

export function ImageGradientSessionPanel({
  hasImage,
  generated,
  kindLabel,
  canCopy,
  onCopy,
}: ImageGradientSessionPanelProps) {
  const title = generated ? `${kindLabel} ready` : hasImage ? "Image loaded" : "Waiting for a photo"
  const body = generated
    ? "Copy the CSS background value. Nothing is stored."
    : hasImage
      ? "Pick a type, then generate a gradient from this image."
      : "Drop a photo on the left. Colors stay in this tab."

  return (
    <section
      aria-live="polite"
      className="h-fit rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
    >
      <p className="text-sm font-medium text-white/80">Session</p>
      <p className="font-heading mt-1 text-2xl font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/85">{body}</p>
      <Button
        size="lg"
        className="mt-5 h-12 w-full cursor-pointer rounded-full bg-white text-primary hover:bg-white/90 disabled:bg-white/70"
        disabled={!canCopy}
        onClick={() => void onCopy()}
      >
        <Copy className="size-4" aria-hidden="true" />
        Copy CSS
      </Button>
    </section>
  )
}
