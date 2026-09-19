import { DM_Sans, Space_Grotesk } from "next/font/google"

import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export default function ConvertLayout({ children }: LayoutProps<"/convert">) {
  return (
    <div
      className={cn(
        "convert-skin min-h-dvh bg-background text-foreground",
        spaceGrotesk.variable,
        dmSans.variable,
      )}
    >
      {children}
    </div>
  )
}
