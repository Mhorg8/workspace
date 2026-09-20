import assert from "node:assert/strict"
import { describe, it } from "node:test"

import type { QueueItem } from "../types/image-converter.types"
import {
  formatBytes,
  getOverallProgress,
  getQueueRoom,
  getSavingsLabel,
  getTotalSavedBytes,
  isCompletedItem,
  isPendingItem,
  resetConvertedItems,
  savingsPercent,
  takeQueueFiles,
  toWebpFilename,
} from "../utils/image-converter.utils"

function makeItem(partial: Partial<QueueItem> & Pick<QueueItem, "id" | "status">): QueueItem {
  return {
    file: new File([new Uint8Array([1, 2, 3])], `${partial.id}.png`, { type: "image/png" }),
    previewUrl: `blob:${partial.id}`,
    ...partial,
  }
}

describe("image converter utils", () => {
  it("formats byte sizes for display", () => {
    assert.equal(formatBytes(0), "0 B")
    assert.equal(formatBytes(512), "512 B")
    assert.equal(formatBytes(1536), "1.5 KB")
    assert.equal(formatBytes(10 * 1024), "10 KB")
  })

  it("calculates savings and labels", () => {
    assert.equal(savingsPercent(1000, 250), 75)
    assert.equal(savingsPercent(100, 200), -100)
    assert.equal(savingsPercent(0, 10), 0)
    assert.equal(getSavingsLabel(75), "75% smaller")
    assert.equal(getSavingsLabel(-40), "40% larger")
    assert.equal(getSavingsLabel(0), "Converted")
  })

  it("builds webp filenames", () => {
    assert.equal(toWebpFilename("logo.png"), "logo.webp")
    assert.equal(toWebpFilename("  .png"), "image.webp")
  })

  it("limits the queue and tracks overflow", () => {
    const files = Array.from({ length: 3 }, (_, index) => {
      return new File([new Uint8Array([1])], `file-${index}.png`, { type: "image/png" })
    })

    const selection = takeQueueFiles(files, 11)
    assert.equal(getQueueRoom(11), 1)
    assert.equal(selection.accepted.length, 1)
    assert.equal(selection.overflowed, true)
  })

  it("derives queue progress and saved bytes", () => {
    const items = [
      makeItem({
        id: "a",
        status: "done",
        result: {
          ok: true,
          filename: "a.webp",
          dataUrl: "data:image/webp;base64,aa",
          originalSize: 1000,
          convertedSize: 250,
          width: 10,
          height: 10,
        },
      }),
      makeItem({ id: "b", status: "error", error: "failed" }),
      makeItem({ id: "c", status: "ready" }),
    ]

    assert.equal(getOverallProgress(items), 67)
    assert.equal(getTotalSavedBytes(items), 750)
    assert.equal(items.filter(isPendingItem).length, 2)
    assert.equal(items.filter(isCompletedItem).length, 1)

    const reset = resetConvertedItems(items)
    assert.equal(reset[0]?.status, "ready")
    assert.equal(reset[0]?.result, undefined)
  })
})
