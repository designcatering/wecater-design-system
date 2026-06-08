// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = "pending" | "confirmed" | "preparing" | "completed" | "cancelled"

export interface OrderItem {
  name: string
  qty: number
  pricePerPerson: number
}

export interface OrderReview {
  rating: number          // 1–5
  comment: string
  reviewerName: string
  reviewedAt: string      // "Apr 30, 2024"
  highlights: string[]    // e.g. ["On time", "Great presentation"]
}

export interface MockOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  company: string
  headcount: number
  deliveryDate: string        // "May 9, 2024"
  deliveryTime: string        // "12:00 PM"
  deliveryAddress: string
  items: OrderItem[]
  specialInstructions: string
  status: OrderStatus
  total: number
  createdAt: string           // ISO
  isNew?: boolean
  review?: OrderReview
}

export interface MockMessage {
  id: string
  senderType: "customer" | "restaurant"
  senderName: string
  content: string
  timestamp: string           // "10:32 AM"
}

export interface MockConversation {
  id: string
  orderId?: string
  orderNumber?: string
  orderStatus?: OrderStatus
  customerName: string
  initials: string
  avatarColor: string
  company: string
  messages: MockMessage[]
  unreadCount: number
  lastAt: string
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-001",
    orderNumber: "WC-2024-1008",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@techcorp.com",
    customerPhone: "(312) 555-0144",
    company: "TechCorp Inc.",
    headcount: 45,
    deliveryDate: "May 9, 2024",
    deliveryTime: "12:00 PM",
    deliveryAddress: "455 N Cityfront Plaza Dr, Chicago, IL 60611",
    items: [
      { name: "Chicken Tikka Masala", qty: 20, pricePerPerson: 16 },
      { name: "Vegetable Biryani",    qty: 15, pricePerPerson: 14 },
      { name: "Garlic Naan Basket",   qty: 45, pricePerPerson: 3  },
      { name: "Mango Lassi",          qty: 45, pricePerPerson: 4  },
    ],
    specialInstructions: "5 guests have nut allergies — please label items clearly.",
    status: "pending",
    total: 832.50,
    createdAt: "2024-05-07T09:15:00",
    isNew: true,
  },
  {
    id: "ord-002",
    orderNumber: "WC-2024-1007",
    customerName: "James Park",
    customerEmail: "jpark@salesforce.com",
    customerPhone: "(415) 555-0198",
    company: "Salesforce",
    headcount: 80,
    deliveryDate: "May 10, 2024",
    deliveryTime: "1:00 PM",
    deliveryAddress: "350 E Cermak Rd, Chicago, IL 60616",
    items: [
      { name: "Carne Asada Taco Bar",  qty: 80, pricePerPerson: 14 },
      { name: "Street Corn (Elote)",   qty: 80, pricePerPerson: 4  },
      { name: "Pico de Gallo + Chips", qty: 80, pricePerPerson: 3  },
      { name: "Horchata",              qty: 80, pricePerPerson: 3  },
    ],
    specialInstructions: "Please include a vegan protein option for ~10 guests.",
    status: "pending",
    total: 1920.00,
    createdAt: "2024-05-07T14:22:00",
    isNew: true,
  },
  {
    id: "ord-003",
    orderNumber: "WC-2024-1006",
    customerName: "Amanda Torres",
    customerEmail: "a.torres@goldman.com",
    customerPhone: "(212) 555-0103",
    company: "Goldman Sachs",
    headcount: 120,
    deliveryDate: "May 13, 2024",
    deliveryTime: "12:30 PM",
    deliveryAddress: "71 S Wacker Dr, Chicago, IL 60606",
    items: [
      { name: "Roasted Chicken Platter", qty: 60, pricePerPerson: 18 },
      { name: "Salmon with Mango Salsa", qty: 40, pricePerPerson: 22 },
      { name: "Seasonal Roasted Veg",    qty: 120, pricePerPerson: 6 },
      { name: "Artisan Bread + Butter",  qty: 120, pricePerPerson: 3 },
    ],
    specialInstructions: "Executive dining — presentation is important. Please use serving trays.",
    status: "confirmed",
    total: 3240.00,
    createdAt: "2024-05-05T11:00:00",
  },
  {
    id: "ord-004",
    orderNumber: "WC-2024-1005",
    customerName: "Brian Lee",
    customerEmail: "b.lee@deloitte.com",
    customerPhone: "(312) 555-0177",
    company: "Deloitte",
    headcount: 35,
    deliveryDate: "May 14, 2024",
    deliveryTime: "12:00 PM",
    deliveryAddress: "111 S Wacker Dr, Chicago, IL 60606",
    items: [
      { name: "Mediterranean Mezze Box", qty: 35, pricePerPerson: 17 },
      { name: "Greek Salad",             qty: 35, pricePerPerson: 6  },
    ],
    specialInstructions: "",
    status: "confirmed",
    total: 805.00,
    createdAt: "2024-05-04T16:45:00",
  },
  {
    id: "ord-005",
    orderNumber: "WC-2024-1004",
    customerName: "Rachel Kim",
    customerEmail: "rachel.k@microsoft.com",
    customerPhone: "(425) 555-0121",
    company: "Microsoft",
    headcount: 40,
    deliveryDate: "May 9, 2024",
    deliveryTime: "11:30 AM",
    deliveryAddress: "200 E Randolph St, Chicago, IL 60601",
    items: [
      { name: "Breakfast Burrito Bar",  qty: 40, pricePerPerson: 13 },
      { name: "Fresh Fruit Platter",    qty: 40, pricePerPerson: 5  },
      { name: "Assorted Pastries",      qty: 40, pricePerPerson: 4  },
      { name: "Coffee Station",         qty: 40, pricePerPerson: 5  },
    ],
    specialInstructions: "Setup by 11:15 AM. Loading dock entrance on Randolph.",
    status: "preparing",
    total: 1080.00,
    createdAt: "2024-05-03T10:30:00",
  },
  {
    id: "ord-006",
    orderNumber: "WC-2024-1003",
    customerName: "David Nguyen",
    customerEmail: "d.nguyen@amazon.com",
    customerPhone: "(206) 555-0155",
    company: "Amazon",
    headcount: 55,
    deliveryDate: "Apr 30, 2024",
    deliveryTime: "12:00 PM",
    deliveryAddress: "300 S Riverside Plaza, Chicago, IL 60606",
    items: [
      { name: "Chicken Enchilada Casserole", qty: 30, pricePerPerson: 15 },
      { name: "Cheese Enchiladas (V)",       qty: 25, pricePerPerson: 13 },
      { name: "Cilantro Rice",               qty: 55, pricePerPerson: 4  },
      { name: "Black Beans",                 qty: 55, pricePerPerson: 3  },
    ],
    specialInstructions: "",
    status: "completed",
    total: 1100.00,
    createdAt: "2024-04-25T13:00:00",
    review: {
      rating: 5,
      comment: "Absolutely phenomenal catering. The enchiladas were a huge hit — every single person went back for seconds. Setup was seamless and the team was professional throughout. We're already planning our next order.",
      reviewerName: "David Nguyen",
      reviewedAt: "May 1, 2024",
      highlights: ["On time", "Great presentation", "Delicious food", "Professional staff"],
    },
  },
  {
    id: "ord-007",
    orderNumber: "WC-2024-1002",
    customerName: "Priya Sharma",
    customerEmail: "priya@google.com",
    customerPhone: "(650) 555-0188",
    company: "Google",
    headcount: 50,
    deliveryDate: "Apr 24, 2024",
    deliveryTime: "12:00 PM",
    deliveryAddress: "320 N Morgan St, Chicago, IL 60607",
    items: [
      { name: "Tamales (Chicken)",     qty: 25, pricePerPerson: 16 },
      { name: "Tamales (Vegan)",       qty: 25, pricePerPerson: 15 },
      { name: "Agua Fresca Station",   qty: 50, pricePerPerson: 4  },
    ],
    specialInstructions: "",
    status: "completed",
    total: 925.00,
    createdAt: "2024-04-18T09:00:00",
    review: {
      rating: 4,
      comment: "The tamales were outstanding — both the chicken and vegan options were crowd-pleasers. We had a small issue with a late arrival (about 10 min), but the team was communicative and the food quality made up for it. Would definitely order again.",
      reviewerName: "Priya Sharma",
      reviewedAt: "Apr 25, 2024",
      highlights: ["Delicious food", "Good variety", "Responsive team"],
    },
  },
  {
    id: "ord-008",
    orderNumber: "WC-2024-1001",
    customerName: "Marcus Webb",
    customerEmail: "m.webb@meta.com",
    customerPhone: "(415) 555-0133",
    company: "Meta",
    headcount: 25,
    deliveryDate: "Apr 18, 2024",
    deliveryTime: "1:00 PM",
    deliveryAddress: "151 N Franklin St, Chicago, IL 60606",
    items: [
      { name: "Taco Bowl Bar", qty: 25, pricePerPerson: 15 },
    ],
    specialInstructions: "First order — cancelled by client due to office closure.",
    status: "cancelled",
    total: 375.00,
    createdAt: "2024-04-12T14:00:00",
  },
]

