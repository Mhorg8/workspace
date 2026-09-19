"use client"

import { useCallback, useEffect, useId, useMemo, useState, type ReactNode } from "react"
import { useDropzone } from "react-dropzone"
import {
  ArrowDownToLine,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react"

import { convertToWebp, type ConvertSuccess } from "@/app/convert/actions"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast, Toaster } from "@/components/ui/toast"
import { formatBytes, savingsPercent } from "@/lib/format-bytes"
import { cn } from "@/lib/utils"

type QueueStatus = "ready" | "converting" | "done" | "error"

type QueueItem = {
  id: string
  file: File
  previewUrl: string
  status: QueueStatus
  error?: string
  result?: ConvertSuccess
}

const MAX_FILES = 12
const MAX_BYTES = 8 * 1024 * 1024
const ACCEPT = {
  "image/png": [".png"],
  "image/svg+xml": [".svg"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = filename
  link.rel = "noopener"
  document.body.append(link)
  link.click()
  link.remove()
}

function ImageConverterInner() {
  const qualityId = useId()
  const [quality, setQuality] = useState(80)
  const [items, setItems] = useState<QueueItem[]>([])

  const convertingCount = items.filter((item) => item.status === "converting").length
  const readyCount = items.filter(
    (item) => item.status === "ready" || item.status === "error",
  ).length
  const doneItems = items.filter((item) => item.status === "done" && item.result)
  const isBusy = convertingCount > 0

  const overallProgress = useMemo(() => {
    if (items.length === 0) {
      return 0
    }

    const finished = items.filter(
      (item) => item.status === "done" || item.status === "error",
    ).length

    return Math.round((finished / items.length) * 100)
  }, [items])

  const totalSaved = useMemo(() => {
    return doneItems.reduce((sum, item) => {
      if (!item.result) {
        return sum
      }

      return sum + Math.max(0, item.result.originalSize - item.result.convertedSize)
    }, 0)
  }, [doneItems])

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    }
    // Revoke leftover previews only when the converter unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFiles = useCallback((files: File[]) => {
    setItems((current) => {
      const room = MAX_FILES - current.length
      const nextFiles = files.slice(0, Math.max(room, 0))

      if (files.length > nextFiles.length) {
        toast.add({
          type: "warning",
          title: "Queue is full",
          description: `You can convert up to ${MAX_FILES} images at once.`,
        })
      }

      const nextItems = nextFiles.map((file) => ({
        id: createId(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "ready" as const,
      }))

      return [...current, ...nextItems]
    })
  }, [])

  const onDrop = useCallback(
    (accepted: File[], rejected: { file: File }[]) => {
      if (rejected.length > 0) {
        toast.add({
          type: "error",
          title: "Some files were skipped",
          description: "Use PNG or SVG images up to 8 MB.",
        })
      }

      if (accepted.length > 0) {
        addFiles(accepted)
      }
    },
    [addFiles],
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX_BYTES,
    maxFiles: MAX_FILES,
    disabled: isBusy,
    multiple: true,
    noKeyboard: true,
  })

  const updateItem = (id: string, patch: Partial<QueueItem>) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeItem = (id: string) => {
    setItems((current) => {
      const match = current.find((item) => item.id === id)
      if (match) {
        URL.revokeObjectURL(match.previewUrl)
      }
      return current.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    setItems((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.previewUrl))
      return []
    })
  }

  const convertOne = async (item: QueueItem) => {
    updateItem(item.id, { status: "converting", error: undefined })

    const formData = new FormData()
    formData.append("file", item.file)
    formData.append("quality", String(quality))

    const result = await convertToWebp(formData)

    if (!result.ok) {
      updateItem(item.id, { status: "error", error: result.error })
      return
    }

    updateItem(item.id, { status: "done", result })
  }

  const convertQueue = async () => {
    const pending = items.filter((item) => item.status === "ready" || item.status === "error")

    if (pending.length === 0) {
      toast.add({
        type: "info",
        title: "Nothing to convert",
        description: "Drop a PNG or SVG to get started.",
      })
      return
    }

    for (const item of pending) {
      await convertOne(item)
    }

    toast.add({
      type: "success",
      title: "Conversion finished",
      description: "Your WebP files are ready to download.",
    })
  }

  const downloadAll = () => {
    doneItems.forEach((item, index) => {
      if (!item.result) {
        return
      }

      window.setTimeout(() => {
        downloadFile(item.result!.dataUrl, item.result!.filename)
      }, index * 180)
    })
  }

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <section
        id="converter"
        className="relative overflow-hidden rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-8 lg:col-span-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
        />

        <div className="relative flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-primary">Drop zone</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                PNG & SVG in. WebP out.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <FormatChip label="PNG" tone="rose" />
              <FormatChip label="SVG" tone="blue" />
              <FormatChip label="WebP" tone="violet" />
            </div>
          </div>

          <div
            {...getRootProps({
              "aria-label": "Upload PNG or SVG images",
              className: cn(
                "flex min-h-56 cursor-pointer flex-col items-center justify-center gap-4 rounded-[1.6rem] border-2 border-dashed px-6 py-10 text-center transition-all duration-200",
                "touch-manipulation outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                isDragActive
                  ? "scale-[1.01] border-accent bg-accent/8"
                  : "border-border bg-background/80 hover:border-primary hover:bg-primary/5",
                isBusy && "cursor-not-allowed opacity-60",
              ),
            })}
          >
            <input {...getInputProps()} />
            <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <ImagePlus className="size-7" aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <p className="font-heading text-lg font-semibold">
                {isDragActive ? "Drop images to convert" : "Drag images here or browse"}
              </p>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                PNG and SVG up to 8 MB. Add up to {MAX_FILES} files, then convert them to WebP.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 cursor-pointer rounded-full px-5"
              disabled={isBusy}
              onClick={(event) => {
                event.stopPropagation()
                open()
              }}
            >
              Browse files
            </Button>
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-5 lg:col-span-4">
        <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
          <div className="mb-4">
            <label htmlFor={qualityId} className="font-heading text-lg font-semibold">
              WebP quality
            </label>
            <p id={`${qualityId}-help`} className="mt-1 text-sm leading-6 text-muted-foreground">
              Higher quality keeps more detail and a larger file.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-muted-foreground">50</span>
            <span className="font-heading text-3xl font-semibold tabular-nums text-primary">
              {quality}
            </span>
            <span className="text-sm font-medium text-muted-foreground">100</span>
          </div>

          <input
            id={qualityId}
            type="range"
            min={50}
            max={100}
            step={1}
            value={quality}
            disabled={isBusy}
            aria-describedby={`${qualityId}-help`}
            aria-valuetext={`${quality} percent`}
            onChange={(event) => {
              const nextQuality = Number(event.target.value)
              setQuality(nextQuality)
              setItems((current) =>
                current.map((item) =>
                  item.status === "done" ? { ...item, status: "ready", result: undefined } : item,
                ),
              )
            }}
            className="quality-slider w-full"
          />

          <Button
            size="lg"
            className="mt-5 h-12 w-full cursor-pointer rounded-full text-base"
            disabled={isBusy || readyCount === 0}
            onClick={() => void convertQueue()}
          >
            {isBusy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            {isBusy
              ? "Converting…"
              : readyCount > 0
                ? `Convert ${readyCount} to WebP`
                : "Convert to WebP"}
          </Button>
        </section>

        <section
          aria-live="polite"
          className="rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
        >
          <p className="text-sm font-medium text-white/80">Session</p>
          <p className="font-heading mt-1 text-2xl font-semibold">{doneItems.length} ready</p>
          <p className="mt-2 text-sm leading-6 text-white/85">
            {doneItems.length > 0
              ? `${formatBytes(totalSaved)} saved in this batch.`
              : "Converted files stay in this tab until you download or clear them."}
          </p>
          <Button
            size="lg"
            className="mt-5 h-12 w-full cursor-pointer rounded-full bg-white text-primary hover:bg-white/90"
            disabled={doneItems.length === 0}
            onClick={downloadAll}
          >
            <ArrowDownToLine className="size-4" aria-hidden="true" />
            Download all WebP
          </Button>
        </section>
      </aside>

      {items.length > 0 ? (
        <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6 lg:col-span-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl font-semibold">Your images</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {items.length} in queue
                {isBusy ? " · conversion in progress" : ""}
              </p>
            </div>
            <Button variant="ghost" className="cursor-pointer" disabled={isBusy} onClick={clearAll}>
              Clear all
            </Button>
          </div>

          {isBusy || overallProgress > 0 ? (
            <Progress value={isBusy ? overallProgress : 100} className="mb-5">
              <span className="sr-only">Conversion progress {overallProgress} percent</span>
            </Progress>
          ) : null}

          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <QueueCard
                key={item.id}
                item={item}
                busy={isBusy}
                onRemove={() => removeItem(item.id)}
                onRetry={() => void convertOne(item)}
                onDownload={() => {
                  if (item.result) {
                    downloadFile(item.result.dataUrl, item.result.filename)
                  }
                }}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function FormatChip({ label, tone }: { label: string; tone: "rose" | "blue" | "violet" }) {
  const tones = {
    rose: "bg-[#ffe4e6] text-[#9f1239]",
    blue: "bg-[#dbeafe] text-[#1e3a8a]",
    violet: "bg-[#ede9fe] text-[#5b21b6]",
  }

  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{label}</span>
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
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <X className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.status === "ready" ? (
            <StatusPill icon={<Sparkles className="size-3.5" />} label="Ready" />
          ) : null}
          {item.status === "converting" ? (
            <StatusPill icon={<Loader2 className="size-3.5 animate-spin" />} label="Converting" />
          ) : null}
          {item.status === "done" ? (
            <StatusPill
              icon={<CheckCircle2 className="size-3.5" />}
              label={
                saved > 0
                  ? `${saved}% smaller`
                  : saved < 0
                    ? `${Math.abs(saved)}% larger`
                    : "Converted"
              }
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
              <ArrowDownToLine className="size-3.5" aria-hidden="true" />
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

export function ImageConverter() {
  return (
    <Toaster>
      <ImageConverterInner />
    </Toaster>
  )
}
