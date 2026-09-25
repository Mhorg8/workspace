"use client"

import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type JsonActionPanelProps = {
  canConvert: boolean
  error: string | null
  errorId: string
  onConvert: () => void
}

export function JsonActionPanel({ canConvert, error, errorId, onConvert }: JsonActionPanelProps) {
  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">Generate types</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Convert the JSON sample into a TypeScript type you can copy.
        </p>
      </div>

      {error ? (
        <p
          id={errorId}
          className="mb-4 text-sm leading-6 text-destructive"
        >
          {error}
        </p>
      ) : null}

      <Button
        size="lg"
        className="h-12 w-full cursor-pointer rounded-full text-base"
        disabled={!canConvert}
        onClick={onConvert}
      >
        <Sparkles
          className="size-4"
          aria-hidden="true"
        />
        Convert to TypeScript
      </Button>
    </section>
  )
}
