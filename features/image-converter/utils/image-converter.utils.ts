import { MAX_QUEUE_FILES } from "../constants"
import type { ConvertSuccess, QueueItem } from "../types/image-converter.types"

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B"
  }

  const units = ["B", "KB", "MB"]
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** exponent

  return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`
}

export function savingsPercent(original: number, converted: number): number {
  if (original <= 0) {
    return 0
  }

  return Math.round(((original - converted) / original) * 100)
}

export function getSavingsLabel(percent: number): string {
  if (percent > 0) {
    return `${percent}% smaller`
  }

  if (percent < 0) {
    return `${Math.abs(percent)}% larger`
  }

  return "Converted"
}

export function toWebpFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim() || "image"
  return `${base}.webp`
}

export function createQueueId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function createQueueItem(file: File, previewUrl: string): QueueItem {
  return {
    id: createQueueId(),
    file,
    previewUrl,
    status: "ready",
  }
}

export function getQueueRoom(currentCount: number): number {
  return Math.max(MAX_QUEUE_FILES - currentCount, 0)
}

export function takeQueueFiles(
  files: File[],
  currentCount: number,
): {
  accepted: File[]
  overflowed: boolean
} {
  const room = getQueueRoom(currentCount)
  return {
    accepted: files.slice(0, room),
    overflowed: files.length > room,
  }
}

export function isPendingItem(item: QueueItem): boolean {
  return item.status === "ready" || item.status === "error"
}

export function isCompletedItem(item: QueueItem): item is QueueItem & { result: ConvertSuccess } {
  return item.status === "done" && item.result !== undefined
}

export function getOverallProgress(items: QueueItem[]): number {
  if (items.length === 0) {
    return 0
  }

  const finished = items.filter((item) => item.status === "done" || item.status === "error").length

  return Math.round((finished / items.length) * 100)
}

export function getTotalSavedBytes(items: QueueItem[]): number {
  return items.filter(isCompletedItem).reduce((sum, item) => {
    return sum + Math.max(0, item.result.originalSize - item.result.convertedSize)
  }, 0)
}

export function resetConvertedItems(items: QueueItem[]): QueueItem[] {
  return items.map((item) =>
    item.status === "done" ? { ...item, status: "ready", result: undefined } : item,
  )
}

export function patchQueueItem(
  items: QueueItem[],
  id: string,
  patch: Partial<QueueItem>,
): QueueItem[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item))
}
