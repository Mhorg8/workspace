"use client"

import { useId } from "react"

import { Toaster } from "@/components/ui/toast"

import { useJsonToTypescript } from "../hooks/use-json-to-typescript"
import { JsonActionPanel } from "./json-action-panel"
import { JsonInputPanel } from "./json-input-panel"
import { JsonOutputPanel } from "./json-output-panel"
import { JsonSessionPanel } from "./json-session-panel"

function JsonToTypescriptWorkspace() {
  const inputId = useId()
  const converter = useJsonToTypescript()
  const result = converter.result
  const hasError = result?.ok === false
  const errorId = `${inputId}-error`

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <JsonInputPanel
        inputId={inputId}
        json={converter.json}
        hasError={hasError}
        onJsonChange={converter.setJson}
      />

      <aside className="flex flex-col gap-5 lg:col-span-4">
        <JsonActionPanel
          canConvert={converter.canConvert}
          error={result?.ok === false ? result.error : null}
          errorId={errorId}
          onConvert={converter.convert}
        />
        <JsonSessionPanel status={result?.ok === false ? "error" : result?.ok ? "ready" : "idle"} />
      </aside>

      <JsonOutputPanel
        typeOutput={result?.ok ? result.type : null}
        onCopy={converter.copyType}
        onClear={converter.clear}
      />
    </div>
  )
}

export function JsonToTypescript() {
  return (
    <Toaster>
      <JsonToTypescriptWorkspace />
    </Toaster>
  )
}
