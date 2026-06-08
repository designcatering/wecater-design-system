"use client"

import {
  RiRestaurantLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiArrowRightLine,
  RiStarFill,
} from "@remixicon/react"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"

interface WelcomeStepProps {
  onStart: () => void
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — brand green ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-[44%] bg-[#073d30] flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1e6151_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10">
          <Logo size="md" variant="white" />
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-[#9cd8b5] text-[12px] font-bold tracking-[0.1em] uppercase mb-4">
              For Restaurant Partners
            </p>
            <h1 className="text-white text-[40px] font-bold leading-[1.15] font-[family-name:var(--font-title)] mb-5">
              Grow your catering business with weCater
            </h1>
            <p className="text-[#9cd8b5] text-[16px] leading-relaxed">
              Reach thousands of corporate clients, streamline operations, and get paid faster — all in one place.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "2,400+",  label: "Restaurant partners" },
              { value: "$14.2M",  label: "Orders processed" },
              { value: "24hrs",   label: "Average payout time" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-white text-[22px] font-bold font-[family-name:var(--font-title)]">{value}</p>
                <p className="text-[#9cd8b5] text-[12px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              { Icon: RiRestaurantLine, text: "Zero commission on your first 20 orders" },
              { Icon: RiLineChartLine,  text: "Real-time analytics & revenue tracking" },
              { Icon: RiShieldCheckLine, text: "PCI-compliant payments via Stripe" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-[#9cd8b5]" />
                </div>
                <p className="text-white text-[14px] font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10 bg-white/10 rounded-2xl p-5 border border-white/10">
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} className="size-4 text-[#ccf8b9]" />
            ))}
          </div>
          <p className="text-white text-[14px] leading-relaxed mb-4 italic">
            "weCater transformed our catering revenue. We went from 8 to 35 corporate clients in 6 months — and the onboarding was seamless."
          </p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#9cd8b5] flex items-center justify-center text-[#073d30] font-bold text-[14px] shrink-0">
              MR
            </div>
            <div>
              <p className="text-white text-[13px] font-semibold">Maria Rodriguez</p>
              <p className="text-[#9cd8b5] text-[12px]">La Cocina Catering · Chicago, IL</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — white ───────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:px-16 lg:py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo size="sm" />
          </div>

          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#101828] font-[family-name:var(--font-title)] leading-tight mb-3">
              Start your restaurant application
            </h2>
            <p className="text-[15px] text-[#68707c] leading-relaxed">
              Complete your application in under 20 minutes. We review every application within 2 business days.
            </p>
          </div>

          {/* Application steps overview */}
          <div className="mb-8 space-y-2.5">
            <p className="text-[12px] font-bold text-[#b2b8c1] tracking-[0.08em] uppercase mb-3">
              What to expect
            </p>
            {[
              { num: 1, label: "Create your account",          time: "2 min",  desc: "Email, phone & password" },
              { num: 2, label: "Set up your restaurant profile", time: "5 min", desc: "Name, cuisine & description" },
              { num: 3, label: "Location, hours & compliance",  time: "9 min",  desc: "Address, hours & business docs" },
              { num: 4, label: "Connect payments & build menu", time: "13 min", desc: "Stripe Connect + menu items" },
            ].map(({ num, label, time, desc }) => (
              <div
                key={num}
                className="flex items-center gap-4 p-4 bg-[#fafbfc] rounded-2xl border border-[#f1f2f5] hover:border-[#d9dde4] transition-colors"
              >
                <div className="size-8 rounded-full bg-[#e6f5ed] flex items-center justify-center text-[#073d30] font-bold text-[13px] shrink-0">
                  {num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#101828]">{label}</p>
                  <p className="text-[12px] text-[#b2b8c1]">{desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-[#68707c] bg-[#f1f2f5] px-2 py-1 rounded-full shrink-0">
                  {time}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full"
            iconPosition="right"
            icon={<RiArrowRightLine />}
            onClick={onStart}
          >
            Start Application
          </Button>

          <p className="mt-4 text-center text-[14px] text-[#68707c]">
            Already have an account?{" "}
            <a href="#" className="text-[#073d30] font-semibold hover:underline">
              Sign in
            </a>
          </p>

          <p className="mt-6 text-center text-[12px] text-[#b2b8c1] leading-relaxed">
            By continuing you agree to weCater&apos;s{" "}
            <a href="#" className="underline hover:text-[#68707c]">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-[#68707c]">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
