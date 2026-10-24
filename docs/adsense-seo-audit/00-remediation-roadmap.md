# Phase 0 — Remediation Roadmap & Execution Plan
**BrowserGames100.com — Step-by-Step Path to AdSense Readiness & Organic Value**

---

## 1. Remediation Philosophy

Per the non-negotiable engineering rules:
- **No speculative or mass AI generation**: Content will be factual, verified, and transparent.
- **Incremental changes with checkpoints**: No massive refactor without verification and explicit user approval.
- **No data loss**: Existing valid games, valid URLs, and CMS database posts are preserved.
- **AdSense Policy & Google Search Essentials alignment**: Compliance first, eliminating deceptive signals, doorway pages, and fake schema.

---

## 2. Phase-by-Phase Roadmap

### Phase 1 — Comprehensive Content and Page Inventory
- **Goal**: Classify every public route into an operational catalog.
- **Key Deliverables**:
  - `docs/adsense-seo-audit/01-content-audit.md`
  - `docs/adsense-seo-audit/01-page-inventory.csv`
  - Repeatable audit script (`scripts/audit-inventory.cjs`) reporting URL, template, HTTP status, canonical, indexability, game status, and duplicate group.
- **Checkpoint**: User review and approval of the page inventory and classification breakdown.

### Phase 2 — Remediate Low-Value Content & Deceptive Claims
- **Goal**: Eliminate confirmed policy violations across existing templates.
- **Key Actions**:
  - **Sanitize Homepage Claims**: Replace fabricated "2M+ players", "4.9 rating", and "hand-tested safety" claims with truthful statements describing the platform's actual features and catalog.
  - **Remove Leftover Brand References**: Fix `support@cloudplayhub.com` and `ugz_sticky_ad_dismissed` legacy remnants.
  - **Disable Context-Menu Blocking**: Remove right-click prevention in `ScraperShield.tsx` to restore standard browser accessibility.
  - **Prune Phantom Categories**: Remove the 8 empty pseudo-categories from `public/data/categories.json` that lack JSON files and duplicate the initial 48 games.
  - **Doorway Consolidation**: Set `noindex, follow` on thin keyword doorway routes (`/play-html5-games`, `/free-browser-games`, `/cloud-gaming-unblocked`, `/poki-alternative`, `/unblocked-racing-games`) or prepare clean 301 redirects to canonical category hubs.
  - **Secure Secrets**: Sanitize `server/.env` and update `.gitignore` so production database passwords are never exposed.
- **Checkpoint**: Verification that all deceptive text, fake metrics, and broken routes have been resolved.

### Phase 3 — Build an Original Game Content & Metadata System
- **Goal**: Transform game-detail pages from thin external containers into genuine player resources.
- **Key Actions**:
  - Design an enhanced game content model supporting verified controls, gameplay objectives, tested strategies, device compatibility, and licensing/attribution details.
  - Upgrade `GamePage.tsx` shared template:
    - Display verified controls (mouse, keyboard, touch) where documented.
    - Provide concise, accurate instructions.
    - Add a functional "Report Broken Game" / feedback mechanism.
    - Remove hardcoded ratings and fabricated review counts.
    - Ensure clean fallback when game details are incomplete.
- **Checkpoint**: Test representative games across different genres on desktop and mobile.

### Phase 4 — SEO Research & Content Strategy
- **Goal**: Evidence-based search strategy focused on real player intent.
- **Key Deliverables**:
  - `docs/adsense-seo-audit/04-keyword-research.md`
  - `docs/adsense-seo-audit/04-keyword-map.csv`
  - `docs/adsense-seo-audit/04-content-roadmap.md`
- **Key Actions**:
  - Map genuine player search intent (finding specific game controls, troubleshooting load issues, genre discovery) without fabricating search volumes.
  - Assign single primary intent to each canonical URL to prevent keyword cannibalisation.
- **Checkpoint**: User review of keyword map and topic cluster strategy.

### Phase 5 — SEO-Optimised Content Implementation
- **Goal**: Clean on-page SEO across all canonical templates.
- **Key Actions**:
  - Fix title tag templates (eliminate duplicate `| BrowserGames100` appended twice).
  - Write unique, accurate meta descriptions for all canonical routes.
  - Ensure canonical tags strictly match self-referential canonical URLs.
  - Strengthen internal link architecture linking games to real categories, guides to games, and related games with shared tags.
- **Checkpoint**: Automated crawl verification of titles, descriptions, and canonicals.

