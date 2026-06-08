"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RiCheckLine,
  RiArrowRightLine,
  RiTimeLine,
  RiShieldCheckLine,
  RiRocketLine,
  RiImageAddLine,
  RiShareLine,
  RiPercentLine,
  RiNotificationLine,
  RiExternalLinkLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  label: string
  description: string
  completed: boolean
  cta?: { label: string; href: string }
  icon: React.ElementType
}

const INITIAL_TASKS: Task[] = [
  {
    id: "t1", completed: true,  icon: RiCheckLine,
    label: "Account created",
    description: "Your login credentials are set up and secure.",
  },
  {
    id: "t2", completed: true,  icon: RiCheckLine,
    label: "Restaurant profile completed",
    description: "Name, cuisine type, description and tagline are live.",
  },
  {
    id: "t3", completed: true,  icon: RiCheckLine,
    label: "Location & hours configured",
    description: "Delivery area and operating schedule saved.",
  },
  {
    id: "t4", completed: true,  icon: RiCheckLine,
    label: "Business documents submitted",
    description: "License and food permit uploaded for review.",
  },
  {
    id: "t5", completed: true,  icon: RiCheckLine,
    label: "Payment account connected",
    description: "Stripe Connect linked — ready to receive payouts.",
  },
  {
    id: "t6", completed: false, icon: RiImageAddLine,
    label: "Add photos to your menu items",
    description: "Listings with photos get 3× more clicks. Add at least 3 item photos.",
    cta: { label: "Open Menu Editor", href: "/restaurant/menu" },
  },
  {
    id: "t7", completed: false, icon: RiPercentLine,
    label: "Set up a first-order discount",
    description: "Offer 10% off to your first 5 clients to build early reviews.",
    cta: { label: "Create Promotion", href: "/restaurant/settings" },
  },
  {
    id: "t8", completed: false, icon: RiShareLine,
    label: "Share your listing preview",
    description: "Copy your public listing link and share with your existing clients.",
    cta: { label: "Copy Link", href: "#" },
  },
  {
    id: "t9", completed: false, icon: RiNotificationLine,
    label: "Set up order notifications",
    description: "Get notified by SMS and email the moment a new order comes in.",
    cta: { label: "Configure Alerts", href: "/restaurant/settings" },
  },
]

const TIMELINE = [
  { step: "Application submitted",      status: "done",    time: "Today"        },
  { step: "Compliance review",           status: "active",  time: "1–2 days"     },
  { step: "Listing approved & live",     status: "pending", time: "Within 48hrs" },
  { step: "First order notification",   status: "pending", time: "You're ready!" },
]

