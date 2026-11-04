import { useEffect, useState } from 'react';
import { ContactForm } from './components/contact/ContactForm';
import { ExperienceHighlights } from './components/ExperienceHighlights';
import { ExperienceSection } from './components/ExperienceSection';
import { ThemeToggle } from './components/ThemeToggle';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';

/** Composes the introduction page and coordinates the experience reveal. */
export function App() {
  const [showExperience, setShowExperience] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  useEffect(() => {
    if (!showExperience || !scrollTarget) {
      return;
    }
    const target = document.getElementById(scrollTarget);
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      });
      setScrollTarget(null);
    }
  }, [showExperience, scrollTarget]);
  function openExperience(target: string) {
    setShowExperience(true);
    setScrollTarget(target);
  }
  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to introduction
      </a>
      <header>
        <a className="wordmark" href="#main">
          <span>Vote for </span>Johnny!
        </a>
        <ThemeToggle />
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="intro-heading">
          <h1 id="intro-heading">Hi Matcha, I’m Johnny.</h1>
          <p className="intro">
            I’m a frontend engineer who cares about clear interfaces.
            <br className="desktop-break" /> I built this introduction with
            React, TypeScript, and ChatGPT.
          </p>
          <p className="summary">
            <svg
              className="summary-sprig"
              width="16"
              height="16"
              viewBox="0 0 12 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 21c0 0-2-3-2-8c0-4 1-7 2-9" />
              <path d="M7.5 12.5C6 11 4.5 10 3 10c0 0 1 3 4.5 5" />
              <path d="M7 16c-1.5-1-3-1.5-4-1.5c0 0 .5 2.5 4 4" />
              <path d="M8.5 9C7 7.5 5 6.5 3.5 6.5c0 0 .5 2.5 5 4.5" />
            </svg>
            <span>
              Frontend engineer<span className="summary-divider"> · </span>
              <br className="summary-break" />
              Salem, Massachusetts
            </span>
            <svg
              className="summary-sprig summary-sprig-mirrored"
              width="16"
              height="16"
              viewBox="0 0 12 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 21c0 0-2-3-2-8c0-4 1-7 2-9" />
              <path d="M7.5 12.5C6 11 4.5 10 3 10c0 0 1 3 4.5 5" />
              <path d="M7 16c-1.5-1-3-1.5-4-1.5c0 0 .5 2.5 4 4" />
              <path d="M8.5 9C7 7.5 5 6.5 3.5 6.5c0 0 .5 2.5 5 4.5" />
            </svg>
          </p>
          <ContactForm />
          <ExperienceHighlights />
          <div className="actions">
            <button
              className="text-link"
              aria-expanded={showExperience}
              aria-controls="experience"
              onClick={() => {
                if (showExperience) setShowExperience(false);
                else openExperience('experience');
              }}
            >
              {showExperience ? 'Hide my experience' : 'Read my experience'}
            </button>
            {CONTACT_EMAIL && (
              <a className="text-link" href={'mailto:' + CONTACT_EMAIL}>
                Email me
              </a>
            )}
          </div>
        </section>
        {showExperience && <ExperienceSection />}
      </main>
      <footer>
        <a
          className="header-link"
          href="https://github.com/Pythonidaer"
          aria-label="My GitHub profile"
          title="My GitHub profile"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
