/**
 * CaterSwitch stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=129-357
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { CaterSwitch } from "@/components/ui/cater-switch"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Switch",
  component: CaterSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Cater Switch** is the two-state on/off toggle. Use it for boolean preferences that take effect immediately.

### Sizes
| Size | Track | Thumb | Padding |
|---|---|---|---|
| \`sm\` | 32 × 20 px | 16 px | 2 px |
| \`md\` | 38 × 24 px | 19 px | 2.4 px |

### States
- **Default** — interactive \`<button>\`
- **Hover** — slightly darker track
- **Pressed** — Salem-100 focus ring (\`#ceecda\`)
- **Disabled** — rendered as \`<div>\`, muted grey, no pointer

### Usage
\`\`\`tsx
import { CaterSwitch } from "@/components/ui/cater-switch"

const [on, setOn] = React.useState(false)
<CaterSwitch checked={on} onCheckedChange={setOn} size="sm" />
\`\`\`

### Do / Don't
- **Do** use for settings that apply immediately (notifications, dark mode)
- **Don't** use where explicit form submission is needed — use \`Checkbox\` instead

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`checked\` | \`boolean\` | — | Switch=On/Off |
| \`defaultChecked\` | \`boolean\` | \`false\` | — |
| \`onCheckedChange\` | \`(checked: boolean) => void\` | — | — |
| \`size\` | \`"sm" \\| "md"\` | \`"sm"\` | Size |
| \`disabled\` | \`boolean\` | \`false\` | State=Disabled |
| \`className\` | \`string\` | — | — |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--color-border-default\` | \`#d9dde4\` | Track Off — default |
| \`--color-border-darker\` | \`#d0d5dd\` | Track Off — hover |
| \`--cater-green-950\` | \`#073d30\` | Track On — default (Sherwood Green) |
| \`--salem-700\` | \`#067e39\` | Track On — hover |
| \`--color-surface-disabled\` | \`#f1f2f5\` | Track — disabled (both states) |
| \`--salem-100\` | \`#ceecda\` | Focus ring (pressed state) |
| \`--white\` | \`#ffffff\` | Thumb background |
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [checked, setChecked] = React.useState(context.args.checked ?? false)
      return (
        <Story args={{ ...context.args, checked, onCheckedChange: setChecked }} />
      )
    },
  ],
  argTypes: {
    size:    { control: "radio", options: ["sm", "md"], description: "Track + thumb size" },
    checked: { control: "boolean", description: "On/off state" },
    disabled:{ control: "boolean", description: "Disables interaction" },
    onCheckedChange: { action: "onCheckedChange", description: "Fires with new boolean on toggle" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaterSwitch>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: { checked: false, size: "sm", disabled: false },
  parameters: {
    docs: { description: { story: "Click to toggle. Adjust size and disabled in Controls." } },
  },
}

// ─── All Sizes · Off ──────────────────────────────────────────────────────────

export const AllSizesOff: Story = {
  name: "All Sizes · Off",
  parameters: {
    docs: { description: { story: "Both sizes in the off (unchecked) state." } },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <CaterSwitch size="sm" checked={false} />
      <CaterSwitch size="md" checked={false} />
    </div>
  ),
}

// ─── All Sizes · On ───────────────────────────────────────────────────────────

export const AllSizesOn: Story = {
  name: "All Sizes · On",
  parameters: {
    docs: { description: { story: "Both sizes in the on (checked) state showing the tick icon." } },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <CaterSwitch size="sm" checked={true} />
      <CaterSwitch size="md" checked={true} />
    </div>
  ),
}

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  parameters: {
    docs: { description: { story: "Default, disabled off, and disabled on — showing all non-interactive states." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Labels row */}
      <div style={{ display: "flex", gap: 32, paddingLeft: 4 }}>
        {["Off", "On", "Disabled Off", "Disabled On"].map((label) => (
          <span key={label} style={{ fontSize: 12, color: "#68707c", width: 80, textAlign: "center" }}>{label}</span>
        ))}
      </div>
      {/* sm */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <CaterSwitch size="sm" checked={false} />
        <CaterSwitch size="sm" checked={true} />
        <CaterSwitch size="sm" checked={false} disabled />
        <CaterSwitch size="sm" checked={true}  disabled />
      </div>
      {/* md */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <CaterSwitch size="md" checked={false} />
        <CaterSwitch size="md" checked={true} />
        <CaterSwitch size="md" checked={false} disabled />
        <CaterSwitch size="md" checked={true}  disabled />
      </div>
    </div>
  ),
}

// ─── In Context ───────────────────────────────────────────────────────────────

export const InContext: Story = {
  name: "In Context",
  parameters: {
    layout: "padded",
    docs: { description: { story: "Switch used inside a settings row — the common real-world pattern." } },
  },
  render: () => {
    const [notifications, setNotifications] = React.useState(true)
    const [darkMode, setDarkMode]           = React.useState(false)
    const [marketing, setMarketing]         = React.useState(false)

    const rows: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }[] = [
      { label: "Order notifications",  desc: "Get notified when order status changes",  checked: notifications, onChange: setNotifications },
      { label: "Dark mode",            desc: "Switch the interface to dark theme",       checked: darkMode,      onChange: setDarkMode },
      { label: "Marketing emails",     desc: "Receive promotions and product updates",  checked: marketing,     onChange: setMarketing, disabled: true },
    ]

    return (
      <div style={{ width: 400, border: "1px solid rgba(217,221,228,0.5)", borderRadius: 8, overflow: "hidden" }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display:      "flex",
              alignItems:   "center",
              justifyContent: "space-between",
              padding:      "16px",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(217,221,228,0.5)" : "none",
              opacity:      row.disabled ? 0.5 : 1,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#29344a" }}>{row.label}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#68707c" }}>{row.desc}</p>
            </div>
            <CaterSwitch
              size="sm"
              checked={row.checked}
              onCheckedChange={row.onChange}
              disabled={row.disabled}
            />
          </div>
        ))}
      </div>
    )
  },
}
