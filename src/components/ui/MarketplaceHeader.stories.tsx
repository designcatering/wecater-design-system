/**
 * MarketplaceHeader stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4772-34232
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { MarketplaceHeader } from "@/components/ui/marketplace-header"
import type { MarketplaceHeaderState } from "@/components/ui/marketplace-header"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/MarketplaceHeader",
  component: MarketplaceHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**Cater MarketplaceHeader** is the top navigation bar for the WeCater marketplace.
Fixed 60 px height, white background, 1 px bottom border.

### Anatomy
\`\`\`
[Logo]  [Location pill · Search bar]   [Browse | Cater AI]   [Icons]  [Auth]
\`\`\`

### Auth states
| State | Description |
|---|---|
| \`signed-out\` | Heart + empty cart (Gossip). Login button. |
| \`signed-in\` | Chat + Bell (no badge). Filled cart (Sherwood). Avatar. |
| \`signed-in-notified\` | Chat + Bell with red badge. Filled cart. Avatar. |
| \`signed-in-empty-cart\` | Chat + Bell with red badge. Empty cart (Gossip). Avatar. |

### Search states
The search bar uses \`InputField fieldType="company"\`. Pass \`searchDisabled\`,
\`searchGhost\`, or \`searchError\` to activate the corresponding InputField state.

### Usage
\`\`\`tsx
import { MarketplaceHeader } from "@/components/ui/marketplace-header"

<MarketplaceHeader
  state="signed-in-notified"
  location="San Francisco, CA"
  cartCount={4}
  notificationCount={2}
  userInitials="PS"
  activeTab="browse"
  onTabChange={setActiveTab}
  onLoginClick={() => router.push("/login")}
  onCartClick={() => setCartOpen(true)}
/>
\`\`\`
        `,
      },
    },
  },

  // ── Global decorator ────────────────────────────────────────────────────────
  // Manages activeTab state for EVERY story so the Browse/Cater AI toggle
  // works out of the box — no per-story boilerplate needed.
  decorators: [
    (Story, context) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [activeTab, setActiveTab] = React.useState<"browse" | "cater-ai">(
        (context.args.activeTab as "browse" | "cater-ai") ?? "browse"
      )
      return (
        <Story
          args={{
            ...context.args,
            activeTab,
            onTabChange: setActiveTab,
          }}
        />
      )
    },
  ],

  argTypes: {
    state: {
      control: "select",
      options: ["signed-out", "signed-in", "signed-in-notified", "signed-in-empty-cart"],
      description: "Controls which icons and auth elements render",
      table: { defaultValue: { summary: "signed-out" } },
    },
    location: {
      control: "text",
      description: "Text shown in the location pill",
      table: { defaultValue: { summary: "San Francisco, CA" } },
    },
    searchPlaceholder: {
      control: "text",
      description: "Search input placeholder text",
    },
    cartCount: {
      control: { type: "number", min: 0 },
      description: "Item count on the filled cart (ignored when cart is empty)",
      table: { defaultValue: { summary: "0" } },
    },
    notificationCount: {
      control: { type: "number", min: 0 },
      description: "Count shown on the notification badge",
      table: { defaultValue: { summary: "2" } },
    },
    userInitials: {
      control: "text",
      description: "Two-letter initials for the profile avatar",
      table: { defaultValue: { summary: "PS" } },
    },
    activeTab: {
      control: "select",
      options: ["browse", "cater-ai"],
      description: "Active centre tab (managed by the global decorator in stories)",
      table: { defaultValue: { summary: "browse" } },
    },
    onTabChange:         { action: "tabChanged" },
    onLocationClick:     { action: "locationClicked" },
    onSearchClick:       { action: "searchClicked" },
    onChatClick:         { action: "chatClicked" },
    onNotificationsClick:{ action: "notificationsClicked" },
    onWishlistClick:     { action: "wishlistClicked" },
    onCartClick:         { action: "cartClicked" },
    onLoginClick:        { action: "loginClicked" },
    onProfileClick:      { action: "profileClicked" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarketplaceHeader>

export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

// ─────────────────────────────────────────────────────────────────────────────
// Helper — a single header row with its own toggle state (for multi-row stories)
// ─────────────────────────────────────────────────────────────────────────────

function HeaderRow({ label, state }: { label: string; state: MarketplaceHeaderState }) {
  const [activeTab, setActiveTab] = React.useState<"browse" | "cater-ai">("browse")
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#68707c" }}>
        {label}
      </p>
      <MarketplaceHeader
        state={state}
        location="San Francisco, CA"
        cartCount={4}
        notificationCount={2}
        userInitials="PS"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLocationClick={noop}
        onChatClick={noop}
        onNotificationsClick={noop}
        onWishlistClick={noop}
        onCartClick={noop}
        onLoginClick={noop}
        onProfileClick={noop}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    state: "signed-in-notified",
    location: "San Francisco, CA",
    cartCount: 4,
    notificationCount: 2,
    userInitials: "PS",
    activeTab: "browse",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive. Use the Controls panel to switch auth state, change the location, update counts, or trigger search input states. The Browse / Cater AI toggle is live — click it.",
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// All States
// ─────────────────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  args: { state: "signed-out" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All four header states stacked for a side-by-side comparison. Every row has its own live Browse / Cater AI toggle.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-6" style={{ backgroundColor: "#f4f6f8" }}>
      <HeaderRow label="Not Signed In"                  state="signed-out" />
      <HeaderRow label="Signed In · Notification"       state="signed-in-notified" />
      <HeaderRow label="Signed In · No Notification"    state="signed-in" />
      <HeaderRow label="Signed In · Empty Cart"         state="signed-in-empty-cart" />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Not Signed In
// ─────────────────────────────────────────────────────────────────────────────

export const NotSignedIn: Story = {
  name: "Not Signed In",
  args: {
    state: "signed-out",
    location: "San Francisco, CA",
    cartCount: 0,
    notificationCount: 0,
    userInitials: "",
    activeTab: "browse",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Unauthenticated state. Chat and bell are hidden. Cart shows Gossip-green empty style. Login button anchors the right side.",
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Signed In · Notification
// ─────────────────────────────────────────────────────────────────────────────

export const SignedInNotification: Story = {
  name: "Signed In · Notification",
  args: {
    state: "signed-in-notified",
    location: "San Francisco, CA",
    cartCount: 4,
    notificationCount: 2,
    userInitials: "PS",
    activeTab: "browse",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Authenticated with unread notifications. Bell shows a red `#c22d2c` badge. Cart is Sherwood-green (filled). Avatar replaces Login.",
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Signed In · No Notification
// ─────────────────────────────────────────────────────────────────────────────

export const SignedInNoNotification: Story = {
  name: "Signed In · No Notification",
  args: {
    state: "signed-in",
    location: "San Francisco, CA",
    cartCount: 4,
    notificationCount: 0,
    userInitials: "PS",
    activeTab: "browse",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Authenticated — all notifications cleared. Bell is visible but has no badge. Filled cart shows item count.",
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Signed In · Empty Cart
// ─────────────────────────────────────────────────────────────────────────────

export const SignedInEmptyCart: Story = {
  name: "Signed In · Empty Cart",
  args: {
    state: "signed-in-empty-cart",
    location: "San Francisco, CA",
    cartCount: 0,
    notificationCount: 2,
    userInitials: "PS",
    activeTab: "browse",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Authenticated, bell badge active, but cart is empty — reverts to Gossip-green with count 0. Occurs after an order is placed or all items removed.",
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// API Reference
// ─────────────────────────────────────────────────────────────────────────────

export const APIReference: Story = {
  name: "API Reference",
  args: {
    state: "signed-in-notified",
    location: "San Francisco, CA",
    cartCount: 4,
    notificationCount: 2,
    userInitials: "PS",
    activeTab: "browse",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: `
### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`state\` | \`"signed-out" \\| "signed-in" \\| "signed-in-notified" \\| "signed-in-empty-cart"\` | \`"signed-out"\` | Auth / icon combination |
| \`location\` | \`string\` | \`"San Francisco, CA"\` | Location pill label |
| \`searchPlaceholder\` | \`string\` | — | Search input placeholder |
| \`cartCount\` | \`number\` | \`0\` | Filled-cart item count |
| \`notificationCount\` | \`number\` | \`2\` | Bell badge count |
| \`userInitials\` | \`string\` | \`"PS"\` | Profile avatar initials |
| \`activeTab\` | \`"browse" \\| "cater-ai"\` | \`"browse"\` | Active centre tab |
| \`searchDisabled\` | \`boolean\` | \`false\` | Disable the search InputField |
| \`searchGhost\` | \`boolean\` | \`false\` | Ghost state on the search InputField |
| \`searchError\` | \`boolean\` | \`false\` | Error state on the search InputField |
| \`searchErrorMessage\` | \`string\` | — | Message shown below search on error |
| \`onTabChange\` | \`(tab) => void\` | — | Toggle click handler |
| \`onLocationClick\` | \`() => void\` | — | Location pill click |
| \`onSearchClick\` | \`() => void\` | — | Makes search read-only, fires on click |
| \`onChatClick\` | \`() => void\` | — | Chat icon (signed-in only) |
| \`onNotificationsClick\` | \`() => void\` | — | Bell icon (signed-in only) |
| \`onWishlistClick\` | \`() => void\` | — | Heart icon (signed-out only) |
| \`onCartClick\` | \`() => void\` | — | Cart button |
| \`onLoginClick\` | \`() => void\` | — | Login button (signed-out only) |
| \`onProfileClick\` | \`() => void\` | — | Avatar (signed-in only) |

---

### State → elements

| State | Chat | Bell | Cart style | Wishlist | Auth |
|---|---|---|---|---|---|
| \`signed-out\` | — | — | Gossip, 0 | ✓ | Login |
| \`signed-in\` | ✓ | no badge | Sherwood, count | — | Avatar |
| \`signed-in-notified\` | ✓ | red badge | Sherwood, count | — | Avatar |
| \`signed-in-empty-cart\` | ✓ | red badge | Gossip, 0 | — | Avatar |
        `,
      },
    },
  },
}
