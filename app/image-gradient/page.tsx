import type { Metadata } from "next"

import { ImageGradientScreen } from "@/features/image-gradient"

export const metadata: Metadata = {
  title: "Image Gradient — photo to CSS blend",
  description:
    "Upload a photo, choose linear, radial, or conic, and copy a CSS gradient that follows the image.",
}

export default function ImageGradientPage() {
  return <ImageGradientScreen />
}
