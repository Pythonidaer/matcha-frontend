import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './style.css';

const experiences = [
  {
    sentence: 'I’ve turned designs into React components',
    label: 'React',
    detail:
      'I worked at a startup called Acronary as the sole Frontend Engineer. I implemented their entire Figma design in React components, including components and functionality that were needed when the design mockup fell short.',
  },
  {
    sentence: 'I’ve built fast, accessible interfaces',
    label: 'Accessibility',
    detail:
      'At Boston Children’s Hospital, I turned designs into fast, accessible interfaces, constructing WordPress and Drupal templates using PHP, JavaScript, semantic HTML and ARIA attributes. At Commonwealth Financial Network, I frequently worked with designers to turn Figma designs into fully responsive, accessible websites.',
  },
  {
    sentence: 'I love getting the pixels right',
    label: 'Visual detail',
    detail:
      'I have a strong passion for creating pixel-right interfaces. I’ve enjoyed using visual inspection tools such as Chromium, especially the green differential view for spotting differences. I’m also unafraid of cracking into the Dev Toolkit and inspecting computed styles.',
  },
  {
    sentence: 'I’ve worked with backend engineers to ship features',
    label: 'End to end',
    detail:
      'At Acronary, I worked directly with the CTO, who handled the backend, to ship features end to end. I connected the React interface with the Python FastAPI backend as we brought features into the product.',
  },
];
const experienceIcons = [
  'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z',
  'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  'M22 7l-4-4v3H3v2h15v3l4-4zM2 17l4 4v-3h15v-2H6v-3l-4 4z',
];
const CHARACTER_INTERVAL_MS = 55;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const THEME_KEY = 'johnny-matcha-theme';
type Theme = 'light' | 'dark';
function ThemeToggle() {
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

function App() {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [submission, setSubmission] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    // Other static hosts use a native POST to the live Netlify form.
    if (location.origin !== 'https://johnny-for-matcha.netlify.app') return;
    event.preventDefault();
    if (submission === 'sending') return;
    const form = event.currentTarget;
    if (!message.trim()) {
      form.querySelector('textarea')?.focus();
      return;
    }
    setSubmission('sending');
    try {
      const data = new URLSearchParams();
      new FormData(form).forEach((value, key) =>
        data.append(key, String(value)),
      );
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmission('success');
      setMessage('');
      setReplyEmail('');
      setEmailValid(false);
    } catch {
      setSubmission('error');
    }
  }

  const [reducedMotion, setReducedMotion] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  useEffect(() => {
    if (!showExperience || !scrollTarget) return;
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
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (isFocused || message || reducedMotion) return;
    const sentence = experiences[index].sentence;
    const atEnd = length === sentence.length && !deleting;
    const atStart = length === 0 && deleting;
    const timer = window.setTimeout(
      () => {
        if (atEnd) setDeleting(true);
        else if (atStart) {
          setIndex((value) => (value + 1) % experiences.length);
          setDeleting(false);
        } else setLength((value) => value + (deleting ? -1 : 1));
      },
      atEnd ? 1800 : atStart ? 300 : CHARACTER_INTERVAL_MS,
    );
    return () => clearTimeout(timer);
  }, [index, length, deleting, isFocused, message, reducedMotion]);
  const current = experiences[index];
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
          <form
            id="contact"
            className="contact-form"
            name="contact"
            method="POST"
            action="https://johnny-for-matcha.netlify.app/thank-you/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={submitMessage}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="contact-honeypot">
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="type-panel">
              <div className="panel-heading">
                <h2>A little about what I do</h2>
              </div>
              <div className="typing-body compact-contact">
                <div className="message-area">
                  <textarea
                    name="message"
                    required
                    maxLength={5000}
                    aria-label="Message to Johnny"
                    placeholder={
                      isFocused
                        ? 'Dear Johnny, I love the ambition. Do you have time this week for a 30min chat?'
                        : ''
                    }
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onFocus={() => {
                      setIsFocused(true);
                      if (submission !== 'sending') setSubmission('idle');
                    }}
                    onBlur={() => setIsFocused(false)}
                  />
                  {!isFocused && !message && (
                    <p className="typed" aria-hidden="true">
                      {reducedMotion
                        ? current.sentence
                        : current.sentence.slice(0, length)}
                      <span
                        className={reducedMotion ? 'cursor still' : 'cursor'}
                      />
                    </p>
                  )}
                  <p className="sr-only">
                    {experiences.map((item) => item.sentence).join(' ')}
                  </p>
                </div>
                <div className="email-area">
                  <label className="sr-only" htmlFor="reply-email">
                    Your email
                  </label>
                  <input
                    id="reply-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email"
                    required
                    maxLength={254}
                    value={replyEmail}
                    onChange={(event) => {
                      setReplyEmail(event.target.value);
                      setEmailValid(event.target.validity.valid);
                    }}
                  />
                  <button
                    className="send-email"
                    type="submit"
                    disabled={
                      !message.trim() ||
                      !replyEmail.trim() ||
                      !emailValid ||
                      submission === 'sending'
                    }
                    aria-label={
                      submission === 'sending'
                        ? 'Sending message'
                        : 'Send message'
                    }
                    title={
                      submission === 'sending'
                        ? 'Sending message'
                        : 'Send message'
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="contact-status" role="status" aria-live="polite">
              {submission === 'success'
                ? 'Thanks! Your message has been submitted.'
                : submission === 'error'
                  ? 'Your message could not be sent. Please try again.'
                  : ''}
            </p>
          </form>
          <ul className="topics" aria-label="Experience highlights">
            {experiences.map((item, i) => (
              <li key={item.label}>
                <svg
                  className="topic-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={experienceIcons[i]} />
                </svg>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
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
        {showExperience && (
          <section
            className="experience"
            tabIndex={-1}
            id="experience"
            aria-labelledby="experience-heading"
          >
            <h2 id="experience-heading">My experience</h2>
            {experiences.map((item) => (
              <article
                key={item.label}
                id={'experience-' + experiences.indexOf(item)}
                tabIndex={-1}
              >
                <h3>{item.sentence}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </section>
        )}
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
createRoot(document.getElementById('root')!).render(<App />);
