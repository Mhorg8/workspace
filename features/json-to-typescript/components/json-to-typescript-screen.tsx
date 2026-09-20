import Link from "next/link"
import { Braces, Layers, ListTree, ShieldCheck } from "lucide-react"

import { JsonToTypescript } from "./json-to-typescript"

const highlights = [
  {
    title: "Paste any JSON",
    body: "Objects, arrays, and nested data all become TypeScript types.",
    icon: Braces,
    tint: "bg-[#ffe4e6] text-[#9f1239]",
  },
  {
    title: "Keep the nesting",
    body: "Deep objects stay nested in the generated type, not flattened.",
    icon: Layers,
    tint: "bg-[#dbeafe] text-[#1e3a8a]",
  },
  {
    title: "Optional keys",
    body: "Keys that appear in some array items become optional properties.",
    icon: ListTree,
    tint: "bg-[#fef3c7] text-[#92400e]",
  },
  {
    title: "Nothing is stored",
    body: "JSON stays in this tab. Types are inferred in the browser.",
    icon: ShieldCheck,
    tint: "bg-[#ede9fe] text-[#5b21b6]",
  },
]

export function JsonToTypescriptScreen() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <a
        href="#json-converter"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to converter
      </a>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-float-a absolute -left-24 top-10 size-80 rounded-full bg-[#fb7185]/80 blur-3xl" />
        <div className="blob-float-b absolute right-[-4rem] top-24 size-96 rounded-full bg-[#60a5fa]/75 blur-3xl" />
        <div className="blob-float-c absolute bottom-24 left-1/3 size-80 rounded-full bg-[#c084fc]/65 blur-3xl" />
        <div className="absolute top-[26rem] right-1/4 size-72 rounded-full bg-[#fbbf24]/55 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/formater"
            className="flex min-h-11 items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <span className="relative flex size-9 items-center justify-center">
              <span className="absolute size-6 rounded-full bg-primary" />
              <span className="absolute left-3 size-6 rounded-full bg-accent/90" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">JSON Types</span>
          </Link>
          <p className="hidden text-sm font-medium text-muted-foreground sm:block">
            JSON · TypeScript
          </p>
        </div>
      </header>

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
                <highlight.icon className="size-5" aria-hidden="true" />
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
    </main>
  )
}
