import { useEffect, useState } from 'react';

const THEME_KEY = 'johnny-matcha-theme';
type Theme = 'light' | 'dark';
export function ThemeToggle() {
  const [preference, setPreference] = useState<Theme | null>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
      return null;
    }
  });
  const [systemDark, setSystemDark] = useState(
    () => matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const dark = preference ? preference === 'dark' : systemDark;
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      if (preference) localStorage.setItem(THEME_KEY, preference);
      else localStorage.removeItem(THEME_KEY);
    } catch {
      // Storage can be unavailable; the current in-memory theme still works.
    }
  }, [dark, preference]);
  return (
    <div className="theme-controls">
      <button
        id="theme-toggle"
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        onClick={() => setPreference(dark ? 'light' : 'dark')}
      >
        <span className="theme-track" aria-hidden="true">
          <svg className="theme-sun" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </svg>
          <svg className="theme-moon" viewBox="0 0 24 24">
            <path d="M20.5 14.1A8.7 8.7 0 0 1 9.9 3.5 8.7 8.7 0 1 0 20.5 14.1Z" />
          </svg>
          <span className="theme-thumb" />
        </span>
      </button>
    </div>
  );
}
