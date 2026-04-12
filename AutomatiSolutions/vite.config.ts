import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  unlinkSync,
} from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Extra HTML entry points under `public/` are emitted under `dist/public/...` after
 * Rollup processes them. Copy them to the matching path under `dist/` so deploys match
 * URLs like `/products/phreepet` (nginx: try_files $uri $uri/ → …/index.html).
 */
const ogHtmlRelPaths = [
  "products/phreepet/index.html",
  "products/phreepet/privacy-policy/index.html",
  "services/digital-presence/index.html",
] as const

function promotePublicOgHtml(): Plugin {
  let outDir = resolve(__dirname, "dist")
  return {
    name: "promote-public-og-html",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      for (const rel of ogHtmlRelPaths) {
        const processed = join(outDir, "public", rel)
        const rootOut = join(outDir, rel)
        if (existsSync(processed)) {
          mkdirSync(dirname(rootOut), { recursive: true })
          copyFileSync(processed, rootOut)
          unlinkSync(processed)
        }
      }
      const publicNested = join(outDir, "public")
      if (!existsSync(publicNested)) return
      const removeEmptyDirs = (dir: string): void => {
        const entries = readdirSync(dir, { withFileTypes: true })
        for (const e of entries) {
          if (e.isDirectory()) removeEmptyDirs(join(dir, e.name))
        }
        if (readdirSync(dir).length === 0) rmdirSync(dir)
      }
      removeEmptyDirs(publicNested)
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
        phreepet: resolve(__dirname, "public/products/phreepet/index.html"),
        "phreepet-privacy-policy": resolve(
          __dirname,
          "public/products/phreepet/privacy-policy/index.html",
        ),
        "digital-presence": resolve(
          __dirname,
          "public/services/digital-presence/index.html",
        ),
      },
    },
  },
})
