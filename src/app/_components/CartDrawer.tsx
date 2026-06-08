"use client"

import { useState } from "react"
import {
  RiCloseLine,
  RiShoppingBag2Line,
  RiArrowRightSLine,
  RiDeleteBinLine,
  RiCoinLine,
  RiCheckLine,
  RiCalendarEventLine,
  RiPencilLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "../page"

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/* ─────────────────────────────────────────────────────────────────────────────
   CartItemCard — one restaurant order inside the drawer
───────────────────────────────────────────────────────────────────────────── */

function CartItemCard({
  item,
  onRemove,
}: {
  item: CartItem
  onRemove: (id: string) => void
}) {
  const subtotal = item.mealItems.reduce((s, m) => s + m.quantity * m.priceEach, 0)

  return (
    <div className="rounded-2xl border border-[#F1F2F5] overflow-hidden">
      {/* Restaurant header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-[#F1F2F5]"
        style={{ backgroundColor: item.restaurantBg + "28" }}
      >
        <div>
          <p className="text-[13px] font-bold text-[#101828] leading-snug">{item.restaurantName}</p>
          <p className="text-[12px] text-[#68707C]">{item.restaurantSub}</p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="size-7 rounded-full flex items-center justify-center text-[#B2B8C1] hover:text-[#C22D2C] hover:bg-white transition-colors"
          aria-label={`Remove ${item.restaurantName} from cart`}
        >
          <RiDeleteBinLine className="size-4" />
        </button>
      </div>

      {/* Meal items */}
      <div className="px-4 pt-3 pb-2 space-y-2.5">
        {item.mealItems.map((mi) => (
          <div key={mi.name} className="flex items-center gap-2.5">
            <div
              className="size-7 shrink-0 rounded-lg flex items-center justify-center text-sm leading-none"
              style={{ backgroundColor: mi.bgColor }}
            >
              {mi.emoji}
            </div>
            <span className="flex-1 text-[13px] text-[#101828] leading-snug">
              {mi.name}
              <span className="text-[#68707C]"> ×{mi.quantity}</span>
            </span>
            <span className="text-[13px] font-semibold text-[#29344A]">
              {fmt(mi.quantity * mi.priceEach)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div className="px-4 pb-3 pt-2 flex items-center justify-between border-t border-[#F1F2F5] mt-1">
        <span className="text-[12px] text-[#68707C]">For {item.forCount} people</span>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-[#CA6100]">
            {item.bites.toLocaleString()} Bites
          </span>
          <span className="text-[13px] font-bold text-[#101828]">{fmt(subtotal)}</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CartDrawer — slides in from the right
───────────────────────────────────────────────────────────────────────────── */

interface CartDrawerProps {
  items: CartItem[]
  open: boolean
  onClose: () => void
  onRemove: (id: string) => void
  onCheckout?: () => void
  eventName?: string
  onEventNameChange?: (name: string) => void
}

export default function CartDrawer({
  items, open, onClose, onRemove, onCheckout,
  eventName = "My Event", onEventNameChange,
}: CartDrawerProps) {
  const [editingName, setEditingName] = useState(false)

  const totalQty    = items.reduce((s, ci) => s + ci.mealItems.reduce((ms, m) => ms + m.quantity, 0), 0)
  const totalPeople = items.reduce((max, ci) => Math.max(max, ci.forCount), 0)
  const subtotal  = items.reduce((s, ci) => s + ci.mealItems.reduce((ms, m) => ms + m.quantity * m.priceEach, 0), 0)
  const tax       = subtotal * 0.086
  const cashback  = Math.round(subtotal * 0.055 * 100) / 100
  const total     = subtotal + tax          // cashback earned after, not deducted
  const totalBites = items.reduce((s, ci) => s + ci.bites, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={[
          "fixed right-0 top-0 h-full z-50 w-[400px] bg-white flex flex-col",
          "shadow-[−4px_0_32px_rgba(16,24,40,0.12)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F2F5] shrink-0">
          <div className="flex items-center gap-2.5">
            <RiShoppingBag2Line className="size-5 text-[#073D30]" />
            <span className="text-[16px] font-bold text-[#101828]">Your Cart</span>
            {totalQty > 0 && (
              <span className="min-w-[20px] h-5 rounded-full bg-[#073D30] text-[#CCF8B9] text-[11px] font-bold px-1 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full flex items-center justify-center text-[#68707C] hover:bg-[#F1F2F5] transition-colors"
            aria-label="Close cart"
          >
            <RiCloseLine className="size-5" />
          </button>
        </div>

        {/* ── Event context header ── */}
        <div className="shrink-0 px-5 py-3 border-b border-[#F1F2F5] bg-[#FAFBFC]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-[#E6F5ED] flex items-center justify-center shrink-0">
              <RiCalendarEventLine className="size-4 text-[#073D30]" />
            </div>
            <div className="flex-1 min-w-0">
              {editingName ? (
                <input
                  autoFocus
                  value={eventName}
                  onChange={(e) => onEventNameChange?.(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={(e) => { if (e.key === "Enter") setEditingName(false) }}
                  className="text-[13px] font-semibold text-[#101828] bg-transparent outline-none border-b border-[#9CD8B5] w-full leading-tight"
                  placeholder="Event name…"
                />
              ) : (
                <button
                  onClick={() => setEditingName(true)}
                  className="text-[13px] font-semibold text-[#101828] hover:text-[#073D30] text-left leading-tight truncate w-full"
                >
                  {eventName}
                </button>
              )}
              <p className="text-[11px] text-[#68707C] mt-0.5 leading-none">
                {items.length > 0
                  ? `${items.length} ${items.length === 1 ? "restaurant" : "restaurants"}${totalPeople > 0 ? ` · ${totalPeople} people` : ""}`
                  : "No restaurants yet"}
              </p>
            </div>
            {!editingName && (
              <button
                onClick={() => setEditingName(true)}
                className="size-7 rounded-full flex items-center justify-center text-[#B2B8C1] hover:text-[#68707C] hover:bg-white transition-colors shrink-0"
                aria-label="Edit event name"
              >
                <RiPencilLine className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Cart items (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-16">
              <div className="size-16 rounded-full bg-[#F1F2F5] flex items-center justify-center mb-4">
                <RiShoppingBag2Line className="size-8 text-[#D0D5DD]" />
              </div>
              <p className="text-[15px] font-semibold text-[#29344A] mb-1">Your cart is empty</p>
              <p className="text-[13px] text-[#68707C] leading-relaxed max-w-[220px]">
                Ask CaterAI to plan your order and add a restaurant to get started.
              </p>
            </div>
          ) : (
            items.map((ci) => (
              <CartItemCard key={ci.id} item={ci} onRemove={onRemove} />
            ))
          )}
        </div>

        {/* ── Order summary + checkout (fixed bottom) ── */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-[#F1F2F5] px-6 pt-4 pb-6 space-y-4">
            {/* Summary rows */}
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#68707C]">Subtotal</span>
                <span className="font-medium text-[#29344A]">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#68707C]">Tax (8.6%)</span>
                <span className="font-medium text-[#29344A]">{fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-[15px] pt-2 border-t border-[#F1F2F5]">
                <span className="font-bold text-[#101828]">Total</span>
                <span className="font-bold text-[#101828]">{fmt(total)}</span>
              </div>
              {/* Cashback — positive reward earned on completion */}
              <div className="flex justify-between items-center text-[13px] pt-1">
                <span className="text-[#39B16C] font-medium">Cashback on completion</span>
                <span className="font-bold text-[#39B16C]">+{fmt(cashback)}</span>
              </div>
            </div>

            {/* Bites banner */}
            <div className="flex items-center gap-2.5 bg-[#E6F5ED] rounded-xl px-4 py-3">
              <RiCoinLine className="size-4 text-[#CA6100] shrink-0" />
              <span className="text-[13px] font-semibold text-[#063126]">
                You&apos;ll earn{" "}
                <span className="text-[#CA6100]">{totalBites.toLocaleString()} Bites</span> on this order
              </span>
            </div>

            {/* CTA */}
            <Button
              className="w-full h-[48px] text-[15px]"
              iconPosition="right"
              icon={<RiArrowRightSLine className="size-5" />}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export { RiCheckLine } // re-export for convenience
