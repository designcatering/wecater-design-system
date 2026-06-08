"use client"

import { useState } from "react"
import {
  RiMicLine,
  RiSendPlaneFill,
  RiFilterLine,
  RiArrowDownSLine,
  RiStarFill,
  RiHeartLine,
  RiMedalLine,
  RiSearchLine,
} from "@remixicon/react"

interface BrowseViewProps {
  onOpenChat: (query?: string) => void
  onRestaurantClick?: (name: string) => void
}

const RESTAURANT_CARDS = [
  {
    id: 1,
    name: "Cracker Crave",
    location: "Downtown, LA · 20min",
    rating: 4.6,
    reviews: "1,500+",
    rewards: "2x rewards",
    bestSeller: false,
    bg: "from-[#FED68D] to-[#E5A46C]",
  },
  {
    id: 2,
    name: "Spicy Spoon Express",
    location: "Downtown, LA · 20min",
    rating: 4.6,
    reviews: "1,500+",
    rewards: "4x rewards",
    bestSeller: true,
    bg: "from-[#D4F5ED] to-[#39B16C]/40",
  },
  {
    id: 3,
    name: "Green Garden Co.",
    location: "Marina District · 15min",
    rating: 4.8,
    reviews: "2,300+",
    rewards: "3x rewards",
    bestSeller: true,
    bg: "from-[#ceecda] to-[#CCF8B9]",
  },
  {
    id: 4,
    name: "Fusion House",
    location: "SoMa · 25min",
    rating: 4.5,
    reviews: "980+",
    rewards: "2x rewards",
    bestSeller: false,
    bg: "from-[#fee3fc] to-[#ffdcdc]",
  },
]

const FEATURED = [
  { id: 1, name: "The Bowl", bg: "#E5A46C" },
  { id: 2, name: "Salad Co.", bg: "#9CD8B5" },
  { id: 3, name: "Wok & Roll", bg: "#FED68D" },
  { id: 4, name: "Casa Latina", bg: "#f0c4ec" },
  { id: 5, name: "Umami House", bg: "#D4F5ED" },
  { id: 6, name: "Bite Box", bg: "#ffe4cc" },
  { id: 7, name: "Grain & Grill", bg: "#ceecda" },
  { id: 8, name: "Nori Nobu", bg: "#ffdcdc" },
]

