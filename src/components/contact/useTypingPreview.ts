import { useEffect, useState } from 'react';

const CHARACTER_INTERVAL_MS = 55;
const SENTENCE_PAUSE_MS = 1800;
const NEXT_SENTENCE_PAUSE_MS = 300;

interface TypingPreviewOptions {
  paused: boolean;
  reducedMotion: boolean;
}

/** Cycles through sentences; pausing retains the current animation position. */
export function useTypingPreview(
  sentences: readonly string[],
  { paused, reducedMotion }: TypingPreviewOptions,
) {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sentence = sentences[sentenceIndex] ?? '';

  useEffect(() => {
    if (paused || reducedMotion || sentences.length === 0) {
      return;
    }
    const atEnd = characterCount === sentence.length && !isDeleting;
    const atStart = characterCount === 0 && isDeleting;
    const delay = atEnd
      ? SENTENCE_PAUSE_MS
      : atStart
        ? NEXT_SENTENCE_PAUSE_MS
        : CHARACTER_INTERVAL_MS;

    const timer = window.setTimeout(() => {
      if (atEnd) {
        setIsDeleting(true);
      } else if (atStart) {
        setSentenceIndex((value) => (value + 1) % sentences.length);
        setIsDeleting(false);
      } else {
        setCharacterCount((value) => value + (isDeleting ? -1 : 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [
    paused,
    reducedMotion,
    sentences.length,
    sentence,
    characterCount,
    isDeleting,
  ]);

  return reducedMotion ? sentence : sentence.slice(0, characterCount);
}
