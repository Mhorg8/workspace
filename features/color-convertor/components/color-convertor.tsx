"use client"

import { ArrowDown, ArrowRight, Pipette } from "lucide-react"
import { useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import ColorConvertorFormat, { FORMAT_OPTIONS } from "./color-convertor-format"
import ColorConvertorSession from "./color-convertor-session"
import ColorPreview from "./color-preview"

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

                    <ColorPreview sourceColor={sourceColor} selected={selected} />

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
