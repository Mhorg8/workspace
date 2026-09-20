import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

import { toBackgroundDeclaration } from "../utils/build-gradient-css"

type CssGradiantCodePanelProps = {
  css: string | null
  canCopy: boolean
  onCopy: () => void
}

export function CssGradiantCodePanel({ css, canCopy, onCopy }: CssGradiantCodePanelProps) {
  return (
    <section className="flex h-fit flex-col rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">CSS output</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          The background value updates as you add stops.
        </p>
      </div>

      {css && canCopy ? (
        <pre className="min-h-28 flex-1 overflow-auto rounded-[1.5rem] bg-background/80 p-4 font-mono text-sm leading-6 whitespace-pre-wrap ring-1 ring-border">
          {toBackgroundDeclaration(css)}
        </pre>
      ) : (
        <div className="flex min-h-28 flex-1 items-center rounded-[1.5rem] bg-muted/60 px-4 py-5 ring-1 ring-border">
          <p className="text-sm leading-6 text-muted-foreground">
            Add at least two colors to generate a CSS gradient you can paste into a stylesheet.
          </p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="mt-4 h-11 w-full cursor-pointer rounded-full"
        disabled={!canCopy}
        onClick={() => void onCopy()}
      >
        <Copy className="size-4" aria-hidden="true" />
        Copy CSS
      </Button>
    </section>
  )
}
