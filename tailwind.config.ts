import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'gray-dark': '#212121',
        'gray-medium': '#666666',
        'gray-light': '#E0E0E0',
        'gray-background': '#EFEFEF',
        'pokemon-red': '#DC0A2D',
      },
      boxShadow: {
        'drop-2': '0 1px 3px 1px rgba(0, 0, 0, 0.2)',
        'drop-6': '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
        'inner-2': 'inset 0 1px 3px 1px rgba(0, 0, 0, 0.2)',
      },
      fontSize: {
        'headline': ['2rem', { lineHeight: '2rem', fontWeight: '700' }],
        'headline-sm': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'subtitle-1': ['0.875rem', { lineHeight: '1rem', fontWeight: '700' }],
        'subtitle-2': ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
        'subtitle-3': ['0.625rem', { lineHeight: '1rem', fontWeight: '700' }],
        'body-1': ['0.875rem', { lineHeight: '1rem', fontWeight: '400' }],
        'body-2': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'body-3': ['0.625rem', { lineHeight: '1rem', fontWeight: '400' }],
        'caption': ['0.5rem', { lineHeight: '0.75rem', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
export default config;

