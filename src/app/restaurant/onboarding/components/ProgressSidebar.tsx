"use client"

import { RiCheckLine, RiQuestionLine, RiSaveLine } from "@remixicon/react"
import { Logo } from "@/components/ui/logo"
import { STEP_CONFIG } from "../types"
import { cn } from "@/lib/utils"

interface ProgressSidebarProps {
  currentStep: number
  savedAt: Date | null
  onStepClick: (step: number) => void
}

export function ProgressSidebar({ currentStep, savedAt, onStepClick }: ProgressSidebarProps) {
  const totalSteps = STEP_CONFIG.length
  const completedCount = currentStep - 1

  return (
    <aside className="w-[272px] shrink-0 h-screen flex flex-col bg-white border-r border-[#d9dde4] overflow-y-auto">

      {/* Logo + app label */}
      <div className="px-6 pt-6 pb-5 border-b border-[#d9dde4]">
        <Logo size="sm" />
        <p className="mt-2 text-[11px] font-semibold text-[#b2b8c1] tracking-[0.08em] uppercase">
          Restaurant Partner Application
        </p>
      </div>

      {/* Progress summary pill */}
      <div className="mx-4 mt-5 mb-4 px-4 py-3 bg-[#fafbfc] rounded-2xl border border-[#d9dde4]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-semibold text-[#29344a]">Application progress</span>
          <span className="text-[12px] font-semibold text-[#073d30]">
            {completedCount}/{totalSteps}
          </span>
        </div>
        <div className="h-1.5 bg-[#f1f2f5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#39b16c] rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step list */}
      <nav className="flex-1 px-3 pb-4">
        <ol>
          {STEP_CONFIG.map((step, idx) => {
            const isCompleted = currentStep > step.id
            const isActive    = currentStep === step.id
            const isClickable = isCompleted

            return (
              <li key={step.id} className="relative">
                {/* Connecting line */}
                {idx < STEP_CONFIG.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[27px] top-[44px] w-px h-[18px]",
                      isCompleted ? "bg-[#39b16c]" : "bg-[#e4e7ec]"
                    )}
                  />
                )}

                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable && !isActive}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-[10px] rounded-xl text-left transition-colors duration-150",
                    isActive    && "bg-[#f0faf5]",
                    isClickable && "hover:bg-[#f5f6f8] cursor-pointer",
                    !isClickable && !isActive && "cursor-default"
                  )}
                >
                  {/* Circle indicator */}
                  <div
                    className={cn(
                      "shrink-0 size-[30px] rounded-full flex items-center justify-center text-[13px] font-bold transition-colors",
                      isCompleted && "bg-[#e6f5ed]",
                      isActive    && "bg-[#073d30]",
                      !isCompleted && !isActive && "border-2 border-[#d9dde4] bg-white"
                    )}
                  >
                    {isCompleted ? (
                      <RiCheckLine className="size-[14px] text-[#39b16c]" />
                    ) : (
                      <span className={isActive ? "text-white" : "text-[#b2b8c1]"}>
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-[13px] font-semibold leading-tight",
                        isActive    && "text-[#073d30]",
                        isCompleted && "text-[#5a626f]",
                        !isCompleted && !isActive && "text-[#b2b8c1]"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-[#b2b8c1] mt-0.5 leading-tight">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Est time chip (active only) */}
                  {isActive && (
                    <span className="ml-auto shrink-0 text-[10px] font-semibold text-[#39b16c] bg-[#e6f5ed] px-2 py-0.5 rounded-full">
                      ~{step.estimatedMinutes}m
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#d9dde4] space-y-2.5">
        {savedAt && (
          <div className="flex items-center gap-1.5">
            <RiSaveLine className="size-3.5 text-[#39b16c]" />
            <span className="text-[11px] text-[#68707c]">
              Auto-saved at {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}
        <a
          href="#"
          className="flex items-center gap-1.5 text-[12px] text-[#68707c] hover:text-[#073d30] transition-colors group"
        >
          <RiQuestionLine className="size-3.5 group-hover:text-[#073d30]" />
          Need help? Contact support
        </a>
        <p className="text-[11px] text-[#b2b8c1]">
          Applications reviewed within 2 business days
        </p>
      </div>
    </aside>
  )
}
