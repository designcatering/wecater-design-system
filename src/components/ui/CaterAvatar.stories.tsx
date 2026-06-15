/**
 * CaterAvatar stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5428-14868
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CaterAvatar } from "@/components/ui/cater-avatar"
import type { AvatarSize, AvatarColor, AvatarType } from "@/components/ui/cater-avatar"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Avatar",
  component: CaterAvatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Cater Avatar** is a circular user identity element used across the WeCater marketplace —
in headers, sidebars, comment threads, and any context that needs to represent a user.

### Types
| Type | Description |
|---|---|
| \`icon\` | User silhouette icon — default placeholder before a profile photo is set |
| \`initials\` | Uppercase letter(s) — displayed when the user has set their name |

### Color variants
| Color | Background | Foreground |
|---|---|---|
| \`no-color\` | \`#d9dde4\` (Border/Default) | \`#68707c\` (Text/Subtitle) |
| \`withcolor\` | \`#ccf8b9\` (Gossip) | \`#073d30\` (Sherwood Green) |

### Sizes
Six sizes: **16 · 24 · 32 · 40 · 48 · 64** px. The default is \`40\`.
Initials font scales proportionally with the container.

### Usage
\`\`\`tsx
import { CaterAvatar } from "@/components/ui/cater-avatar"

// Icon (default)
<CaterAvatar size="40" color="withcolor" />

// Initials
<CaterAvatar type="initials" initials="PS" size="40" color="withcolor" />
\`\`\`

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`type\` | \`"icon" \\| "initials"\` | \`"icon"\` | Type |
| \`size\` | \`"16" \\| "24" \\| "32" \\| "40" \\| "48" \\| "64"\` | \`"40"\` | Size |
| \`color\` | \`"no-color" \\| "withcolor"\` | \`"no-color"\` | Color |
| \`initials\` | \`string\` | — | — |
| \`className\` | \`string\` | — | — |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--color-border-default\` | \`#d9dde4\` | no-color background |
| \`--color-text-subtitle\` | \`#68707c\` | no-color icon / initials |
| \`--cater-gossip-200\` | \`#ccf8b9\` | withcolor background |
| \`--cater-green-950\` | \`#073d30\` | withcolor icon / initials (Sherwood Green) |
        `,
      },
    },
  },

  argTypes: {
    type: {
      control: "select",
      options: ["icon", "initials"],
      description: "Render a silhouette icon or text initials",
      table: { defaultValue: { summary: "icon" } },
    },
    color: {
      control: "select",
      options: ["no-color", "withcolor"],
      description: "Background / foreground colour pair",
      table: { defaultValue: { summary: "no-color" } },
    },
    size: {
      control: "select",
      options: ["16", "24", "32", "40", "48", "64"],
      description: "Diameter in pixels",
      table: { defaultValue: { summary: "40" } },
    },
    initials: {
      control: "text",
      description: "1-2 character string shown when type is 'initials'",
      table: { defaultValue: { summary: "M" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaterAvatar>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    type: "initials",
    color: "withcolor",
    size: "40",
    initials: "PS",
  },
  parameters: {
    docs: {
      description: {
        story: "Fully interactive. Use the Controls panel to switch type, color, size, and initials.",
      },
    },
  },
}

// ─── All Sizes · Icon ─────────────────────────────────────────────────────────

const SIZES: AvatarSize[] = ["16", "24", "32", "40", "48", "64"]

export const IconSizes: Story = {
  name: "Icon · All Sizes",
  args: { type: "icon", color: "no-color" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Icon type across all six sizes — both colour variants side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {(["no-color", "withcolor"] as AvatarColor[]).map((color) => (
        <div key={color} className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#68707c" }}>
            {color === "no-color" ? "No Color" : "With Color"}
          </p>
          <div className="flex items-end gap-4">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CaterAvatar type="icon" color={color} size={size} />
                <span className="text-[10px]" style={{ color: "#68707c" }}>{size}px</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── All Sizes · Initials ─────────────────────────────────────────────────────

export const InitialsSizes: Story = {
  name: "Initials · All Sizes",
  args: { type: "initials", initials: "M", color: "no-color" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Initials type across all six sizes — both colour variants. Font scales proportionally per Figma spec.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {(["no-color", "withcolor"] as AvatarColor[]).map((color) => (
        <div key={color} className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#68707c" }}>
            {color === "no-color" ? "No Color" : "With Color"}
          </p>
          <div className="flex items-end gap-4">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CaterAvatar type="initials" initials="M" color={color} size={size} />
                <span className="text-[10px]" style={{ color: "#68707c" }}>{size}px</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Color Variants ───────────────────────────────────────────────────────────

export const ColorVariants: Story = {
  name: "Color Variants",
  args: { type: "initials", initials: "PS", size: "40" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Both colour variants at 40px — icon and initials types.",
      },
    },
  },
  render: () => (
    <div className="flex gap-10 p-6">
      {(["no-color", "withcolor"] as AvatarColor[]).map((color) => (
        <div key={color} className="flex flex-col items-center gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#68707c" }}>
            {color === "no-color" ? "No Color" : "With Color"}
          </p>
          <div className="flex items-center gap-4">
            {(["icon", "initials"] as AvatarType[]).map((type) => (
              <CaterAvatar
                key={type}
                type={type}
                color={color}
                size="40"
                initials="PS"
              />
            ))}
          </div>
          <div className="flex gap-4">
            <span className="text-[10px]" style={{ color: "#68707c" }}>icon</span>
            <span className="text-[10px]" style={{ color: "#68707c" }}>initials</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Full Grid ────────────────────────────────────────────────────────────────

export const FullGrid: Story = {
  name: "Full Grid",
  args: { type: "icon", color: "no-color", size: "40" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All combinations: type × color × size — mirrors the Figma reference sheet.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-6" style={{ backgroundColor: "#f4f6f8" }}>
      {(["icon", "initials"] as AvatarType[]).map((type) =>
        (["no-color", "withcolor"] as AvatarColor[]).map((color) => (
          <div key={`${type}-${color}`} className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#68707c" }}>
              {type} · {color === "no-color" ? "No Color" : "With Color"}
            </p>
            <div className="flex items-end gap-4">
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <CaterAvatar
                    type={type}
                    color={color}
                    size={size}
                    initials="M"
                  />
                  <span className="text-[10px]" style={{ color: "#68707c" }}>{size}px</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  ),
}

// ─── API Reference ────────────────────────────────────────────────────────────

export const APIReference: Story = {
  name: "API Reference",
  args: { type: "initials", initials: "PS", size: "40", color: "withcolor" },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: `
### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`type\` | \`"icon" \\| "initials"\` | \`"icon"\` | Silhouette icon or text initials |
| \`color\` | \`"no-color" \\| "withcolor"\` | \`"no-color"\` | Background/foreground colour pair |
| \`size\` | \`"16" \\| "24" \\| "32" \\| "40" \\| "48" \\| "64"\` | \`"40"\` | Diameter in pixels |
| \`initials\` | \`string\` | \`"M"\` | Shown when type is \`"initials"\` (1–2 chars) |

---

### Design tokens

| Token | Value | Usage |
|---|---|---|
| \`--color-border-default\` | \`#d9dde4\` | no-color background |
| \`--cater-gossip\` | \`#ccf8b9\` | withcolor background |
| \`--color-text-subtitle\` | \`#68707c\` | no-color foreground |
| \`--cater-green-800\` | \`#073d30\` | withcolor foreground (Sherwood) |
        `,
      },
    },
  },
}
