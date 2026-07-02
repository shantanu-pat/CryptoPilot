
const STORAGE_KEY = "cryptopilot";

export function loadState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serialized =
      localStorage.getItem(STORAGE_KEY);

    if (!serialized) {
      return undefined;
    }

    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
}

export function saveState(
  state: {
    profile: unknown;
    portfolio: unknown;
    watchlist: unknown;
    strategy: unknown;
  }
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profile: state.profile,
        portfolio: state.portfolio,
        watchlist: state.watchlist,
        strategy: state.strategy,
      })
    );
  } catch {}
}