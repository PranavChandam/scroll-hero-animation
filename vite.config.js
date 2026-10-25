import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset paths relative, so it works on any GitHub Pages repo name
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
