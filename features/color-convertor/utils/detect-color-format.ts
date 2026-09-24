import type { ColorFormat } from "../types"

const COLOR_INPUT_HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export function detectColorFormat(value: string): ColorFormat | null {
  const trimmed = value.trim().toLowerCase()

  if (COLOR_INPUT_HEX.test(trimmed)) {
    return "hex"
  }

  if (/^rgba?/.test(trimmed)) {
    return "rgb"
  }

  if (/^hsla?/.test(trimmed)) {
    return "hsl"
  }

  if (/^oklch/.test(trimmed)) {
    return "oklch"
  }

  return null
}

/** `<input type="color">` only accepts `#rrggbb`. */
export function toColorInputValue(value: string, fallback = "#000000"): string {
  const match = value.trim().match(COLOR_INPUT_HEX)
  if (!match) return fallback

  const hex = match[1]
  if (hex.length === 6) return `#${hex.toLowerCase()}`

  return `#${hex
    .split("")
    .map((char) => char + char)
    .join("")
    .toLowerCase()}`
}
