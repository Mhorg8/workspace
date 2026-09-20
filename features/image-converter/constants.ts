export const MAX_QUEUE_FILES = 12
export const MAX_FILE_BYTES = 8 * 1024 * 1024
export const MIN_QUALITY = 50
export const MAX_QUALITY = 100
export const DEFAULT_QUALITY = 80
export const MAX_INPUT_PIXELS = 40_000_000
export const SVG_DENSITY = 144
export const DOWNLOAD_STAGGER_MS = 180

export const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
] as const

export const DROPZONE_ACCEPT = {
  "image/png": [".png"],
  "image/svg+xml": [".svg"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
} as const
