"use server"

import sharp from "sharp"

const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIME = new Set([
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
])

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

function inferMime(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase()

  switch (ext) {
    case "png":
      return "image/png"
    case "svg":
      return "image/svg+xml"
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "gif":
      return "image/gif"
    case "webp":
      return "image/webp"
    default:
      return ""
  }
}

function clampQuality(value: number): number {
  if (!Number.isFinite(value)) {
    return 80
  }

  return Math.min(100, Math.max(50, Math.round(value)))
}

function toWebpName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim() || "image"
  return `${base}.webp`
}

export async function convertToWebp(formData: FormData): Promise<ConvertResult> {
  const file = formData.get("file")
  const quality = clampQuality(Number(formData.get("quality")))

  if (!(file instanceof File)) {
    return { ok: false, error: "Choose a PNG or SVG image to convert." }
  }

  if (file.size === 0) {
    return { ok: false, error: "That file is empty. Try another image." }
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Images must be 8 MB or smaller." }
  }

  const mime = file.type || inferMime(file.name)

  if (!ALLOWED_MIME.has(mime)) {
    return { ok: false, error: "Use PNG or SVG files (JPG and GIF also work)." }
  }

  try {
    const input = Buffer.from(await file.arrayBuffer())
    const image = sharp(input, {
      animated: false,
      density: 144,
      limitInputPixels: 40_000_000,
    }).rotate()

    const meta = await image.metadata()
    const webp = await image.clone().webp({ quality, effort: 4 }).toBuffer()

    return {
      ok: true,
      filename: toWebpName(file.name),
      dataUrl: `data:image/webp;base64,${webp.toString("base64")}`,
      originalSize: file.size,
      convertedSize: webp.length,
      width: meta.width ?? 0,
      height: meta.height ?? 0,
    }
  } catch {
    return {
      ok: false,
      error: "Could not convert this file. Try a different PNG or SVG.",
    }
  }
}
