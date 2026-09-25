import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

import { toBackgroundDeclaration } from "../utils/sample-gradient-css"

type ImageGradientCodePanelProps = {
  css: string | null
  canCopy: boolean
  onCopy: () => void
}

export function ImageGradientCodePanel({ css, canCopy, onCopy }: ImageGradientCodePanelProps) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold">CSS output</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            A background value you can paste into a stylesheet.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 cursor-pointer rounded-full px-5"
          disabled={!canCopy}
          onClick={() => void onCopy()}
        >
          <Copy
            className="size-4"
            aria-hidden="true"
          />
          Copy CSS
        </Button>
      </div>

      {css && canCopy ? (
        <pre className="overflow-auto rounded-[1.5rem] bg-background/80 p-4 font-mono text-sm leading-6 whitespace-pre-wrap ring-1 ring-border">
          {toBackgroundDeclaration(css)}
        </pre>
      ) : (
        <div className="flex min-h-24 items-center rounded-[1.5rem] bg-muted/60 px-4 py-5 ring-1 ring-border">
          <p className="text-sm leading-6 text-muted-foreground">
            Generate a gradient to see the CSS here.
          </p>
        </div>
      )}
    </div>
  )
}
