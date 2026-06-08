"use client"

import { useState } from "react"
import {
  RiCheckLine,
  RiExternalLinkLine,
  RiTimeLine,
  RiShieldCheckLine,
  RiPercentLine,
} from "@remixicon/react"
import { type PaymentData } from "../../types"
import { StepLayout } from "../StepLayout"
import { StepHeader } from "../FormFields"
import { cn } from "@/lib/utils"

function StripeBenefitCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex gap-3 p-4 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl">
      <div className="size-9 rounded-xl bg-[#e6f5ed] flex items-center justify-center shrink-0">
        <Icon className="size-4 text-[#073d30]" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#101828]">{title}</p>
        <p className="text-[12px] text-[#68707c] mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

interface PaymentStepProps {
  data: PaymentData
  onChange: (patch: Partial<PaymentData>) => void
  onNext: () => void
  onBack: () => void
}

export function PaymentStep({ data, onChange, onNext, onBack }: PaymentStepProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleStripeConnect = () => {
    setIsConnecting(true)
    // Simulate OAuth redirect/return
    setTimeout(() => {
      onChange({ stripeConnected: true })
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <StepLayout step={4} onNext={onNext} onBack={onBack}>
      <StepHeader
        step={5}
        title="Set up payments"
        subtitle="Connect your bank account to receive payouts when orders are completed. weCater uses Stripe for secure, fast transfers."
      />

      {/* Connected state */}
      {data.stripeConnected && (
        <div className="flex items-center gap-4 p-5 bg-[#e6f5ed] border border-[#9cd8b5] rounded-2xl mb-8">
          <div className="size-12 rounded-full bg-[#39b16c] flex items-center justify-center shrink-0">
            <RiCheckLine className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#073d30]">Stripe account connected</p>
            <p className="text-[13px] text-[#39b16c] mt-0.5">
              Your payouts will be deposited within 1–2 business days of order completion.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ stripeConnected: false })}
            className="text-[13px] font-semibold text-[#068042] hover:text-[#c22d2c] transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}

      {!data.stripeConnected && (
        <>
          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StripeBenefitCard
              icon={RiTimeLine}
              title="Fast payouts"
              desc="1–2 business days after order completion"
            />
            <StripeBenefitCard
              icon={RiShieldCheckLine}
              title="PCI-DSS compliant"
              desc="Bank-grade encryption on all transactions"
            />
            <StripeBenefitCard
              icon={RiPercentLine}
              title="No monthly fees"
              desc="Platform fee only on completed orders"
            />
          </div>

          {/* Stripe Connect CTA */}
          <div className="flex flex-col items-center gap-4 p-8 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl mb-4 text-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-[70px] h-[30px] bg-[#635bff] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-[16px] tracking-tight">stripe</span>
              </div>
              <span className="text-[14px] text-[#68707c]">Connect</span>
            </div>
            <p className="text-[14px] text-[#68707c] max-w-[320px]">
              Securely link your bank account through Stripe. weCater never stores your banking credentials.
            </p>
            <button
              type="button"
              onClick={handleStripeConnect}
              disabled={isConnecting}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-[15px] transition-all",
                "bg-[#635bff] text-white hover:bg-[#5248e8] active:bg-[#4038c7]",
                "shadow-[0_2px_8px_rgba(99,91,255,0.35)] hover:shadow-[0_4px_12px_rgba(99,91,255,0.45)]",
                isConnecting && "opacity-70 pointer-events-none"
              )}
            >
              {isConnecting ? (
                <>
                  <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <RiExternalLinkLine className="size-4" />
                  Connect with Stripe
                </>
              )}
            </button>
            <p className="text-[11px] text-[#b2b8c1]">
              You&apos;ll be redirected to Stripe&apos;s secure OAuth flow
            </p>
          </div>
        </>
      )}
    </StepLayout>
  )
}
