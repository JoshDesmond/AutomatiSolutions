import { copyFileSync, existsSync, readdirSync, rmdirSync, unlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * `public/*.html` is copied to `dist/` verbatim before Rollup runs, so unprocessed
 * `/src/main.tsx` would ship at `dist/phreepet.html`. Rollup emits the real bundle
 * under `dist/public/`. Promote those built files to `dist/` root.
 */
function promotePublicOgHtml(): Plugin {
  const names = ['phreepet.html', 'digital-presence.html'] as const
  let outDir = resolve(__dirname, 'dist')
  return {
    name: 'promote-public-og-html',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      for (const name of names) {
        const processed = join(outDir, 'public', name)
        const rootOut = join(outDir, name)
        if (existsSync(processed)) {
          copyFileSync(processed, rootOut)
          unlinkSync(processed)
        }
      }
      const publicNested = join(outDir, 'public')
      if (existsSync(publicNested) && readdirSync(publicNested).length === 0) {
        rmdirSync(publicNested)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), promotePublicOgHtml()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        phreepet: resolve(__dirname, "public/phreepet.html"),
        "digital-presence": resolve(__dirname, "public/digital-presence.html"),
      },
    },
  },
})
