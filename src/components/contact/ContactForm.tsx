import { useState } from 'react';
import type { FormEvent } from 'react';
import { experiences } from '../../data/experiences';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTypingPreview } from './useTypingPreview';

const sentences = experiences.map((experience) => experience.sentence);
type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

/** Contact fields, accessible animation preview and Netlify submission behavior. */
export function ContactForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [submission, setSubmission] = useState<SubmissionStatus>('idle');
  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    // Other static hosts use a native POST to the live Netlify form.
    if (location.origin !== 'https://johnny-for-matcha.netlify.app') {
      return;
    }
    event.preventDefault();
    if (submission === 'sending') {
      return;
    }
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
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      setSubmission('success');
      setMessage('');
      setReplyEmail('');
      setEmailValid(false);
    } catch {
      setSubmission('error');
    }
  }

  const reducedMotion = useReducedMotion();
  const previewText = useTypingPreview(sentences, {
    paused: isFocused || Boolean(message),
    reducedMotion,
  });

  return (
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
                if (submission !== 'sending') {
                  setSubmission('idle');
                }
              }}
              onBlur={() => setIsFocused(false)}
            />
            {!isFocused && !message && (
              <p className="typed" aria-hidden="true">
                {previewText}
                <span className={reducedMotion ? 'cursor still' : 'cursor'} />
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
                submission === 'sending' ? 'Sending message' : 'Send message'
              }
              title={
                submission === 'sending' ? 'Sending message' : 'Send message'
              }
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
  );
}
