import { Braces, ShieldCheck, Layers, ListTree } from "lucide-react"

export const highlights = [
  {
    title: "Paste any JSON",
    body: "Objects, arrays, and nested data all become TypeScript types.",
    icon: Braces,
    tint: "bg-[#ffe4e6] text-[#9f1239]",
  },
  {
    title: "Keep the nesting",
    body: "Deep objects stay nested in the generated type, not flattened.",
    icon: Layers,
    tint: "bg-[#dbeafe] text-[#1e3a8a]",
  },
  {
    title: "Optional keys",
    body: "Keys that appear in some array items become optional properties.",
    icon: ListTree,
    tint: "bg-[#fef3c7] text-[#92400e]",
  },
  {
    title: "Nothing is stored",
    body: "JSON stays in this tab. Types are inferred in the browser.",
    icon: ShieldCheck,
    tint: "bg-[#ede9fe] text-[#5b21b6]",
  },
]
