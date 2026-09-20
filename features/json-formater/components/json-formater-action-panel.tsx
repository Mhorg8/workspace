"use client"

import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type JsonFormaterActionPanelProps = {
  canFormat: boolean
  error: string | null
  errorId: string
  onFormat: () => void
}

export function JsonFormaterActionPanel({
  canFormat,
  error,
  errorId,
  onFormat,
}: JsonFormaterActionPanelProps) {
  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">Format JSON</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Parse the sample and print the exact value with consistent indentation.
        </p>
      </div>

      {error ? (
        <p id={errorId} className="mb-4 text-sm leading-6 text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        size="lg"
        className="h-12 w-full cursor-pointer rounded-full text-base"
        disabled={!canFormat}
        onClick={onFormat}
      >
        <Sparkles className="size-4" aria-hidden="true" />
        Parse and format
      </Button>
    </section>
  )
}
