import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
// Tailwind v4: cukup daftarin plugin di sini. Udah ga perlu
// tailwind.config.js / postcss.config.js lagi.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
