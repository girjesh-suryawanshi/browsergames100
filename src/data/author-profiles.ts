export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
}

export const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  "Marcus Vance": {
    name: "Marcus Vance",
    role: "Senior Web Gaming Analyst",
    bio: "Senior Web Gaming Analyst at BrowserGames100 with over 8 years testing browser technology, WebGL optimization, and cloud architecture for web gaming."
  },
  "Elena Rostova": {
    name: "Elena Rostova",
    role: "Competitive Mechanics Specialist",
    bio: "Competitive esports and arena mechanics specialist focusing on reflex games, battle royale piece control, and real-time multiplayer optimization."
  },
  "David Kim": {
    name: "David Kim",
    role: "Arcade & Sports Simulation Lead",
    bio: "Lifelong gamer specializing in physics-based sandbox games, sports management simulations, and retro arcade high-score progression."
  },
  "Sarah Jenkins": {
    name: "Sarah Jenkins",
    role: "Editorial Director & Accessibility Lead",
    bio: "Editorial Director at BrowserGames100, championing web accessibility, family-friendly gaming safety, and zero-barrier educational web play."
  }
};

export function getAuthorProfile(name?: string): AuthorProfile {
  if (name && AUTHOR_PROFILES[name]) {
    return AUTHOR_PROFILES[name];
  }
  return {
    name: name || "BrowserGames100 Editorial Team",
    role: "Verified Gaming Journalist",
    bio: "Senior Gaming Journalist and Web Technology Specialist at BrowserGames100. Specializing in HTML5 gaming architecture, web game performance tuning, and unblocked gaming strategy guides."
  };
}

