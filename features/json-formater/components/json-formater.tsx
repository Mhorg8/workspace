"use client"

import { useId } from "react"

import { Toaster } from "@/components/ui/toast"

import { useJsonFormater } from "../hooks/use-json-formater"
import { JsonFormaterActionPanel } from "./json-formater-action-panel"
import { JsonFormaterInputPanel } from "./json-formater-input-panel"
import { JsonFormaterOutputPanel } from "./json-formater-output-panel"
import { JsonFormaterSessionPanel } from "./json-formater-session-panel"

function JsonFormaterWorkspace() {
  const inputId = useId()
  const formater = useJsonFormater()
  const result = formater.result
  const hasError = result?.ok === false
  const errorId = `${inputId}-error`

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <JsonFormaterInputPanel
        inputId={inputId}
        json={formater.json}
        hasError={hasError}
        onJsonChange={formater.setJson}
      />

      <aside className="flex flex-col gap-5 lg:col-span-4">
        <JsonFormaterActionPanel
          canFormat={formater.canFormat}
          error={result?.ok === false ? result.error : null}
          errorId={errorId}
          onFormat={formater.format}
        />
        <JsonFormaterSessionPanel
          status={result?.ok === false ? "error" : result?.ok ? "ready" : "idle"}
        />
      </aside>

      <JsonFormaterOutputPanel
        jsonOutput={result?.ok ? result.json : null}
        onCopy={formater.copyJson}
        onClear={formater.clear}
      />
    </div>
  )
}

export function JsonFormater() {
  return (
    <Toaster>
      <JsonFormaterWorkspace />
    </Toaster>
  )
}
