"use client"

import { RiArrowLeftSLine, RiTruckLine, RiCheckLine, RiTimeLine, RiPhoneLine, RiCustomerService2Line, RiMapPin2Line, RiGroupLine } from "@remixicon/react"
import type { PlacedOrder } from "../page"

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const STATUS_CONFIG: Record<
  PlacedOrder["status"],
  { label: string; bg: string; fg: string; step: number }
> = {
  preparing:        { label: "Preparing",        bg: "#FFE4CC", fg: "#CA6100", step: 2 },
  "out-for-delivery": { label: "Out for Delivery", bg: "#DBEAFE", fg: "#1D4ED8", step: 3 },
  delivered:        { label: "Delivered",         bg: "#E6F5ED", fg: "#067E39", step: 4 },
  cancelled:        { label: "Cancelled",         bg: "#FFDCDC", fg: "#C22D2C", step: -1 },
}

const TIMELINE_STEPS = [
  { id: 0, label: "Order Placed",          sublabel: "We received your order" },
  { id: 1, label: "Restaurant Confirmed",  sublabel: "The kitchen has your order" },
  { id: 2, label: "Preparing",             sublabel: "Your food is being prepared" },
  { id: 3, label: "Out for Delivery",      sublabel: "On the way to you" },
  { id: 4, label: "Delivered",             sublabel: "Enjoy your meal!" },
]

/* ─────────────────────────────────────────────────────────────────────────────
   TimelineStep
───────────────────────────────────────────────────────────────────────────── */

