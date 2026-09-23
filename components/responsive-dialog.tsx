"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@base-ui/react/unstable-use-media-query"
import { createContext, useContext, type ReactElement, type ReactNode } from "react"

type ResponsiveDialogContextValue = {
  isDesktop: boolean
}

const ResponsiveDialogContext = createContext<ResponsiveDialogContextValue | null>(null)

function useResponsiveDialog() {
  const ctx = useContext(ResponsiveDialogContext)

  if (!ctx) {
    throw new Error("ResponsiveDialog components must be used inside ResponsiveDialog")
  }

  return ctx
}

type RootProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean | "trap-focus"
  disablePointerDismissal?: boolean
}

type TriggerProps = {
  children?: ReactNode
  className?: string
  render?: ReactElement
}

function Root({ children, ...props }: RootProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)", { defaultMatches: true })

  if (isDesktop) {
    return (
      <Dialog {...props}>
        <ResponsiveDialogContext.Provider value={{ isDesktop }}>
          {children}
        </ResponsiveDialogContext.Provider>
      </Dialog>
    )
  }

  return (
    <Drawer {...props} modal={false}>
      <ResponsiveDialogContext.Provider value={{ isDesktop }}>
        {children}
      </ResponsiveDialogContext.Provider>
    </Drawer>
  )
}

function Trigger({ children, className, render }: TriggerProps) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return (
      <DialogTrigger className={className} render={render}>
        {children}
      </DialogTrigger>
    )
  }

  return (
    <DrawerTrigger className={className} render={render}>
      {children}
    </DrawerTrigger>
  )
}

function Content({ className, children }: { className?: string; children: ReactNode }) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return <DialogContent className={className}>{children}</DialogContent>
  }

  return <DrawerContent className={className}>{children}</DrawerContent>
}

function Header({ className, children }: { className?: string; children: ReactNode }) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return <DialogHeader className={className}>{children}</DialogHeader>
  }

  return <DrawerHeader className={className}>{children}</DrawerHeader>
}

function Title({ className, children }: { className?: string; children: ReactNode }) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return <DialogTitle className={className}>{children}</DialogTitle>
  }

  return <DrawerTitle className={className}>{children}</DrawerTitle>
}

function Description({ className, children }: { className?: string; children: ReactNode }) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return <DialogDescription className={className}>{children}</DialogDescription>
  }

  return <DrawerDescription className={className}>{children}</DrawerDescription>
}

function Footer({ className, children }: { className?: string; children: ReactNode }) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return <DialogFooter className={className}>{children}</DialogFooter>
  }

  return <DrawerFooter className={className}>{children}</DrawerFooter>
}

function Close({ children, className, render }: TriggerProps) {
  const { isDesktop } = useResponsiveDialog()

  if (isDesktop) {
    return (
      <DialogClose className={cn(className, "cursor-pointer")} render={render}>
        {children}
      </DialogClose>
    )
  }

  return (
    <DrawerClose className={className} render={render}>
      {children}
    </DrawerClose>
  )
}

const ResponsiveDialog = {
  Root,
  Trigger,
  Content,
  Header,
  Title,
  Description,
  Footer,
  Close,
}

export default ResponsiveDialog
