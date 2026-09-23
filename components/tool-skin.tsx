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

export const toolSkinClassName = cn("tool-skin", spaceGrotesk.variable, dmSans.variable)

export function ToolSkin({ children }: ToolSkinProps) {
  return (
    <div className={cn(toolSkinClassName, "min-h-dvh bg-background text-foreground")}>
      {children}
    </div>
  )
}
