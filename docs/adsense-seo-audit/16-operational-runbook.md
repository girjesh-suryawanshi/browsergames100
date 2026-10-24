# Phase 16 Audit & Technical Report: Operational Runbook & Ongoing Maintenance

**Audited Domain:** `browsergames100.com`  
**Date:** October 24, 2026  
**Status:** ✅ Complete & Established  
**Goal:** Provide clear, repeatable Standard Operating Procedures (SOPs) for site maintenance, adding new verified games, and handling policy reviews.

---

## 1. SOP: Adding a New Verified Game to the Catalog

1. **Verify Playability**:
   - Open game in desktop Chrome and ChromeOS/Chromebook simulator. Confirm WebGL canvas renders in under 5 seconds without audio buzzing or pop-under redirects.
2. **Document Controls**:
   - Record exact keybindings for keyboard, mouse, and touchscreen.
3. **Draft Deep-Dive Description**:
   - In [`src/data/game-descriptions.ts`](file:///f:/reactworkspace/browsergames100/src/data/game-descriptions.ts), add a new entry:
     ```ts
     "game-slug": {
       about: "<p>Original substantive 150+ word overview...</p>",
       howToPlay: "Detailed movement and objective guide...",
       tips: [
         "Tip 1...",
         "Tip 2...",
         "Tip 3...",
       ]
     }
     ```
4. **Regenerate Sitemaps**:
   - Run: `node generate-sitemap.cjs`
5. **Run Regression Invariants**:
   - Run: `npm.cmd test -- --run`
   - Confirm 9/9 tests pass before deploying.

---

## 2. SOP: Processing a DMCA / Copyright Notice

1. **Receipt**: Notice arrives at `dmca@browsergames100.com` or via Contact form.
2. **Review**: Confirm the notice specifies:
   - The copyrighted work claimed to be infringed.
   - The exact URL on `browsergames100.com/game/{slug}`.
   - Contact info of the complainant and a statement under penalty of perjury.
3. **Takedown Action**:
   - Within 48 hours, locate the game in `public/data/slug-map.json` and respective `cat-*.json` files.
   - Remove or replace the iframe URL with an offline notice.
   - Re-run sitemap generator.
   - Send polite confirmation to the copyright holder.

---

## 3. SOP: Re-enabling AdSense After Approval

Once Google AdSense approves the site:
1. In [`src/components/AdPlacement.tsx`](file:///f:/reactworkspace/browsergames100/src/components/AdPlacement.tsx):
   - Set `const AD_CLIENT = "ca-pub-7316477328258550";`
   - Map real AdSense unit IDs into `SLOT_MAP`.
2. In `index.html`:
   - Uncomment the AdSense bootstrap script tag:
     ```html
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7316477328258550" crossorigin="anonymous"></script>
     ```
3. Run `npm.cmd test -- --run` to ensure zero regressions.
