import { experiences } from '../data/experiences';

/** Summary labels and their associated icons. */
export function ExperienceHighlights() {
  return (
    <ul className="topics" aria-label="Experience highlights">
      {experiences.map((item) => (
        <li key={item.id}>
          <svg
            className="topic-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={item.iconPath} />
          </svg>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
