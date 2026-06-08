import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restaurant Partner Application — weCater",
  description: "Join 2,400+ restaurant partners on the weCater catering marketplace.",
}

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
