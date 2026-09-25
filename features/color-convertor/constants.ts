import { ColorFormatOption, HexNumber } from "./types"

export const FORMAT_OPTIONS: ColorFormatOption[] = [
  { value: "hex", label: "HEX", hint: "#RRGGBB" },
  { value: "rgb", label: "RGB", hint: "rgb(r, g, b)" },
  { value: "hsl", label: "HSL", hint: "hsl(h, s%, l%)" },
  { value: "oklch", label: "OKLCH", hint: "oklch(l c h)" },
]

export const HEX_NUMBERS: HexNumber[] = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "A",
    label: "10",
  },
  {
    value: "B",
    label: "11",
  },
  {
    value: "C",
    label: "12",
  },
  {
    value: "D",
    label: "13",
  },
  {
    value: "E",
    label: "14",
  },
  {
    value: "F",
    label: "15",
  },
]
