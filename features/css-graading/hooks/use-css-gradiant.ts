"use client"

import { useState } from "react"

import { toast } from "@/components/ui/toast"

import { DEFAULT_ANGLE } from "../constants"
import type { GradientKind } from "../types"
import { buildGradientCss, toBackgroundDeclaration } from "../utils/build-gradient-css"

export function useCssGradiant() {
  const [colors, setColors] = useState<string[]>([])
  const [kind, setKind] = useState<GradientKind>("linear")
  const [angle, setAngle] = useState(DEFAULT_ANGLE)

  const css = buildGradientCss({ kind, colors, angle })
  const canCopy = colors.length >= 2 && css !== null
  const usesAngle = kind !== "radial"

  async function copyCss() {
    if (!css || !canCopy) {
      toast.add({
        type: "info",
        title: "Nothing to copy",
        description: "Add at least two colors to generate a gradient.",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(toBackgroundDeclaration(css))
      toast.add({
        type: "success",
        title: "Copied",
        description: "Gradient CSS copied to the clipboard.",
      })
    } catch {
      toast.add({
        type: "error",
        title: "Copy failed",
        description: "Could not copy the CSS. Try selecting it instead.",
      })
    }
  }

  return {
    colors,
    setColors,
    kind,
    setKind,
    angle,
    setAngle,
    css,
    canCopy,
    usesAngle,
    copyCss,
  }
}
