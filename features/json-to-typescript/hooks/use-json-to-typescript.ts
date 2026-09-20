"use client"

import { useState } from "react"

import { toast } from "@/components/ui/toast"

import { convertJsonToType, type JsonToTypeResult } from "../utils/convert-json-to-type"

export function useJsonToTypescript() {
  const [json, setJson] = useState("")
  const [result, setResult] = useState<JsonToTypeResult | null>(null)

  const canConvert = json.trim().length > 0

  function convert() {
    if (!canConvert) {
      toast.add({
        type: "info",
        title: "Nothing to convert",
        description: "Paste JSON to generate a TypeScript type.",
      })
      return
    }

    setResult(convertJsonToType(json))
  }

  function clear() {
    setJson("")
    setResult(null)
  }

  async function copyType() {
    if (!result?.ok) {
      return
    }

    try {
      await navigator.clipboard.writeText(result.type)
      toast.add({
        type: "success",
        title: "Copied",
        description: "TypeScript type copied to the clipboard.",
      })
    } catch {
      toast.add({
        type: "error",
        title: "Copy failed",
        description: "Could not copy the type. Try selecting it instead.",
      })
    }
  }

  return {
    json,
    setJson,
    result,
    canConvert,
    convert,
    clear,
    copyType,
  }
}
