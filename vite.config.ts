import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let componentTagger = null;
  if (mode === "development") {
    try {
      // Dynamic import for development tool
      componentTagger = require("lovable-tagger")?.componentTagger;
    } catch {
      // Ignore if componentTagger is not installed in production
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), componentTagger && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    sourcemap: false,                    // No source maps in prod — saves ~40% bundle transfer
    cssCodeSplit: true,                  // Split CSS per chunk — only load what the page needs
    chunkSizeWarningLimit: 800,
    minify: 'esbuild',
    target: 'es2018',
    assetsInlineLimit: 4096,             // Inline assets < 4KB as base64 (saves HTTP round-trips)
    reportCompressedSize: false,         // Speeds up build (no gzip measurement during build)
    rollupOptions: {
      output: {
        // Stable hashes — browser caches vendor chunks across deploys
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          // Core React — most stable, cache indefinitely
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // Helmet (SEO) — small, stable
          if (id.includes('node_modules/react-helmet-async')) {
            return 'seo';
          }
          // TanStack Query
          if (id.includes('node_modules/@tanstack')) {
            return 'query';
          }
          // Radix UI — large but stable
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          // Lucide icons — tree-shaken per import
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Heavy utility libs rarely used (only loaded on demand)
          if (id.includes('node_modules/recharts') || id.includes('node_modules/react-day-picker')) {
            return 'charts';
          }
          // Next-themes, sonner, vaul, embla, etc. — small UI utilities
          if (
            id.includes('node_modules/next-themes') ||
            id.includes('node_modules/sonner') ||
            id.includes('node_modules/vaul') ||
            id.includes('node_modules/embla-carousel')
          ) {
            return 'ui-utils';
          }
        }
      }
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],       // Strip all console.log in production
    legalComments: 'none',               // Remove license comments from output
    target: 'es2018',
  },
};
});
