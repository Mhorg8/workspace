import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ColorFormat } from "../types"
import { FORMAT_OPTIONS } from "../constants"
interface ColorConvertorFormatProps {
  targetFormat: ColorFormat
  setTargetFormat: (format: ColorFormat) => void
  formatId: string
}

const ColorConvertorFormat = ({
  targetFormat,
  setTargetFormat,
  formatId,
}: ColorConvertorFormatProps) => {
  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">Target format</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Choose the format you want to convert into.
        </p>
      </div>

      <fieldset>
        <legend className="sr-only">Target color format</legend>
        <RadioGroup
          value={targetFormat}
          onValueChange={(value) => {
            if (
              typeof value === "string" &&
              FORMAT_OPTIONS.some((option) => option.value === value)
            ) {
              setTargetFormat(value as ColorFormat)
            }
          }}
          className="grid gap-2 sm:grid-cols-2 md:grid-cols-2"
        >
          {FORMAT_OPTIONS.map((option) => {
            const optionId = `${formatId}-${option.value}`
            const isSelected = targetFormat === option.value

            return (
              <Label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-3.5 ring-1 transition-[background-color,box-shadow,color] duration-200",
                  "focus-within:ring-3",
                  isSelected
                    ? "bg-primary text-primary-foreground ring-primary focus-within:ring-primary-foreground/50"
                    : "bg-background/80 text-foreground ring-border hover:ring-primary focus-within:ring-ring/40",
                )}
              >
                <RadioGroupItem
                  id={optionId}
                  value={option.value}
                  className="sr-only"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span
                    className={cn(
                      "block text-xs font-normal leading-5",
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground",
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
    </section>
  )
}

export default ColorConvertorFormat
