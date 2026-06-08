/**
 * MarketplaceSidebar stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=3969-7373
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { MarketplaceSidebar } from "@/components/ui/marketplace-sidebar"
import type { SidebarSection } from "@/components/ui/marketplace-sidebar"
import { MarketplaceHeader } from "@/components/ui/marketplace-header"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/MarketplaceSidebar",
  component: MarketplaceSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**Cater MarketplaceSidebar** is the left navigation sidebar for the WeCater marketplace.
206 px wide, full height, \`#fafbfc\` background, 1 px right border.

### Anatomy
\`\`\`
┌─────────────────────────┐
│  [icon] Explore          │  ← top nav (scrollable)
│  [icon] Restaurants      │
│  [icon] Favorite         │
│  [icon] Cart             │
│  [icon] Orders           │
│  [icon] Messages         │
│         See more  [v]    │
│ ─────────────────────── │
│  [icon] Rewards          │  ← bottom nav (pinned)
│  [icon] Account          │
└─────────────────────────┘
\`\`\`

### Nav item states
| State | Background | Rounding | Text colour |
|---|---|---|---|
| \`default\` | transparent (hover \`#f1f2f5\`) | 8 px | \`#101828\` |
| \`active\` | \`#ccf8b9\` (Gossip) | pill | \`#063126\` (Green-900) |
| \`muted\` | \`rgba(217,221,228,0.5)\` | pill | \`#101828\` (stays dark) |

"See more" and "Account" use the **muted** variant when active — they receive
a grey pill instead of the green Gossip pill.

### Usage
\`\`\`tsx
import { MarketplaceSidebar } from "@/components/ui/marketplace-sidebar"

const [activeSection, setActiveSection] = React.useState<SidebarSection>("Explore")

<MarketplaceSidebar
  activeSection={activeSection}
  onSectionChange={setActiveSection}
  onSeeMoreToggle={() => console.log("See more toggled")}
/>
\`\`\`
        `,
      },
    },
  },

  // ── Global decorator ─────────────────────────────────────────────────────────
  // Manages activeSection state for EVERY story so clicking any nav item works
  // out of the box — no per-story boilerplate needed.
  decorators: [
    (Story, context) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [activeSection, setActiveSection] = React.useState<SidebarSection>(
        (context.args.activeSection as SidebarSection) ?? "Explore"
      )
      return (
        <Story
          args={{
            ...context.args,
            activeSection,
            onSectionChange: setActiveSection,
          }}
        />
      )
    },
  ],

  argTypes: {
    activeSection: {
      control: "select",
      options: [
        "Explore",
        "Restaurants",
        "Favorite",
        "Cart",
        "Orders",
        "Messages",
        "See more",
        "Rewards",
        "Account",
      ],
      description: "The currently highlighted nav section",
      table: { defaultValue: { summary: "Explore" } },
    },
    onSectionChange: { action: "sectionChanged" },
    onSeeMoreToggle: { action: "seeMoreToggled" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarketplaceSidebar>

export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

// ─────────────────────────────────────────────────────────────────────────────
// Helper — a single sidebar cell with its own activeSection state
// Used in the All Sections grid so each cell is independently interactive.
// ─────────────────────────────────────────────────────────────────────────────

function SidebarCell({
  label,
  initialSection,
}: {
  label: string
  initialSection: SidebarSection
}) {
  const [activeSection, setActiveSection] = React.useState<SidebarSection>(initialSection)
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[8px]"
      style={{ border: "1px solid #e2e4e9" }}
    >
      <p
        className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "#68707c", backgroundColor: "#f4f6f8", borderBottom: "1px solid #e2e4e9" }}
      >
        {label}
      </p>
      <div className="min-h-[600px]">
        <MarketplaceSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onSeeMoreToggle={noop}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    activeSection: "Explore",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive. Use the Controls panel to switch the active section, or click any nav item directly. The grey area to the right simulates a real page canvas.",
      },
    },
  },
  render: (args) => (
    <div className="flex h-screen">
      <MarketplaceSidebar {...args} />
      <div
        className="flex flex-1 items-center justify-center"
        style={{ backgroundColor: "#f4f6f8" }}
      >
        <p
          className="text-[14px] font-medium"
          style={{ color: "#68707c" }}
        >
          Page content area
        </p>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// All Sections
// ─────────────────────────────────────────────────────────────────────────────

export const AllSections: Story = {
  name: "All Sections",
  args: { activeSection: "Explore" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All 9 nav sections shown in a 3 × 3 grid. Every sidebar cell has its own live state — click any item in any cell and only that cell updates.",
      },
    },
  },
  render: () => (
    <div
      className="grid gap-4 p-6"
      style={{
        gridTemplateColumns: "repeat(3, 206px)",
        backgroundColor: "#f4f6f8",
      }}
    >
      <SidebarCell label="Explore"     initialSection="Explore" />
      <SidebarCell label="Restaurants" initialSection="Restaurants" />
      <SidebarCell label="Favorite"    initialSection="Favorite" />
      <SidebarCell label="Cart"        initialSection="Cart" />
      <SidebarCell label="Orders"      initialSection="Orders" />
      <SidebarCell label="Messages"    initialSection="Messages" />
      <SidebarCell label="See more"    initialSection="See more" />
      <SidebarCell label="Rewards"     initialSection="Rewards" />
      <SidebarCell label="Account"     initialSection="Account" />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Default — Explore Active
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default (Explore Active)",
  args: {
    activeSection: "Explore",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default landing state. Explore is highlighted with the Gossip-green pill. This is the first section a user sees when they open the marketplace.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Restaurants Active
// ─────────────────────────────────────────────────────────────────────────────

export const RestaurantsActive: Story = {
  name: "Restaurants Active",
  args: {
    activeSection: "Restaurants",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user is browsing the restaurant listing page. The restaurant icon switches from the outline to the filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Favorite Active
// ─────────────────────────────────────────────────────────────────────────────

export const FavoriteActive: Story = {
  name: "Favorite Active",
  args: {
    activeSection: "Favorite",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user is viewing their saved/favorited restaurants or dishes. The heart icon switches to its filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Cart Active
// ─────────────────────────────────────────────────────────────────────────────

export const CartActive: Story = {
  name: "Cart Active",
  args: {
    activeSection: "Cart",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user opens the cart panel or cart page. The basket icon switches to its filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Orders Active
// ─────────────────────────────────────────────────────────────────────────────

export const OrdersActive: Story = {
  name: "Orders Active",
  args: {
    activeSection: "Orders",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user navigates to their order history or tracks a live order. The service bell icon switches to its filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Messages Active
// ─────────────────────────────────────────────────────────────────────────────

export const MessagesActive: Story = {
  name: "Messages Active",
  args: {
    activeSection: "Messages",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user is in the messages/chat section — e.g. communicating with a caterer. The chat icon switches to its filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// See More Active
// ─────────────────────────────────────────────────────────────────────────────

export const SeeMoreActive: Story = {
  name: "See More Active",
  args: {
    activeSection: "See more",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the expanded \"See more\" section is open. Uses the **muted** variant (grey pill, dark text) instead of the green Gossip pill — this differentiates it from primary navigation sections.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Rewards Active
// ─────────────────────────────────────────────────────────────────────────────

export const RewardsActive: Story = {
  name: "Rewards Active",
  args: {
    activeSection: "Rewards",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user is viewing their rewards balance or redemption options. Pinned to the bottom nav. The gift icon switches to its filled variant.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Account Active
// ─────────────────────────────────────────────────────────────────────────────

export const AccountActive: Story = {
  name: "Account Active",
  args: {
    activeSection: "Account",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active when the user is on the account/profile settings page. Pinned to the bottom nav. Uses the **muted** variant (grey pill, dark text) — same treatment as \"See more\" — to visually separate account management from primary marketplace navigation.",
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// With Page Layout
// ─────────────────────────────────────────────────────────────────────────────

export const WithPageLayout: Story = {
  name: "With Page Layout",
  args: {
    activeSection: "Explore",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar shown in a realistic full-page layout. The sidebar sits on the left at its fixed 206 px width; the content area fills the remaining horizontal space. Use this story to verify the sidebar does not collapse or overflow when placed inside a flex container.",
      },
    },
  },
  render: (args) => (
    <div className="flex h-screen">
      <MarketplaceSidebar {...args} />
      <main
        className="flex flex-1 items-center justify-center"
        style={{ backgroundColor: "#f4f6f8" }}
      >
        <div className="text-center">
          <p
            className="mb-1 text-[16px] font-semibold"
            style={{ color: "#101828" }}
          >
            Page content
          </p>
          <p
            className="text-[13px]"
            style={{ color: "#68707c" }}
          >
            This area expands to fill the remaining width.
          </p>
        </div>
      </main>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// API Reference
// ─────────────────────────────────────────────────────────────────────────────

export const APIReference: Story = {
  name: "API Reference",
  args: {
    activeSection: "Explore",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: `
### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`activeSection\` | \`SidebarSection\` | — | The currently highlighted nav section |
| \`onSectionChange\` | \`(section: SidebarSection) => void\` | — | Called when the user clicks any nav item |
| \`onSeeMoreToggle\` | \`() => void\` | — | Called additionally when "See more" is clicked |
| \`className\` | \`string\` | — | Extra class names forwarded to the \`<aside>\` |
| \`style\` | \`React.CSSProperties\` | — | Inline styles forwarded to the \`<aside>\` |

---

### SidebarSection

\`\`\`ts
type SidebarSection =
  | "Explore"
  | "Restaurants"
  | "Favorite"
  | "Cart"
  | "Orders"
  | "Messages"
  | "See more"
  | "Rewards"
  | "Account"
\`\`\`

---

### Nav item variants

| Section | Active variant | Notes |
|---|---|---|
| Explore | \`active\` | Gossip-green pill (\`#ccf8b9\`), green text (\`#063126\`) |
| Restaurants | \`active\` | Gossip-green pill, green text |
| Favorite | \`active\` | Gossip-green pill, green text |
| Cart | \`active\` | Gossip-green pill, green text |
| Orders | \`active\` | Gossip-green pill, green text |
| Messages | \`active\` | Gossip-green pill, green text |
| See more | \`muted\` | Grey pill (\`rgba(217,221,228,0.5)\`), dark text (\`#101828\`); chevron instead of left icon |
| Rewards | \`active\` | Gossip-green pill, green text; pinned bottom |
| Account | \`muted\` | Grey pill, dark text; pinned bottom |

---

### Dimensions & tokens

| Token | Value | Usage |
|---|---|---|
| Width | \`206px\` | Fixed, does not grow |
| Background | \`#fafbfc\` | \`color-surface-subtle\` |
| Right border | \`1px solid #f1f2f5\` | \`color-border-disabled\` |
| Active bg | \`#ccf8b9\` | \`cater-gossip\` |
| Active text | \`#063126\` | \`cater-green-900\` |
| Muted bg | \`rgba(217,221,228,0.5)\` | \`color-dialogue-outline\` |
| Default text | \`#101828\` | \`cater-mirage-900\` |
| Hover bg | \`#f1f2f5\` | \`color-border-disabled\` |
        `,
      },
    },
  },
  render: (args) => (
    <div className="min-h-[600px]" style={{ width: 206 }}>
      <MarketplaceSidebar {...args} style={{ height: "100%" }} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Marketplace Shell — Header (signed in) + Sidebar combined
// ─────────────────────────────────────────────────────────────────────────────

export const MarketplaceShell: Story = {
  name: "Marketplace Shell",
  args: { activeSection: "Explore" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Full marketplace shell combining the **signed-in** `MarketplaceHeader` with the `MarketplaceSidebar`. Both components are live — click any sidebar item to change the active section, click Browse / Cater AI to switch header tabs. This is the canonical desktop layout for authenticated users.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeSection, setActiveSection] = React.useState<SidebarSection>("Explore")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = React.useState<"browse" | "cater-ai">("browse")

    return (
      <div className="flex h-screen flex-col overflow-hidden bg-white">
        {/* Header */}
        <MarketplaceHeader
          state="signed-in-notified"
          location="San Francisco, CA"
          cartCount={4}
          notificationCount={2}
          userInitials="PS"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Body */}
        <div className="flex min-h-0 flex-1">
          {/* Sidebar */}
          <MarketplaceSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            className="h-full shrink-0"
          />

          {/* Content placeholder */}
          <main
            className="flex flex-1 flex-col items-center justify-center gap-[8px] overflow-y-auto"
            style={{ backgroundColor: "#f4f6f8" }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#68707c" }}
            >
              Active section
            </p>
            <p className="text-[32px] font-bold" style={{ color: "#101828" }}>
              {activeSection}
            </p>
            <p className="text-[13px]" style={{ color: "#68707c" }}>
              Tab:{" "}
              <strong style={{ color: "#073d30" }}>
                {activeTab === "browse" ? "Browse" : "Cater AI"}
              </strong>
            </p>
          </main>
        </div>
      </div>
    )
  },
}