export default function BrowseView({ onOpenChat, onRestaurantClick }: BrowseViewProps) {
  const [query, setQuery] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onOpenChat(query)
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* ── Hero ── */}
      <section className="bg-[#073D30] px-6 pt-8 pb-7 relative overflow-hidden">
        <div className="max-w-[1465px] mx-auto">
          <div className="flex items-end justify-between gap-8 mb-7">
            {/* Headline */}
            <div className="flex-1">
              <h1
                className="text-[38px] font-bold text-white leading-[1.2] tracking-tight"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Feed your team,
                <br />
                delight every guest
              </h1>
              <p className="mt-2 text-[#9CD8B5] text-sm font-medium">
                AI-powered catering for every occasion
              </p>
            </div>

            {/* Illustration */}
            <div className="shrink-0 w-[340px] h-[148px]">
              <HeroIllustration />
            </div>
          </div>

          {/* AI search bar */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
              <RiSearchLine className="size-5 text-[#68707C] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Lunch for 50 guests tomorrow under $500..."
                className="flex-1 min-w-0 text-[15px] text-[#29344A] placeholder:text-[#68707C] bg-transparent outline-none"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#68707C] border border-[#D9DDE4] rounded-full px-2.5 py-0.5 font-medium whitespace-nowrap">
                  Beta
                </span>
                <button
                  type="button"
                  className="size-[52px] rounded-xl bg-[#F1F2F5] flex items-center justify-center text-[#68707C] hover:bg-[#E0E2E8] transition-colors"
                >
                  <RiMicLine className="size-5" />
                </button>
                <button
                  type="submit"
                  className="size-[52px] rounded-xl bg-[#073D30] flex items-center justify-center text-[#CCF8B9] hover:bg-[#1e6151] transition-colors"
                >
                  <RiSendPlaneFill className="size-5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Ambient glow */}
        <div className="absolute -top-20 right-0 w-80 h-80 bg-[#39B16C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#CCF8B9]/5 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* ── Browse section ── */}
      <section className="max-w-[1465px] mx-auto px-6 py-7">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-8">
          <button className="flex items-center gap-2 px-4 h-10 rounded-full bg-[#F1F2F5] text-sm font-semibold text-[#101828] hover:bg-[#E8EAED] transition-colors shrink-0">
            <RiFilterLine className="size-4" />
            All filters
          </button>
          {["Ratings", "Cuisines", "Levels", "Bites"].map((f) => (
            <button
              key={f}
              className="flex items-center gap-1.5 px-4 h-10 rounded-full border border-[#D9DDE4] text-sm font-medium text-[#101828] bg-white hover:bg-[#F9FAFB] transition-colors"
            >
              {f}
              <RiArrowDownSLine className="size-4 text-[#68707C]" />
            </button>
          ))}
        </div>

        {/* Explore restaurants */}
        <div className="mb-10">
          <h2
            className="text-[22px] font-bold text-[#101828] mb-5"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Explore restaurants
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {RESTAURANT_CARDS.map((r) => (
              <RestaurantCard key={r.id} {...r} onClick={() => onRestaurantClick?.(r.name)} />
            ))}
          </div>
        </div>

        {/* Featured restaurants */}
        <div>
          <h2
            className="text-[22px] font-bold text-[#101828] mb-5"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Featured restaurants
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {FEATURED.map((f) => (
              <button
                key={f.id}
                className="shrink-0 w-[110px] h-[110px] rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: f.bg }}
              >
                <span className="text-[#29344A] text-xs font-semibold text-center px-2 leading-tight">
                  {f.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function RestaurantCard({
  name,
  location,
  rating,
  reviews,
  rewards,
  bestSeller,
  bg,
  onClick,
}: (typeof RESTAURANT_CARDS)[number] & { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="rounded-2xl border border-[#F1F2F5] overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer group">
      {/* Image area */}
      <div className={`h-36 bg-gradient-to-br ${bg} relative`}>
        <button
          className="absolute top-3 right-3 size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <RiHeartLine className="size-4 text-[#68707C]" />
        </button>
        {bestSeller && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#073D30] text-[11px] font-semibold rounded-full px-2 py-1">
            <RiMedalLine className="size-3" />
            Best Seller
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-[#101828] leading-snug">{name}</h3>
          <span className="shrink-0 text-[11px] font-semibold text-[#033F1C] bg-[#ceecda] rounded-full px-2 py-0.5">
            {rewards}
          </span>
        </div>
        <p className="text-xs text-[#68707C] mb-2">{location}</p>
        <div className="flex items-center gap-1">
          <RiStarFill className="size-3.5 text-[#FDBC2A]" />
          <span className="text-xs font-semibold text-[#101828]">{rating}</span>
          <span className="text-xs text-[#68707C]">({reviews})</span>
        </div>
      </div>
    </div>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 340 148"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Table surface */}
      <ellipse cx="170" cy="126" rx="150" ry="18" fill="#063126" opacity="0.5" />
      <ellipse cx="170" cy="118" rx="134" ry="14" fill="#1e6151" />

      {/* Main plate */}
      <ellipse cx="170" cy="108" rx="100" ry="20" fill="#CEECDA" />
      <ellipse cx="170" cy="102" rx="88" ry="16" fill="#E6F5ED" />

      {/* Left dish — bread/roll */}
      <ellipse cx="100" cy="90" rx="30" ry="16" fill="#E5A46C" />
      <ellipse cx="100" cy="86" rx="26" ry="11" fill="#FED68D" />
      <ellipse cx="100" cy="83" rx="18" ry="7" fill="#FDBC2A" opacity="0.6" />

      {/* Centre dish — main */}
      <ellipse cx="182" cy="87" rx="36" ry="18" fill="#E7C8AA" />
      <ellipse cx="182" cy="83" rx="28" ry="13" fill="#EAD5C3" />
      <circle cx="175" cy="80" r="6" fill="#E5A46C" opacity="0.7" />
      <circle cx="190" cy="77" r="4" fill="#FDBC2A" opacity="0.8" />

      {/* Right dish — greens */}
      <ellipse cx="260" cy="92" rx="24" ry="13" fill="#9CD8B5" />
      <ellipse cx="260" cy="88" rx="18" ry="9" fill="#D4F5ED" />
      <circle cx="253" cy="86" r="4" fill="#39B16C" opacity="0.8" />
      <circle cx="267" cy="84" r="3" fill="#CCF8B9" />

      {/* Garnish dots */}
      <circle cx="148" cy="79" r="3.5" fill="#39B16C" />
      <circle cx="220" cy="76" r="3" fill="#E5A46C" />
      <circle cx="235" cy="82" r="2.5" fill="#FDBC2A" />
      <circle cx="128" cy="83" r="2" fill="#CEECDA" />

      {/* Cutlery — fork */}
      <rect x="68" y="60" width="3" height="38" rx="1.5" fill="#39B16C" opacity="0.6" />
      <rect x="63" y="60" width="1.5" height="16" rx="0.75" fill="#39B16C" opacity="0.5" />
      <rect x="72" y="60" width="1.5" height="16" rx="0.75" fill="#39B16C" opacity="0.5" />

      {/* Cutlery — knife */}
      <rect x="284" y="58" width="3" height="38" rx="1.5" fill="#9CD8B5" opacity="0.6" />
      <path d="M284 58 Q289 64 287 76 L284 76 Z" fill="#9CD8B5" opacity="0.4" />

      {/* Steam */}
      <path d="M155 62 Q158 52 154 42" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M180 55 Q183 43 180 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M207 58 Q210 48 207 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

      {/* WeCater wordmark (subtle) */}
      <text
        x="170"
        y="110"
        textAnchor="middle"
        fill="#063126"
        fontSize="7"
        fontWeight="700"
        opacity="0.5"
        letterSpacing="0.5"
      >
        WeCater
      </text>
    </svg>
  )
}
