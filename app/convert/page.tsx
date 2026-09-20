import type { Metadata } from "next"

import { ConvertScreen } from "@/features/image-converter"

export const metadata: Metadata = {
  title: "PNG & SVG to WebP — WebP Convert",
  description: "Drop PNG or SVG images and convert them to lightweight WebP with quality control.",
}

export default function ConvertPage() {
  return <ConvertScreen />
}
