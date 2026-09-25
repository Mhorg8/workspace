"use client"

import { Blend, CircleDot, Sun } from "lucide-react"
import { useId } from "react"
import type { LucideIcon } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

import { isGradientKind, type GradientKind } from "../types"

type CssGradiantTypeControlProps = {
  kind: GradientKind
  onKindChange: (kind: GradientKind) => void
}

const kindOptions: { value: GradientKind; label: string; hint: string; icon: LucideIcon }[] = [
  { value: "linear", label: "Linear", hint: "Straight blend", icon: Blend },
  { value: "radial", label: "Radial", hint: "From the center", icon: CircleDot },
  { value: "conic", label: "Conic", hint: "Around a point", icon: Sun },
]

export function CssGradiantTypeControl({ kind, onKindChange }: CssGradiantTypeControlProps) {
  const typeId = useId()

  function handleKindChange(value: unknown) {
    if (typeof value === "string" && isGradientKind(value)) {
      onKindChange(value)
    }
  }

  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">Gradient type</legend>
      <RadioGroup
        value={kind}
        onValueChange={handleKindChange}
        className="grid gap-2 sm:grid-cols-3"
      >
        {kindOptions.map((option) => {
          const optionId = `${typeId}-${option.value}`
          const selected = kind === option.value

          return (
            <Label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-3.5 ring-1 transition-[background-color,box-shadow,color] duration-200",
                "focus-within:ring-3",
                selected
                  ? "bg-primary text-primary-foreground ring-primary focus-within:ring-primary-foreground/50"
                  : "bg-background/80 text-foreground ring-border hover:ring-primary focus-within:ring-ring/40",
              )}
            >
              <RadioGroupItem
                id={optionId}
                value={option.value}
                className="sr-only"
              />
              <option.icon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span
                  className={cn(
                    "block text-xs font-normal leading-5",
                    selected ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {option.hint}
                </span>
              </span>
            </Label>
          )
        })}
      </RadioGroup>
    </fieldset>
  )
}
