import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="font-sans bg-background text-foreground min-h-screen p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'subtle', value: '#fafbfc' },
        { name: 'dark', value: '#101828' },
      ],
    },
  },
};

export default preview;