export type FormatJsonResult =
  | { ok: true; json: string }
  | { ok: false; error: string }

const JSON_INDENT = 2

export function formatJson(input: string): FormatJsonResult {
  try {
    const value: unknown = JSON.parse(input)
    return { ok: true, json: JSON.stringify(value, null, JSON_INDENT) }
  } catch {
    return { ok: false, error: "Invalid JSON" }
  }
}
