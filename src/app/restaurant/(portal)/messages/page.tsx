"use client"

import { useState, useRef, useEffect } from "react"
import {
  RiSendPlaneFill,
  RiAttachment2,
  RiSearch2Line,
  RiArrowRightLine,
  RiFileList3Line,
  RiCheckDoubleLine,
} from "@remixicon/react"
import { MOCK_CONVERSATIONS, RESTAURANT_PROFILE } from "../_data/mock"
import type { MockConversation, MockMessage, OrderStatus } from "../_data/mock"
import { cn } from "@/lib/utils"

/* ─── Status config (for order badge in thread) ─────────────────────── */

const ORDER_STATUS_COLOR: Record<OrderStatus, { bg: string; text: string }> = {
  pending:   { bg: "#ffe4cc", text: "#ca6100" },
  confirmed: { bg: "#e6f5ed", text: "#067e39" },
  preparing: { bg: "#f3e8ff", text: "#7c3aed" },
  completed: { bg: "#f1f2f5", text: "#68707c" },
  cancelled: { bg: "#ffdcdc", text: "#c22d2c" },
}

const QUICK_REPLIES = [
  "Thanks for reaching out! Let me check on that.",
  "Your order is confirmed ✓",
  "We'll have this ready for delivery on time.",
  "Could you clarify the dietary requirements?",
  "Our driver will arrive 15 minutes before the scheduled time.",
]

/* ─── Message bubble ─────────────────────────────────────────────────── */

function MessageBubble({ msg, isOwn }: { msg: MockMessage; isOwn: boolean }) {
  return (
    <div className={cn("flex gap-3 max-w-[85%]", isOwn ? "ml-auto flex-row-reverse" : "mr-auto")}>
      {!isOwn && (
        <div className="size-7 rounded-full bg-[#e6f5ed] flex items-center justify-center text-[#073d30] font-bold text-[10px] shrink-0 mt-0.5">
          {msg.senderName.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
      )}
      <div>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed",
            isOwn
              ? "bg-[#073d30] text-white rounded-tr-sm"
              : "bg-[#f1f2f5] text-[#29344a] rounded-tl-sm"
          )}
        >
          {msg.content}
        </div>
        <p className={cn(
          "text-[11px] text-[#b2b8c1] mt-1 flex items-center gap-1",
          isOwn ? "justify-end" : "justify-start"
        )}>
          {msg.timestamp}
          {isOwn && <RiCheckDoubleLine className="size-3 text-[#9cd8b5]" />}
        </p>
      </div>
    </div>
  )
}

/* ─── Conversation thread ────────────────────────────────────────────── */

