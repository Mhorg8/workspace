"use client"

import { ArrowDownToLine } from "lucide-react"

import { Button } from "@/components/ui/button"

import { formatBytes } from "../utils/image-converter.utils"

type ConverterSessionPanelProps = {
  readyCount: number
  totalSaved: number
  onDownloadAll: () => void
}

export function ConverterSessionPanel({
  readyCount,
  totalSaved,
  onDownloadAll,
}: ConverterSessionPanelProps) {
  return (
    <section
      aria-live="polite"
      className="rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
    >
      <p className="text-sm font-medium text-white/80">Session</p>
      <p className="font-heading mt-1 text-2xl font-semibold">{readyCount} ready</p>
      <p className="mt-2 text-sm leading-6 text-white/85">
        {readyCount > 0
          ? `${formatBytes(totalSaved)} saved in this batch.`
          : "Converted files stay in this tab until you download or clear them."}
      </p>
      <Button
        size="lg"
        className="mt-5 h-12 w-full cursor-pointer rounded-full bg-white text-primary hover:bg-white/90"
        disabled={readyCount === 0}
        onClick={onDownloadAll}
      >
        <ArrowDownToLine
          className="size-4"
          aria-hidden="true"
        />
        Download all WebP
      </Button>
    </section>
  )
}
