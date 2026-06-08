"use client"

import { useState } from "react"
import {
  RiArrowLeftSLine,
  RiTruckLine,
  RiCheckLine,
  RiCloseLine,
  RiRefreshLine,
  RiSearchLine,
  RiFileListLine,
} from "@remixicon/react"
import type { PlacedOrder } from "../page"

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

type Tab = "all" | "active" | "completed" | "cancelled"

const STATUS_CONFIG: Record<
  PlacedOrder["status"],
  { label: string; bg: string; fg: string; icon: React.ComponentType<{ className?: string }> }
> = {
  preparing: {
    label: "Preparing",
    bg: "#FFE4CC",
    fg: "#CA6100",
    icon: ({ className }) => <span className={`inline-block size-2 rounded-full bg-[#CA6100] ${className ?? ""}`} />,
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    bg: "#DBEAFE",
    fg: "#1D4ED8",
    icon: ({ className }) => <RiTruckLine className={className} />,
  },
  delivered: {
    label: "Delivered",
    bg: "#E6F5ED",
    fg: "#067E39",
    icon: ({ className }) => <RiCheckLine className={className} />,
  },
  cancelled: {
    label: "Cancelled",
    bg: "#FFDCDC",
    fg: "#C22D2C",
    icon: ({ className }) => <RiCloseLine className={className} />,
  },
}

function isActive(status: PlacedOrder["status"]) {
  return status === "preparing" || status === "out-for-delivery"
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderCard
───────────────────────────────────────────────────────────────────────────── */

function OrderCard({
  order,
  onTrack,
}: {
  order: PlacedOrder
  onTrack: (id: string) => void
}) {
  const cfg = STATUS_CONFIG[order.status]
  const Icon = cfg.icon
  const active = isActive(order.status)

  const itemSummary = order.mealItems
    .map((m) => `${m.name} ×${m.quantity}`)
    .join(", ")

  return (
    <div className="rounded-2xl border border-[#F1F2F5] overflow-hidden bg-white hover:shadow-sm transition-shadow">
      {/* Restaurant row */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-[#F1F2F5]"
        style={{ backgroundColor: order.restaurantBg + "22" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl shrink-0" style={{ backgroundColor: order.restaurantBg }} />
          <div>
            <p className="text-[13px] font-bold text-[#101828] leading-none">{order.restaurantName}</p>
            <p className="text-[11px] text-[#68707C] mt-0.5">{order.restaurantSub}</p>
          </div>
        </div>
        <span
          className="flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2.5 py-1"
          style={{ backgroundColor: cfg.bg, color: cfg.fg }}
        >
          <Icon className="size-3" />
          {cfg.label}
        </span>
      </div>

      {/* Details */}
      <div className="px-4 py-3">
        <p className="text-[12px] text-[#68707C] mb-1">
          {order.deliveryDate} · Ref {order.ref} · {order.forCount} people
        </p>
        <p className="text-[13px] text-[#101828] line-clamp-1">{itemSummary}</p>

        <div className="flex items-center justify-between mt-2.5">
          <div>
            <span className="text-[14px] font-bold text-[#101828]">{fmt(order.total)}</span>
            <span className="text-[12px] font-semibold text-[#CA6100] ml-2">
              {order.bites.toLocaleString()} Bites
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-3 flex gap-2">
        {active ? (
          <>
            <button
              onClick={() => onTrack(order.id)}
              className="flex-1 h-8 rounded-full bg-[#073D30] text-[12px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors flex items-center justify-center gap-1.5"
            >
              <RiTruckLine className="size-3.5" /> Track Order
            </button>
            <button className="flex-1 h-8 rounded-full border border-[#D9DDE4] text-[12px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors">
              Contact
            </button>
          </>
        ) : order.status === "delivered" ? (
          <>
            <button
              onClick={() => onTrack(order.id)}
              className="flex-1 h-8 rounded-full border border-[#D9DDE4] text-[12px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors"
            >
              View Details
            </button>
            <button className="flex-1 h-8 rounded-full bg-[#073D30] text-[12px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors flex items-center justify-center gap-1.5">
              <RiRefreshLine className="size-3.5" /> Reorder
            </button>
          </>
        ) : (
          <button
            onClick={() => onTrack(order.id)}
            className="flex-1 h-8 rounded-full border border-[#D9DDE4] text-[12px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderManagementView
───────────────────────────────────────────────────────────────────────────── */

interface Props {
  orders: PlacedOrder[]
  onBack: () => void
  onTrack: (orderId: string) => void
}

const TABS: { id: Tab; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "active",    label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
]

export default function OrderManagementView({ orders, onBack, onTrack }: Props) {
  const [tab, setTab] = useState<Tab>("all")
  const [search, setSearch] = useState("")

  const filtered = orders.filter((o) => {
    const matchTab =
      tab === "all" ? true
      : tab === "active" ? isActive(o.status)
      : tab === "completed" ? o.status === "delivered"
      : o.status === "cancelled"

    const matchSearch =
      !search ||
      o.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      o.ref.toLowerCase().includes(search.toLowerCase())

    return matchTab && matchSearch
  })

  return (
    <div className="h-full overflow-y-auto bg-[#FAFBFC]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#F1F2F5] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="size-9 rounded-full border border-[#D9DDE4] flex items-center justify-center text-[#68707C] hover:bg-[#F9FAFB] transition-colors shrink-0"
          >
            <RiArrowLeftSLine className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <RiFileListLine className="size-5 text-[#073D30]" />
            <h1 className="text-[18px] font-bold text-[#101828]" style={{ fontFamily: "var(--font-title)" }}>
              My Orders
            </h1>
            <span className="size-6 rounded-full bg-[#F1F2F5] text-[11px] font-bold text-[#68707C] flex items-center justify-center">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 h-9 rounded-full border border-[#D9DDE4] bg-white px-3 mb-4">
          <RiSearchLine className="size-4 text-[#68707C] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by restaurant or ref…"
            className="flex-1 text-[13px] text-[#29344A] placeholder:text-[#B2B8C1] bg-transparent outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#F1F2F5] rounded-full w-fit">
          {TABS.map((t) => {
            const count =
              t.id === "all" ? orders.length
              : t.id === "active" ? orders.filter((o) => isActive(o.status)).length
              : t.id === "completed" ? orders.filter((o) => o.status === "delivered").length
              : orders.filter((o) => o.status === "cancelled").length

            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-full transition-all",
                  tab === t.id ? "bg-white text-[#073D30] shadow-sm" : "text-[#68707C] hover:text-[#29344A]",
                ].join(" ")}
              >
                {t.label}
                {count > 0 && (
                  <span className={["text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center", tab === t.id ? "bg-[#E6F5ED] text-[#073D30]" : "bg-[#E8EAED] text-[#68707C]"].join(" ")}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Order list */}
      <div className="max-w-[720px] mx-auto px-6 py-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-16 rounded-full bg-[#F1F2F5] flex items-center justify-center mb-4">
              <RiFileListLine className="size-7 text-[#D0D5DD]" />
            </div>
            <p className="text-[15px] font-semibold text-[#29344A] mb-1">No orders here</p>
            <p className="text-[13px] text-[#68707C]">
              {search ? "Try a different search term" : "Place your first order with CaterAI"}
            </p>
          </div>
        ) : (
          filtered.map((order) => (
            <OrderCard key={order.id} order={order} onTrack={onTrack} />
          ))
        )}
      </div>
    </div>
  )
}
