import { getType } from "./get-type"

export type JsonToTypeResult = { ok: true; type: string } | { ok: false; error: string }

export function convertJsonToType(json: string): JsonToTypeResult {
  try {
    const value: unknown = JSON.parse(json)
    return { ok: true, type: getType(value) }
  } catch {
    return { ok: false, error: "Invalid JSON" }
  }
}