function Thread({ conv }: { conv: MockConversation }) {
  const [messages, setMessages] = useState<MockMessage[]>(conv.messages)
  const [input, setInput]       = useState("")
  const [showQuick, setShowQuick] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = (text: string) => {
    if (!text.trim()) return
    const msg: MockMessage = {
      id: `m${Date.now()}`,
      senderType: "restaurant",
      senderName: RESTAURANT_PROFILE.name,
      content: text.trim(),
      timestamp: "Just now",
    }
    setMessages(prev => [...prev, msg])
    setInput("")
    setShowQuick(false)
  }

  const orderStatus = conv.orderStatus
  const statusCfg   = orderStatus ? ORDER_STATUS_COLOR[orderStatus] : null

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Thread header */}
      <div className="sticky top-0 bg-white border-b border-[#d9dde4] px-6 py-4 flex items-center gap-4 z-10">
        <div
          className="size-10 rounded-full flex items-center justify-center text-white font-bold text-[13px] shrink-0"
          style={{ backgroundColor: conv.avatarColor }}
        >
          {conv.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-[#101828]">{conv.customerName}</p>
          <p className="text-[13px] text-[#68707c]">{conv.company}</p>
        </div>
        {conv.orderNumber && statusCfg && (
          <a
            href="/restaurant/orders"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold border hover:opacity-80 transition-opacity"
            style={{ backgroundColor: statusCfg.bg, color: statusCfg.text, borderColor: statusCfg.bg }}
          >
            <RiFileList3Line className="size-3.5" />
            {conv.orderNumber}
            <RiArrowRightLine className="size-3.5" />
          </a>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Date separator */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#f1f2f5]" />
          <span className="text-[11px] font-semibold text-[#b2b8c1]">
            {messages[0]?.timestamp.includes("Today") ? "Today" : "Earlier"}
          </span>
          <div className="flex-1 h-px bg-[#f1f2f5]" />
        </div>

        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isOwn={msg.senderType === "restaurant"}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {showQuick && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {QUICK_REPLIES.map(reply => (
            <button
              key={reply}
              type="button"
              onClick={() => send(reply)}
              className="px-3 py-1.5 bg-[#f0faf5] border border-[#9cd8b5] text-[#073d30] text-[12px] font-semibold rounded-full hover:bg-[#e6f5ed] transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Compose */}
      <div className="px-4 pb-4 pt-2 border-t border-[#f1f2f5]">
        <div className="flex items-end gap-2 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl px-4 py-3 focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Type a message… (Enter to send)"
            rows={1}
            className="flex-1 bg-transparent text-[14px] text-[#29344a] outline-none resize-none placeholder:text-[#b2b8c1] leading-relaxed"
            style={{ maxHeight: "120px" }}
          />
          <div className="flex items-center gap-1 shrink-0 pb-0.5">
            <button
              type="button"
              onClick={() => setShowQuick(v => !v)}
              title="Quick replies"
              className={cn(
                "size-8 rounded-xl flex items-center justify-center text-[#68707c] hover:bg-[#f1f2f5] transition-colors",
                showQuick && "bg-[#f0faf5] text-[#073d30]"
              )}
            >
              ⚡
            </button>
            <button
              type="button"
              className="size-8 rounded-xl flex items-center justify-center text-[#68707c] hover:bg-[#f1f2f5] transition-colors"
              title="Attach file"
            >
              <RiAttachment2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="size-8 rounded-xl flex items-center justify-center bg-[#073d30] text-white disabled:opacity-40 hover:bg-[#1e6151] transition-colors"
            >
              <RiSendPlaneFill className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-[#b2b8c1] text-center mt-2">
          Shift + Enter for new line · Enter to send
        </p>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function MessagesPage() {
  const [convs, setConvs]         = useState(MOCK_CONVERSATIONS)
  const [selectedId, setSelectedId] = useState(convs[0].id)
  const [search, setSearch]       = useState("")

  const filtered = convs.filter(c =>
    search === "" ||
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  )

  const selected = convs.find(c => c.id === selectedId)

  const selectConv = (id: string) => {
    setSelectedId(id)
    // Mark as read
    setConvs(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c))
  }

  const totalUnread = convs.reduce((s, c) => s + c.unreadCount, 0)

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Sidebar: conversation list */}
      <div className="w-[300px] shrink-0 flex flex-col border-r border-[#d9dde4] bg-white overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#f1f2f5]">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[17px] font-bold text-[#101828] font-[family-name:var(--font-title)]">
              Messages
            </h1>
            {totalUnread > 0 && (
              <span className="size-5 rounded-full bg-[#c22d2c] text-white text-[11px] font-bold flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f6f8] rounded-full border border-transparent focus-within:border-[#9cd8b5] focus-within:bg-white transition-colors">
            <RiSearch2Line className="size-3.5 text-[#68707c] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#b2b8c1] text-[#29344a]"
            />
          </div>
        </div>

        {/* Conversation list */}
        <ul className="flex-1 overflow-y-auto divide-y divide-[#f8f9fb]">
          {filtered.map(conv => {
            const lastMsg = conv.messages[conv.messages.length - 1]
            const isSelected = conv.id === selectedId
            return (
              <li key={conv.id}>
                <button
                  type="button"
                  onClick={() => selectConv(conv.id)}
                  className={cn(
                    "w-full flex items-start gap-3 px-5 py-4 text-left transition-colors",
                    isSelected ? "bg-[#f0faf5]" : "hover:bg-[#fafbfc]"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className="size-10 rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0"
                    style={{ backgroundColor: conv.avatarColor }}
                  >
                    {conv.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={cn(
                        "text-[13px] truncate",
                        conv.unreadCount > 0 ? "font-bold text-[#101828]" : "font-semibold text-[#29344a]"
                      )}>
                        {conv.customerName}
                      </p>
                      <span className="text-[11px] text-[#b2b8c1] shrink-0 ml-1">{conv.lastAt}</span>
                    </div>
                    <p className="text-[11px] text-[#b2b8c1] mb-1">{conv.company}</p>
                    <p className={cn(
                      "text-[12px] truncate",
                      conv.unreadCount > 0 ? "text-[#29344a] font-medium" : "text-[#68707c]"
                    )}>
                      {lastMsg.senderType === "restaurant" ? "You: " : ""}{lastMsg.content}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="size-5 rounded-full bg-[#073d30] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Thread */}
      {selected ? (
        <Thread key={selected.id} conv={selected} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-[#b2b8c1]">
          <p className="text-[14px]">Select a conversation</p>
        </div>
      )}
    </div>
  )
}
