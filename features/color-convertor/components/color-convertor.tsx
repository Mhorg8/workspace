"use client"

import { ArrowDown, ArrowRight, Pipette } from "lucide-react"
import { useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import ColorConvertorFormat, { FORMAT_OPTIONS } from "./color-convertor-format"
import ColorConvertorSession from "./color-convertor-session"

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"

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

const DEFAULT_COLOR = "#2563eb"

const ColorConvertor = () => {
    const sourceId = useId()
    const outputId = useId()
    const formatId = useId()
    const [targetFormat, setTargetFormat] = useState<ColorFormat>("hex")
    const [sourceColor, setSourceColor] = useState(DEFAULT_COLOR)

    const selected = FORMAT_OPTIONS.find((option) => option.value === targetFormat) ?? FORMAT_OPTIONS[0]
    const hasColor = Boolean(sourceColor.trim())

    return (
        <div id="color-convertor" className="grid gap-5 md:grid-cols-12 md:items-start">
            <section className="input-panel-wrapper col-span-12 flex min-h-128 flex-col md:col-span-8 md:min-h-144">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
                />

                <div className="relative flex flex-1 flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-primary">Color convertor</p>
                            <h2 className="font-heading text-2xl font-semibold tracking-tight">
                                Convert colors easily.
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FormatChip label="HEX" tone="rose" />
                            <FormatChip label="RGB" tone="blue" />
                            <FormatChip label="HSL" tone="blue" />
                            <FormatChip label="OKLCH" tone="violet" />
                        </div>
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Paste a color value, pick a target format, and copy the converted result. Nothing leaves
                        this tab.
                    </p>

                    <div className="grid flex-1 gap-2">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium">Live preview</p>
                            <p className="font-mono text-xs leading-5 text-muted-foreground tabular-nums">
                                {hasColor ? sourceColor : "Waiting for a color"}
                            </p>
                        </div>

                        <div
                            role="img"
                            aria-label={
                                hasColor
                                    ? `Live preview of ${sourceColor}`
                                    : "Empty color preview. Enter a color to see the result."
                            }
                            className="relative isolate min-h-52 flex-1 overflow-hidden rounded-[1.6rem] ring-1 ring-border sm:min-h-64"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 opacity-50"
                                style={{
                                    backgroundImage:
                                        "repeating-conic-gradient(var(--border) 0% 25%, var(--card) 0% 50%)",
                                    backgroundSize: "1.25rem 1.25rem",
                                }}
                            />

                            {hasColor ? (
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 transition-[background-color] duration-200"
                                    style={{ backgroundColor: sourceColor }}
                                />
                            ) : (
                                <div className="relative flex h-full min-h-52 flex-col items-center justify-center gap-3 px-6 text-center sm:min-h-64">
                                    <div className="rounded-[1.5rem] bg-card/95 px-5 py-4 shadow-sm ring-1 ring-border">
                                        <span className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                                            <Pipette className="size-5" aria-hidden="true" />
                                        </span>
                                        <p className="max-w-xs text-sm leading-6 text-foreground">
                                            Enter a color below to preview the converted value.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {hasColor ? (
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent p-4 pt-10">
                                    <p className="font-heading text-lg font-semibold text-white drop-shadow-sm">
                                        {sourceColor}
                                    </p>
                                    <p className="text-sm text-white/85">Preview · {selected.label} target</p>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:gap-5">
                        <div className="min-w-0 flex-1 space-y-2">
                            <Label htmlFor={sourceId}>Source color</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id={`${sourceId}-swatch`}
                                    type="color"
                                    value={sourceColor}
                                    aria-label="Pick a source color"
                                    className="h-12 w-14 shrink-0 cursor-pointer rounded-2xl border border-border p-1.5"
                                    onChange={(event) => setSourceColor(event.target.value)}
                                />
                                <Input
                                    id={sourceId}
                                    type="text"
                                    value={sourceColor}
                                    placeholder="#2563eb"
                                    spellCheck={false}
                                    autoComplete="off"
                                    aria-describedby={`${sourceId}-help`}
                                    className="h-12 flex-1 font-mono text-sm"
                                    onChange={(event) => setSourceColor(event.target.value)}
                                />
                            </div>
                            <p id={`${sourceId}-help`} className="text-xs leading-5 text-muted-foreground">
                                Accepts HEX, RGB, HSL, or OKLCH.
                            </p>
                        </div>

                        <div className="flex items-center justify-center sm:mb-9" aria-hidden="true">
                            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                                <ArrowRight className="hidden size-5 sm:block" />
                                <ArrowDown className="size-5 sm:hidden" />
                            </span>
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                            <Label htmlFor={outputId}>{selected.label} output</Label>
                            <Input
                                id={outputId}
                                type="text"
                                readOnly
                                placeholder={selected.hint}
                                className="h-12 bg-muted/40 font-mono text-sm"
                            />
                            <p className="text-xs leading-5 text-muted-foreground">
                                Updates when a valid source color is entered.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <aside className="col-span-12 flex flex-col gap-5 md:col-span-4">
                <div className="flex flex-col gap-5 md:sticky md:top-24">
                    <ColorConvertorFormat
                        targetFormat={targetFormat}
                        setTargetFormat={setTargetFormat}
                        formatId={formatId}
                    />
                    <ColorConvertorSession selected={selected} />
                </div>
            </aside>
        </div>
    )
}

export default ColorConvertor
