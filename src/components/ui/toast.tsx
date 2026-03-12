import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          {
            "border-gray-200 bg-white text-gray-950": variant === "default",
            "border-red-500 bg-red-50 text-red-950": variant === "destructive",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Toast.displayName = "Toast"

export type ToastActionElement = React.ReactElement

export { Toast }

