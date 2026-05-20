import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TokenGroupHeading, TypographyRow, CopyButton, type TypographyToken } from './token-utils'

const meta = {
  title: 'Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Typography tokens from the Cater Figma design system.

**Font Families**
- \`--font-title\` → **General Sans** — headings (H1–Headline)
- \`--font-body\` → **Inter** — body copy, captions, UI labels

**Usage in Tailwind:**
\`\`\`tsx
// Heading
<h1 className="text-5xl font-semibold" style={{ fontFamily: 'var(--font-title)' }}>

// Body
<p className="text-base font-medium" style={{ fontFamily: 'var(--font-body)' }}>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SAMPLE = 'The quick brown fox jumps over the lazy dog'

const headingTokens: TypographyToken[] = [
  {
    name: 'H1 / Regular',
    cssVar: '--font-title',
    sample: 'H1 — Catering made easy',
    family: 'General Sans',
    size: '61px',
    weight: '600',
    lineHeight: '1.2',
    letterSpacing: '-2px',
    tailwind: 'text-[61px] font-semibold tracking-[-2px]',
  },
  {
    name: 'H2 / Regular',
    cssVar: '--font-title',
    sample: 'H2 — Order smarter today',
    family: 'General Sans',
    size: '49px',
    weight: '600',
    lineHeight: '1.2',
    letterSpacing: '-2px',
    tailwind: 'text-[49px] font-semibold tracking-[-2px]',
  },
  {
    name: 'H4 / Regular',
    cssVar: '--font-title',
    sample: 'H4 — Restaurant partners',
    family: 'General Sans',
    size: '31px',
    weight: '600',
    lineHeight: '1.2',
    letterSpacing: '-2px',
    tailwind: 'text-[31px] font-semibold tracking-[-2px]',
  },
  {
    name: 'Headline / Regular',
    cssVar: '--font-title',
    sample: 'Headline — Today\'s top picks',
    family: 'General Sans',
    size: '25px',
    weight: '600',
    lineHeight: '1.2',
    letterSpacing: '-2px',
    tailwind: 'text-[25px] font-semibold tracking-[-2px]',
  },
]

const bodyTokens: TypographyToken[] = [
  {
    name: 'Body / Regular',
    cssVar: '--font-title',
    sample: SAMPLE,
    family: 'General Sans',
    size: '20px',
    weight: '600',
    lineHeight: '1.5',
    letterSpacing: '1px',
    tailwind: 'text-xl font-semibold',
  },
  {
    name: 'Body / Light',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '20px',
    weight: '500',
    lineHeight: '1.2',
    tailwind: 'text-xl font-medium',
  },
  {
    name: 'Body / Bold',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '20px',
    weight: '700',
    lineHeight: '1.2',
    tailwind: 'text-xl font-bold',
  },
]

const subtitleTokens: TypographyToken[] = [
  {
    name: 'Subtitle / Regular',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '16px',
    weight: '500',
    lineHeight: '1.5',
    letterSpacing: '-1px',
    tailwind: 'text-base font-medium',
  },
  {
    name: 'Subtitle / Medium',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '16px',
    weight: '600',
    lineHeight: '1.5',
    tailwind: 'text-base font-semibold',
  },
  {
    name: 'Subtitle / Bold',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '16px',
    weight: '700',
    lineHeight: '1.5',
    tailwind: 'text-base font-bold',
  },
  {
    name: 'Subtitle / Light',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '16px',
    weight: '400',
    lineHeight: '1.5',
    letterSpacing: '1px',
    tailwind: 'text-base font-normal',
  },
  {
    name: 'Subtitle2 / Regular',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '14px',
    weight: '500',
    lineHeight: '1.5',
    tailwind: 'text-sm font-medium',
  },
  {
    name: 'Subtitle2 / Medium',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '14px',
    weight: '600',
    lineHeight: '1.5',
    tailwind: 'text-sm font-semibold',
  },
  {
    name: 'Subtitle2 / Light',
    cssVar: '--font-body',
    sample: SAMPLE,
    family: 'Inter',
    size: '14px',
    weight: '400',
    lineHeight: '1.5',
    tailwind: 'text-sm font-normal',
  },
]

const captionTokens: TypographyToken[] = [
  {
    name: 'Caption / Regular',
    cssVar: '--font-body',
    sample: 'Caption text for labels and tags',
    family: 'Inter',
    size: '13px',
    weight: '600',
    lineHeight: '1.44',
    tailwind: 'text-[13px] font-semibold',
  },
  {
    name: 'Caption / Bold',
    cssVar: '--font-body',
    sample: 'Caption text for labels and tags',
    family: 'Inter',
    size: '13px',
    weight: '700',
    lineHeight: '1.2',
    letterSpacing: '-2px',
    tailwind: 'text-[13px] font-bold',
  },
  {
    name: 'Caption / Light',
    cssVar: '--font-body',
    sample: 'Caption text for labels and tags',
    family: 'Inter',
    size: '13px',
    weight: '400',
    lineHeight: '1.5',
    letterSpacing: '-1px',
    tailwind: 'text-[13px] font-normal',
  },
  {
    name: 'Footnote / Light',
    cssVar: '--font-body',
    sample: 'Footnote · Legal · Fine print',
    family: 'Inter',
    size: '10px',
    weight: '400',
    lineHeight: '1.2',
    letterSpacing: '3px',
    tailwind: 'text-[10px] font-normal tracking-[3px]',
  },
]

export const Headings: Story = {
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Headings"
        description="General Sans — used for all display and heading sizes. Requires the General Sans font to be loaded."
        count={headingTokens.length}
      />
      <div className="space-y-3">
        {headingTokens.map((t) => <TypographyRow key={t.name} token={t} />)}
      </div>
    </div>
  ),
}

export const BodyText: Story = {
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Body"
        description="Body text uses General Sans (semibold) or Inter (medium/bold)."
        count={bodyTokens.length}
      />
      <div className="space-y-3">
        {bodyTokens.map((t) => <TypographyRow key={t.name} token={t} />)}
      </div>
    </div>
  ),
}

export const Subtitles: Story = {
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Subtitles"
        description="Inter — used for UI labels, form fields, descriptions, and secondary text."
        count={subtitleTokens.length}
      />
      <div className="space-y-3">
        {subtitleTokens.map((t) => <TypographyRow key={t.name} token={t} />)}
      </div>
    </div>
  ),
}

export const CaptionsAndFootnotes: Story = {
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Captions & Footnotes"
        description="Small text for tags, badges, legal copy, and helper text."
        count={captionTokens.length}
      />
      <div className="space-y-3">
        {captionTokens.map((t) => <TypographyRow key={t.name} token={t} />)}
      </div>
    </div>
  ),
}

export const FontFamilies: Story = {
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading title="Font Families" description="Two font families define the Cater type system." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            name: 'General Sans',
            cssVar: '--font-title',
            role: 'Headings & Display',
            sample: 'Aa Bb Cc Dd Ee Ff',
            note: 'Used for H1–H4, Headline, Body/Regular',
          },
          {
            name: 'Inter',
            cssVar: '--font-body',
            role: 'Body & UI',
            sample: 'Aa Bb Cc Dd Ee Ff',
            note: 'Used for Subtitle, Caption, Footnote, all UI text',
          },
        ].map((f) => (
          <div key={f.cssVar} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{f.role}</p>
                <p
                  className="text-4xl font-semibold mt-1"
                  style={{ fontFamily: f.cssVar === '--font-title' ? 'var(--font-title)' : 'var(--font-body)' }}
                >
                  {f.name}
                </p>
              </div>
              <CopyButton value={`font-family: var(${f.cssVar})`} label="copy CSS" />
            </div>
            <p
              className="text-2xl text-muted-foreground"
              style={{ fontFamily: f.cssVar === '--font-title' ? 'var(--font-title)' : 'var(--font-body)' }}
            >
              {f.sample}
            </p>
            <p className="text-xs text-muted-foreground border-t border-border pt-3">{f.note}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
