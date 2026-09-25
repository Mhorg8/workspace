export function hexToRgba(hex: string): string {
  const value = hex.replace("#", "")

  const normalizedHex =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value

  console.log(normalizedHex)

  return ""
}

export function convertHexToDecimal(hex: string): string {
  const value = hex.replace("#", "")

  if (value.length >= 3) {
    const normalizedHex = value
      .split("")
      .map((char) => char + char)
      .join("")
    const r = parseInt(normalizedHex.slice(0, 2), 16)
    const g = parseInt(normalizedHex.slice(2, 4), 16)
    const b = parseInt(normalizedHex.slice(4, 6), 16)

    return `${r},${g},${b}`
  } else {
    const r = value.slice(0, 2)
    const g = value.slice(2, 4)
    const b = value.slice(4, 6)

    return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`
  }
}
