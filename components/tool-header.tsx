"use client"

import { AlignLeft, Braces, ImageIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

type ToolLink = {
  href: string
  title: string
  description: string
  icon: LucideIcon
}

const formatLinks: ToolLink[] = [
  {
    href: "/json-formater",
    title: "JSON Formatter",
    description: "Parse JSON and pretty-print the exact value.",
    icon: AlignLeft,
  },
  {
    href: "/json-types",
    title: "JSON to TypeScript",
    description: "Infer TypeScript types from a JSON sample.",
    icon: Braces,
  },
]

const imageLinks: ToolLink[] = [
  {
    href: "/convert",
    title: "PNG & SVG to WebP",
    description: "Convert images to lightweight WebP.",
    icon: ImageIcon,
  },
]

function MenuLinks({ links, pathname }: { links: ToolLink[]; pathname: string }) {
  return (
    <ul className="grid w-72 gap-1">
      {links.map((item) => (
        <li key={item.href}>
          <NavigationMenuLink
            href={item.href}
            closeOnClick
            active={pathname === item.href}
            render={<Link href={item.href} />}
            className="items-start gap-3"
          >
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
              <item.icon aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium">{item.title}</span>
              <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                {item.description}
              </span>
            </span>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

function isActiveGroup(links: ToolLink[], pathname: string): boolean {
  return links.some((link) => link.href === pathname)
}

export function ToolHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <span className="relative flex size-9 items-center justify-center">
            <span className="absolute size-6 rounded-full bg-primary" />
            <span className="absolute left-3 size-6 rounded-full bg-accent/90" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">Tools</span>
        </Link>

        <NavigationMenu align="end" className="max-w-none flex-none">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("h-11", isActiveGroup(formatLinks, pathname) && "bg-muted")}
              >
                Format
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuLinks links={formatLinks} pathname={pathname} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("h-11", isActiveGroup(imageLinks, pathname) && "bg-muted")}
              >
                Images
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuLinks links={imageLinks} pathname={pathname} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
