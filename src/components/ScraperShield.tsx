import { ShieldCheck } from "lucide-react";

interface ScraperShieldProps {
  disableContextMenu?: boolean;
}

export default function ScraperShield({ disableContextMenu = false }: ScraperShieldProps) {
  // Right-click and text selection remain enabled to preserve browser accessibility,
  // tab navigation, and translation functions.

  return (
    <div className="bg-secondary/30 border-y border-border py-2 mb-8">
      <div className="container flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        <span>Free browser-based games · No downloads or installs required · Instant web play</span>
      </div>
    </div>
  );
}
