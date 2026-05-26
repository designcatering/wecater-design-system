/**
 * Cater Toast — compound notification primitive.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4810-11345
 *
 * ─── Variants ─────────────────────────────────────────────────────────────────
 * default  →  dark (#101828 Mirage/900) bg · white text · Gossip action link
 * success  →  Salem/50 bg · Salem/900 text · green icon
 * info     →  purple-50 bg · purple-900 text · info icon
 * warning  →  amber-50 bg · amber-900 text · warning icon
 * error    →  Error/Bg-subtle bg · Error/Text-subtle text · error icon
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * [icon?] [message] [action?] [dismiss?]
 *
 * ─── Figma tokens (default / dark variant) ────────────────────────────────────
 * bg       #101828  (--cater-mirage-900)
 * text     #ffffff
 * action   #ccf8b9  (--cater-gossip)
 * radius   10px
 * padding  12px
 * gap      ~21px (message → action → dismiss)
 * shadow   0px 4px 4px rgba(16,24,40,.10), 0px 2px 2px rgba(16,24,40,.06)
 */

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiCloseLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "info" | "warning" | "error"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant

  /** Primary message — supports string or rich ReactNode */
  message: React.ReactNode

  /** Optional description line beneath message */
  description?: React.ReactNode

  /** Inline action link */
  action?: {
    label: string
    onClick: () => void
  }

  /** Show the × dismiss button */
  showDismiss?: boolean
  onDismiss?: () => void

  /** Hide the status icon (alert variants only) */
  hideIcon?: boolean
}

// ─── CVA ──────────────────────────────────────────────────────────────────────

const toastVariants = cva(
  // ── Base ──
  [
    "relative flex w-full items-start gap-[12px] rounded-[10px] p-[12px]",
    "shadow-[0px_4px_4px_rgba(16,24,40,0.10),0px_2px_2px_rgba(16,24,40,0.06)]",
    "transition-all duration-300 ease-in-out",
    "font-[family-name:var(--font-body)] text-[14px] leading-[1.5]",
  ],
  {
    variants: {
      variant: {
        /** Figma: dark "Toast" — Mirage/900 bg */
        default: [
          "bg-[#101828] text-white",
        ],
        /** Salem/50 tint — green success */
        success: [
          "bg-[--cater-salem-50] text-[--cater-salem-900]",
          "border border-[--cater-salem-300]",
        ],
        /** Soft purple — informational */
        info: [
          "bg-[#f5eef9] text-[#4a0066]",
          "border border-[#d4a8e8]",
        ],
        /** Amber/50 — warning */
        warning: [
          "bg-[#fffbeb] text-[#78350f]",
          "border border-[#fcd34d]",
        ],
        /** Error/Bg-subtle — destructive */
        error: [
          "bg-[--color-error-bg-subtle] text-[--color-error-text-subtle]",
          "border border-[--color-error-border]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<Exclude<ToastVariant, "default">, React.ElementType> = {
  success: RiCheckboxCircleLine,
  info:    RiInformationLine,
  warning: RiAlertLine,
  error:   RiErrorWarningLine,
}

const ICON_COLOR: Record<Exclude<ToastVariant, "default">, string> = {
  success: "text-[--cater-salem-700]",
  info:    "text-[#7c3aed]",
  warning: "text-[#d97706]",
  error:   "text-[--color-error-text-subtle]",
}

// ─── Component ────────────────────────────────────────────────────────────────

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "default",
      message,
      description,
      action,
      showDismiss = true,
      onDismiss,
      hideIcon = false,
      className,
      ...props
    },
    ref
  ) => {
    const Icon = variant !== "default" ? ICON_MAP[variant] : null
    const iconColor = variant !== "default" ? ICON_COLOR[variant] : null

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {/* Status icon — alert variants only */}
        {Icon && !hideIcon && (
          <Icon
            className={cn("mt-[1px] size-[20px] shrink-0", iconColor)}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <p
            className={cn(
              "font-normal",
              variant === "default" ? "text-white" : ""
            )}
          >
            {message}
          </p>
          {description && (
            <p
              className={cn(
                "text-[13px] opacity-80",
                variant === "default" ? "text-white/80" : ""
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Action link */}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              "shrink-0 cursor-pointer whitespace-nowrap font-semibold text-[14px]",
              "transition-opacity duration-150 hover:opacity-70",
              "focus-visible:outline-none focus-visible:underline",
              variant === "default"
                ? "text-[#ccf8b9]"   // Gossip — Figma action colour
                : "underline underline-offset-2"
            )}
          >
            {action.label}
          </button>
        )}

        {/* Dismiss */}
        {showDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className={cn(
              "shrink-0 cursor-pointer rounded-full p-[2px]",
              "transition-opacity duration-150 hover:opacity-70",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1",
              variant === "default" ? "text-white" : "opacity-60"
            )}
          >
            <RiCloseLine className="size-[20px]" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast, toastVariants }
