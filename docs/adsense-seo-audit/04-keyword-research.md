# Phase 4 Audit & Technical Report: SEO Keyword Research & Search Intent Taxonomy

**Audited Domain:** `browsergames100.com`  
**Date:** October 24, 2026  
**Status:** ✅ Complete  
**Goal:** Map high-intent, policy-compliant search queries to specific site templates, preventing keyword cannibalisation and matching Google / LLM user intent.

---

## 1. Search Intent Classification Framework

For browser games, organic search intent divides into four distinct clusters. Previous attempts to optimize `browsergames100.com` relied on keyword stuffing (e.g. repeating "unblocked chromebook no download free" hundreds of times). Under current Google helpful content and AdSense guidelines, pages must target specific informational and navigational intents with genuine page substance.

| Intent Cluster | User Mindset / Query Pattern | Target Template / Landing Experience | Incremental Value Required |
| :--- | :--- | :--- | :--- |
| **Cluster A: Game Controls & Keybindings** | `"how to jump in slope", "retro bowl controls pc", "drift hunters manual clutch keys"` | `GamePage.tsx` (`#controls` section) | Structured table showing Action, Key, Device. Direct concise text for featured snippets. |
| **Cluster B: Device & School Compatibility** | `"browser games for chromebook", "unblocked games no download", "html5 games works on mac school"` | Homepage & dedicated Hub / Category pages | Hardware compatibility specifications, WebGL performance requirements, ChromeOS compatibility guide. |
| **Cluster C: Category & Curated Discovery** | `"free multiplayer io games", "best driving games browser", "logic puzzle games online"` | `CategoryPage.tsx` & `CategoriesPage.tsx` | Categorical curation, sub-genre breakdowns, device tags, editorial commentary. |
| **Cluster D: Troubleshooting & Technical Help** | `"html5 game black screen fix", "browser game no sound chromebook", "unblock webgl chrome"` | FAQ sections & Blog Articles | Exact 3-step actionable diagnostics, browser flag instructions, hardware acceleration toggle guides. |

---

## 2. High-Priority Keyword Tiers & Cannibalisation Prevention

### 2.1 Core Intent Clusters & Primary Targets

| Primary Keyword | Secondary / Long-Tail Variants | Target URL | Intent Type | SERP Feature Targeted |
| :--- | :--- | :--- | :--- | :--- |
| `free online browser games` | instant play games no download, web games for pc | `/` | Navigational / Commercial | SiteLinks, Search Box |
| `slope game controls` | how to steer in slope, slope game keys pc | `/game/slope` | Informational | Featured Snippet (Table / List) |
| `retro bowl unblocked online` | play retro bowl browser, retro bowl keyboard controls | `/game/retro-bowl` | Informational / Direct Play | VideoGame Rich Result |
| `run 3 browser game` | run 3 characters how to unlock, run 3 space tunnel tips | `/game/run-3` | Informational / Direct Play | VideoGame Rich Result |
| `action browser games` | free online action games, top action games html5 | `/category/action-games` | Curated Discovery | Category Hub Carousel |
| `racing browser games` | car driving games no download, free drifting games online | `/category/racing-games` | Curated Discovery | Category Hub Carousel |
| `puzzle browser games` | brain teaser online games, math logic games browser | `/category/puzzle-games` | Curated Discovery | Category Hub Carousel |
| `chromebook browser games guide` | best games for chromeos, how to fix lag on chromebook games | `/blog/chromebook-gaming-guide` | Informational Guide | Article Schema, People Also Ask |
| `fix browser game black screen` | webgl not working in chrome, html5 game won't load | `/blog/troubleshooting-html5-games` | Diagnostic / AEO | Direct Answer Answer Box |

### 2.2 Cannibalisation Prevention Strategy
1. **Homepage vs Categories**: The homepage targets broad head terms (`browser games`, `free online games`). Category pages (`/category/racing-games`) specifically own the sub-vertical modifiers (`car`, `drift`, `track`, `racing`).
2. **Category vs Individual Games**: Category pages never attempt to rank for single-game control queries (`slope controls`). They provide high-level summaries and aggregate listings. Individual game pages exclusively target their title + gameplay/controls queries.
3. **No Phantom Landing Pages**: In Phase 2, we set `noindex` on pseudo-doorway filters (`/landing`, `/search`, `/favorites`) to ensure Googlebot crawls only high-value canonical entities.

---

## 3. SERP & Featured Snippet Optimization (AEO Ready)

Google Answer Boxes and LLM engine queries (Search Generative Experience / Perplexity / Gemini) favor structured, extractable answers.

### Example A: Direct Controls Answer Snippet
```
Query: "What are the controls for Slope?"
Answer Target:
"To play Slope on BrowserGames100, use the Left and Right Arrow Keys or the A and D keys on your keyboard to steer your ball. Press Esc or P to pause."
```

### Example B: Compatibility Answer Snippet
```
Query: "Do HTML5 browser games work on Chromebooks?"
Answer Target:
"Yes. All HTML5 and WebGL browser games on BrowserGames100 run natively on ChromeOS without requiring extensions, Flash plugins, or software downloads."
```
