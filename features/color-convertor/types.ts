export type ColorFormatOption = {
  value: ColorFormat
  label: string
  hint: string
}

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"

export type HexNumber = {
  value: string
  label: string
}
