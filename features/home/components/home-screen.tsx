import {
  AlignLeft,
  ArrowRight,
  Braces,
  Calendar,
  FileImage,
  PaintBucket,
  Palette,
} from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import Blobs from "@/components/blobs"
import { ToolHeader } from "@/components/tool-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ToolCard = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  tint: string
}

type ToolGroup = {
  id: string
  eyebrow: string
  title: string
  summary: string
  tools: ToolCard[]
}

const groups: ToolGroup[] = [
  {
    id: "developer",
    eyebrow: "Developer tools",
    title: "Clean JSON before it reaches the codebase",
    summary: "Parse a value, pretty-print it, or turn a sample into TypeScript you can paste.",
    tools: [
      {
        href: "/json-formater",
        title: "JSON Formatter",
        description:
          "Paste messy JSON, parse it, and copy a 2-space pretty print that keeps the original keys and values. Invalid JSON is rejected.",
        icon: AlignLeft,
        tint: "bg-[#dbeafe] text-[#1e3a8a]",
      },
      {
        href: "/json-types",
        title: "JSON to TypeScript",
        description:
          "Paste a sample and copy a TypeScript type. Nested objects stay nested, and keys that appear in only some array items become optional.",
        icon: Braces,
        tint: "bg-[#ffe4e6] text-[#9f1239]",
      },
    ],
  },
  {
    id: "designer",
    eyebrow: "Designer tools",
    title: "Lighter images and CSS you can paste",
    summary: "Compress PNG and SVG to WebP, or build a gradient by hand or from a photo.",
    tools: [
      {
        href: "/convert",
        title: "PNG & SVG to WebP",
        description:
          "Drop rasters or vectors, slide quality from 50 to 100, and download lighter WebP files. Images are converted for the request and are not saved.",
        icon: FileImage,
        tint: "bg-[#fef3c7] text-[#92400e]",
      },
      {
        href: "/css-gradiant",
        title: "CSS Gradient",
        description:
          "Add hex stops, switch between linear, radial, and conic, and copy a background value that matches the live preview.",
        icon: Palette,
        tint: "bg-[#ede9fe] text-[#5b21b6]",
      },
      {
        href: "/image-gradient",
        title: "Image Gradients",
        description:
          "Upload one photo, pick a blend style, and copy a CSS gradient sampled from the image. Each stop shows as a swatch and a hex value.",
        icon: PaintBucket,
        tint: "bg-[#ffe4e6] text-[#9f1239]",
      },
    ],
  },
]

const planTool: ToolCard = {
  href: "/plan",
  title: "Plan",
  description: "Lay out the day and keep the work you want to finish in one simple view.",
  icon: Calendar,
  tint: "bg-[#dbeafe] text-[#1e3a8a]",
}

function ToolLinkCard({ tool }: { tool: ToolCard }) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col rounded-[1.75rem] bg-card p-5 shadow-md ring-1 ring-foreground/5 outline-none transition-shadow hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/40"
    >
      <span
        className={cn(
          "mb-4 inline-flex size-11 items-center justify-center rounded-2xl",
          tool.tint,
        )}
      >
        <tool.icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="font-heading text-lg font-semibold">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{tool.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Open tool
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

export function HomeScreen() {
  return (
    <div className="relative isolate overflow-x-hidden">
      <a
        href="#tools"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to tools
      </a>

      <Blobs />
      <ToolHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12 lg:gap-20">
        <section className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
            Developer, designer, and planning tools
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
            <span className="bg-gradient-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
              Small tools for the work already on your desk
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Format JSON, infer TypeScript types, turn PNG and SVG into WebP, and build CSS
            gradients you can paste. Each tool opens on its own page and keeps the work in that
            session.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#tools" className={cn(buttonVariants({ size: "lg" }), "h-12 px-5")}>
              Browse tools
            </Link>
            <Link
              href="/json-formater"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-5")}
            >
              Format JSON
            </Link>
          </div>
        </section>

        <div id="tools" className="flex scroll-mt-24 flex-col gap-14 lg:gap-16">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-heading`} className="flex flex-col gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-primary">{group.eyebrow}</p>
                <h2
                  id={`${group.id}-heading`}
                  className="font-heading mt-2 text-3xl font-semibold tracking-tight text-balance"
                >
                  {group.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{group.summary}</p>
              </div>
              <div
                className={cn(
                  "grid gap-4",
                  group.tools.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3",
                )}
              >
                {group.tools.map((tool) => (
                  <ToolLinkCard key={tool.href} tool={tool} />
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="plan-heading" className="flex flex-col gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">Plan tools</p>
              <h2 id="plan-heading" className="font-heading mt-2 text-3xl font-semibold tracking-tight">
                Keep the day in one place
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                A simple planner for the work you want to finish.
              </p>
            </div>
            <div className="max-w-xl">
              <ToolLinkCard tool={planTool} />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/80 bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Tools — format, convert, and design.</p>
          <p>JSON and photos stay in the tab you opened.</p>
        </div>
      </footer>
    </div>
  )
}
