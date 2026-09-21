import type { GradientKind } from "../types"

import { DEFAULT_ANGLE } from "../constants"

export function buildGradientCss(kind: GradientKind, colors: string[]): string | null {
  if (colors.length === 0) {
    return null
  }

  if (colors.length === 1) {
    return colors[0]
  }

  const stops = colors.join(", ")

  switch (kind) {
    case "linear":
      return `linear-gradient(${DEFAULT_ANGLE}deg, ${stops})`
    case "radial":
      return `radial-gradient(circle, ${stops})`
    case "conic":
      return `conic-gradient(from ${DEFAULT_ANGLE}deg, ${stops})`
  }
}

export function toBackgroundDeclaration(css: string): string {
  return `background: ${css};`
}
