"use client"

import { Plus, X } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { useAddColor } from "../hooks/use-add-color"

type AddColorPanelProps = {
  colors: string[]
  setColors: Dispatch<SetStateAction<string[]>>
}

export function AddColorPanel({ colors, setColors }: AddColorPanelProps) {
  const {
    colorId,
    hexId,
    color,
    hex,
    error,
    isHexColor,
    resetForm,
    handleRemoveColor,
    handleSwatchChange,
    handleHexChange,
    handleSubmit,
  } = useAddColor({ setColors })

  const canAdd = isHexColor(hex)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold">Color stops</h3>
        <p className="text-xs leading-5 text-muted-foreground">
          {colors.length === 0 ? "None yet" : `${colors.length} added`}
        </p>
      </div>

      {colors.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {colors.map((stop, index) => (
            <li
              key={`${stop}-${index}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-muted py-1 pl-3 pr-1 ring-1 ring-border"
            >
              <span
                aria-hidden="true"
                className="size-4 rounded-full ring-1 ring-foreground/10"
                style={{ backgroundColor: stop }}
              />
              <span className="font-mono text-xs font-medium">{stop}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 cursor-pointer rounded-full"
                aria-label={`Remove ${stop}`}
                onClick={() => handleRemoveColor(index)}
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-muted-foreground">
          No colors yet. Add the first gradient stop below.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-[1.6rem] border-2 border-border bg-background/80 p-5"
      >
        <div>
          <h3 className="font-heading text-lg font-semibold">Add a color</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Pick a swatch or type the hex. Both stay in sync so the value is never color-only.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="grid gap-2 place-items-center">
            <Label htmlFor={colorId}>Swatch</Label>
            <label className="relative size-14 cursor-pointer overflow-hidden rounded-2xl ring-1 ring-border transition-shadow duration-200 hover:ring-primary focus-within:ring-3 focus-within:ring-ring/40">
              <input
                id={colorId}
                type="color"
                value={color}
                aria-label="Color swatch"
                onChange={(event) => handleSwatchChange(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <span
                aria-hidden="true"
                className="block size-full"
                style={{ backgroundColor: color }}
              />
            </label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={hexId}>Hex</Label>
            <Input
              id={hexId}
              value={hex}
              aria-invalid={error !== null}
              aria-describedby={error ? `${hexId}-error` : `${hexId}-help`}
              onChange={(event) => handleHexChange(event.target.value)}
              placeholder="#E11D48"
              className={cn(
                "h-11 cursor-text font-mono",
                error && "border-destructive focus-visible:border-destructive",
              )}
            />
            <p id={`${hexId}-help`} className="text-xs leading-5 text-muted-foreground">
              Use 6 digits, including the #.
            </p>
          </div>
        </div>

        {error ? (
          <p id={`${hexId}-error`} role="alert" className="text-sm leading-6 text-destructive">
            {error}
          </p>
        ) : null}

        <div
          aria-hidden="true"
          className="h-14 rounded-2xl ring-1 ring-border transition-[background-color] duration-200"
          style={{ backgroundColor: canAdd ? hex : color }}
        />

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 cursor-pointer rounded-full px-5"
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 cursor-pointer rounded-full px-5"
            disabled={!canAdd}
          >
            <Plus aria-hidden="true" />
            Add color
          </Button>
        </div>
      </form>
    </div>
  )
}
