"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"

import { toast } from "@/components/ui/toast"

import { convertImageAction } from "../api/convert-image.action"
import {
  DEFAULT_QUALITY,
  DOWNLOAD_STAGGER_MS,
  DROPZONE_ACCEPT,
  MAX_FILE_BYTES,
  MAX_QUEUE_FILES,
} from "../constants"
import { clampQuality } from "../schemas/image-converter.schema"
import type { QueueItem } from "../types/image-converter.types"
import { downloadFile } from "../utils/download-file"
import {
  createQueueItem,
  getOverallProgress,
  getTotalSavedBytes,
  isCompletedItem,
  isPendingItem,
  patchQueueItem,
  resetConvertedItems,
  takeQueueFiles,
} from "../utils/image-converter.utils"

type DropRejectedFile = {
  file: File
}

function revokePreview(item: QueueItem): void {
  URL.revokeObjectURL(item.previewUrl)
}

export function useImageConverter() {
  const [quality, setQuality] = useState(DEFAULT_QUALITY)
  const [items, setItems] = useState<QueueItem[]>([])

  const convertingCount = items.filter((item) => item.status === "converting").length
  const readyCount = items.filter(isPendingItem).length
  const doneItems = items.filter(isCompletedItem)
  const isBusy = convertingCount > 0
  const overallProgress = useMemo(() => getOverallProgress(items), [items])
  const totalSaved = useMemo(() => getTotalSavedBytes(doneItems), [doneItems])

  useEffect(() => {
    return () => {
      items.forEach(revokePreview)
    }
    // Revoke leftover previews only when the converter unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFiles = useCallback((files: File[]) => {
    let overflowed = false

    setItems((current) => {
      const selection = takeQueueFiles(files, current.length)
      overflowed = selection.overflowed

      return [
        ...current,
        ...selection.accepted.map((file) => createQueueItem(file, URL.createObjectURL(file))),
      ]
    })

    return overflowed
  }, [])

  const onDrop = useCallback(
    (accepted: File[], rejected: DropRejectedFile[]) => {
      if (rejected.length > 0) {
        toast.add({
          type: "error",
          title: "Some files were skipped",
          description: "Use PNG or SVG images up to 8 MB.",
        })
      }

      if (accepted.length === 0) {
        return
      }

      const overflowed = addFiles(accepted)
      if (overflowed) {
        toast.add({
          type: "warning",
          title: "Queue is full",
          description: `You can convert up to ${MAX_QUEUE_FILES} images at once.`,
        })
      }
    },
    [addFiles],
  )

  const dropzone = useDropzone({
    onDrop,
    accept: DROPZONE_ACCEPT,
    maxSize: MAX_FILE_BYTES,
    maxFiles: MAX_QUEUE_FILES,
    disabled: isBusy,
    multiple: true,
    noKeyboard: true,
  })

  const updateItem = (id: string, patch: Partial<QueueItem>) => {
    setItems((current) => patchQueueItem(current, id, patch))
  }

  const removeItem = (id: string) => {
    setItems((current) => {
      const match = current.find((item) => item.id === id)
      if (match) {
        revokePreview(match)
      }

      return current.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    setItems((current) => {
      current.forEach(revokePreview)
      return []
    })
  }

  const convertItem = async (item: QueueItem) => {
    updateItem(item.id, { status: "converting", error: undefined })

    const formData = new FormData()
    formData.append("file", item.file)
    formData.append("quality", String(quality))

    const result = await convertImageAction(formData)

    if (!result.ok) {
      updateItem(item.id, { status: "error", error: result.error })
      return
    }

    updateItem(item.id, { status: "done", result })
  }

  const convertQueue = async () => {
    const pending = items.filter(isPendingItem)

    if (pending.length === 0) {
      toast.add({
        type: "info",
        title: "Nothing to convert",
        description: "Drop a PNG or SVG to get started.",
      })
      return
    }

    for (const item of pending) {
      await convertItem(item)
    }

    toast.add({
      type: "success",
      title: "Conversion finished",
      description: "Your WebP files are ready to download.",
    })
  }

  const downloadItem = (item: QueueItem) => {
    if (!isCompletedItem(item)) {
      return
    }

    downloadFile(item.result.dataUrl, item.result.filename)
  }

  const downloadAll = () => {
    doneItems.forEach((item, index) => {
      window.setTimeout(() => {
        downloadFile(item.result.dataUrl, item.result.filename)
      }, index * DOWNLOAD_STAGGER_MS)
    })
  }

  const changeQuality = (nextQuality: number) => {
    setQuality(clampQuality(nextQuality))
    setItems(resetConvertedItems)
  }

  return {
    quality,
    items,
    isBusy,
    readyCount,
    doneItems,
    overallProgress,
    totalSaved,
    dropzone,
    changeQuality,
    removeItem,
    clearAll,
    convertItem,
    convertQueue,
    downloadItem,
    downloadAll,
  }
}
