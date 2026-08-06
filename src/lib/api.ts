// Central API configuration — reads from Vite env variable or defaults to relative path
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function recordGamePlay(slug: string, gameId: number) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${slug}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId })
    });
    return await res.json();
  } catch (error) {
    console.warn('Backend API offline, play count recorded locally only');
    return null;
  }
}

export async function rateGame(slug: string, gameId: number, type: 'like' | 'dislike') {
  try {
    const res = await fetch(`${API_BASE}/api/games/${slug}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, type })
    });
    return await res.json();
  } catch (error) {
    console.warn('Backend API offline, rating recorded locally only');
    return null;
  }
}

export async function getGameStats(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${slug}/stats`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function toggleFavoriteGame(gameId: number, gameSlug: string, userId?: string) {
  try {
    const res = await fetch(`${API_BASE}/api/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, gameSlug, userId })
    });
    return await res.json();
  } catch (error) {
    console.warn('Backend API offline, favorite stored locally');
    return null;
  }
}

export async function submitGameSuggestion(data: { title: string; url: string; email?: string; notes?: string }) {
  try {
    const res = await fetch(`${API_BASE}/api/submissions/game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    throw new Error('Failed to submit game. Backend server unreachable.');
  }
}

export async function submitContactForm(data: { name: string; email: string; subject?: string; message: string }) {
  try {
    const res = await fetch(`${API_BASE}/api/submissions/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    throw new Error('Failed to send message. Backend server unreachable.');
  }
}
