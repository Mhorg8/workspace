import type { GradientKind } from "../types"

type BuildGradientCssInput = {
  kind: GradientKind
  colors: string[]
  angle: number
}

export function buildGradientCss({ kind, colors, angle }: BuildGradientCssInput): string | null {
  if (colors.length === 0) {
    return null
  }

  if (colors.length === 1) {
    return colors[0]
  }

  const stops = colors.join(", ")

  switch (kind) {
    case "linear":
      return `linear-gradient(${angle}deg, ${stops})`
    case "radial":
      return `radial-gradient(circle, ${stops})`
    case "conic":
      return `conic-gradient(from ${angle}deg, ${stops})`
  }
}

export function toBackgroundDeclaration(css: string): string {
  return `background: ${css};`
}
