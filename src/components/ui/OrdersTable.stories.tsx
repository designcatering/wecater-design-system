/**
 * OrdersTable stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5441-17080
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { OrdersTable } from "@/components/ui/orders-table"
import type { OrderRow } from "@/components/ui/orders-table"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Table",
  component: OrdersTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**Cater OrdersTable** is the primary data table for displaying catering orders.
Built on top of the shadcn \`Table\` primitives.

### Columns
| Column | Width | Notes |
|---|---|---|
| Order # | 132px | Unique order ID |
| Customer | 226px | Company or person name |
| Date & Time | 226px | Scheduled catering time |
| Status | 121px | \`<StatusBadge />\` |
| Address | 226px | Truncated with ellipsis |
| Order amount | 154px | Formatted currency |
| Action | 87px | \`···\` contextual menu trigger |

### Row states
- **Header** — 14px semibold, \`#68707c\`, \`py-[10px]\`
- **Default** — 16px regular, \`#29344a\`, 60px height, white bg
- **Hover** — same as default, bg shifts to \`#fafbfc\`

### Usage
\`\`\`tsx
import { OrdersTable } from "@/components/ui/orders-table"

<OrdersTable
  data={orders}
  onActionClick={(row) => openMenu(row)}
/>

// With pagination
<OrdersTable
  data={orders}
  pagination={{ page, pageSize: 20, total: 161, onPageChange: setPage, position: "bottom-right" }}
/>
\`\`\`

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`data\` | \`OrderRow[]\` | \`[]\` | — |
| \`onActionClick\` | \`(row: OrderRow) => void\` | — | Action column |
| \`pagination.page\` | \`number\` | — | — |
| \`pagination.pageSize\` | \`number\` | \`20\` | — |
| \`pagination.total\` | \`number\` | — | — |
| \`pagination.onPageChange\` | \`(page: number) => void\` | — | — |
| \`pagination.position\` | \`"bottom-right" \\| "top-right"\` | \`"bottom-right"\` | — |
| \`className\` | \`string\` | — | — |

**OrderRow shape**
\`\`\`ts
{ id: string; customer: string; dateTime: string; status: BadgeStatus; address: string; amount: string }
\`\`\`

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--color-text-subtitle\` | \`#68707c\` | Header cell text |
| \`--color-text-body\` | \`#29344a\` | Row cell text |
| \`--color-surface-subtle\` | \`#fafbfc\` | Row hover background |
| \`--color-dialogue-outline\` | \`rgba(217,221,228,0.5)\` | Row border |
| \`--color-border-default\` | \`#d9dde4\` | Action button border |
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrdersTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_ORDERS: OrderRow[] = [
  {
    id:       "WC-1008",
    customer: "Techcorp Inc.",
    dateTime: "Wed, Jun. 17, 10:30 AM",
    status:   "confirmed",
    address:  "5552 E Phoenix, Az, 900-09",
    amount:   "$470.87",
  },
  {
    id:       "WC-1007",
    customer: "Bright Futures LLC",
    dateTime: "Tue, Jun. 16, 12:00 PM",
    status:   "preparing",
    address:  "1200 N Central Ave, Phoenix, Az, 85004",
    amount:   "$1,230.00",
  },
  {
    id:       "WC-1006",
    customer: "Harbor Capital Group",
    dateTime: "Mon, Jun. 15, 9:00 AM",
    status:   "completed",
    address:  "330 S 4th St, Phoenix, Az, 85004",
    amount:   "$875.50",
  },
  {
    id:       "WC-1005",
    customer: "Green Innovations Co.",
    dateTime: "Sun, Jun. 14, 11:00 AM",
    status:   "pending",
    address:  "888 W Van Buren St, Phoenix, Az, 85007",
    amount:   "$320.00",
  },
]

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: { data: SAMPLE_ORDERS },
  parameters: {
    docs: {
      description: {
        story: "Full interactive table. Hover rows to see the surface/subtle background transition.",
      },
    },
  },
}

// ─── All Status Variants ──────────────────────────────────────────────────────

export const AllStatusVariants: Story = {
  name: "All Status Variants",
  args: { data: SAMPLE_ORDERS },
  parameters: {
    docs: {
      description: {
        story: "One row per status — confirmed, preparing, completed, pending — showing how the StatusBadge integrates into the table.",
      },
    },
  },
}

// ─── Single Row · Default ─────────────────────────────────────────────────────

export const SingleRowDefault: Story = {
  name: "Single Row - Default",
  args: {
    data: [SAMPLE_ORDERS[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "A single default row with confirmed status.",
      },
    },
  },
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  name: "Empty State",
  args: { data: [] },
  parameters: {
    docs: {
      description: {
        story: "Table with no rows — shows the empty state message.",
      },
    },
  },
}

// ─── Many Rows ────────────────────────────────────────────────────────────────

export const ManyRows: Story = {
  name: "Many Rows",
  args: {
    data: [
      ...SAMPLE_ORDERS,
      ...SAMPLE_ORDERS.map((r) => ({ ...r, id: r.id + "-B" })),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Eight rows to verify alternating hover states and scrollability.",
      },
    },
  },
}

// ─── With Pagination (Bottom Right) ──────────────────────────────────────────

export const WithPaginationBottom: Story = {
  name: "With Pagination - Bottom Right",
  args: { data: SAMPLE_ORDERS },
  parameters: {
    docs: {
      description: {
        story: "Table with pagination controls pinned to the bottom-right. Click the arrows to change pages.",
      },
    },
  },
  render: () => {
    const [page, setPage] = React.useState(1)
    return (
      <OrdersTable
        data={SAMPLE_ORDERS}
        pagination={{
          page,
          pageSize: 20,
          total: 161,
          onPageChange: setPage,
          position: "bottom-right",
        }}
      />
    )
  },
}

// ─── With Pagination (Top Right) ─────────────────────────────────────────────

export const WithPaginationTop: Story = {
  name: "With Pagination - Top Right",
  args: { data: SAMPLE_ORDERS },
  parameters: {
    docs: {
      description: {
        story: "Table with pagination controls pinned to the top-right.",
      },
    },
  },
  render: () => {
    const [page, setPage] = React.useState(1)
    return (
      <OrdersTable
        data={SAMPLE_ORDERS}
        pagination={{
          page,
          pageSize: 20,
          total: 161,
          onPageChange: setPage,
          position: "top-right",
        }}
      />
    )
  },
}
