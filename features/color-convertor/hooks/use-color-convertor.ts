import { useCallback, useEffect, useMemo, useState } from "react"

import type { ColorFormat } from "../types"
import { detectColorFormat } from "../utils/detect-color-format"
import { convertHexToDecimal } from "../utils/hex-to-rgba"

const DEFAULT_COLOR = "#2563eb"

export const useColorConvertor = () => {
  const [sourceColor, setSourceColor] = useState(DEFAULT_COLOR)
  const [convertedColor, setConvertedColor] = useState(DEFAULT_COLOR)
  const [targetFormat, setTargetFormat] = useState<ColorFormat>("rgb")

  const sourceFormat = useMemo(() => detectColorFormat(sourceColor), [sourceColor])

  useEffect(() => {
    if (targetFormat === "rgb" && sourceFormat === "hex") {
      setConvertedColor(`rgb(${convertHexToDecimal(sourceColor)})`)
    }
  }, [sourceFormat, sourceColor])

  return {
    sourceColor,
    setSourceColor,
    convertedColor,
    setConvertedColor,
    sourceFormat,
    targetFormat,
    setTargetFormat,
  }
}
