"use client"

import { ArrowDownToLine, CheckCircle2, Loader2, Sparkles, TriangleAlert, X } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

import type { QueueItem } from "../types/image-converter.types"
import { formatBytes, getSavingsLabel, savingsPercent } from "../utils/image-converter.utils"

type ConverterQueueProps = {
  items: QueueItem[]
  isBusy: boolean
  overallProgress: number
  onClearAll: () => void
  onRemove: (id: string) => void
  onRetry: (item: QueueItem) => void
  onDownload: (item: QueueItem) => void
}

function StatusPill({
  icon,
  label,
  tone = "neutral",
}: {
  icon: ReactNode
  label: string
  tone?: "neutral" | "success" | "error"
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "bg-muted text-foreground",
        tone === "success" && "bg-emerald-100 text-emerald-800",
        tone === "error" && "bg-red-100 text-red-800",
      )}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  )
}

function QueueCard({
  item,
  busy,
  onRemove,
  onRetry,
  onDownload,
}: {
  item: QueueItem
  busy: boolean
  onRemove: () => void
  onRetry: () => void
  onDownload: () => void
}) {
  const saved = item.result
    ? savingsPercent(item.result.originalSize, item.result.convertedSize)
    : 0

  return (
    <li className="flex gap-4 rounded-[1.5rem] bg-background/80 p-3 ring-1 ring-border">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
        {/* Dynamic object URLs are not compatible with next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.result?.dataUrl ?? item.previewUrl}
          alt={`${item.file.name} preview`}
          width={80}
          height={80}
          className="size-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium">{item.file.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground tabular-nums">
              {item.result
                ? `${formatBytes(item.result.originalSize)} → ${formatBytes(item.result.convertedSize)}`
                : formatBytes(item.file.size)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            disabled={busy && item.status === "converting"}
            aria-label={`Remove ${item.file.name}`}
            onClick={onRemove}
          >
            {item.status === "converting" ? (
              <Loader2
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <X
                className="size-4"
                aria-hidden="true"
              />
            )}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.status === "ready" ? (
            <StatusPill
              icon={<Sparkles className="size-3.5" />}
              label="Ready"
            />
          ) : null}
          {item.status === "converting" ? (
            <StatusPill
              icon={<Loader2 className="size-3.5 animate-spin" />}
              label="Converting"
            />
          ) : null}
          {item.status === "done" ? (
            <StatusPill
              icon={<CheckCircle2 className="size-3.5" />}
              label={getSavingsLabel(saved)}
              tone={saved < 0 ? "neutral" : "success"}
            />
          ) : null}
          {item.status === "error" ? (
            <StatusPill
              icon={<TriangleAlert className="size-3.5" />}
              label={item.error ?? "Could not convert"}
              tone="error"
            />
          ) : null}

          {item.status === "done" ? (
            <Button
              size="sm"
              className="ml-auto h-11 cursor-pointer rounded-full px-4"
              onClick={onDownload}
            >
              <ArrowDownToLine
                className="size-3.5"
                aria-hidden="true"
              />
              Download
            </Button>
          ) : null}

          {item.status === "error" ? (
            <Button
              size="sm"
              variant="outline"
              className="ml-auto h-11 cursor-pointer rounded-full px-4"
              disabled={busy}
              onClick={onRetry}
            >
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function ConverterQueue({
  items,
  isBusy,
  overallProgress,
  onClearAll,
  onRemove,
  onRetry,
  onDownload,
}: ConverterQueueProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6 lg:col-span-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold">Your images</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {items.length} in queue
            {isBusy ? " · conversion in progress" : ""}
          </p>
        </div>
        <Button
          variant="ghost"
          className="cursor-pointer"
          disabled={isBusy}
          onClick={onClearAll}
        >
          Clear all
        </Button>
      </div>

      {isBusy || overallProgress > 0 ? (
        <Progress
          value={isBusy ? overallProgress : 100}
          className="mb-5"
        >
          <span className="sr-only">Conversion progress {overallProgress} percent</span>
        </Progress>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <QueueCard
            key={item.id}
            item={item}
            busy={isBusy}
            onRemove={() => onRemove(item.id)}
            onRetry={() => onRetry(item)}
            onDownload={() => onDownload(item)}
          />
        ))}
      </ul>
    </section>
  )
}
