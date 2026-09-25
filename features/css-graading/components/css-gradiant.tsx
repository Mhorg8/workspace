"use client"

import { useId } from "react"

import { Toaster } from "@/components/ui/toast"

import { useCssGradiant } from "../hooks/use-css-gradiant"
import { AddColorPanel } from "./add-color-panel"
import { CssGradiantAngleControl } from "./css-gradiant-angle-control"
import { GradientChip } from "./css-gradiant-chip"
import { CssGradiantCodePanel } from "./css-gradiant-code-panel"
import { CssGradiantPreview } from "./css-gradiant-preview"
import { CssGradiantSessionPanel } from "./css-gradiant-session-panel"
import { CssGradiantTypeControl } from "./css-gradiant-type-control"

function kindLabel(kind: string): string {
  return kind.charAt(0).toUpperCase() + kind.slice(1)
}

function CssGradiantWorkspace() {
  const angleId = useId()
  const gradient = useCssGradiant()
  const label = `${kindLabel(gradient.kind)} gradient`

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <section
        id="css-gradiant"
        className="input-panel-wrapper col-span-12 md:col-span-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
        />

        <div className="relative flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-primary">CSS Gradient</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Mix stops. Copy CSS.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <GradientChip
                label="CSS"
                tone="rose"
              />
              <GradientChip
                label="Gradient"
                tone="blue"
              />
              <GradientChip
                label="Preview"
                tone="violet"
              />
            </div>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            Choose linear, radial, or conic, add hex stops, and copy a background value you can
            paste into a stylesheet.
          </p>

          <CssGradiantPreview
            css={gradient.css}
            colorCount={gradient.colors.length}
            label={label}
          />

          <CssGradiantTypeControl
            kind={gradient.kind}
            onKindChange={gradient.setKind}
          />

          {gradient.usesAngle ? (
            <CssGradiantAngleControl
              angleId={angleId}
              angle={gradient.angle}
              onAngleChange={gradient.setAngle}
            />
          ) : null}

          <AddColorPanel
            colors={gradient.colors}
            setColors={gradient.setColors}
          />
        </div>
      </section>

      <aside className="md:col-span-4">
        <div className="flex flex-col gap-5 md:sticky md:top-24">
          <CssGradiantCodePanel
            css={gradient.css}
            canCopy={gradient.canCopy}
            onCopy={gradient.copyCss}
          />
          <CssGradiantSessionPanel
            colorCount={gradient.colors.length}
            kindLabel={kindLabel(gradient.kind)}
            canCopy={gradient.canCopy}
            onCopy={gradient.copyCss}
          />
        </div>
      </aside>
    </div>
  )
}

export function CssGradiant() {
  return (
    <Toaster>
      <CssGradiantWorkspace />
    </Toaster>
  )
}

export default CssGradiant
