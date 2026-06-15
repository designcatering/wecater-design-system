/**
 * Pagination stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5460-21107
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { Pagination } from "@/components/ui/pagination"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Cater Pagination** is the page navigation control used beneath data tables.

### Anatomy
\`\`\`
[1 - 20 of 161]   [|<]  [<]  [>]  [>|]
\`\`\`

- **Range label** — shows current range and total (13px semibold)
- **First / Last** buttons — pill-shaped outer caps (24px radius)
- **Prev / Next** buttons — square inner controls
- Disabled buttons use a lighter border; enabled use \`#d9dde4\`

### Usage
\`\`\`tsx
import { Pagination } from "@/components/ui/pagination"

const [page, setPage] = React.useState(1)

<Pagination
  page={page}
  pageSize={20}
  total={161}
  onPageChange={setPage}
/>
\`\`\`

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`page\` | \`number\` | — | — |
| \`pageSize\` | \`number\` | \`20\` | — |
| \`total\` | \`number\` | — | — |
| \`onPageChange\` | \`(page: number) => void\` | — | — |
| \`className\` | \`string\` | — | — |
| \`style\` | \`CSSProperties\` | — | — |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--color-text-subtitle\` | \`#68707c\` | Range label text |
| \`--color-text-disabled\` | \`#b2b8c1\` | "of" muted text in range label |
| \`--color-border-default\` | \`#d9dde4\` | Enabled button border |
| \`--color-dialogue-outline\` | \`rgba(217,221,228,0.5)\` | Disabled button border |
| \`--color-surface-subtle\` | \`#f4f6f8\` | Button hover background |
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [page, setPage] = React.useState(context.args.page ?? 1)
      return (
        <Story args={{ ...context.args, page, onPageChange: setPage }} />
      )
    },
  ],
  argTypes: {
    page:     { control: { type: "number", min: 1 }, description: "Current page (1-based)" },
    pageSize: { control: { type: "number", min: 1 }, description: "Items per page", table: { defaultValue: { summary: "20" } } },
    total:    { control: { type: "number", min: 0 }, description: "Total number of items" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: { page: 1, pageSize: 20, total: 161 },
  parameters: {
    docs: {
      description: { story: "Fully interactive — click the controls or use the page/total inputs in Controls." },
    },
  },
}

// ─── Middle page ──────────────────────────────────────────────────────────────

export const MiddlePage: Story = {
  name: "Middle Page",
  args: { page: 5, pageSize: 20, total: 161 },
  parameters: {
    docs: {
      description: { story: "All four buttons are enabled — neither first nor last page." },
    },
  },
}

// ─── Last page ────────────────────────────────────────────────────────────────

export const LastPage: Story = {
  name: "Last Page",
  args: { page: 9, pageSize: 20, total: 161 },
  parameters: {
    docs: {
      description: { story: "Next and Last buttons are disabled — user is on the final page." },
    },
  },
}

// ─── Small dataset ────────────────────────────────────────────────────────────

export const SmallDataset: Story = {
  name: "Small Dataset",
  args: { page: 1, pageSize: 20, total: 8 },
  parameters: {
    docs: {
      description: { story: "All items fit in one page — all nav buttons disabled." },
    },
  },
}
