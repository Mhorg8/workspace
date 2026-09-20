import sharp from "sharp"

import { MAX_INPUT_PIXELS, SVG_DENSITY } from "../constants"
import type { ConvertImageInput, ConvertImageOutput } from "../types/image-converter.types"
import { toWebpFilename } from "../utils/image-converter.utils"

export async function convertImageToWebp(input: ConvertImageInput): Promise<ConvertImageOutput> {
  const image = sharp(input.buffer, {
    animated: false,
    density: SVG_DENSITY,
    limitInputPixels: MAX_INPUT_PIXELS,
  }).rotate()

  const metadata = await image.metadata()
  const webp = await image.clone().webp({ quality: input.quality, effort: 4 }).toBuffer()

  return {
    filename: toWebpFilename(input.filename),
    dataUrl: `data:image/webp;base64,${webp.toString("base64")}`,
    originalSize: input.originalSize,
    convertedSize: webp.length,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  }
}
