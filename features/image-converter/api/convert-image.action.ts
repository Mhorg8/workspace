"use server"

import { parseQuality, validateConvertFile } from "../schemas/image-converter.schema"
import type { ConvertResult } from "../types/image-converter.types"
import { convertImageToWebp } from "./image-converter.repository"

export async function convertImageAction(formData: FormData): Promise<ConvertResult> {
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return { ok: false, error: "Choose a PNG or SVG image to convert." }
  }

  const validation = validateConvertFile(file)
  if (!validation.ok) {
    return validation
  }

  const quality = parseQuality(formData.get("quality"))

  try {
    const output = await convertImageToWebp({
      buffer: Buffer.from(await file.arrayBuffer()),
      filename: file.name,
      originalSize: file.size,
      quality,
    })

    return { ok: true, ...output }
  } catch {
    return {
      ok: false,
      error: "Could not convert this file. Try a different PNG or SVG.",
    }
  }
}
