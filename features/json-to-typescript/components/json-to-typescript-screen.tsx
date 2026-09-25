import { ToolHeader } from "@/components/tool-header"

import { JsonToTypescript } from "./json-to-typescript"
import Blobs from "@/components/blobs"
import { highlights } from "../constant"

export function JsonToTypescriptScreen() {
  return (
    <div className="relative isolate overflow-x-hidden">
      <a
        href="#json-converter"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to converter
      </a>

      <Blobs />

      <ToolHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14">
        <section className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
            Paste JSON. Copy types.
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
            <span className="bg-gradient-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
              Turn JSON into TypeScript types
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Paste a JSON sample, convert it, and copy a TypeScript type you can drop into your
            codebase.
          </p>
        </section>

        <JsonToTypescript />

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
          <p>JSON Types — data stays in this tab.</p>
          <p>JSON to TypeScript, inferred in the browser.</p>
        </div>
      </footer>
    </div>
  )
}
