"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RiCheckLine, RiAlertLine, RiLoader4Line,
  RiCloseLine, RiMessage3Line, RiTeamLine,
  RiTimeLine, RiMapPinLine, RiPhoneLine,
  RiMailLine, RiArrowRightLine, RiSearch2Line,
  RiStarFill, RiStarLine, RiDoubleQuotesL,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { MOCK_ORDERS } from "../_data/mock"
import type { MockOrder, OrderStatus } from "../_data/mock"
import { cn } from "@/lib/utils"

/* ─── Status config ─────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; dot: string; icon: React.ElementType }> = {
  pending:   { label: "Pending",   bg: "#ffe4cc", text: "#ca6100", dot: "#ca6100", icon: RiAlertLine   },
  confirmed: { label: "Confirmed", bg: "#e6f5ed", text: "#067e39", dot: "#39b16c", icon: RiCheckLine   },
  preparing: { label: "Preparing", bg: "#f3e8ff", text: "#7c3aed", dot: "#7c3aed", icon: RiLoader4Line },
  completed: { label: "Completed", bg: "#f1f2f5", text: "#68707c", dot: "#b2b8c1", icon: RiCheckLine   },
  cancelled: { label: "Cancelled", bg: "#ffdcdc", text: "#c22d2c", dot: "#c22d2c", icon: RiCloseLine   },
}

const TABS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all",       label: "All"       },
  { key: "pending",   label: "Pending"   },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
]

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      <Icon className={cn("size-3", status === "preparing" && "animate-spin")} />
      {cfg.label}
    </span>
  )
}

/* ─── Order detail panel ─────────────────────────────────────────────── */

