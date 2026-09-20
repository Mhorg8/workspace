import { CssGradiantScreen } from "@/features/css-graading"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSS Gradient — mix colors and copy CSS",
  description:
    "Build a linear, radial, or conic CSS gradient from hex stops and copy the background value.",
}

export default function Page() {
  return <CssGradiantScreen />
}