function TimelineStep({
  label,
  sublabel,
  state,
  time,
  isLast,
}: {
  label: string
  sublabel: string
  state: "done" | "active" | "upcoming"
  time?: string
  isLast: boolean
}) {
  return (
    <div className="flex gap-4">
      {/* Icon + line */}
      <div className="flex flex-col items-center">
        <div
          className={[
            "size-8 rounded-full flex items-center justify-center shrink-0 z-10",
            state === "done"     ? "bg-[#39B16C]"
            : state === "active" ? "bg-[#073D30] ring-4 ring-[#D4F5ED] animate-pulse"
            : "bg-[#F1F2F5]",
          ].join(" ")}
        >
          {state === "done" ? (
            <RiCheckLine className="size-4 text-white" />
          ) : state === "active" ? (
            <RiTimeLine className="size-4 text-[#CCF8B9]" />
          ) : (
            <span className="size-2 rounded-full bg-[#D0D5DD]" />
          )}
        </div>
        {!isLast && (
          <div className={["w-0.5 flex-1 mt-1", state === "done" ? "bg-[#39B16C]" : "bg-[#F1F2F5]"].join(" ")} style={{ minHeight: 32 }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={["text-[14px] font-semibold", state === "upcoming" ? "text-[#B2B8C1]" : "text-[#101828]"].join(" ")}>
            {label}
          </p>
          {time && (
            <span className="text-[12px] text-[#68707C]">· {time}</span>
          )}
        </div>
        <p className={["text-[12px]", state === "upcoming" ? "text-[#D0D5DD]" : "text-[#68707C]"].join(" ")}>
          {sublabel}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderTrackingView
───────────────────────────────────────────────────────────────────────────── */

interface Props {
  order: PlacedOrder
  onBack: () => void
}

export default function OrderTrackingView({ order, onBack }: Props) {
  const config = STATUS_CONFIG[order.status]
  const activeStep = config.step

  // Mock timestamps based on placedAt
  const times: Record<number, string> = {
    0: order.placedAt,
    1: order.status !== "cancelled" ? order.placedAt + " +5m" : "",
    2: activeStep >= 2 ? "Now" : "",
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#F1F2F5] px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="size-9 rounded-full border border-[#D9DDE4] flex items-center justify-center text-[#68707C] hover:bg-[#F9FAFB] transition-colors shrink-0"
        >
          <RiArrowLeftSLine className="size-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-[#101828] leading-none truncate">{order.restaurantName}</p>
          <p className="text-[12px] text-[#68707C] mt-0.5">Ref {order.ref}</p>
        </div>
        <span
          className="shrink-0 text-[12px] font-bold rounded-full px-3 py-1"
          style={{ backgroundColor: config.bg, color: config.fg }}
        >
          {config.label}
        </span>
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-6 space-y-8">
        {/* ETA banner */}
        {order.status === "preparing" && (
          <div className="rounded-2xl bg-[#073D30] px-5 py-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <RiTruckLine className="size-6 text-[#CCF8B9]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#9CD8B5] font-medium">Estimated arrival</p>
              <p className="text-[20px] font-bold text-white leading-tight">{order.deliveryTime}</p>
              <p className="text-[12px] text-[#9CD8B5]">{order.deliveryAddress}</p>
            </div>
          </div>
        )}

        {order.status === "delivered" && (
          <div className="rounded-2xl bg-[#E6F5ED] border border-[#9CD8B5] px-5 py-4 flex items-center gap-3">
            <RiCheckLine className="size-5 text-[#39B16C] shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-[#063126]">Order delivered!</p>
              <p className="text-[12px] text-[#068038]">Delivered at {order.deliveryTime} · {order.deliveryDate}</p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div>
          <h3 className="text-[15px] font-bold text-[#101828] mb-5">Order progress</h3>
          <div>
            {TIMELINE_STEPS.map((ts, i) => {
              const state =
                ts.id < activeStep ? "done"
                : ts.id === activeStep ? "active"
                : "upcoming"
              return (
                <TimelineStep
                  key={ts.id}
                  label={ts.label}
                  sublabel={ts.sublabel}
                  state={state}
                  time={times[ts.id]}
                  isLast={i === TIMELINE_STEPS.length - 1}
                />
              )
            })}
          </div>
        </div>

        {/* Order details accordion */}
        <div className="rounded-2xl border border-[#F1F2F5] overflow-hidden">
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-[#F1F2F5]"
            style={{ backgroundColor: order.restaurantBg + "28" }}
          >
            <div className="size-7 rounded-lg shrink-0" style={{ backgroundColor: order.restaurantBg }} />
            <div className="flex-1">
              <p className="text-[13px] font-bold text-[#101828]">{order.restaurantName}</p>
              <p className="text-[11px] text-[#68707C]">{order.restaurantSub}</p>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-[#68707C]">
              <RiGroupLine className="size-3.5" />
              {order.forCount} people
            </div>
          </div>

          <div className="px-4 py-3 space-y-2">
            {order.mealItems.map((m) => (
              <div key={m.name} className="flex items-center gap-2.5">
                <div className="size-7 rounded-lg flex items-center justify-center text-sm leading-none shrink-0" style={{ backgroundColor: m.bgColor }}>
                  {m.emoji}
                </div>
                <span className="flex-1 text-[13px] text-[#101828]">{m.name} <span className="text-[#68707C]">×{m.quantity}</span></span>
                <span className="text-[13px] font-semibold text-[#29344A]">{fmt(m.quantity * m.priceEach)}</span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-[#F1F2F5] space-y-1.5">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#68707C]">Order Total</span>
              <span className="font-bold text-[#101828]">{fmt(order.total)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#39B16C]">Cashback on completion</span>
              <span className="font-bold text-[#39B16C]">+{fmt(order.cashback)}</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="rounded-2xl border border-[#F1F2F5] px-4 py-4 space-y-3">
          <h4 className="text-[13px] font-bold text-[#101828]">Delivery details</h4>
          {[
            { icon: RiMapPin2Line,  label: "Address",  value: order.deliveryAddress },
            { icon: RiTimeLine,     label: "Time",     value: order.deliveryTime },
            { icon: RiPhoneLine,    label: "Contact",  value: `${order.contactName} · ${order.contactPhone}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="size-4 text-[#B2B8C1] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#68707C] uppercase tracking-wide">{label}</p>
                <p className="text-[13px] text-[#101828]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button className="flex-1 h-11 rounded-full border border-[#D9DDE4] text-[13px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2">
            <RiPhoneLine className="size-4" /> Contact Restaurant
          </button>
          <button className="flex-1 h-11 rounded-full border border-[#D9DDE4] text-[13px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2">
            <RiCustomerService2Line className="size-4" /> Get Help
          </button>
        </div>
      </div>
    </div>
  )
}
