import type { Metadata } from "next"

import { JsonToTypescriptScreen } from "@/features/json-to-typescript"

export const metadata: Metadata = {
  title: "JSON to TypeScript — JSON Types",
  description: "Paste JSON and convert it into a TypeScript type you can copy into your project.",
}

export default function Page() {
  return <JsonToTypescriptScreen />
}
