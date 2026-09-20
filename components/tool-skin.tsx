import { DM_Sans, Space_Grotesk } from "next/font/google"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

type ToolSkinProps = {
  children: ReactNode
}

export function ToolSkin({ children }: ToolSkinProps) {
  return (
    <div
      className={cn(
        "tool-skin min-h-dvh bg-background text-foreground",
        spaceGrotesk.variable,
        dmSans.variable,
      )}
    >
      {children}
    </div>
  )
}
