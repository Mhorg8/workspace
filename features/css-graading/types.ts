export const GRADIENT_KINDS = ["linear", "radial", "conic"] as const

export type GradientKind = (typeof GRADIENT_KINDS)[number]

export function isGradientKind(value: string): value is GradientKind {
  return GRADIENT_KINDS.includes(value as GradientKind)
}
