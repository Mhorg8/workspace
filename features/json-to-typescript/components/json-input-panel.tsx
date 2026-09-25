"use client"

import { cn } from "@/lib/utils"

type JsonInputPanelProps = {
  inputId: string
  json: string
  hasError: boolean
  onJsonChange: (json: string) => void
}

export function FormatChip({ label, tone }: { label: string; tone: "rose" | "blue" | "violet" }) {
  const tones = {
    rose: "bg-[#ffe4e6] text-[#9f1239]",
    blue: "bg-[#dbeafe] text-[#1e3a8a]",
    violet: "bg-[#ede9fe] text-[#5b21b6]",
  }

  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{label}</span>
  )
}

export function JsonInputPanel({ inputId, json, hasError, onJsonChange }: JsonInputPanelProps) {
  return (
    <section
      id="json-converter"
      className="relative overflow-hidden rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-8 lg:col-span-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">JSON input</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              JSON in. TypeScript out.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <FormatChip
              label="JSON"
              tone="rose"
            />
            <FormatChip
              label="TypeScript"
              tone="blue"
            />
            <FormatChip
              label="Types"
              tone="violet"
            />
          </div>
        </div>

        <label
          htmlFor={inputId}
          className="sr-only"
        >
          JSON
        </label>
        <textarea
          id={inputId}
          value={json}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : `${inputId}-help`}
          onChange={(event) => onJsonChange(event.target.value)}
          placeholder='{ "name": "Ada", "age": 36 }'
          className={cn(
            "min-h-56 w-full resize-y rounded-[1.6rem] border-2 bg-background/80 p-5 font-mono text-sm leading-6 outline-none transition-all duration-200",
            "touch-manipulation focus-visible:ring-3 focus-visible:ring-ring/40",
            hasError
              ? "border-destructive focus-visible:border-destructive"
              : "border-border hover:border-primary focus-visible:border-primary",
          )}
        />
        <p
          id={`${inputId}-help`}
          className="text-sm leading-6 text-muted-foreground"
        >
          Paste an object or array. Nested keys and mixed arrays are inferred for you.
        </p>
      </div>
    </section>
  )
}
