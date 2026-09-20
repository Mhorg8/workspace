import type { Metadata } from "next"

import { JsonFormaterScreen } from "@/features/json-formater"

export const metadata: Metadata = {
  title: "JSON Formatter — JSON Formater",
  description: "Paste JSON, parse it, and copy the exact pretty-printed value.",
}

export default function Page() {
  return <JsonFormaterScreen />
}
