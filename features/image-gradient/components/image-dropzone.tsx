"use client"

import { ImagePlus } from "lucide-react"
import type { DropzoneState } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ImageDropzoneProps = {
  dropzone: DropzoneState
  isBusy: boolean
}

export function ImageDropzone({ dropzone, isBusy }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, open } = dropzone

  return (
    <div
      {...getRootProps({
        "aria-label": "Upload a PNG, JPG, or WebP image",
        className: cn(
          "flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-[1.6rem] border-2 border-dashed px-6 py-10 text-center transition-all duration-200",
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
        <ImagePlus
          className="size-7"
          aria-hidden="true"
        />
      </span>
      <div className="space-y-1">
        <p className="font-heading text-lg font-semibold">
          {isDragActive ? "Drop the image to sample colors" : "Drag a photo here or browse"}
        </p>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          PNG, JPG, or WebP up to 8 MB. One image is enough to build a matching gradient.
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
  )
}
