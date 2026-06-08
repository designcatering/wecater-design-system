"use client"

import { RiArrowLeftLine, RiArrowRightLine, RiLoader4Line } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { STEP_CONFIG } from "../types"
import { cn } from "@/lib/utils"

interface StepLayoutProps {
  step: number
  onNext: () => void
  onBack: () => void
  nextLabel?: string
  nextDisabled?: boolean
  nextLoading?: boolean
  children: React.ReactNode
}

export function StepLayout({
  step,
  onNext,
  onBack,
  nextLabel = "Save & Continue",
  nextDisabled = false,
  nextLoading = false,
  children,
}: StepLayoutProps) {
  const config = STEP_CONFIG.find(s => s.id === step)
  const isFirstStep = step === 1

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#101828]">
            Step {step} of {STEP_CONFIG.length}
          </span>
          <span className="text-[#d9dde4]">·</span>
          <span className="text-[13px] text-[#68707c]">{config?.title}</span>
        </div>
        <span className="text-[12px] text-[#b2b8c1]">
          Est. {config?.estimatedMinutes} min remaining
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-8 py-10">
        <div className="w-full max-w-[640px]">
          {children}
        </div>
      </div>

      {/* Sticky footer nav */}
      <div className="sticky bottom-0 bg-white border-t border-[#d9dde4] px-8 py-4">
        <div className="flex items-center justify-between max-w-[640px] mx-auto">
          {!isFirstStep ? (
            <Button
              variant="ghost"
              iconPosition="left"
              icon={<RiArrowLeftLine />}
              onClick={onBack}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <p className="text-[12px] text-[#b2b8c1]">Progress auto-saved</p>
            <Button
              disabled={nextDisabled || nextLoading}
              iconPosition={nextLoading ? "none" : "right"}
              icon={nextLoading ? undefined : <RiArrowRightLine />}
              onClick={onNext}
              className={cn("min-w-[172px]", nextLoading && "opacity-70")}
            >
              {nextLoading ? (
                <span className="flex items-center gap-2">
                  <RiLoader4Line className="size-4 animate-spin" />
                  Saving…
                </span>
              ) : (
                nextLabel
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Shared sub-components used across steps ─────────────────────────── */

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mb-6", className)}>
      <h3 className="text-[16px] font-semibold text-[#101828] font-[family-name:var(--font-title)]">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-[13px] text-[#68707c]">{description}</p>
      )}
    </div>
  )
}

export function Divider() {
  return <hr className="border-[#f1f2f5] my-8" />
}
