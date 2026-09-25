"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

type JsonOutputPanelProps = {
  typeOutput: string | null
  onCopy: () => void
  onClear: () => void
}

export function JsonOutputPanel({ typeOutput, onCopy, onClear }: JsonOutputPanelProps) {
  if (!typeOutput) {
    return null
  }

  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6 lg:col-span-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold">Your type</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Inferred TypeScript type from the JSON sample.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            size="sm"
            className="h-11 cursor-pointer rounded-full px-4"
            onClick={() => void onCopy()}
          >
            <Copy
              className="size-3.5"
              aria-hidden="true"
            />
            Copy type
          </Button>
        </div>
      </div>

      <pre className="overflow-auto rounded-[1.5rem] bg-background/80 p-4 font-mono text-sm leading-6 ring-1 ring-border whitespace-pre">
        {typeOutput}
      </pre>
    </section>
  )
}
