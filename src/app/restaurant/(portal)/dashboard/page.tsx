"use client"

import Link from "next/link"
import {
  RiArrowUpLine,
  RiArrowRightLine,
  RiMapPinLine,
  RiTimeLine,
  RiTeamLine,
  RiMessage3Line,
  RiCheckLine,
  RiAlertLine,
  RiLoader4Line,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { MOCK_ORDERS, MOCK_CONVERSATIONS, MOCK_STATS, RESTAURANT_PROFILE } from "../_data/mock"
import { cn } from "@/lib/utils"
import type { OrderStatus } from "../_data/mock"

/* ─── Status config ─────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  pending:    { label: "Pending review",  bg: "#ffe4cc", text: "#ca6100", icon: RiAlertLine    },
  confirmed:  { label: "Confirmed",       bg: "#e6f5ed", text: "#067e39", icon: RiCheckLine    },
  preparing:  { label: "Preparing now",   bg: "#f3e8ff", text: "#7c3aed", icon: RiLoader4Line  },
  completed:  { label: "Completed",       bg: "#f1f2f5", text: "#68707c", icon: RiCheckLine    },
  cancelled:  { label: "Cancelled",       bg: "#ffdcdc", text: "#c22d2c", icon: RiAlertLine    },
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      <Icon className="size-3" />
      {cfg.label}
    </span>
  )
}

function StatCard({
  label, value, sub, trend, trendPositive,
}: {
  label: string; value: string; sub?: string; trend?: string; trendPositive?: boolean
}) {
  return (
    <div className="bg-white border border-[#d9dde4] rounded-2xl p-5">
      <p className="text-[12px] font-semibold text-[#68707c] uppercase tracking-wide mb-1">{label}</p>
      <p className="text-[28px] font-bold text-[#101828] font-[family-name:var(--font-title)] leading-tight">
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        {trend && (
          <span className={cn(
            "flex items-center gap-0.5 text-[12px] font-semibold",
            trendPositive ? "text-[#39b16c]" : "text-[#c22d2c]"
          )}>
            <RiArrowUpLine className={cn("size-3", !trendPositive && "rotate-180")} />
            {trend}
          </span>
        )}
        {sub && <span className="text-[12px] text-[#b2b8c1]">{sub}</span>}
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

const today = "Thursday, May 9"
const upcoming = MOCK_ORDERS.filter(o => ["pending","confirmed","preparing"].includes(o.status)).slice(0, 5)
const recentMsgs = MOCK_CONVERSATIONS.slice(0, 3)

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] font-[family-name:var(--font-title)]">
            Good morning, {RESTAURANT_PROFILE.ownerName.split(" ")[0]} 👋
          </h1>
          <p className="text-[13px] text-[#68707c]">{today} · {RESTAURANT_PROFILE.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#39b16c] bg-[#e6f5ed] px-3 py-1.5 rounded-full border border-[#9cd8b5]">
            <span className="size-1.5 rounded-full bg-[#39b16c]" />
            Listing live
          </span>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            label="Revenue this month"
            value={`$${MOCK_STATS.revenueThisMonth.toLocaleString()}`}
            trend="+12%"
            trendPositive
            sub="vs last month"
          />
          <StatCard
            label="Orders this month"
            value={String(MOCK_STATS.ordersThisMonth)}
            trend="+25%"
            trendPositive
            sub="vs last month"
          />
          <StatCard
            label="Avg order value"
            value={`$${MOCK_STATS.avgOrderValue.toLocaleString()}`}
            sub="per order"
          />
          <StatCard
            label="Rating"
            value={String(MOCK_STATS.rating)}
            sub={`${MOCK_STATS.reviewCount} reviews`}
          />
        </div>

        {/* Preparing today alert */}
        {MOCK_ORDERS.filter(o => o.status === "preparing").map(order => (
          <div key={order.id} className="flex items-center gap-4 px-5 py-4 bg-[#f3e8ff] border border-[#c084fc] rounded-2xl">
            <RiLoader4Line className="size-5 text-[#7c3aed] animate-spin shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#4a0080]">
                Preparing now — {order.orderNumber}
              </p>
              <p className="text-[13px] text-[#7c3aed]">
                {order.company} · {order.headcount} people · {order.deliveryTime} delivery to {order.deliveryAddress.split(",")[0]}
              </p>
            </div>
            <Link href="/restaurant/orders">
              <Button variant="ghost" size="sm" iconPosition="right" icon={<RiArrowRightLine />}>
                View order
              </Button>
            </Link>
          </div>
        ))}

        {/* Pending orders alert */}
        {MOCK_ORDERS.filter(o => o.status === "pending").length > 0 && (
          <div className="flex items-center gap-4 px-5 py-4 bg-[#ffe4cc] border border-[#fbbf72] rounded-2xl">
            <RiAlertLine className="size-5 text-[#ca6100] shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#653000]">
                {MOCK_ORDERS.filter(o => o.status === "pending").length} new orders need your response
              </p>
              <p className="text-[13px] text-[#ca6100]">
                Respond within 4 hours to maintain your response rate score.
              </p>
            </div>
            <Link href="/restaurant/orders">
              <Button size="sm" iconPosition="right" icon={<RiArrowRightLine />}>
                Review orders
              </Button>
            </Link>
          </div>
        )}

        {/* Main two-column grid */}
        <div className="grid grid-cols-[1fr_340px] gap-6">

          {/* Upcoming orders */}
          <div className="bg-white border border-[#d9dde4] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f1f2f5] flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#101828]">Upcoming orders</h2>
              <Link href="/restaurant/orders" className="text-[13px] font-semibold text-[#073d30] hover:underline flex items-center gap-1">
                View all <RiArrowRightLine className="size-3.5" />
              </Link>
            </div>
            <ul className="divide-y divide-[#f8f9fb]">
              {upcoming.map(order => (
                <li key={order.id} className="px-5 py-4 hover:bg-[#fafbfc] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[14px] font-bold text-[#101828]">{order.company}</p>
                        <StatusBadge status={order.status} />
                        {order.isNew && (
                          <span className="text-[10px] font-bold text-white bg-[#073d30] px-1.5 py-0.5 rounded-full">NEW</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-[#68707c]">
                        <span className="flex items-center gap-1">
                          <RiTeamLine className="size-3.5" />
                          {order.headcount} people
                        </span>
                        <span className="flex items-center gap-1">
                          <RiTimeLine className="size-3.5" />
                          {order.deliveryDate} · {order.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiMapPinLine className="size-3.5" />
                          {order.deliveryAddress.split(",")[0]}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[15px] font-bold text-[#101828]">${order.total.toLocaleString()}</p>
                      <p className="text-[11px] text-[#b2b8c1]">{order.orderNumber}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Recent messages */}
            <div className="bg-white border border-[#d9dde4] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#f1f2f5] flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#101828]">Messages</h2>
                <Link href="/restaurant/messages" className="text-[13px] font-semibold text-[#073d30] hover:underline flex items-center gap-1">
                  View all <RiArrowRightLine className="size-3.5" />
                </Link>
              </div>
              <ul className="divide-y divide-[#f8f9fb]">
                {recentMsgs.map(conv => {
                  const last = conv.messages[conv.messages.length - 1]
                  return (
                    <li key={conv.id}>
                      <Link
                        href="/restaurant/messages"
                        className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#fafbfc] transition-colors"
                      >
                        <div
                          className="size-9 rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0"
                          style={{ backgroundColor: conv.avatarColor }}
                        >
                          {conv.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[13px] font-semibold text-[#101828]">{conv.customerName}</p>
                            <span className="text-[11px] text-[#b2b8c1]">{conv.lastAt}</span>
                          </div>
                          <p className="text-[12px] text-[#68707c] truncate">{last.content}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="size-5 rounded-full bg-[#073d30] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {conv.unreadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#d9dde4] rounded-2xl p-5">
              <h2 className="text-[14px] font-bold text-[#101828] mb-3">Quick actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Add a menu item",     href: "/restaurant/menu",      icon: "🍽️" },
                  { label: "Update operating hours", href: "/restaurant/settings", icon: "🕐" },
                  { label: "View setup guide",    href: "/restaurant/guide",     icon: "📋" },
                ].map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f0faf5] transition-colors group"
                  >
                    <span className="text-[16px]">{icon}</span>
                    <span className="flex-1 text-[13px] font-semibold text-[#29344a] group-hover:text-[#073d30]">{label}</span>
                    <RiArrowRightLine className="size-3.5 text-[#b2b8c1] group-hover:text-[#073d30]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
