"use client"

import { ArrowDown, ArrowRight } from "lucide-react"
import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ColorConvertorFormat from "./color-convertor-format"
import ColorConvertorSession from "./color-convertor-session"
import ColorPreview from "./color-preview"
import { FORMAT_OPTIONS } from "../constants"
import { useColorConvertor } from "../hooks/use-color-convertor"
import FormatChip from "./color-format-chip"



const ColorConvertor = () => {
    const sourceId = useId()
    const outputId = useId()
    const formatId = useId()

    const { sourceColor, setSourceColor, targetFormat, sourceFormat, setTargetFormat, convertedColor } = useColorConvertor()

    const selected = FORMAT_OPTIONS.find((option) => option.value === sourceFormat) ?? FORMAT_OPTIONS[0]


    return (
        <div id="color-convertor" className="grid gap-5 md:grid-cols-12 md:items-start">
            <section className="input-panel-wrapper col-span-12 flex min-h-128 flex-col md:col-span-8 md:min-h-144">
                {/* blobs */}
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
                                value={convertedColor}
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
