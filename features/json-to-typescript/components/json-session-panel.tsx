"use client"

import { Braces } from "lucide-react"

type JsonSessionPanelProps = {
  status: "idle" | "error" | "ready"
}

export function JsonSessionPanel({ status }: JsonSessionPanelProps) {
  const copy =
    status === "ready"
      ? {
          title: "Type is ready",
          body: "Copy the TypeScript type and drop it into your project.",
        }
      : status === "error"
        ? {
            title: "Could not parse",
            body: "Fix the JSON sample, then convert again.",
          }
        : {
            title: "Waiting for JSON",
            body: "Paste a JSON sample and convert it to see the type here.",
          }

  return (
    <section
      aria-live="polite"
      className="rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
    >
      <p className="text-sm font-medium text-white/80">Session</p>
      <p className="font-heading mt-1 flex items-center gap-2 text-2xl font-semibold">
        <Braces className="size-6" aria-hidden="true" />
        {copy.title}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/85">{copy.body}</p>
    </section>
  )
}
