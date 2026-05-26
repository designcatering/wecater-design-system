/**
 * Toaster — renders active toasts from useToast() in a fixed portal.
 *
 * Mount once at your app root (e.g. inside layout.tsx):
 *   <Toaster />
 *
 * Position presets (default "bottom-right"):
 *   top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
 *
 * Toasts stack newest-on-top with a smooth slide+fade animation.
 * Each toast auto-dismisses after its `duration` (default 4000 ms).
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Toast } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface ToasterProps {
  position?: ToasterPosition
  /** Max width of each toast pill (default 380px) */
  toastWidth?: number | string
  className?: string
}

// ─── Position class map ───────────────────────────────────────────────────────

const POSITION_CLASSES: Record<ToasterPosition, string> = {
  "top-left":      "top-[16px] left-[16px] items-start",
  "top-center":    "top-[16px] left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-[16px] right-[16px] items-end",
  "bottom-left":   "bottom-[16px] left-[16px] items-start",
  "bottom-center": "bottom-[16px] left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-[16px] right-[16px] items-end",
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Toaster({
  position = "bottom-right",
  toastWidth = 400,
  className,
}: ToasterProps) {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      aria-label="Notifications"
      className={cn(
        "fixed z-[9999] flex flex-col gap-[8px] p-[16px]",
        POSITION_CLASSES[position],
        className
      )}
      style={{ maxWidth: typeof toastWidth === "number" ? `${toastWidth}px` : toastWidth }}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          variant={t.variant}
          message={t.message}
          description={t.description}
          action={t.action}
          showDismiss={t.showDismiss}
          onDismiss={() => dismiss(t.id)}
          // Animate in
          style={{ animation: "toast-in 0.25s ease-out" }}
        />
      ))}

      {/* Keyframe injected inline so no CSS file needed */}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  )
}
