"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiDashboard2Line,
  RiFileList3Line,
  RiMessage3Line,
  RiRestaurantLine,
  RiSettings4Line,
  RiExternalLinkLine,
  RiLogoutBoxLine,
} from "@remixicon/react"
import { Logo } from "@/components/ui/logo"
import { RESTAURANT_PROFILE, MOCK_ORDERS, MOCK_CONVERSATIONS } from "../_data/mock"
import { cn } from "@/lib/utils"

const pendingCount = MOCK_ORDERS.filter(o => o.status === "pending").length
const unreadCount  = MOCK_CONVERSATIONS.reduce((s, c) => s + c.unreadCount, 0)

const NAV_ITEMS = [
  { href: "/restaurant/dashboard", icon: RiDashboard2Line, label: "Dashboard",   badge: 0           },
  { href: "/restaurant/orders",    icon: RiFileList3Line,  label: "Orders",      badge: pendingCount },
  { href: "/restaurant/messages",  icon: RiMessage3Line,   label: "Messages",    badge: unreadCount  },
  { href: "/restaurant/menu",      icon: RiRestaurantLine, label: "Menu",        badge: 0           },
]

export function RestaurantNav() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-white border-r border-[#d9dde4] overflow-y-auto">

      {/* Logo wordmark */}
      <div className="px-5 pt-5 pb-4 border-b border-[#f1f2f5]">
        <Logo size="sm" />
      </div>

      {/* Restaurant identity */}
      <div className="px-4 py-3 border-b border-[#f1f2f5]">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-[#073d30] flex items-center justify-center text-white font-bold text-[13px] shrink-0 shadow-sm">
            {RESTAURANT_PROFILE.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#101828] truncate leading-tight">
              {RESTAURANT_PROFILE.name}
            </p>
            <p className="text-[11px] font-semibold flex items-center gap-1 mt-0.5">
              <span className="size-1.5 rounded-full bg-[#39b16c] inline-block" />
              <span className="text-[#39b16c]">Live</span>
              <span className="text-[#d9dde4]">·</span>
              <span className="text-[#b2b8c1]">{RESTAURANT_PROFILE.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Primary navigation */}
      <nav className="flex-1 px-3 py-3">
        <p className="px-2 mb-2 text-[10px] font-bold text-[#b2b8c1] tracking-widest uppercase">
          Operations
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/")
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                    isActive
                      ? "bg-[#f0faf5] text-[#073d30] font-semibold"
                      : "text-[#5a626f] hover:bg-[#fafbfc] hover:text-[#101828]"
                  )}
                >
                  <Icon className={cn("size-[18px] shrink-0", isActive ? "text-[#073d30]" : "text-[#68707c]")} />
                  <span className="flex-1">{label}</span>
                  {badge > 0 && (
                    <span className={cn(
                      "min-w-[20px] h-[20px] px-1.5 rounded-full text-white text-[11px] font-bold flex items-center justify-center",
                      isActive ? "bg-[#073d30]" : "bg-[#c22d2c]"
                    )}>
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="px-2 mt-5 mb-2 text-[10px] font-bold text-[#b2b8c1] tracking-widest uppercase">
          Account
        </p>
        <ul className="space-y-0.5">
          <li>
            <Link
              href="/restaurant/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                pathname === "/restaurant/settings"
                  ? "bg-[#f0faf5] text-[#073d30] font-semibold"
                  : "text-[#5a626f] hover:bg-[#fafbfc] hover:text-[#101828]"
              )}
            >
              <RiSettings4Line className="size-[18px] shrink-0 text-[#68707c]" />
              Settings
            </Link>
          </li>
          <li>
            <a
              href="/restaurant/onboarding"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#5a626f] hover:bg-[#fafbfc] hover:text-[#101828] transition-colors"
            >
              <RiExternalLinkLine className="size-[18px] shrink-0 text-[#68707c]" />
              View listing
            </a>
          </li>
        </ul>
      </nav>

      {/* User profile footer */}
      <div className="px-4 py-3 border-t border-[#f1f2f5]">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-[#e6f5ed] flex items-center justify-center text-[#073d30] font-bold text-[12px] shrink-0">
            {RESTAURANT_PROFILE.ownerInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#101828] truncate leading-tight">
              {RESTAURANT_PROFILE.ownerName}
            </p>
            <p className="text-[11px] text-[#68707c]">Admin</p>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            className="text-[#b2b8c1] hover:text-[#c22d2c] transition-colors"
          >
            <RiLogoutBoxLine className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
