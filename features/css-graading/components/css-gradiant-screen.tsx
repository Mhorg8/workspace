import { Blend, Eye, Palette, ShieldCheck } from "lucide-react"

import Blobs from "@/components/blobs"
import { ToolHeader } from "@/components/tool-header"

import { CssGradiant } from "./css-gradiant"

const highlights = [
  {
    title: "Live preview",
    body: "The blend updates as you add stops, so you see the CSS before you copy it.",
    icon: Eye,
    tint: "bg-[#ffe4e6] text-[#9f1239]",
  },
  {
    title: "Linear, radial, conic",
    body: "Switch the gradient type and rotate linear or conic blends from 0° to 360°.",
    icon: Blend,
    tint: "bg-[#dbeafe] text-[#1e3a8a]",
  },
  {
    title: "Hex and swatch together",
    body: "Pick a color visually or type a 6-digit hex. Both stay in sync.",
    icon: Palette,
    tint: "bg-[#fef3c7] text-[#92400e]",
  },
  {
    title: "Nothing is stored",
    body: "Stops stay in this tab. Copy the CSS when it looks right.",
    icon: ShieldCheck,
    tint: "bg-[#ede9fe] text-[#5b21b6]",
  },
]

export function CssGradiantScreen() {
  return (
    <div className="relative isolate overflow-x-clip">
      <a
        href="#css-gradiant"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to gradient
      </a>

      <Blobs />
      <ToolHeader />

      <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14">
        <section className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
            Mix colors. Copy CSS.
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
            <span className="bg-gradient-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
              Build a CSS gradient you can paste
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Add hex stops, choose linear, radial, or conic, and copy a background value that matches
            the live preview.
          </p>
        </section>

        <CssGradiant />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] bg-card p-5 shadow-md ring-1 ring-foreground/5"
            >
              <span
                className={`mb-4 inline-flex size-11 items-center justify-center rounded-2xl ${highlight.tint}`}
              >
                <highlight.icon
                  className="size-5"
                  aria-hidden="true"
                />
              </span>
              <h2 className="font-heading text-lg font-semibold">{highlight.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{highlight.body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-border/80 bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>CSS Gradient — colors stay in this tab.</p>
          <p>Preview, then copy a background value.</p>
        </div>
      </footer>
    </div>
  )
}

export default CssGradiantScreen
