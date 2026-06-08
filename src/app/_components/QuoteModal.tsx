"use client"

import { useState } from "react"
import {
  RiCloseLine,
  RiCheckboxCircleFill,
  RiCalendarEventLine,
  RiTimeLine,
  RiMapPin2Line,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
  RiArrowRightSLine,
  RiFileTextLine,
  RiSendPlaneFill,
} from "@remixicon/react"

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

export interface QuoteOrderItem {
  name: string
  emoji: string
  bgColor: string
  quantity: number
  priceEach: number
}

interface QuoteModalProps {
  open: boolean
  restaurantName: string
  restaurantSub: string
  restaurantBg: string
  items: QuoteOrderItem[]
  forCount: number
  onClose: () => void
  onSuccess: () => void
}

type SendState = "idle" | "sending" | "sent"

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field wrapper
───────────────────────────────────────────────────────────────────────────── */

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-[#68707C] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#B2B8C1] pointer-events-none" />
        )}
        {children}
      </div>
    </div>
  )
}

const inputCls = (hasIcon = true) =>
  [
    "w-full h-10 rounded-xl border border-[#D9DDE4] text-[13px] text-[#101828]",
    "placeholder:text-[#B2B8C1] bg-white outline-none transition-all",
    "focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA]",
    hasIcon ? "pl-9 pr-3" : "px-3",
  ].join(" ")

/* ─────────────────────────────────────────────────────────────────────────────
   Section heading
───────────────────────────────────────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-bold text-[#29344A] mt-1 mb-3">{children}</p>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Order summary (read-only)
───────────────────────────────────────────────────────────────────────────── */