// ─── Conversations ────────────────────────────────────────────────────────────

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: "conv-001",
    orderId: "ord-001",
    orderNumber: "WC-2024-1008",
    orderStatus: "pending",
    customerName: "Sarah Johnson",
    initials: "SJ",
    avatarColor: "#073d30",
    company: "TechCorp Inc.",
    unreadCount: 2,
    lastAt: "10:41 AM",
    messages: [
      {
        id: "m1", senderType: "customer", senderName: "Sarah Johnson",
        content: "Hi! Just placed an order for our team lunch next Thursday. Really excited to try La Cocina!",
        timestamp: "Yesterday, 3:12 PM",
      },
      {
        id: "m2", senderType: "restaurant", senderName: "La Cocina",
        content: "Hi Sarah! We're so excited to cater for TechCorp. I can confirm we've received your order (WC-2024-1008) for 45 people on May 9th. We'll review and confirm by end of day tomorrow. 🙌",
        timestamp: "Yesterday, 4:30 PM",
      },
      {
        id: "m3", senderType: "customer", senderName: "Sarah Johnson",
        content: "Amazing! Quick question — for the 5 guests with nut allergies, will the Tikka Masala be safe? I want to make sure we cover everyone.",
        timestamp: "Today, 10:38 AM",
      },
      {
        id: "m4", senderType: "customer", senderName: "Sarah Johnson",
        content: "Also, is there a possibility to add a small dessert option? Something simple like gulab jamun or kheer would be a wonderful touch.",
        timestamp: "Today, 10:41 AM",
      },
    ],
  },
  {
    id: "conv-002",
    orderId: "ord-005",
    orderNumber: "WC-2024-1004",
    orderStatus: "preparing",
    customerName: "Rachel Kim",
    initials: "RK",
    avatarColor: "#8e2e84",
    company: "Microsoft",
    unreadCount: 1,
    lastAt: "9:05 AM",
    messages: [
      {
        id: "m1", senderType: "customer", senderName: "Rachel Kim",
        content: "Good morning! Our order is today and I just wanted to confirm the delivery details. We're at 200 E Randolph, 14th floor — the loading dock is on Randolph St, not Lake.",
        timestamp: "Today, 8:52 AM",
      },
      {
        id: "m2", senderType: "restaurant", senderName: "La Cocina",
        content: "Good morning Rachel! Noted — Randolph St loading dock, 14th floor. Our driver Carlos will be there by 11:10 AM. You'll receive a text with his ETA when he's 15 min out.",
        timestamp: "Today, 9:00 AM",
      },
      {
        id: "m3", senderType: "customer", senderName: "Rachel Kim",
        content: "Perfect, thank you! One last thing — can you bring extra napkins and serving utensils? We have 40 people and usually run out. 😅",
        timestamp: "Today, 9:05 AM",
      },
    ],
  },
  {
    id: "conv-003",
    orderId: "ord-003",
    orderNumber: "WC-2024-1006",
    orderStatus: "confirmed",
    customerName: "Amanda Torres",
    initials: "AT",
    avatarColor: "#ca6100",
    company: "Goldman Sachs",
    unreadCount: 0,
    lastAt: "May 5",
    messages: [
      {
        id: "m1", senderType: "customer", senderName: "Amanda Torres",
        content: "Hi, I need this to be executive-level presentation. The C-suite will be dining. Is that something La Cocina can accommodate?",
        timestamp: "May 5, 11:02 AM",
      },
      {
        id: "m2", senderType: "restaurant", senderName: "La Cocina",
        content: "Absolutely, Amanda. We handle executive catering regularly and take presentation very seriously. We'll use white serving trays and garnishes for all dishes. I'll also send a delivery manager to oversee setup personally.",
        timestamp: "May 5, 11:45 AM",
      },
      {
        id: "m3", senderType: "customer", senderName: "Amanda Torres",
        content: "That's exactly what we need. Thank you — confirming the order now.",
        timestamp: "May 5, 12:01 PM",
      },
      {
        id: "m4", senderType: "restaurant", senderName: "La Cocina",
        content: "Order confirmed ✓. You're all set for May 13th, 12:30 PM. We'll reach out 48 hours before with a final confirmation.",
        timestamp: "May 5, 12:15 PM",
      },
    ],
  },
  {
    id: "conv-004",
    orderId: undefined,
    orderNumber: undefined,
    customerName: "James Park",
    initials: "JP",
    avatarColor: "#29344a",
    company: "Salesforce",
    unreadCount: 0,
    lastAt: "May 7",
    messages: [
      {
        id: "m1", senderType: "customer", senderName: "James Park",
        content: "Hi! I just placed a large order for our Chicago office team lunch (80 people). We're super excited. Do you have experience with orders this size?",
        timestamp: "May 7, 2:22 PM",
      },
      {
        id: "m2", senderType: "restaurant", senderName: "La Cocina",
        content: "Hi James! Yes, absolutely — we regularly cater 80–150 person events. Your order is in review and we'll have it confirmed within 24 hours. Welcome to the La Cocina family! 🌮",
        timestamp: "May 7, 3:10 PM",
      },
    ],
  },
]

