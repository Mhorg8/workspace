import { ImageIcon, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react"

import { ToolHeader } from "@/components/tool-header"

import { ImageConverter } from "./image-converter"

const highlights = [
  {
    title: "PNG & SVG welcome",
    body: "Drop rasters or vectors. Both land as crisp WebP, ready for the web.",
    icon: ImageIcon,
    tint: "bg-[#ffe4e6] text-[#9f1239]",
  },
  {
    title: "Tune the crunch",
    body: "Slide quality from 50 to 100 so you choose the balance of sharpness and size.",
    icon: SlidersHorizontal,
    tint: "bg-[#dbeafe] text-[#1e3a8a]",
  },
  {
    title: "Fast local convert",
    body: "Files are converted on the server for this session, then you download them.",
    icon: Zap,
    tint: "bg-[#fef3c7] text-[#92400e]",
  },
  {
    title: "Nothing is stored",
    body: "Images are processed for the conversion request and are not saved to a gallery.",
    icon: ShieldCheck,
    tint: "bg-[#ede9fe] text-[#5b21b6]",
  },
]

export function ConvertScreen() {
  return (
    <div className="relative isolate overflow-x-hidden">
      <a
        href="#converter"
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

      <ToolHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14">
        <section className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
            Colorful. Tiny. Ready for the web.
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
            <span className="bg-gradient-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
              Turn PNG & SVG into juicy WebP
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Drop your images, pick a quality, and download lighter WebP files that stay sharp on
            modern sites.
          </p>
        </section>

        <ImageConverter />

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
          <p>WebP Convert — images stay in this session.</p>
          <p>PNG and SVG to WebP, with a quality slider.</p>
        </div>
      </footer>
    </div>
  )
}
