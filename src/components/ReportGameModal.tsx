import { useState } from "react";
import { X, AlertCircle, CheckCircle2, Loader2, Flag } from "lucide-react";
import { submitContactForm } from "@/lib/api";

interface ReportGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  gameSlug: string;
}

const REPORT_REASONS = [
  "Game does not load / black screen",
  "Controls do not respond or are broken",
  "Extreme lag or unplayable framerate",
  "Audio is missing or broken",
  "Game contains inappropriate content",
  "Other technical issue",
];

export default function ReportGameModal({
  isOpen,
  onClose,
  gameTitle,
  gameSlug,
}: ReportGameModalProps) {
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const message = `Broken Game Report:
Game: ${gameTitle} (slug: ${gameSlug})
Reason: ${reason}
Details: ${details || "None provided"}
User Email: ${userEmail || "Anonymous player"}`;

    try {
      await submitContactForm({
        name: "Game Player",
        email: userEmail || "reports@browsergames100.com",
        subject: `Broken Game Report: ${gameTitle}`,
        message,
      });
      setStatus("success");
    } catch {
      // Fallback to mailto
      const mailtoUrl = `mailto:support@browsergames100.com?subject=${encodeURIComponent(
        `Broken Game Report: ${gameTitle}`
      )}&body=${encodeURIComponent(message)}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setDetails("");
    setUserEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="relative w-full max-w-md p-6 bg-card border border-border rounded-2xl shadow-2xl">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 id="report-modal-title" className="text-xl font-bold text-foreground">
              Report Received
            </h2>
            <p className="text-sm text-muted-foreground">
              Thank you for reporting this issue with <strong>{gameTitle}</strong>. Our editorial team reviews reports to repair or retire broken embeds.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <Flag className="w-4 h-4" />
              </div>
              <div>
                <h2 id="report-modal-title" className="text-lg font-bold text-foreground">
                  Report Game Issue
                </h2>
                <p className="text-xs text-muted-foreground truncate max-w-[260px]">
                  {gameTitle}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="report-reason" className="block text-xs font-semibold text-foreground mb-1.5">
                What is the issue?
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="report-details" className="block text-xs font-semibold text-foreground mb-1.5">
                Additional Details (Optional)
              </label>
              <textarea
                id="report-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="E.g., Game stays on loading bar, error code shown, etc."
                className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label htmlFor="report-email" className="block text-xs font-semibold text-foreground mb-1.5">
                Your Email (Optional, if you want a follow-up)
              </label>
              <input
                id="report-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-destructive text-destructive-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