function OrderSummaryCard({
  restaurantName,
  restaurantSub,
  restaurantBg,
  items,
  forCount,
}: Pick<QuoteModalProps, "restaurantName" | "restaurantSub" | "restaurantBg" | "items" | "forCount">) {
  const subtotal = items.reduce((s, i) => s + i.quantity * i.priceEach, 0)

  return (
    <div className="rounded-xl border border-[#F1F2F5] overflow-hidden">
      {/* Restaurant label */}
      <div
        className="px-4 py-2.5 flex items-center gap-2 border-b border-[#F1F2F5]"
        style={{ backgroundColor: restaurantBg + "28" }}
      >
        <div
          className="size-6 rounded-lg shrink-0"
          style={{ backgroundColor: restaurantBg }}
        />
        <div>
          <span className="text-[13px] font-bold text-[#101828]">{restaurantName}</span>
          <span className="text-[12px] text-[#68707C] ml-1.5">— {restaurantSub}</span>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 py-3 space-y-2.5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div
              className="size-7 shrink-0 rounded-lg flex items-center justify-center text-sm leading-none"
              style={{ backgroundColor: item.bgColor }}
            >
              {item.emoji}
            </div>
            <span className="flex-1 text-[13px] text-[#101828]">
              {item.name}
              <span className="text-[#68707C]"> ×{item.quantity}</span>
            </span>
            <span className="text-[13px] font-semibold text-[#29344A]">
              {fmt(item.quantity * item.priceEach)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-2.5 border-t border-[#F1F2F5] bg-[#FAFBFC]">
        <span className="text-[12px] text-[#68707C]">Est. for {forCount} people</span>
        <span className="text-[13px] font-bold text-[#101828]">{fmt(subtotal)} est.</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Success state
───────────────────────────────────────────────────────────────────────────── */

function SuccessState({
  restaurantName,
  quoteRef,
  email,
  onClose,
}: {
  restaurantName: string
  quoteRef: string
  email: string
  onClose: () => void
}) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-12">
      {/* Icon */}
      <div className="relative mb-5">
        <div className="size-20 rounded-full bg-[#E6F5ED] flex items-center justify-center">
          <RiCheckboxCircleFill className="size-10 text-[#39B16C]" />
        </div>
      </div>

      <h2
        className="text-[22px] font-bold text-[#101828] mb-2"
        style={{ fontFamily: "var(--font-title)" }}
      >
        Quote Sent!
      </h2>
      <p className="text-[14px] text-[#68707C] leading-relaxed max-w-[320px]">
        <span className="font-semibold text-[#29344A]">{restaurantName}</span> will review
        your request and respond within{" "}
        <span className="font-semibold text-[#29344A]">2–4 hours</span>.
      </p>

      {/* Quote details */}
      <div className="mt-6 w-full max-w-[320px] rounded-xl border border-[#F1F2F5] bg-[#FAFBFC] px-5 py-4 text-left space-y-2.5">
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-[#68707C]">Quote reference</span>
          <span className="font-bold text-[#101828] font-mono">{quoteRef}</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-[#68707C]">Confirmation sent to</span>
          <span className="font-medium text-[#101828]">{email}</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-[#68707C]">Status</span>
          <span className="flex items-center gap-1.5 font-semibold text-[#067E39]">
            <span className="size-2 rounded-full bg-[#39B16C] inline-block" />
            Pending review
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8 w-full max-w-[320px]">
        <button
          onClick={onClose}
          className="flex-1 h-10 rounded-xl border border-[#D9DDE4] text-[13px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors"
        >
          Back to Chat
        </button>
        <button className="flex-1 h-10 rounded-xl bg-[#073D30] text-[13px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors">
          View Quote Status
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Form state
───────────────────────────────────────────────────────────────────────────── */

function FormState({
  form,
  onUpdate,
  items,
  forCount,
  restaurantName,
  restaurantSub,
  restaurantBg,
  sendState,
  onSend,
  onClose,
}: {
  form: Record<string, string>
  onUpdate: (field: string, value: string) => void
  items: QuoteOrderItem[]
  forCount: number
  restaurantName: string
  restaurantSub: string
  restaurantBg: string
  sendState: SendState
  onSend: () => void
  onClose: () => void
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#F1F2F5] shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <RiFileTextLine className="size-4 text-[#073D30]" />
            <h2 className="text-[16px] font-bold text-[#101828]">Request a Quote</h2>
          </div>
          <p className="text-[12px] text-[#68707C]">
            {restaurantName} will confirm pricing and availability
          </p>
        </div>
        <button
          onClick={onClose}
          className="size-8 rounded-full flex items-center justify-center text-[#68707C] hover:bg-[#F1F2F5] transition-colors shrink-0"
        >
          <RiCloseLine className="size-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Order summary */}
        <div>
          <SectionHeading>Order summary</SectionHeading>
          <OrderSummaryCard
            restaurantName={restaurantName}
            restaurantSub={restaurantSub}
            restaurantBg={restaurantBg}
            items={items}
            forCount={forCount}
          />
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <SectionHeading>Your details</SectionHeading>

          <Field label="Contact name" icon={RiUserLine}>
            <input
              value={form.name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder="Full name"
              className={inputCls()}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Email" icon={RiMailLine}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onUpdate("email", e.target.value)}
                placeholder="you@company.com"
                className={inputCls()}
              />
            </Field>
            <Field label="Phone" icon={RiPhoneLine}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => onUpdate("phone", e.target.value)}
                placeholder="+1 (000) 000-0000"
                className={inputCls()}
              />
            </Field>
          </div>
        </div>

        {/* Event details */}
        <div className="space-y-3">
          <SectionHeading>Event details</SectionHeading>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Event date" icon={RiCalendarEventLine}>
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) => onUpdate("eventDate", e.target.value)}
                className={inputCls()}
              />
            </Field>
            <Field label="Time" icon={RiTimeLine}>
              <input
                value={form.eventTime}
                onChange={(e) => onUpdate("eventTime", e.target.value)}
                placeholder="12:00 PM"
                className={inputCls()}
              />
            </Field>
          </div>

          <Field label="Delivery address" icon={RiMapPin2Line}>
            <input
              value={form.address}
              onChange={(e) => onUpdate("address", e.target.value)}
              placeholder="Street address"
              className={inputCls()}
            />
          </Field>

          <Field label="Guest count" icon={RiGroupLine}>
            <input
              type="number"
              min={1}
              value={form.guestCount}
              onChange={(e) => onUpdate("guestCount", e.target.value)}
              className={inputCls()}
            />
          </Field>
        </div>

        {/* Optional */}
        <div className="space-y-3">
          <SectionHeading>
            Additional{" "}
            <span className="text-[#B2B8C1] font-medium normal-case tracking-normal">
              — optional
            </span>
          </SectionHeading>

          <Field label="Budget range" icon={RiMoneyDollarCircleLine}>
            <input
              value={form.budget}
              onChange={(e) => onUpdate("budget", e.target.value)}
              placeholder="e.g. $300–$500"
              className={inputCls()}
            />
          </Field>

          <div>
            <label className="block text-[11px] font-bold text-[#68707C] uppercase tracking-widest mb-1.5">
              Special requirements or notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => onUpdate("notes", e.target.value)}
              placeholder="Dietary restrictions, setup preferences, allergies…"
              rows={3}
              className="w-full rounded-xl border border-[#D9DDE4] px-3 py-2.5 text-[13px] text-[#101828] placeholder:text-[#B2B8C1] bg-white outline-none resize-none transition-all focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA]"
            />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="shrink-0 px-6 py-4 border-t border-[#F1F2F5]">
        {/* What happens next */}
        <p className="text-[12px] text-[#68707C] mb-3 leading-snug">
          The restaurant will respond with confirmed pricing, availability, and a
          binding quote within 2–4 hours.
        </p>

        <button
          onClick={onSend}
          disabled={sendState !== "idle"}
          className={[
            "w-full h-[48px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-300",
            sendState === "idle"
              ? "bg-[#073D30] text-[#CCF8B9] hover:bg-[#1e6151]"
              : sendState === "sending"
              ? "bg-[#1e6151] text-[#CCF8B9] opacity-80"
              : "bg-[#39B16C] text-white",
          ].join(" ")}
        >
          {sendState === "idle" && (
            <>
              <RiSendPlaneFill className="size-4" />
              Send Quote Request
            </>
          )}
          {sendState === "sending" && (
            <>
              <span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Sending…
            </>
          )}
          {sendState === "sent" && "Sent!"}
        </button>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   QuoteModal (main export)
───────────────────────────────────────────────────────────────────────────── */

export default function QuoteModal({
  open,
  restaurantName,
  restaurantSub,
  restaurantBg,
  items,
  forCount,
  onClose,
  onSuccess,
}: QuoteModalProps) {
  const [sendState, setSendState] = useState<SendState>("idle")
  const [form, setForm] = useState({
    name:       "Dr. Patel Green",
    email:      "alex@patelmedical.com",
    phone:      "+1 (602) 555-0182",
    eventDate:  "",
    eventTime:  "12:00 PM",
    address:    "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383",
    guestCount: String(forCount),
    budget:     "",
    notes:      "",
  })

  // Stable quote ref for this modal session
  const [quoteRef] = useState(
    () => "WC-2026-" + String(Math.floor(1000 + Math.random() * 9000))
  )

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSend() {
    if (sendState !== "idle") return
    setSendState("sending")
    setTimeout(() => {
      setSendState("sent")
      onSuccess()
    }, 1500)
  }

  function handleClose() {
    // Reset form state when closing (unless sent — keep success reference)
    if (sendState !== "sent") setSendState("idle")
    onClose()
  }

  if (!open) return null

  return (
    /* Backdrop + centering wrapper */
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Panel — stop clicks propagating to backdrop */}
      <div
        className="w-full max-w-[520px] max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {sendState === "sent" ? (
          <SuccessState
            restaurantName={restaurantName}
            quoteRef={quoteRef}
            email={form.email}
            onClose={handleClose}
          />
        ) : (
          <FormState
            form={form}
            onUpdate={update}
            items={items}
            forCount={forCount}
            restaurantName={restaurantName}
            restaurantSub={restaurantSub}
            restaurantBg={restaurantBg}
            sendState={sendState}
            onSend={handleSend}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}
