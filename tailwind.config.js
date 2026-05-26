/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          bg:       '#0d0d14',
          surface:  '#16161f',
          elevated: '#1e1e2a',
          border:   '#2a2a3d',
          text:     '#e8e6f0',
          muted:    '#8b8a9e',
          dim:      '#4a4a63',
        },
      },
    },
  },
  plugins: [],
}
