"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { STEP_CONFIG } from "../../types"
import {
  RiCheckLine,
  RiAlertLine,
  RiArrowRightLine,
  RiEditLine,
  RiEyeLine,
  RiRocketLine,
  RiMapPinLine,
  RiRestaurantLine,
  RiUser3Line,
  RiBankLine,
  RiMenuLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { type OnboardingData } from "../../types"
import { cn } from "@/lib/utils"

interface ReviewItem {
  id: number
  icon: React.ElementType
  title: string
  summary: string
  status: "complete" | "incomplete" | "optional"
  stepToEdit: number
}

function buildReviewItems(data: OnboardingData): ReviewItem[] {
  const hasMenu = !!(data.menu.menuUrl || data.menu.menuFiles.length > 0)

  return [
    {
      id: 1,
      icon: RiUser3Line,
      title: "Account Setup",
      summary: data.account.email
        ? `${data.account.firstName} ${data.account.lastName} · ${data.account.email}`
        : "Incomplete",
      status: data.account.email && data.account.password ? "complete" : "incomplete",
      stepToEdit: 1,
    },
    {
      id: 2,
      icon: RiRestaurantLine,
      title: "Restaurant Profile",
      summary: data.profile.restaurantName
        ? `${data.profile.restaurantName} · ${data.profile.cuisineTypes.slice(0, 2).join(", ")}${data.profile.cuisineTypes.length > 2 ? ` +${data.profile.cuisineTypes.length - 2}` : ""}`
        : "Incomplete",
      status: data.profile.restaurantName && data.profile.cuisineTypes.length > 0 ? "complete" : "incomplete",
      stepToEdit: 2,
    },
    {
      id: 3,
      icon: RiMapPinLine,
      title: "Location & Hours",
      summary: data.location.city
        ? `${data.location.city}, ${data.location.state} · ${data.location.deliveryAvailable ? "Delivery" : ""}${data.location.deliveryAvailable && data.location.pickupAvailable ? " & " : ""}${data.location.pickupAvailable ? "Pickup" : ""}`
        : "Incomplete",
      status: data.location.city && data.location.state ? "complete" : "incomplete",
      stepToEdit: 3,
    },
    {
      id: 4,
      icon: RiBankLine,
      title: "Payment Setup",
      summary: data.payment.stripeConnected
        ? "Stripe account connected"
        : "Not configured",
      status: data.payment.stripeConnected ? "complete" : "incomplete",
      stepToEdit: 4,
    },
    {
      id: 5,
      icon: RiMenuLine,
      title: "Menu",
      summary: hasMenu
        ? data.menu.menuUrl
          ? `Link provided${data.menu.menuFiles.length > 0 ? ` · ${data.menu.menuFiles.length} file${data.menu.menuFiles.length > 1 ? "s" : ""}` : ""}`
          : `${data.menu.menuFiles.length} file${data.menu.menuFiles.length > 1 ? "s" : ""} uploaded`
        : "No menu provided yet",
      status: hasMenu ? "complete" : "optional",
      stepToEdit: 5,
    },
  ]
}

interface ReviewStepProps {
  data: OnboardingData
  onBack: () => void
  onLaunch: () => void
  onEditStep?: (step: number) => void
}

export function ReviewStep({ data, onBack, onLaunch, onEditStep }: ReviewStepProps) {
  const router = useRouter()
  const [launchMode, setLaunchMode] = useState<"live" | "draft">("live")
  const [launched, setLaunched] = useState(false)

  const reviewItems = buildReviewItems(data)
  const completeCount = reviewItems.filter(i => i.status === "complete").length
  const incompleteRequired = reviewItems.filter(i => i.status === "incomplete")
  const allRequiredComplete = incompleteRequired.length === 0
  const completionPct = Math.round((completeCount / reviewItems.length) * 100)

  if (launched) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-8">
        <div className="max-w-[500px] text-center">
          <div className="size-20 rounded-full bg-[#e6f5ed] flex items-center justify-center mx-auto mb-6">
            <RiRocketLine className="size-10 text-[#073d30]" />
          </div>
          <h2 className="text-[32px] font-bold text-[#101828] font-[family-name:var(--font-title)] mb-3">
            {launchMode === "live" ? "Application submitted!" : "Saved as draft!"}
          </h2>
          <p className="text-[16px] text-[#68707c] leading-relaxed mb-8">
            {launchMode === "live"
              ? "Our team will review your application within 2 business days. You'll receive an email at when you're approved."
              : "Your application has been saved. You can return anytime to complete it and submit for review."}
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: "Application review",        time: "1–2 business days" },
              { label: "Compliance check",          time: "Automated + manual" },
              { label: "Listing goes live",         time: "Within 48 hours of approval" },
            ].map(({ label, time }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde4] rounded-xl">
                <p className="text-[14px] text-[#29344a] font-medium">{label}</p>
                <p className="text-[13px] text-[#68707c]">{time}</p>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="w-full"
            iconPosition="right"
            icon={<RiArrowRightLine />}
            onClick={() => router.push("/restaurant/guide")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#101828]">Step {STEP_CONFIG.length} of {STEP_CONFIG.length}</span>
          <span className="text-[#d9dde4]">·</span>
          <span className="text-[13px] text-[#68707c]">Review & Launch</span>
        </div>
        <span className="text-[12px] text-[#b2b8c1]">~2 min remaining</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-8 py-10">
        <div className="w-full max-w-[640px]">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center mb-5">
              {/* Circular progress */}
              <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f2f5" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={allRequiredComplete ? "#39b16c" : "#39b16c"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionPct / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute text-[18px] font-bold text-[#073d30]">
                {completionPct}%
              </span>
            </div>
            <h2 className="text-[28px] font-bold text-[#101828] font-[family-name:var(--font-title)] mb-2">
              {allRequiredComplete ? "You're ready to launch!" : "Almost there!"}
            </h2>
            <p className="text-[15px] text-[#68707c] max-w-[400px] mx-auto">
              {allRequiredComplete
                ? "All required sections are complete. Review your details below and choose how to publish your restaurant."
                : `Complete the ${incompleteRequired.length} remaining section${incompleteRequired.length > 1 ? "s" : ""} to submit your application.`}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 mb-8">
            {reviewItems.map(item => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-colors",
                    item.status === "complete"   && "bg-white border-[#d9dde4]",
                    item.status === "incomplete" && "bg-white border-[#e89a9a]",
                    item.status === "optional"   && "bg-[#fafbfc] border-[#f1f2f5]"
                  )}
                >
                  {/* Status icon */}
                  <div className={cn(
                    "size-10 rounded-xl flex items-center justify-center shrink-0",
                    item.status === "complete"   && "bg-[#e6f5ed]",
                    item.status === "incomplete" && "bg-[#ffdcdc]",
                    item.status === "optional"   && "bg-[#f1f2f5]"
                  )}>
                    <Icon className={cn(
                      "size-5",
                      item.status === "complete"   && "text-[#39b16c]",
                      item.status === "incomplete" && "text-[#c22d2c]",
                      item.status === "optional"   && "text-[#68707c]"
                    )} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#101828]">{item.title}</p>
                    <p className={cn(
                      "text-[12px] truncate mt-0.5",
                      item.status === "complete"   && "text-[#68707c]",
                      item.status === "incomplete" && "text-[#c22d2c]",
                      item.status === "optional"   && "text-[#b2b8c1]"
                    )}>
                      {item.summary}
                    </p>
                  </div>

                  {/* Status badge + edit */}
                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === "complete" && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#39b16c] bg-[#e6f5ed] px-2.5 py-1 rounded-full">
                        <RiCheckLine className="size-3" />
                        Complete
                      </span>
                    )}
                    {item.status === "incomplete" && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#c22d2c] bg-[#ffdcdc] px-2.5 py-1 rounded-full">
                        <RiAlertLine className="size-3" />
                        Required
                      </span>
                    )}
                    {item.status === "optional" && (
                      <span className="text-[11px] font-semibold text-[#b2b8c1] px-2.5 py-1">
                        Optional
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onEditStep?.(item.stepToEdit)}
                      className="size-8 rounded-xl flex items-center justify-center text-[#68707c] hover:text-[#073d30] hover:bg-[#f0faf5] transition-colors"
                    >
                      <RiEditLine className="size-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Launch mode selector */}
          <div className="mb-8">
              <p className="text-[14px] font-bold text-[#101828] mb-3">How do you want to publish?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    mode: "live" as const,
                    title: "Submit for Review",
                    desc: "Go live after approval (1–2 business days)",
                    icon: RiRocketLine,
                  },
                  {
                    mode: "draft" as const,
                    title: "Save as Draft",
                    desc: "Finish and submit whenever you're ready",
                    icon: RiEditLine,
                  },
                ].map(({ mode, title, desc, icon: Icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLaunchMode(mode)}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-left transition-all",
                      launchMode === mode
                        ? "border-[#073d30] bg-[#f0faf5]"
                        : "border-[#d9dde4] bg-white hover:border-[#9cd8b5]"
                    )}
                  >
                    <Icon className={cn(
                      "size-5 mb-2",
                      launchMode === mode ? "text-[#073d30]" : "text-[#68707c]"
                    )} />
                    <p className={cn(
                      "text-[14px] font-bold",
                      launchMode === mode ? "text-[#073d30]" : "text-[#101828]"
                    )}>
                      {title}
                    </p>
                    <p className="text-[12px] text-[#68707c] mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
          </div>

          {/* Preview listing CTA */}
          <div className="flex items-center gap-3 p-4 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl mb-6">
            <RiEyeLine className="size-5 text-[#68707c] shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#101828]">Preview your listing</p>
              <p className="text-[12px] text-[#68707c]">See exactly how clients will view your restaurant</p>
            </div>
            <button
              type="button"
              className="text-[13px] font-semibold text-[#073d30] hover:underline shrink-0"
            >
              Preview →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-[#d9dde4] px-8 py-4">
        <div className="flex items-center justify-between max-w-[640px] mx-auto">
          <Button variant="ghost" iconPosition="left" icon={<RiArrowRightLine className="rotate-180" />} onClick={onBack}>
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button
              size="default"
              iconPosition="right"
              icon={launchMode === "live" ? <RiRocketLine /> : <RiEditLine />}
              onClick={() => setLaunched(true)}
              className="min-w-[200px]"
            >
              {launchMode === "live" ? "Submit Application" : "Save as Draft"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
