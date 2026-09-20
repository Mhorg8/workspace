export type QueueStatus = "ready" | "converting" | "done" | "error"

export type ConvertSuccess = {
  ok: true
  filename: string
  dataUrl: string
  originalSize: number
  convertedSize: number
  width: number
  height: number
}

export type ConvertFailure = {
  ok: false
  error: string
}

export type ConvertResult = ConvertSuccess | ConvertFailure

export type QueueItem = {
  id: string
  file: File
  previewUrl: string
  status: QueueStatus
  error?: string
  result?: ConvertSuccess
}

export type ConvertImageInput = {
  buffer: Buffer
  filename: string
  originalSize: number
  quality: number
}

export type ConvertImageOutput = {
  filename: string
  dataUrl: string
  originalSize: number
  convertedSize: number
  width: number
  height: number
}

export type FileValidationResult = { ok: true } | { ok: false; error: string }