export default function GuidePage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  const completed = tasks.filter(t => t.completed).length
  const pct = Math.round((completed / tasks.length) * 100)

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] font-[family-name:var(--font-title)]">
            Getting Started
          </h1>
          <p className="text-[13px] text-[#68707c]">{completed} of {tasks.length} tasks complete</p>
        </div>
        <Link href="/restaurant/dashboard">
          <Button variant="secondary" iconPosition="right" icon={<RiArrowRightLine />} size="sm">
            Go to Dashboard
          </Button>
        </Link>
      </div>

      <div className="px-8 py-8 max-w-[860px] mx-auto space-y-8">

        {/* Hero celebration banner */}
        <div className="relative overflow-hidden bg-[#073d30] rounded-3xl p-8 flex items-center gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1e6151_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10 flex-1">
            <p className="text-[#9cd8b5] text-[12px] font-bold tracking-widest uppercase mb-2">
              Application submitted ✓
            </p>
            <h2 className="text-white text-[28px] font-bold font-[family-name:var(--font-title)] leading-tight mb-2">
              Welcome to weCater, Maria! 🎉
            </h2>
            <p className="text-[#9cd8b5] text-[15px] leading-relaxed mb-5">
              Your La Cocina Catering listing is under review. While you wait, complete a few quick tasks to maximise your launch day performance.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ccf8b9] rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-white font-bold text-[14px] shrink-0">{pct}% ready</span>
            </div>
          </div>
          {/* Big rocket icon */}
          <div className="relative z-10 size-20 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <RiRocketLine className="size-10 text-[#ccf8b9]" />
          </div>
        </div>

        {/* Review timeline */}
        <div className="bg-white border border-[#d9dde4] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-[#101828] mb-5">Application timeline</h3>
          <div className="flex items-start gap-0">
            {TIMELINE.map(({ step, status, time }, idx) => (
              <div key={step} className="flex-1 flex flex-col items-center text-center relative">
                {/* Connector line */}
                {idx < TIMELINE.length - 1 && (
                  <div className={cn(
                    "absolute top-[14px] left-[50%] w-full h-[2px]",
                    status === "done" ? "bg-[#39b16c]" : "bg-[#f1f2f5]"
                  )} />
                )}
                {/* Node */}
                <div className={cn(
                  "relative z-10 size-7 rounded-full flex items-center justify-center mb-2 border-2",
                  status === "done"   && "bg-[#39b16c] border-[#39b16c]",
                  status === "active" && "bg-white border-[#39b16c] shadow-[0_0_0_3px_#ceecda]",
                  status === "pending"&& "bg-white border-[#d9dde4]"
                )}>
                  {status === "done" && <RiCheckLine className="size-3.5 text-white" />}
                  {status === "active" && <div className="size-2 rounded-full bg-[#39b16c] animate-pulse" />}
                </div>
                <p className={cn(
                  "text-[12px] font-semibold leading-tight px-1",
                  status === "done"    && "text-[#39b16c]",
                  status === "active"  && "text-[#073d30]",
                  status === "pending" && "text-[#b2b8c1]"
                )}>{step}</p>
                <p className="text-[11px] text-[#b2b8c1] mt-0.5">{time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6">

          {/* Task checklist */}
          <div className="bg-white border border-[#d9dde4] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f1f2f5] flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[#101828]">Setup checklist</h3>
              <span className="text-[13px] font-semibold text-[#39b16c]">{completed}/{tasks.length} done</span>
            </div>
            <ul className="divide-y divide-[#f8f9fb]">
              {tasks.map(task => {
                const Icon = task.icon
                return (
                  <li
                    key={task.id}
                    className={cn(
                      "flex items-start gap-4 px-6 py-4 transition-colors",
                      task.completed && "bg-[#fafbfc]"
                    )}
                  >
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggle(task.id)}
                      className={cn(
                        "mt-0.5 size-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-colors",
                        task.completed
                          ? "bg-[#39b16c] border-[#39b16c]"
                          : "border-[#d9dde4] hover:border-[#9cd8b5]"
                      )}
                    >
                      {task.completed && <RiCheckLine className="size-3 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-[14px] font-semibold",
                        task.completed ? "text-[#b2b8c1] line-through" : "text-[#101828]"
                      )}>
                        {task.label}
                      </p>
                      {!task.completed && (
                        <p className="text-[12px] text-[#68707c] mt-0.5">{task.description}</p>
                      )}
                    </div>

                    {!task.completed && task.cta && (
                      <Link
                        href={task.cta.href}
                        className="shrink-0 text-[12px] font-semibold text-[#073d30] hover:underline flex items-center gap-1"
                      >
                        {task.cta.label}
                        <RiArrowRightLine className="size-3.5" />
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* While you wait tips */}
            <div className="bg-white border border-[#d9dde4] rounded-2xl p-5">
              <h3 className="text-[14px] font-bold text-[#101828] mb-3">While you wait</h3>
              <div className="space-y-3">
                {[
                  { icon: RiShieldCheckLine, text: "Your documents are being reviewed by our compliance team.", color: "#39b16c" },
                  { icon: RiTimeLine, text: "Most applications are approved within 48 hours on business days.", color: "#ca6100" },
                  { icon: RiRocketLine, text: "Once live, you'll appear in search results immediately.", color: "#073d30" },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex gap-3">
                    <Icon className="size-4 mt-0.5 shrink-0" style={{ color }} />
                    <p className="text-[13px] text-[#68707c] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview listing */}
            <div className="bg-[#f0faf5] border border-[#9cd8b5] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-[#073d30] mb-1">Preview your listing</p>
              <p className="text-[13px] text-[#39b16c] mb-4">See exactly how clients will find you on weCater.</p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                iconPosition="right"
                icon={<RiExternalLinkLine />}
              >
                View listing preview
              </Button>
            </div>

            {/* Support */}
            <div className="bg-white border border-[#d9dde4] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-[#101828] mb-1">Need help?</p>
              <p className="text-[13px] text-[#68707c] mb-3">Our partner success team is available Mon–Fri, 9am–6pm CT.</p>
              <a href="#" className="text-[13px] font-semibold text-[#073d30] hover:underline">
                Chat with support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
