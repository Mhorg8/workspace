"use client"

import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

import { DROPZONE_ACCEPT, MAX_FILE_BYTES } from "../constants"
import type { GradientKind } from "../types"
import { buildGradientCss } from "../utils/sample-gradient-css"

export function useImageGradient() {
  const [isBusy] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [kind, setKind] = useState<GradientKind>("linear")
  const [generated, setGenerated] = useState(false)
  const [colors, setColors] = useState<string[]>([])

  const dropzone = useDropzone({
    accept: DROPZONE_ACCEPT,
    maxSize: MAX_FILE_BYTES,
    maxFiles: 1,
    disabled: isBusy,
    multiple: false,
    onDrop,
  })

  function onDrop(acceptedFiles: File[]) {
    const file = acceptedFiles[0]
    if (!file) {
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
    setGenerated(false)
    extractColorPaletter(file).then((data) => {
      setColors(data)
    })
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  function generate() {
    if (!previewUrl) {
      return
    }

    setGenerated(true)
  }

  async function extractColorPaletter(file: File, colorCount = 6): Promise<string[]> {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    try {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = reject
        image.src = objectUrl
      })

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Failed to get canvas context")
      }

      const maxSize = 200
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height))

      canvas.width = Math.floor(image.width * scale)
      canvas.height = Math.floor(image.height * scale)

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const pixels = imageData.data

      const colorMap = new Map<string, number>()
      const bucketSize = 16

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        const alpha = pixels[i + 3]

        if (alpha < 128) continue

        const qr = Math.floor(r / bucketSize) * bucketSize
        const qg = Math.floor(g / bucketSize) * bucketSize
        const qb = Math.floor(b / bucketSize) * bucketSize

        const key = `${qr},${qg},${qb}`
        colorMap.set(key, (colorMap.get(key) ?? 0) + 1)
      }

      const totalPixels = Array.from(colorMap.values()).reduce((sum, count) => sum + count, 0)

      return Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([key, count]) => {
          const [r, g, b] = key.split(",").map(Number)
          return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
        })
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  }

  function removeColor(color: string) {
    setColors(colors.filter((c) => c !== color))
  }

  return {
    dropzone,
    isBusy,
    previewUrl,
    kind,
    setKind,
    generated,
    css: generated ? buildGradientCss(kind, colors) : null,
    canGenerate: previewUrl !== null,
    canCopy: generated,
    generate,
    colors,
    removeColor,
  }
}
