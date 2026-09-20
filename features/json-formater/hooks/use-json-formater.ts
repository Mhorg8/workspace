"use client"

import { useState } from "react"

import { toast } from "@/components/ui/toast"

import { formatJson, type FormatJsonResult } from "../utils/format-json"

export function useJsonFormater() {
  const [json, setJson] = useState("")
  const [result, setResult] = useState<FormatJsonResult | null>(null)

  const canFormat = json.trim().length > 0

  function format() {
    if (!canFormat) {
      toast.add({
        type: "info",
        title: "Nothing to format",
        description: "Paste JSON to see the parsed value.",
      })
      return
    }

    setResult(formatJson(json))
  }

  function clear() {
    setJson("")
    setResult(null)
  }

  async function copyJson() {
    if (!result?.ok) {
      return
    }

    try {
      await navigator.clipboard.writeText(result.json)
      toast.add({
        type: "success",
        title: "Copied",
        description: "Formatted JSON copied to the clipboard.",
      })
    } catch {
      toast.add({
        type: "error",
        title: "Copy failed",
        description: "Could not copy the JSON. Try selecting it instead.",
      })
    }
  }

  return {
    json,
    setJson,
    result,
    canFormat,
    format,
    clear,
    copyJson,
  }
}
