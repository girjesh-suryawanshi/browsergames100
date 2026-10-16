import { useEffect, useRef, useId } from "react";
import { useLocation } from "react-router-dom";

interface AdPlacementProps {
  size?: "728x90" | "300x250" | "320x100" | "970x90" | "320x50";
  className?: string;
  slot?: string;
  sticky?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// ─── AdSense Publisher ID ───────────────────────────────────────────────────
// IMPORTANT: AdSense scripts have been removed from index.html pending approval.
// After your AdSense account is approved:
//   1. Uncomment the line below (replace AD_CLIENT)
//   2. Re-enable the scripts in index.html (look for "ADD BACK after AdSense approval")
//   3. Replace placeholder slot IDs in SLOT_MAP below with real slot IDs
//
// const AD_CLIENT = "ca-pub-7316477328258550"; // <-- uncomment after approval
const AD_CLIENT = ""; // Disabled until AdSense approved

// Map slot names → actual AdSense slot IDs.
// IMPORTANT: Replace SLOT_ID_* values with real IDs from your AdSense dashboard.
// Each slot must be a SEPARATE ad unit created in the AdSense UI.
const SLOT_MAP: Record<string, string> = {
  "leaderboard-homepage-top":    "SLOT_ID_HP_TOP",
  "leaderboard-homepage-mid":    "SLOT_ID_HP_MID",
  "leaderboard-category-top":   "SLOT_ID_CAT_TOP",
  "leaderboard-below-game":     "SLOT_ID_GAME_BOTTOM",
  "sidebar-rectangle-top":      "SLOT_ID_SIDEBAR_TOP",
  "sidebar-rectangle-bottom":   "SLOT_ID_SIDEBAR_BOTTOM",
  "sticky-bottom-mobile":       "SLOT_ID_STICKY",
  "default":                    "SLOT_ID_DEFAULT",
};

/**
 * AdPlacement — SPA-safe AdSense unit.
 *
 * SPA BEHAVIOUR EXPLAINED:
 * ─────────────────────────────────────────────────────────────
 * React SPAs never do a full page reload when navigating. This
 * means the same <ins> element that AdSense initialised on the
 * first render would never be re-filled on subsequent navigations.
 *
 * The correct approach for SPAs is:
 *   1. Key the <ins> element on (pathname + uid) so React destroys
 *      and remounts it on every route change.
 *   2. After remount, call window.adsbygoogle.push({}) in a short
 *      timeout (100 ms) to let the DOM settle first.
 *   3. Guard the push with a ref so it only fires ONCE per mount,
 *      even under React 18 StrictMode double-invocation.
 *
 * This approach is compliant with Google's policy because:
 *   • Ads are only refreshed when the USER navigates to a new page
 *     (i.e., there is a new content context, not an arbitrary timer).
 *   • We are NOT calling adsbygoogle.push({}) on the SAME <ins>
 *     element twice — the element is destroyed and recreated.
 * ─────────────────────────────────────────────────────────────
 */
export default function AdPlacement({
  size = "728x90",
  className = "",
  slot = "default",
  sticky = false,
}: AdPlacementProps) {
  const uid        = useId();           // stable, unique per component instance
  const pushed     = useRef(false);     // prevents double-push in StrictMode
  const location   = useLocation();

  const [w, h] = size.split("x").map(Number);
  const slotId = SLOT_MAP[slot] ?? SLOT_MAP["default"];

  // When the route changes, reset the guard so the next effect can push.
  useEffect(() => {
    pushed.current = false;
  }, [location.pathname]);

  // After every (remounted) render, fire the AdSense push once.
  useEffect(() => {
    if (!AD_CLIENT || pushed.current) return;
    pushed.current = true;

    // 100 ms delay: ensures the <ins> element is fully in the DOM
    // before AdSense tries to fill it.
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // "adsbygoogle already has an ad" — harmless in dev with StrictMode
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, uid]);   // uid changes on remount → re-fires correctly

  // ─── DISABLED: Return null until AdSense account is approved ───────────────
  // Google requires your site to be reviewed BEFORE showing ads.
  // Once approved, remove the line below and uncomment the ad code.
  if (!AD_CLIENT) return null;
  // ───────────────────────────────────────────────────────────────────────────

  const isLeaderboard  = w >= 728;

  const wrapperClass = sticky
    ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center bg-background/95 backdrop-blur-sm border-t border-border py-1 shadow-2xl"
    : `flex flex-col items-center justify-center gap-1.5 my-4 ${className}`;

  return (
    <div className={wrapperClass} aria-label="Advertisement" role="complementary">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium select-none">
        Advertisement
      </span>
      <div
        className="bg-secondary/20 border border-border/30 rounded flex items-center justify-center overflow-hidden"
        style={{
          maxWidth:  isLeaderboard ? "100%" : `${w}px`,
          minHeight: `${h}px`,
        }}
      >
        {/*
          The `key` prop forces React to destroy and recreate this <ins>
          element on every route change. This is intentional — it is the
          correct, policy-compliant way to refresh ads in an SPA.
        */}
        <ins
          key={`${location.pathname}::${uid}`}
          className="adsbygoogle"
          style={{
            display: "block",
            width:   isLeaderboard ? "100%" : `${w}px`,
            height:  `${h}px`,
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive={isLeaderboard ? "true" : "false"}
        />
      </div>
    </div>
  );
}