function OrderDetail({ order, onClose }: { order: MockOrder; onClose: () => void }) {
  const [status, setStatus] = useState<OrderStatus>(order.status)
  const itemTotal = order.items.reduce((s, i) => s + i.qty * i.pricePerPerson, 0)

  const ACTIONS: Partial<Record<OrderStatus, { accept?: string; decline?: string; next?: { label: string; value: OrderStatus } }>> = {
    pending:   { accept: "Accept Order", decline: "Decline", next: { label: "Mark Confirmed", value: "confirmed" } },
    confirmed: { next: { label: "Start Preparing", value: "preparing" } },
    preparing: { next: { label: "Mark Completed", value: "completed" } },
  }

  const actions = ACTIONS[status]

  return (
    <div className="w-[440px] shrink-0 flex flex-col border-l border-[#d9dde4] bg-white overflow-y-auto">
      {/* Panel header */}
      <div className="sticky top-0 bg-white border-b border-[#f1f2f5] px-6 py-4 flex items-center justify-between z-10">
        <div>
          <p className="text-[12px] font-bold text-[#b2b8c1] uppercase tracking-wide">{order.orderNumber}</p>
          <p className="text-[16px] font-bold text-[#101828]">{order.company}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-8 rounded-xl flex items-center justify-center text-[#68707c] hover:bg-[#f1f2f5] transition-colors"
        >
          <RiCloseLine className="size-5" />
        </button>
      </div>

      <div className="flex-1 px-6 py-5 space-y-6">

        {/* Status + action buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-[#68707c]">Status</p>
            <StatusBadge status={status} />
          </div>
          {actions && (
            <div className="flex gap-2">
              {actions.accept && (
                <Button size="sm" className="flex-1" onClick={() => setStatus("confirmed")}>
                  {actions.accept}
                </Button>
              )}
              {actions.next && (
                <Button
                  variant={actions.accept ? "secondary" : "default"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setStatus(actions.next!.value)}
                >
                  {actions.next.label}
                </Button>
              )}
              {actions.decline && (
                <Button variant="outline" size="sm" onClick={() => setStatus("cancelled")}>
                  {actions.decline}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Delivery info */}
        <div className="space-y-2.5">
          <p className="text-[13px] font-bold text-[#101828]">Delivery details</p>
          <div className="space-y-2 text-[13px] text-[#68707c]">
            <div className="flex gap-2">
              <RiTimeLine className="size-4 shrink-0 mt-0.5 text-[#b2b8c1]" />
              <span><span className="font-semibold text-[#29344a]">{order.deliveryDate}</span> at {order.deliveryTime}</span>
            </div>
            <div className="flex gap-2">
              <RiMapPinLine className="size-4 shrink-0 mt-0.5 text-[#b2b8c1]" />
              <span>{order.deliveryAddress}</span>
            </div>
            <div className="flex gap-2">
              <RiTeamLine className="size-4 shrink-0 mt-0.5 text-[#b2b8c1]" />
              <span>{order.headcount} guests</span>
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="space-y-2.5">
          <p className="text-[13px] font-bold text-[#101828]">Customer</p>
          <div className="flex items-center gap-3 p-3 bg-[#fafbfc] rounded-xl border border-[#f1f2f5]">
            <div className="size-9 rounded-full bg-[#e6f5ed] flex items-center justify-center text-[#073d30] font-bold text-[12px] shrink-0">
              {order.customerName.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#101828]">{order.customerName}</p>
              <p className="text-[11px] text-[#68707c]">{order.company}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-[13px] text-[#68707c]">
            <a href={`mailto:${order.customerEmail}`} className="flex gap-2 hover:text-[#073d30] transition-colors">
              <RiMailLine className="size-4 shrink-0 mt-0.5 text-[#b2b8c1]" />
              {order.customerEmail}
            </a>
            <a href={`tel:${order.customerPhone}`} className="flex gap-2 hover:text-[#073d30] transition-colors">
              <RiPhoneLine className="size-4 shrink-0 mt-0.5 text-[#b2b8c1]" />
              {order.customerPhone}
            </a>
          </div>
        </div>

        {/* Order items */}
        <div className="space-y-2.5">
          <p className="text-[13px] font-bold text-[#101828]">Items ordered</p>
          <div className="rounded-xl border border-[#d9dde4] overflow-hidden">
            {order.items.map((item, i) => (
              <div
                key={item.name}
                className={cn(
                  "flex items-center justify-between px-4 py-3 text-[13px]",
                  i < order.items.length - 1 && "border-b border-[#f8f9fb]"
                )}
              >
                <div>
                  <p className="font-semibold text-[#29344a]">{item.name}</p>
                  <p className="text-[#b2b8c1]">{item.qty} × ${item.pricePerPerson}/person</p>
                </div>
                <p className="font-bold text-[#101828]">
                  ${(item.qty * item.pricePerPerson).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 bg-[#fafbfc] border-t border-[#d9dde4]">
              <p className="text-[13px] font-bold text-[#101828]">Total</p>
              <p className="text-[15px] font-bold text-[#073d30]">${itemTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Special instructions */}
        {order.specialInstructions && (
          <div className="space-y-2">
            <p className="text-[13px] font-bold text-[#101828]">Special instructions</p>
            <div className="p-3 bg-[#fffbeb] border border-[#fcd34d] rounded-xl">
              <p className="text-[13px] text-[#78350f]">⚠️ {order.specialInstructions}</p>
            </div>
          </div>
        )}

        {/* Customer review */}
        {order.review && (
          <div className="space-y-3">
            <p className="text-[13px] font-bold text-[#101828]">Customer review</p>
            <div className="p-4 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl space-y-3">
              {/* Stars + meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    i <= order.review!.rating
                      ? <RiStarFill  key={i} className="size-4 text-[#f59e0b]" />
                      : <RiStarLine  key={i} className="size-4 text-[#d9dde4]" />
                  ))}
                  <span className="ml-1.5 text-[13px] font-bold text-[#101828]">
                    {order.review.rating}.0
                  </span>
                </div>
                <span className="text-[11px] text-[#b2b8c1]">{order.review.reviewedAt}</span>
              </div>

              {/* Quote */}
              <div className="relative">
                <RiDoubleQuotesL className="size-5 text-[#d9dde4] absolute -top-1 -left-0.5" />
                <p className="text-[13px] text-[#29344a] leading-relaxed pl-5">
                  {order.review.comment}
                </p>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-2 pt-1 border-t border-[#f1f2f5]">
                <div className="size-6 rounded-full bg-[#e6f5ed] flex items-center justify-center text-[#073d30] font-bold text-[10px] shrink-0">
                  {order.review.reviewerName.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="text-[12px] font-semibold text-[#68707c]">
                  {order.review.reviewerName} · {order.company}
                </p>
              </div>

              {/* Highlight chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {order.review.highlights.map(h => (
                  <span
                    key={h}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#e6f5ed] text-[#067e39] text-[11px] font-semibold rounded-full"
                  >
                    <RiCheckLine className="size-3" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message CTA */}
        <Link href="/restaurant/messages">
          <Button variant="outline" className="w-full" iconPosition="left" icon={<RiMessage3Line />}>
            Message {order.customerName.split(" ")[0]}
          </Button>
        </Link>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all")
  const [search, setSearch]       = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_ORDERS[0].id)

  const filtered = MOCK_ORDERS.filter(o => {
    const matchTab    = activeTab === "all" || o.status === activeTab
    const matchSearch = search === "" ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = TABS.reduce((acc, tab) => {
    acc[tab.key] = tab.key === "all"
      ? MOCK_ORDERS.length
      : MOCK_ORDERS.filter(o => o.status === tab.key).length
    return acc
  }, {} as Record<string, number>)

  const selected = selectedId ? MOCK_ORDERS.find(o => o.id === selectedId) : null

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Left: list pane */}
      <div className={cn("flex flex-col overflow-hidden", selected ? "flex-1" : "flex-1")}>

        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[18px] font-bold text-[#101828] font-[family-name:var(--font-title)]">Orders</h1>
            <span className="text-[13px] text-[#68707c]">{MOCK_ORDERS.length} total</span>
          </div>
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f5f6f8] rounded-full border border-[#f1f2f5] focus-within:border-[#9cd8b5] focus-within:bg-white transition-colors mb-3">
            <RiSearch2Line className="size-4 text-[#68707c] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by company, name, or order #…"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#b2b8c1] text-[#29344a]"
            />
          </div>
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors",
                  activeTab === tab.key
                    ? "bg-[#073d30] text-white"
                    : "text-[#68707c] hover:bg-[#f1f2f5]"
                )}
              >
                {tab.label}
                {counts[tab.key] > 0 && (
                  <span className={cn(
                    "text-[11px] font-bold",
                    activeTab === tab.key ? "text-[#9cd8b5]" : "text-[#b2b8c1]"
                  )}>
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#b2b8c1]">
              <p className="text-[14px] font-semibold">No orders found</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#f8f9fb]">
              {filtered.map(order => (
                <li key={order.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(id => id === order.id ? null : order.id)}
                    className={cn(
                      "w-full flex items-start gap-4 px-6 py-4 text-left transition-colors",
                      selectedId === order.id
                        ? "bg-[#f0faf5] border-l-2 border-[#073d30]"
                        : "hover:bg-[#fafbfc] border-l-2 border-transparent"
                    )}
                  >
                    {/* Status dot */}
                    <div
                      className="size-2.5 rounded-full shrink-0 mt-2"
                      style={{ backgroundColor: STATUS_CONFIG[order.status].dot }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-[14px] font-bold text-[#101828]">{order.company}</p>
                        <StatusBadge status={order.status} />
                        {order.isNew && (
                          <span className="text-[10px] font-bold text-white bg-[#073d30] px-1.5 py-0.5 rounded-full">NEW</span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#68707c]">{order.customerName}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#b2b8c1]">
                        <span className="flex items-center gap-1">
                          <RiTeamLine className="size-3" /> {order.headcount}p
                        </span>
                        <span className="flex items-center gap-1">
                          <RiTimeLine className="size-3" /> {order.deliveryDate}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[15px] font-bold text-[#101828]">${order.total.toLocaleString()}</p>
                      <p className="text-[11px] text-[#b2b8c1] mt-0.5">{order.orderNumber}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right: detail panel */}
      {selected && (
        <OrderDetail
          key={selected.id}
          order={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
