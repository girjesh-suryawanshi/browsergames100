import { useState, useEffect } from "react";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "cph_cookie_consent";
const CONSENT_VERSION = "v1"; // bump this to force re-consent on policy changes

type ConsentStatus = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentStatus {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null; // stale — re-ask
    return parsed.status as ConsentStatus;
  } catch {
    return null;
  }
}

function storeConsent(status: "accepted" | "rejected") {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ status, version: CONSENT_VERSION, ts: Date.now() })
    );
  } catch {}
}

/**
 * Signal consent to Google AdSense via the window.gtag consent API.
 * Called once when the user makes their choice.
 */
function applyAdSenseConsent(accepted: boolean) {
  try {
    // If the site later uses gtag, this will be honoured automatically.
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        ad_storage: accepted ? "granted" : "denied",
        analytics_storage: accepted ? "granted" : "denied",
        ad_user_data: accepted ? "granted" : "denied",
        ad_personalization: accepted ? "granted" : "denied",
      });
    }
    // For standard AdSense without gtag, non-personalised ads
    // are served by default when consent is denied — no extra
    // action needed beyond not calling adsbygoogle.push({}) with
    // personalisation params.
  } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Delay slightly so it doesn't block LCP
    const timer = setTimeout(() => {
      const stored = getStoredConsent();
      if (!stored) setVisible(true);
      else applyAdSenseConsent(stored === "accepted");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    storeConsent("accepted");
    applyAdSenseConsent(true);
    setVisible(false);
  };

  const handleReject = () => {
    storeConsent("rejected");
    applyAdSenseConsent(false);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] animate-in slide-in-from-bottom-4 duration-500"
    >
      {/* Details panel (shown on "Manage" click) */}
      {showDetails && (
        <div className="max-w-2xl mx-auto mb-2 px-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-2xl text-sm text-muted-foreground space-y-3">
            <h3 className="font-bold text-foreground text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Cookie Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-xs mb-0.5">Essential Cookies — Always Active</p>
                  <p className="text-xs leading-relaxed">Required for the site to function: storing your favourite games, recent play history, and theme preference. These cannot be disabled.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Cookie className="w-4 h-4 text-gaming-yellow mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-xs mb-0.5">Advertising Cookies (Google AdSense) — Optional</p>
                  <p className="text-xs leading-relaxed">Google AdSense uses cookies to serve personalised ads based on your browsing history. Declining means you may still see ads, but they will not be personalised. Our ad revenue keeps BrowserGames100 100% free. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google's Ads Policy →</a></p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="text-xs text-primary hover:underline"
            >
              ← Back to consent banner
            </button>
          </div>
        </div>
      )}

      {/* Main banner */}
      <div className="border-t border-border bg-card/95 backdrop-blur-xl shadow-2xl">
        <div className="container max-w-5xl py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Cookie className="w-5 h-5 text-gaming-yellow shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">We use cookies</span> to keep BrowserGames100 free. We and our ad partner{" "}
                <span className="font-medium text-foreground">Google AdSense</span> use cookies for personalised advertising, analytics, and to remember your preferences (GDPR Art. 6 · CCPA).{" "}
                <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
                {" · "}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-primary hover:underline font-medium"
                >
                  Manage Preferences
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                id="cookie-reject-btn"
                onClick={handleReject}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-sm font-semibold text-foreground transition-colors"
              >
                Reject Optional
              </button>
              <button
                id="cookie-accept-btn"
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity shadow-glow"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                aria-label="Reject optional cookies and dismiss banner"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