### Phase 6 — AEO (Answer Engine Optimization)
- **Goal**: Make game rules, controls, and troubleshooting directly answerable.
- **Key Actions**:
  - Structure direct, factual answers at the top of game guides and top games:
    - What are the exact keys to play?
    - How does the scoring system work?
    - Does this game support touchscreens?
    - What should a player do if the game displays a black screen?
  - Deliverable: `docs/adsense-seo-audit/06-aeo-strategy.md` and automated AEO content validation checks.
- **Checkpoint**: Verification that answers are factual, concise, and non-generic.

### Phase 7 — GEO (Generative Engine Optimization)
- **Goal**: Machine readability, source transparency, and entity clarity for generative search systems.
- **Key Actions**:
  - Clarify site role as an aggregator and embedder of licensed/distributor HTML5 games.
  - Attribute game developers and distributor sources where provided in feed data.
  - Avoid AI content traps (no fake author personas, no synthetic date gaming, no keyword stuffing).
  - Deliverable: `docs/adsense-seo-audit/07-geo-strategy.md`.
- **Checkpoint**: Entity clarity and citation audit across sample guides.

### Phase 8 — Structured Data & Search Presentation Audit
- **Goal**: 100% policy-compliant Schema.org markup.
- **Key Actions**:
  - **Remove Deceptive Schema**: Strip fabricated `AggregateRating` and canned boilerplate `FAQPage` from `GamePage.tsx`.
  - Validate `WebSite`, `Organization`, `BreadcrumbList`, and `VideoGame` schemas against Google Rich Results standards.
  - Implement genuine `Article` schema for editorial blog guides.
- **Checkpoint**: Syntax and eligibility validation using Google Structured Data guidelines.

### Phase 9 — Technical SEO & Indexing Infrastructure
- **Goal**: Ensure search engine bots crawl and index only intended, high-value pages.
- **Key Actions**:
  - **Sitemap Optimization**: Rebuild `generate-sitemap.cjs` to exclude the 28k thin raw records. Limit `sitemap-games.xml` to verified, enriched game titles with original descriptions and controls.
  - Update `robots.txt`: Remove redundant sub-sitemap declarations (keep main `sitemap.xml` index) and evaluate `Crawl-delay: 5` impact.
  - Address SPA crawler rendering: Implement lightweight pre-rendering or dynamic meta-tag generation on the Node.js server for crawlers.
- **Checkpoint**: Validate sitemap XML syntax and crawler accessibility.

### Phase 10 — Homepage and Category Experience
- **Goal**: Make the homepage and category pages premium, trustworthy discovery hubs.
- **Key Actions**:
  - Upgrade homepage layout to reflect genuine curated game collections and accurate counts.
  - Enhance category pages with real genre descriptions, sorting, and game counts matching actual data.
- **Checkpoint**: Visual and responsive design review across desktop, tablet, and mobile.

### Phase 11 — Trust, Privacy, Licensing & AdSense Alignment
- **Goal**: Absolute compliance with Google AdSense Site Readiness policies.
- **Key Actions**:
  - **Reconcile AdSense Publisher ID**: Confirm whether `pub-7316477328258550` or `pub-3506447122776682` is the active, approved AdSense account and synchronize `public/ads.txt`, `index.html`, and `AdPlacement.tsx`.
  - Update `AboutUs.tsx` with genuine publisher mission, true team description, and real operational policies.
  - Audit `ContactUs.tsx` to guarantee working submission handling with direct email fallback.
  - Audit `PrivacyPolicy.tsx` to ensure complete disclosure of Google AdSense, Consent Mode v2, and GameMonetize third-party cookies.
- **Checkpoint**: Human policy review against Google AdSense Site Readiness Checklist.

### Phase 12-17 — Testing, Deployment, and Final Readiness Report
- **Goal**: Build regression tests, staging verification, and production submission preparation.
- **Key Actions**:
  - Implement automated test suite covering SEO invariants, schema validity, route integrity, and build checks.
  - Controlled deployment with rollback plan and zero downtime.
  - Create final readiness evaluation (`docs/adsense-seo-audit/17-final-readiness-report.md`) with explicit status: `READY FOR MANUAL REVIEW` or `NOT READY`.

---

## 3. High-Priority Decision Required Before Proceeding

> [!IMPORTANT]
> **AdSense Publisher ID Confirmation**:
> The live production site at `https://browsergames100.com/ads.txt` is currently configured for:
> **`pub-7316477328258550`**
> However, the local repository contains:
> **`pub-3506447122776682`**
>
> We must confirm which publisher ID corresponds to your actual Google AdSense account before modifying or building any ad integration files.
