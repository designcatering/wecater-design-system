"use client"

import { useState, useCallback } from "react"
import { type OnboardingData, type DayKey } from "./types"
import { ProgressSidebar } from "./components/ProgressSidebar"
import { WelcomeStep } from "./components/steps/WelcomeStep"
import { AccountStep } from "./components/steps/AccountStep"
import { ProfileStep } from "./components/steps/ProfileStep"
import { LocationStep } from "./components/steps/LocationStep"
import { PaymentStep } from "./components/steps/PaymentStep"
import { MenuStep } from "./components/steps/MenuStep"
import { ReviewStep } from "./components/steps/ReviewStep"

/* ─── Default form state ─────────────────────────────────────────────── */

const DAY_KEYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

const DEFAULT_HOURS = DAY_KEYS.reduce(
  (acc, day) => ({
    ...acc,
    [day]: { open: "09:00", close: "18:00", closed: day === "sun" },
  }),
  {} as OnboardingData["location"]["hours"]
)

const DEFAULT_DATA: OnboardingData = {
  account: {
    firstName:      "",
    lastName:       "",
    email:          "",
    phone:          "",
    password:       "",
    confirmPassword:"",
    agreeToTerms:   false,
  },
  profile: {
    restaurantName: "",
    tagline:        "",
    cuisineTypes:   [],
    description:    "",
    yearsInOperation: "",
    avgOrderMin:    "",
    avgOrderMax:    "",
    website:        "",
  },
  location: {
    street:          "",
    unit:            "",
    city:            "",
    state:           "",
    zip:             "",
    deliveryAvailable: true,
    deliveryRadius:  "25",
    pickupAvailable: true,
    hours:           DEFAULT_HOURS,
    advanceNoticeHours: "48",
    minHeadcount:    "10",
    maxHeadcount:    "200",
    serviceNotes:    "",
  },
  payment: {
    stripeConnected:    false,
    accountHolderName:  "",
    routingNumber:      "",
    accountNumber:      "",
    bankName:           "",
    accountType:        "checking",
  },
  menu: {
    menuUrl: "",
    menuFiles: [],
    menuInstructions: "",
  },
}

/* ─── Page component ─────────────────────────────────────────────────── */

export default function RestaurantOnboarding() {
  const [step,    setStep]    = useState(0)     // 0 = welcome, 1–6 = form steps
  const [data,    setData]    = useState<OnboardingData>(DEFAULT_DATA)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const update = useCallback(
    <K extends keyof OnboardingData>(section: K, patch: Partial<OnboardingData[K]>) => {
      setData(prev => ({ ...prev, [section]: { ...prev[section], ...patch } }))
      setSavedAt(new Date())
    },
    []
  )

  const next = () => {
    setStep(s => Math.min(s + 1, 6))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const back = () => {
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Welcome screen — full-screen, no sidebar
  if (step === 0) {
    return <WelcomeStep onStart={() => setStep(1)} />
  }

  const stepProps = { onNext: next, onBack: back }

  return (
    <div className="flex h-screen overflow-hidden">
      <ProgressSidebar
        currentStep={step}
        savedAt={savedAt}
        onStepClick={s => s < step && setStep(s)}
      />

      <main className="flex-1 overflow-y-auto">
        {step === 1 && (
          <AccountStep
            data={data.account}
            onChange={patch => update("account", patch)}
            {...stepProps}
          />
        )}
        {step === 2 && (
          <ProfileStep
            data={data.profile}
            onChange={patch => update("profile", patch)}
            {...stepProps}
          />
        )}
        {step === 3 && (
          <LocationStep
            data={data.location}
            onChange={patch => update("location", patch)}
            {...stepProps}
          />
        )}
        {step === 4 && (
          <PaymentStep
            data={data.payment}
            onChange={patch => update("payment", patch)}
            {...stepProps}
          />
        )}
        {step === 5 && (
          <MenuStep
            data={data.menu}
            onChange={patch => update("menu", patch)}
            {...stepProps}
          />
        )}
        {step === 6 && (
          <ReviewStep
            data={data}
            onBack={back}
            onLaunch={() => {/* In production: POST to /api/restaurant/onboard */}}
            onEditStep={s => setStep(s)}
          />
        )}
      </main>
    </div>
  )
}
