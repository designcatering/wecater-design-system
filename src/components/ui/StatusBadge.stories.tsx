/**
 * StatusBadge stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5441-14991
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StatusBadge } from "@/components/ui/status-badge"
import type { BadgeStatus } from "@/components/ui/status-badge"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Cater StatusBadge** is a compact inline tag that communicates the current state
of an order, reservation, or booking. It pairs a coloured dot with a text label
inside a pill-shaped container.

### Statuses

| Status | Background | Label colour | Use when |
|---|---|---|---|
| \`confirmed\` | Salem/Green 50 | Sherwood Green | Order accepted by restaurant |
| \`preparing\` | Blush 50 | Blush 900 | Kitchen is actively preparing |
| \`completed\` | Surface/Disabled | Mirage 800 | Order fulfilled and delivered |
| \`pending\` | Orange 50 | Orange 800 | Awaiting restaurant confirmation |

### Usage
\`\`\`tsx
import { StatusBadge } from "@/components/ui/status-badge"

<StatusBadge status="confirmed" />
<StatusBadge status="preparing" />
<StatusBadge status="completed" />
<StatusBadge status="pending" />
\`\`\`

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`status\` | \`"confirmed" \\| "preparing" \\| "completed" \\| "pending"\` | \`"confirmed"\` | Status |
| \`className\` | \`string\` | — | — |
| \`style\` | \`CSSProperties\` | — | — |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--cater-green-50\` | \`#d4f5ed\` | confirmed background |
| \`--cater-green-950\` | \`#073d30\` | confirmed dot + text (Sherwood Green) |
| \`--cater-blush-50\` | \`#fff1fd\` | preparing background |
| \`--cater-blush-700\` | \`#8e2e84\` | preparing dot + text |
| \`--color-surface-disabled\` | \`#f1f2f5\` | completed background |
| \`--color-text-subtitle\` | \`#68707c\` | completed dot |
| \`--color-text-body\` | \`#29344a\` | completed text |
| \`--cater-orange-50\` | \`#fff2e5\` | pending background |
| \`--cater-orange-800\` | \`#984900\` | pending dot + text |
        `,
      },
    },
  },

  argTypes: {
    status: {
      control: "select",
      options: ["confirmed", "preparing", "completed", "pending"],
      description: "Order or booking state",
      table: { defaultValue: { summary: "confirmed" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: { status: "confirmed" },
  parameters: {
    docs: {
      description: {
        story: "Use the Controls panel to switch between all four statuses.",
      },
    },
  },
}

// ─── All Statuses ─────────────────────────────────────────────────────────────

const ALL_STATUSES: BadgeStatus[] = ["confirmed", "preparing", "completed", "pending"]

export const AllStatuses: Story = {
  name: "All Statuses",
  args: { status: "confirmed" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All four status variants side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {ALL_STATUSES.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}

// ─── Confirmed ────────────────────────────────────────────────────────────────

export const Confirmed: Story = {
  name: "Confirmed",
  args: { status: "confirmed" },
  parameters: {
    docs: {
      description: {
        story: "Order has been accepted by the restaurant.",
      },
    },
  },
}

// ─── Preparing ────────────────────────────────────────────────────────────────

export const Preparing: Story = {
  name: "Preparing",
  args: { status: "preparing" },
  parameters: {
    docs: {
      description: {
        story: "Kitchen is actively working on the order.",
      },
    },
  },
}

// ─── Completed ────────────────────────────────────────────────────────────────

export const Completed: Story = {
  name: "Completed",
  args: { status: "completed" },
  parameters: {
    docs: {
      description: {
        story: "Order has been fulfilled and delivered.",
      },
    },
  },
}

// ─── Pending ──────────────────────────────────────────────────────────────────

export const Pending: Story = {
  name: "Pending",
  args: { status: "pending" },
  parameters: {
    docs: {
      description: {
        story: "Awaiting restaurant confirmation.",
      },
    },
  },
}

// ─── In Context ───────────────────────────────────────────────────────────────

export const InContext: Story = {
  name: "In Context",
  args: { status: "confirmed" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Badges shown inline with order entries as they would appear in a list.",
      },
    },
  },
  render: () => (
    <div
      className="flex flex-col divide-y rounded-[8px] overflow-hidden w-[340px]"
      style={{ border: "1px solid #f1f2f5" }}
    >
      {[
        { order: "Order #1042", restaurant: "The Garden Bistro",   status: "confirmed"  as BadgeStatus },
        { order: "Order #1041", restaurant: "Spice Route Kitchen",  status: "preparing"  as BadgeStatus },
        { order: "Order #1039", restaurant: "Harbor Seafood Co.",   status: "completed"  as BadgeStatus },
        { order: "Order #1038", restaurant: "Green Bowl Co.",       status: "pending"    as BadgeStatus },
      ].map(({ order, restaurant, status }) => (
        <div
          key={order}
          className="flex items-center justify-between px-4 py-3 bg-white"
        >
          <div className="flex flex-col gap-[2px]">
            <span className="text-[13px] font-semibold" style={{ color: "#101828" }}>
              {order}
            </span>
            <span className="text-[12px]" style={{ color: "#68707c" }}>
              {restaurant}
            </span>
          </div>
          <StatusBadge status={status} />
        </div>
      ))}
    </div>
  ),
}

// ─── API Reference ────────────────────────────────────────────────────────────

export const APIReference: Story = {
  name: "API Reference",
  args: { status: "confirmed" },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: `
### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`status\` | \`"confirmed" \\| "preparing" \\| "completed" \\| "pending"\` | \`"confirmed"\` | Controls badge colour and label |

---

### Design tokens

| Status | BG token | BG value | Text token | Text value |
|---|---|---|---|---|
| confirmed | \`--cater-green-50\` | \`#d4f5ed\` | \`--cater-green-800\` | \`#073d30\` |
| preparing | \`--cater-blush-50\` | \`#fff1fd\` | \`--cater-blush-900\` | \`#8e2e84\` |
| completed | \`--cater-mirage-100\` | \`#f1f2f5\` | \`--cater-mirage-800\` | \`#29344a\` |
| pending | \`--cater-orange-50\` | \`#fff2e5\` | \`--cater-orange-800\` | \`#984900\` |
        `,
      },
    },
  },
}
