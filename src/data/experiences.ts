/** Content and icon for one experience, including its stable section ID. */
export interface Experience {
  readonly id: string;
  readonly sentence: string;
  readonly label: string;
  readonly detail: string;
  readonly iconPath: string;
}

export const experiences: readonly Experience[] = [
  {
    id: 'experience-0',
    iconPath:
      'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    sentence: 'I’ve turned designs into React components',
    label: 'React',
    detail:
      'I worked at a startup called Acronary as the sole Frontend Engineer. I implemented their entire Figma design in React components, including components and functionality that were needed when the design mockup fell short.',
  },
  {
    id: 'experience-1',
    iconPath:
      'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z',
    sentence: 'I’ve built fast, accessible interfaces',
    label: 'Accessibility',
    detail:
      'At Boston Children’s Hospital, I turned designs into fast, accessible interfaces, constructing WordPress and Drupal templates using PHP, JavaScript, semantic HTML and ARIA attributes. At Commonwealth Financial Network, I frequently worked with designers to turn Figma designs into fully responsive, accessible websites.',
  },
  {
    id: 'experience-2',
    iconPath:
      'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    sentence: 'I love getting the pixels right',
    label: 'Visual detail',
    detail:
      'I have a strong passion for creating pixel-right interfaces. I’ve enjoyed using visual inspection tools such as Chromium, especially the green differential view for spotting differences. I’m also unafraid of cracking into the Dev Toolkit and inspecting computed styles.',
  },
  {
    id: 'experience-3',
    iconPath: 'M22 7l-4-4v3H3v2h15v3l4-4zM2 17l4 4v-3h15v-2H6v-3l-4 4z',
    sentence: 'I’ve worked with backend engineers to ship features',
    label: 'End to end',
    detail:
      'At Acronary, I worked directly with the CTO, who handled the backend, to ship features end to end. I connected the React interface with the Python FastAPI backend as we brought features into the product.',
  },
];
