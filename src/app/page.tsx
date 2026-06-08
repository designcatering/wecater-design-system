"use client"

import { useState } from "react"
import TopBar from "./_components/TopBar"
import BrowseView from "./_components/BrowseView"
import ChatView from "./_components/ChatView"
import CartDrawer from "./_components/CartDrawer"
import CheckoutModal from "./_components/CheckoutModal"
import OrderTrackingView from "./_components/OrderTrackingView"
import OrderManagementView from "./_components/OrderManagementView"
import RestaurantProfileView from "./_components/RestaurantProfileView"

/* ─────────────────────────────────────────────────────────────────────────────
   Shared types (exported for child components)
───────────────────────────────────────────────────────────────────────────── */

export type ViewMode = "browse" | "chat" | "orders" | "tracking" | "restaurant"

export interface CartItem {
  id: string
  restaurantName: string
  restaurantSub: string
  restaurantBg: string
  mealItems: {
    name: string
    emoji: string
    bgColor: string
    quantity: number
    priceEach: number
  }[]
  forCount: number
  bites: number
}

export interface PlacedOrder {
  id: string
  ref: string
  restaurantName: string
  restaurantSub: string
  restaurantBg: string
  mealItems: {
    name: string
    emoji: string
    bgColor: string
    quantity: number
    priceEach: number
  }[]
  forCount: number
  bites: number
  subtotal: number
  tax: number
  total: number
  cashback: number
  deliveryDate: string
  deliveryTime: string
  deliveryAddress: string
  contactName: string
  contactPhone: string
  notes: string
  status: "preparing" | "out-for-delivery" | "delivered" | "cancelled"
  placedAt: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mock historical orders (seeded so order management has data on first load)
───────────────────────────────────────────────────────────────────────────── */

const SEED_ORDERS: PlacedOrder[] = [
  {
    id: "WC-2026-1234", ref: "WC-2026-1234",
    restaurantName: "Barrio Queen", restaurantSub: "Upscale Mexican", restaurantBg: "#FED68D",
    mealItems: [
      { name: "Power Bowl",     emoji: "🥗", bgColor: "#073D30", quantity: 8, priceEach: 14.5 },
      { name: "Caesar Salad",   emoji: "🥬", bgColor: "#067E39", quantity: 4, priceEach: 12 },
    ],
    forCount: 12, bites: 2390, subtotal: 164, tax: 14.1, total: 178.1, cashback: 9.02,
    deliveryDate: "April 15, 2026", deliveryTime: "12:30 PM",
    deliveryAddress: "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383",
    contactName: "Alex Hermana", contactPhone: "+1 (602) 555-0182", notes: "",
    status: "delivered", placedAt: "11:00 AM",
  },
  {
    id: "WC-2026-1133", ref: "WC-2026-1133",
    restaurantName: "Urban Plates", restaurantSub: "California Cuisine", restaurantBg: "#D4F5ED",
    mealItems: [
      { name: "Mediterranean Feast", emoji: "🫓", bgColor: "#5a3000", quantity: 6, priceEach: 23 },
      { name: "Garden Salad",        emoji: "🥙", bgColor: "#39B16C", quantity: 4, priceEach: 13 },
    ],
    forCount: 10, bites: 4004, subtotal: 190, tax: 16.34, total: 206.34, cashback: 10.45,
    deliveryDate: "March 28, 2026", deliveryTime: "1:00 PM",
    deliveryAddress: "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383",
    contactName: "Alex Hermana", contactPhone: "+1 (602) 555-0182", notes: "",
    status: "delivered", placedAt: "12:00 PM",
  },
  {
    id: "WC-2026-1089", ref: "WC-2026-1089",
    restaurantName: "Casa Latina", restaurantSub: "Latin Fusion", restaurantBg: "#fee3fc",
    mealItems: [
      { name: "Taco Bar",        emoji: "🌮", bgColor: "#CA6100", quantity: 10, priceEach: 18 },
      { name: "Churros Platter", emoji: "🍩", bgColor: "#653000", quantity: 2,  priceEach: 24 },
    ],
    forCount: 10, bites: 2889, subtotal: 228, tax: 19.61, total: 247.61, cashback: 12.54,
    deliveryDate: "March 15, 2026", deliveryTime: "12:00 PM",
    deliveryAddress: "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383",
    contactName: "Alex Hermana", contactPhone: "+1 (602) 555-0182", notes: "",
    status: "delivered", placedAt: "11:15 AM",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   HomePage
───────────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const [view, setView]               = useState<ViewMode>("browse")
  const [seedQuery, setSeedQuery]     = useState("")
  const [cartItems, setCartItems]     = useState<CartItem[]>([])
  const [showCart, setShowCart]       = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(SEED_ORDERS)
  const [trackingId, setTrackingId]         = useState<string | null>(null)
  const [eventName, setEventName]           = useState("My Event")
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [previousView, setPreviousView]     = useState<ViewMode>("browse")

  const cartCount = cartItems.reduce((s, ci) => s + ci.mealItems.reduce((ms, m) => ms + m.quantity, 0), 0)
  const trackingOrder = placedOrders.find((o) => o.id === trackingId) ?? null
  const activeOrderCount = placedOrders.filter((o) => o.status === "preparing" || o.status === "out-for-delivery").length

  function openChat(query = "") {
    setSeedQuery(query)
    setView("chat")
  }

  function handleCartAdd(item: CartItem) {
    setCartItems((prev) => [...prev, item])
    setShowCart(true)
  }

  function handleCartRemove(id: string) {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }

  function handleCheckout() {
    setShowCart(false)
    setCheckoutOpen(true)
  }

  function handleOrderPlaced(order: PlacedOrder) {
    setPlacedOrders((prev) => [order, ...prev])
    setCartItems([])
    setShowCart(false)
  }

  function handleTrackOrder(orderId: string) {
    setTrackingId(orderId)
    setView("tracking")
    setCheckoutOpen(false)
  }

  function handleViewChange(v: ViewMode) {
    if (v === "chat") { openChat(); return }
    setView(v)
  }

  function handleRestaurantClick(name: string) {
    setPreviousView(view)
    setSelectedRestaurant(name)
    setView("restaurant")
  }

  function handleBackFromTracking() {
    // Return to wherever made sense — orders if we came from there, else browse
    setView("orders")
    setTrackingId(null)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <TopBar
        view={view}
        onViewChange={handleViewChange}
        cartCount={cartCount}
        activeOrderCount={activeOrderCount}
        onCartOpen={() => setShowCart(true)}
        onOrdersOpen={() => setView("orders")}
      />

      <main className="flex-1 overflow-hidden">
        {view === "browse" && <BrowseView onOpenChat={openChat} onRestaurantClick={handleRestaurantClick} />}
        {view === "chat"   && <ChatView initialQuery={seedQuery} onCartAdd={handleCartAdd} onRestaurantClick={handleRestaurantClick} />}
        {view === "restaurant" && selectedRestaurant && (
          <RestaurantProfileView
            restaurantName={selectedRestaurant}
            onBack={() => setView(previousView)}
            onAddToCart={(item) => { handleCartAdd(item); setShowCart(true) }}
          />
        )}
        {view === "orders" && (
          <OrderManagementView
            orders={placedOrders}
            onBack={() => setView("browse")}
            onTrack={handleTrackOrder}
          />
        )}
        {view === "tracking" && trackingOrder && (
          <OrderTrackingView
            order={trackingOrder}
            onBack={handleBackFromTracking}
          />
        )}
      </main>

      <CartDrawer
        items={cartItems}
        open={showCart}
        onClose={() => setShowCart(false)}
        onRemove={handleCartRemove}
        onCheckout={handleCheckout}
        eventName={eventName}
        onEventNameChange={setEventName}
      />

      <CheckoutModal
        open={checkoutOpen}
        cartItems={cartItems}
        onClose={() => setCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
        onTrackOrder={handleTrackOrder}
      />
    </div>
  )
}
