/**
 * useToast — lightweight toast state hook for the Cater Design System.
 *
 * Usage:
 *   const { toast, toasts, dismiss, dismissAll } = useToast()
 *   toast({ message: "Saved!", variant: "success" })
 *
 * Wire up <Toaster /> once at your app root to render active toasts.
 * Toasts auto-dismiss after `duration` ms (default 4000). Pass `duration: 0`
 * to keep a toast on screen until the user manually dismisses it.
 */

"use client"

import * as React from "react"
import type { ToastVariant } from "@/components/ui/toast"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToastOptions {
  /** Unique id — auto-generated if omitted */
  id?: string
  variant?: ToastVariant
  message: React.ReactNode
  description?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  /** Show the × dismiss button (default true) */
  showDismiss?: boolean
  /** Auto-dismiss delay in ms. 0 = persistent. Default 4000. */
  duration?: number
}

export interface ToastItem extends Required<Pick<ToastOptions, "id" | "variant" | "message" | "showDismiss" | "duration">> {
  description?: React.ReactNode
  action?: ToastOptions["action"]
  /** When this toast was added — used for stacking age order */
  createdAt: number
}

// ─── State ───────────────────────────────────────────────────────────────────

type Action =
  | { type: "ADD";     toast: ToastItem }
  | { type: "DISMISS"; id: string }
  | { type: "DISMISS_ALL" }

const MAX_TOASTS = 5

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.type) {
    case "ADD":
      // Replace if same id; cap at MAX_TOASTS newest
      return [
        action.toast,
        ...state.filter((t) => t.id !== action.toast.id),
      ].slice(0, MAX_TOASTS)

    case "DISMISS":
      return state.filter((t) => t.id !== action.id)

    case "DISMISS_ALL":
      return []

    default:
      return state
  }
}

// ─── Shared singleton so multiple useToast() calls share state ───────────────

let dispatch: React.Dispatch<Action> | null = null
let sharedToasts: ToastItem[] = []
const listeners: Set<React.Dispatch<React.SetStateAction<ToastItem[]>>> = new Set()

function notifyListeners() {
  listeners.forEach((setter) => setter([...sharedToasts]))
}

function sharedDispatch(action: Action) {
  sharedToasts = reducer(sharedToasts, action)
  notifyListeners()
}

// ─── Auto-dismiss timers ──────────────────────────────────────────────────────

const timers = new Map<string, ReturnType<typeof setTimeout>>()

function scheduleAutoDismiss(id: string, duration: number) {
  if (duration === 0) return
  if (timers.has(id)) clearTimeout(timers.get(id)!)
  timers.set(
    id,
    setTimeout(() => {
      sharedDispatch({ type: "DISMISS", id })
      timers.delete(id)
    }, duration)
  )
}

// ─── Public API ───────────────────────────────────────────────────────────────

let counter = 0
function genId() {
  return `toast-${++counter}`
}

export function toast(options: ToastOptions) {
  const item: ToastItem = {
    id:          options.id ?? genId(),
    variant:     options.variant ?? "default",
    message:     options.message,
    description: options.description,
    action:      options.action,
    showDismiss: options.showDismiss ?? true,
    duration:    options.duration ?? 4000,
    createdAt:   Date.now(),
  }

  sharedDispatch({ type: "ADD", toast: item })
  scheduleAutoDismiss(item.id, item.duration)

  return {
    id:      item.id,
    dismiss: () => sharedDispatch({ type: "DISMISS", id: item.id }),
  }
}

// Convenience shortcuts
toast.success = (message: React.ReactNode, opts?: Omit<ToastOptions, "message" | "variant">) =>
  toast({ ...opts, message, variant: "success" })

toast.error = (message: React.ReactNode, opts?: Omit<ToastOptions, "message" | "variant">) =>
  toast({ ...opts, message, variant: "error" })

toast.warning = (message: React.ReactNode, opts?: Omit<ToastOptions, "message" | "variant">) =>
  toast({ ...opts, message, variant: "warning" })

toast.info = (message: React.ReactNode, opts?: Omit<ToastOptions, "message" | "variant">) =>
  toast({ ...opts, message, variant: "info" })

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>(sharedToasts)

  React.useEffect(() => {
    listeners.add(setToasts)
    return () => {
      listeners.delete(setToasts)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    if (timers.has(id)) {
      clearTimeout(timers.get(id)!)
      timers.delete(id)
    }
    sharedDispatch({ type: "DISMISS", id })
  }, [])

  const dismissAll = React.useCallback(() => {
    timers.forEach((t) => clearTimeout(t))
    timers.clear()
    sharedDispatch({ type: "DISMISS_ALL" })
  }, [])

  return { toasts, toast, dismiss, dismissAll }
}
