import { experiences } from '../data/experiences';

/** Expanded experience content; IDs retain existing fragment-link targets. */
export function ExperienceSection() {
  return (
    <section
      className="experience"
      tabIndex={-1}
      id="experience"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading">My experience</h2>
      {experiences.map((item) => (
        <article key={item.id} id={item.id} tabIndex={-1}>
          <h3>{item.sentence}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </section>
  );
}