// ─── Stats summary (used by dashboard) ───────────────────────────────────────

export const MOCK_STATS = {
  revenueThisMonth: 4057.50,
  revenueLastMonth: 3622.00,
  ordersThisMonth: 5,
  ordersLastMonth: 4,
  avgOrderValue: 811.50,
  responseRate: 98,
  rating: 4.9,
  reviewCount: 7,
}

export const RESTAURANT_PROFILE = {
  name: "La Cocina Catering",
  initials: "LC",
  ownerName: "Maria Rodriguez",
  ownerInitials: "MR",
  status: "live" as const,
  cuisine: "Mexican · Latin American",
  location: "Chicago, IL",
}

// ─── Menu data ────────────────────────────────────────────────────────────────

export interface MenuDietaryTag {
  key: string
  label: string
  color: string
}

export interface MenuItemData {
  id: string
  name: string
  description: string
  pricePerPerson: number
  minOrderQty: number
  dietaryTags: string[]
  available: boolean
  emoji: string           // placeholder for photo
}

export interface MenuCategoryData {
  id: string
  name: string
  items: MenuItemData[]
}

export const DIETARY_TAG_MAP: Record<string, MenuDietaryTag> = {
  vegetarian:  { key: "vegetarian",  label: "Vegetarian",  color: "#067e39" },
  vegan:       { key: "vegan",       label: "Vegan",       color: "#39b16c" },
  "gluten-free":{ key: "gluten-free",label: "GF",          color: "#ca6100" },
  halal:       { key: "halal",       label: "Halal",       color: "#073d30" },
  "dairy-free":{ key: "dairy-free",  label: "Dairy-Free",  color: "#5a626f" },
  "nut-free":  { key: "nut-free",    label: "Nut-Free",    color: "#c22d2c" },
}

