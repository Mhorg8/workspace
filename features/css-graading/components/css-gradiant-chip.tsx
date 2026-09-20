import { cn } from "@/lib/utils"

type GradientChipProps = {
  label: string
  tone: "rose" | "blue" | "violet"
}

const tones = {
  rose: "bg-[#ffe4e6] text-[#9f1239]",
  blue: "bg-[#dbeafe] text-[#1e3a8a]",
  violet: "bg-[#ede9fe] text-[#5b21b6]",
}

export function GradientChip({ label, tone }: GradientChipProps) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{label}</span>
  )
}
