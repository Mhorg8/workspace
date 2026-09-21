"use client"

import { RefreshCw } from "lucide-react"
import type { DropzoneState } from "react-dropzone"

import { Button } from "@/components/ui/button"

type ImagePreviewProps = {
  previewUrl: string
  dropzone: DropzoneState
  isBusy: boolean
}

export function ImagePreview({ previewUrl, dropzone, isBusy }: ImagePreviewProps) {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-[1.6rem] ring-1 ring-border">
      <img
        src={previewUrl}
        alt="Uploaded image used to sample gradient colors"
        className="absolute inset-0 size-full object-contain"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/60 to-transparent p-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm font-medium text-white">Source photo</p>
        <div {...dropzone.getRootProps()}>
          <input {...dropzone.getInputProps()} />
          <Button
            type="button"
            size="lg"
            className="h-11 w-full cursor-pointer rounded-full px-5 sm:w-auto"
            disabled={isBusy}
            onClick={(event) => {
              event.stopPropagation()
              dropzone.open()
            }}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Replace image
          </Button>
        </div>
      </div>
    </div>
  )
}
