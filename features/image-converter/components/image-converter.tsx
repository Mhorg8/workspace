"use client"

import { useId } from "react"

import { Toaster } from "@/components/ui/toast"

import { useImageConverter } from "../hooks/use-image-converter"
import { ConverterDropZone } from "./converter-drop-zone"
import { ConverterQualityPanel } from "./converter-quality-panel"
import { ConverterQueue } from "./converter-queue"
import { ConverterSessionPanel } from "./converter-session-panel"

function ImageConverterWorkspace() {
  const qualityId = useId()
  const converter = useImageConverter()

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <ConverterDropZone dropzone={converter.dropzone} isBusy={converter.isBusy} />

      <aside className="flex flex-col gap-5 lg:col-span-4">
        <ConverterQualityPanel
          qualityId={qualityId}
          quality={converter.quality}
          isBusy={converter.isBusy}
          readyCount={converter.readyCount}
          onQualityChange={converter.changeQuality}
          onConvert={() => void converter.convertQueue()}
        />
        <ConverterSessionPanel
          readyCount={converter.doneItems.length}
          totalSaved={converter.totalSaved}
          onDownloadAll={converter.downloadAll}
        />
      </aside>

      <ConverterQueue
        items={converter.items}
        isBusy={converter.isBusy}
        overallProgress={converter.overallProgress}
        onClearAll={converter.clearAll}
        onRemove={converter.removeItem}
        onRetry={(item) => void converter.convertItem(item)}
        onDownload={converter.downloadItem}
      />
    </div>
  )
}

export function ImageConverter() {
  return (
    <Toaster>
      <ImageConverterWorkspace />
    </Toaster>
  )
}
