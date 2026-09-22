import type { Metadata } from "next"

import { ToolSkin } from "@/components/tool-skin"
import { HomeScreen } from "@/features/home"

export const metadata: Metadata = {
  title: "Tools — format, convert, and design",
  description:
    "Format JSON, infer TypeScript types, convert PNG and SVG to WebP, and build CSS gradients you can paste.",
}

export default function Home() {
  return (
    <ToolSkin>
      <HomeScreen />
    </ToolSkin>
  )
}
