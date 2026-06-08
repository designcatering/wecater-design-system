export interface AccountData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface ProfileData {
  restaurantName: string
  tagline: string
  cuisineTypes: string[]
  description: string
  yearsInOperation: string
  avgOrderMin: string
  avgOrderMax: string
  website: string
}

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export interface DayHours {
  open: string
  close: string
  closed: boolean
}

export interface LocationData {
  street: string
  unit: string
  city: string
  state: string
  zip: string
  deliveryAvailable: boolean
  deliveryRadius: string
  pickupAvailable: boolean
  hours: Record<DayKey, DayHours>
  advanceNoticeHours: string
  minHeadcount: string
  maxHeadcount: string
  serviceNotes: string
}

export interface VerificationData {
  businessType: string
  legalName: string
  ein: string
  stateOfRegistration: string
  licenseNumber: string
  licenseExpiry: string
  foodPermitNumber: string
  foodPermitExpiry: string
  insurancePolicyNumber: string
  insuranceExpiry: string
}

export interface PaymentData {
  stripeConnected: boolean
  accountHolderName: string
  routingNumber: string
  accountNumber: string
  bankName: string
  accountType: "checking" | "savings"
}

export interface MenuItem {
  id: string
  name: string
  description: string
  pricePerPerson: string
  minOrderQty: string
  dietaryTags: string[]
  available: boolean
}

export interface MenuCategory {
  id: string
  name: string
  description: string
  items: MenuItem[]
}

export interface MenuData {
  menuUrl: string
  menuFiles: string[]
  menuInstructions: string
}

export interface OnboardingData {
  account: AccountData
  profile: ProfileData
  location: LocationData
  payment: PaymentData
  menu: MenuData
}

export const STEP_CONFIG = [
  { id: 1, title: "Account Setup",      subtitle: "Email & password",      estimatedMinutes: 2 },
  { id: 2, title: "Restaurant Profile", subtitle: "Name, cuisine & bio",   estimatedMinutes: 5 },
  { id: 3, title: "Location & Hours",   subtitle: "Address & schedule",    estimatedMinutes: 4 },
  { id: 4, title: "Payment Setup",      subtitle: "Connect your bank",     estimatedMinutes: 3 },
  { id: 5, title: "Menu",               subtitle: "Upload or link menu",   estimatedMinutes: 3 },
  { id: 6, title: "Review & Launch",    subtitle: "Go live on weCater",    estimatedMinutes: 2 },
] as const

export const CUISINE_OPTIONS = [
  "American", "Italian", "Mexican", "Asian", "Mediterranean",
  "BBQ & Grills", "Indian", "Japanese", "Greek", "Middle Eastern",
  "Latin American", "Seafood", "Vegan & Plant-Based", "Breakfast & Brunch",
  "Sandwiches & Wraps", "Pizza", "Fusion", "Farm-to-Table",
]

export const DIETARY_TAGS = [
  { key: "vegetarian",  label: "Vegetarian",  color: "#378760" },
  { key: "vegan",       label: "Vegan",       color: "#39b16c" },
  { key: "gluten-free", label: "Gluten-Free", color: "#ca6100" },
  { key: "halal",       label: "Halal",       color: "#073d30" },
  { key: "kosher",      label: "Kosher",      color: "#29344a" },
  { key: "dairy-free",  label: "Dairy-Free",  color: "#5a626f" },
  { key: "nut-free",    label: "Nut-Free",    color: "#c22d2c" },
  { key: "keto",        label: "Keto",        color: "#8e2e84" },
]

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
]
