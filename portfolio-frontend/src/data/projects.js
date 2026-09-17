const projects = [
  {
    id: 2,
    title: 'HandiGo',
    year: '2025',
    featured: true,
    status: 'Active build',
    role: 'Full-stack',
    oneLiner: 'Connect people in Nigeria to nearby artisans and service providers.',
    description:
      'A location-based marketplace: users find nearby providers, providers get discovered. React on the front, Express and PostgreSQL on the back. Still shipping features as real users come in.',
    tags: ['React', 'Express', 'PostgreSQL', 'Geolocation'],
    challenge: 'Make trusted local services easier to discover by location.',
    build: 'Provider discovery, location-aware search, and a relational API.',
    proof: 'End-to-end product with a live React client and Express/PostgreSQL backend.',
    demoLink: 'https://handi-go-iota.vercel.app/',
    codeLink: 'https://github.com/paschalfidel/handiGo',
    previewImage: '/projects/handigo.webp'
  },
  {
    id: 1,
    title: 'SpecReel',
    year: '2024',
    status: 'Live',
    role: 'Full-stack',
    oneLiner: 'Movie discovery with accounts, watchlists, and reviews.',
    description:
      'Full-stack from scratch: React client, Node API, MongoDB. Auth, watchlists, reviews, and API caching so repeat searches don’t wait on the same external call twice.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    challenge: 'Turn movie browsing into a personal, account-based experience.',
    build: 'Authentication, watchlists, reviews, search, and API response caching.',
    proof: 'Working full-stack app with persistent accounts and repeat-search caching.',
    demoLink: 'https://specreel-app.vercel.app',
    codeLink: 'https://github.com/paschalfidel/specreel-app',
    previewImage: '/projects/specreel.svg'
  },
  {
    id: 3,
    title: 'Spec360 Recommender',
    year: '2024',
    status: 'Live',
    role: 'Backend',
    oneLiner: 'Suggests the next service for agency clients based on behaviour.',
    description:
      'A small recommendation layer for Spec360 clients. Node.js backend that ranks services from what a visitor has already looked at — built to be useful, not a research demo.',
    tags: ['Node.js', 'JavaScript', 'Personalization'],
    challenge: 'Help agency visitors find the next relevant service without a long sales form.',
    build: 'A lightweight ranking layer based on the services a visitor explores.',
    proof: 'Deployed recommendation flow with inspectable source code.',
    demoLink: 'https://spec360-recommender.vercel.app/',
    codeLink: 'https://github.com/paschalfidel/spec360-decision-maker',
    previewImage: '/projects/recommender.webp'
  },
  {
    id: 4,
    title: 'Spec360.com.ng',
    year: '2023',
    status: 'Client work',
    role: 'Frontend',
    oneLiner: 'Site for the tech agency I founded.',
    description:
      'The public face of Spec360 Communication. Responsive React and Tailwind — client work that taught me to ship quickly, take feedback, and iterate without overbuilding.',
    tags: ['React', 'Tailwind'],
    challenge: 'Give a growing Lagos technology agency a clear, credible web presence.',
    build: 'Responsive service pages and conversion-focused contact journeys.',
    proof: 'Production company website built, deployed, and iterated from client feedback.',
    demoLink: 'https://spec360.com.ng',
    codeLink: 'https://github.com/paschalfidel/spec360-client',
    previewImage: '/projects/spec360.webp'
  }
]

export default projects