export const MOCK_MENU: MenuCategoryData[] = [
  {
    id: "cat-1",
    name: "Appetizers & Starters",
    items: [
      {
        id: "item-1", emoji: "🥑",
        name: "Guacamole & Tortilla Chips",
        description: "House-made guacamole with fresh avocado, lime, cilantro and jalapeño. Served with warm salted tortilla chips.",
        pricePerPerson: 5, minOrderQty: 10,
        dietaryTags: ["vegetarian", "vegan", "gluten-free"],
        available: true,
      },
      {
        id: "item-2", emoji: "🌽",
        name: "Elote Cups (Street Corn)",
        description: "Grilled corn kernels tossed in chipotle mayo, cotija cheese, chili powder and a squeeze of lime.",
        pricePerPerson: 5, minOrderQty: 10,
        dietaryTags: ["vegetarian", "gluten-free"],
        available: true,
      },
      {
        id: "item-3", emoji: "🧀",
        name: "Queso Fundido",
        description: "Melted Oaxacan cheese with roasted peppers and chorizo, served with warm tortillas. Perfect for sharing.",
        pricePerPerson: 6, minOrderQty: 15,
        dietaryTags: [],
        available: true,
      },
    ],
  },
  {
    id: "cat-2",
    name: "Main Courses",
    items: [
      {
        id: "item-4", emoji: "🥩",
        name: "Carne Asada Taco Bar",
        description: "Grilled skirt steak marinated in citrus and spices, served with warm corn tortillas, salsa verde, pico de gallo and all the fixings.",
        pricePerPerson: 16, minOrderQty: 15,
        dietaryTags: ["gluten-free"],
        available: true,
      },
      {
        id: "item-5", emoji: "🍗",
        name: "Chicken Tinga Enchiladas",
        description: "Slow-cooked chipotle chicken wrapped in corn tortillas, smothered in red mole sauce and melted cheese.",
        pricePerPerson: 15, minOrderQty: 15,
        dietaryTags: [],
        available: true,
      },
      {
        id: "item-6", emoji: "🫔",
        name: "Veggie Enchilada Casserole",
        description: "Layers of corn tortillas, roasted seasonal vegetables, black beans, tomatillo salsa and queso fresco.",
        pricePerPerson: 13, minOrderQty: 10,
        dietaryTags: ["vegetarian", "gluten-free"],
        available: true,
      },
      {
        id: "item-7", emoji: "🫘",
        name: "Tamale Bundle",
        description: "Handmade masa tamales with your choice of chicken mole, pork green chile, or vegan black bean and cheese.",
        pricePerPerson: 15, minOrderQty: 20,
        dietaryTags: [],
        available: false,
      },
    ],
  },
  {
    id: "cat-3",
    name: "Sides & Salads",
    items: [
      {
        id: "item-8", emoji: "🍚",
        name: "Cilantro Lime Rice",
        description: "Fluffy long-grain rice cooked with fresh lime juice, cilantro and a touch of garlic.",
        pricePerPerson: 4, minOrderQty: 10,
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
        available: true,
      },
      {
        id: "item-9", emoji: "🫘",
        name: "Charro Beans",
        description: "Pinto beans slow-cooked with bacon, tomato, jalapeño and Mexican spices. Rich and hearty.",
        pricePerPerson: 4, minOrderQty: 10,
        dietaryTags: ["gluten-free", "dairy-free"],
        available: true,
      },
      {
        id: "item-10", emoji: "🥗",
        name: "Jicama Slaw",
        description: "Crisp jicama, mango and cabbage tossed in a citrus-chili vinaigrette. Light and refreshing.",
        pricePerPerson: 5, minOrderQty: 10,
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
        available: true,
      },
    ],
  },
  {
    id: "cat-4",
    name: "Desserts",
    items: [
      {
        id: "item-11", emoji: "🍰",
        name: "Tres Leches Cake",
        description: "Classic Mexican sponge cake soaked in three milks, topped with fresh whipped cream and cinnamon.",
        pricePerPerson: 7, minOrderQty: 10,
        dietaryTags: ["vegetarian"],
        available: true,
      },
      {
        id: "item-12", emoji: "🍩",
        name: "Churros with Chocolate Sauce",
        description: "Crispy fried churros dusted in cinnamon sugar, served with warm Mexican chocolate dipping sauce.",
        pricePerPerson: 6, minOrderQty: 15,
        dietaryTags: ["vegetarian"],
        available: true,
      },
    ],
  },
  {
    id: "cat-5",
    name: "Beverages",
    items: [
      {
        id: "item-13", emoji: "🥛",
        name: "Horchata Station",
        description: "Chilled house-made rice milk with cinnamon and vanilla. Self-serve dispensers included.",
        pricePerPerson: 4, minOrderQty: 20,
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
        available: true,
      },
      {
        id: "item-14", emoji: "🍹",
        name: "Agua Fresca (3 flavors)",
        description: "Rotating seasonal flavors — typically hibiscus (jamaica), tamarind, and cucumber lime. Self-serve setup.",
        pricePerPerson: 4, minOrderQty: 20,
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
        available: true,
      },
      {
        id: "item-15", emoji: "☕",
        name: "Coffee & Tea Station",
        description: "Full self-serve setup with drip coffee, decaf, assorted teas, cream, sugar and sweeteners.",
        pricePerPerson: 5, minOrderQty: 15,
        dietaryTags: ["vegetarian", "vegan", "gluten-free"],
        available: true,
      },
    ],
  },
]
