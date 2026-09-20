const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

export const DEFAULT_COLOR = "#e11d48"

export function normalizeHex(value: string): string {
  const trimmed = value.trim()
  if (trimmed.startsWith("#")) {
    return trimmed
  }

  return `#${trimmed}`
}

export function isHexColor(value: string): boolean {
  return HEX_PATTERN.test(value)
}
