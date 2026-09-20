import {
  ALLOWED_MIME_TYPES,
  DEFAULT_QUALITY,
  MAX_FILE_BYTES,
  MAX_QUALITY,
  MIN_QUALITY,
} from "../constants"
import type { FileValidationResult } from "../types/image-converter.types"

const MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
}

export function inferMimeType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase()
  if (!extension) {
    return ""
  }

  return MIME_BY_EXTENSION[extension] ?? ""
}

export function isAllowedMimeType(mimeType: string): boolean {
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)
}

export function clampQuality(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_QUALITY
  }

  return Math.min(MAX_QUALITY, Math.max(MIN_QUALITY, Math.round(value)))
}

export function parseQuality(value: unknown): number {
  return clampQuality(Number(value))
}

export function validateConvertFile(file: File): FileValidationResult {
  if (file.size === 0) {
    return { ok: false, error: "That file is empty. Try another image." }
  }

  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "Images must be 8 MB or smaller." }
  }

  const mimeType = file.type || inferMimeType(file.name)
  if (!isAllowedMimeType(mimeType)) {
    return { ok: false, error: "Use PNG or SVG files (JPG and GIF also work)." }
  }

  return { ok: true }
}
