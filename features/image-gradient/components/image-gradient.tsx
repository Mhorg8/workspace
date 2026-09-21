"use client"

import { toast, Toaster } from "@/components/ui/toast"

import { useImageGradient } from "../hooks/use-image-gradient"
import { toBackgroundDeclaration } from "../utils/sample-gradient-css"
import { ImageGradientSessionPanel } from "./image-gradient-session-panel"
import { ImageGradientSourcePanel } from "./image-gradient-source-panel"
import { ImageGradientTypePanel } from "./image-gradient-type-panel"

function kindLabel(kind: string): string {
  return kind.charAt(0).toUpperCase() + kind.slice(1)
}

function ImageGradientWorkspace() {
  const gradient = useImageGradient()
  const label = `${kindLabel(gradient.kind)} gradient`

  async function copyCss() {
    if (!gradient.css || !gradient.canCopy) {
      return
    }

    try {
      await navigator.clipboard.writeText(toBackgroundDeclaration(gradient.css))
      toast.add({
        type: "success",
        title: "Copied",
        description: "Gradient CSS copied to the clipboard.",
      })
    } catch {
      toast.add({
        type: "error",
        title: "Copy failed",
        description: "Could not copy the CSS. Try selecting it instead.",
      })
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <ImageGradientSourcePanel
        dropzone={gradient.dropzone}
        isBusy={gradient.isBusy}
        previewUrl={gradient.previewUrl}
        generated={gradient.generated}
        css={gradient.css}
        previewLabel={label}
        canCopy={gradient.canCopy}
        onCopy={copyCss}
        colors={gradient.colors}
        kind={gradient.kind}
        removeColor={gradient.removeColor}
      />

      <aside className="md:col-span-4">
        <div className="flex flex-col gap-5 md:sticky md:top-24">
          <ImageGradientTypePanel
            kind={gradient.kind}
            canGenerate={gradient.canGenerate}
            onKindChange={gradient.setKind}
            onGenerate={gradient.generate}
          />
          <ImageGradientSessionPanel
            hasImage={gradient.previewUrl !== null}
            generated={gradient.generated}
            kindLabel={kindLabel(gradient.kind)}
            canCopy={gradient.canCopy}
            onCopy={copyCss}
          />
        </div>
      </aside>
    </div>
  )
}

export function ImageGradient() {
  return (
    <Toaster>
      <ImageGradientWorkspace />
    </Toaster>
  )
}
