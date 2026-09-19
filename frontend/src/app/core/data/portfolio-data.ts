import { Project, SkillCategory, ExperienceItem } from '../models/portfolio.models';

export const PORTFOLIO_INFO = {
  name: 'Panha Teng',
  title: 'Lead Software Engineer & Systems Architect',
  tagline: 'Designing enterprise modular monoliths, distributed systems, and modern reactive web applications.',
  location: 'San Francisco, CA / Remote',
  email: 'tengpanha2002@gmail.com',
  github: 'https://github.com/tengpanha',
  linkedin: 'https://linkedin.com/in/panha-teng',
  twitter: 'https://x.com',
  bio: `Senior full-stack engineer with 6+ years of experience designing and scaling resilient software architectures. Passionate about clean code, domain-driven design, and bridging low-latency Java Spring Boot backends with sleek, modern Angular and TypeScript interfaces.`,
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Production Systems', value: '18+' },
    { label: 'Uptime Maintained', value: '99.98%' },
    { label: 'Clean Code Commitment', value: '100%' }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Backend & Systems Architecture',
    skills: [
      { name: 'Java 17/21 & Spring Boot 3', level: 'Expert', description: 'Modular monoliths, Spring Security, Data JPA, Actuator', highlight: true },
      { name: 'Domain-Driven Design (DDD)', level: 'Advanced', description: 'Bounded contexts, event-driven decoupling, clean architecture', highlight: true },
      { name: 'Spring Security & Auth', level: 'Advanced', description: 'Session cookies, JWT, OAuth2, RBAC, BCrypt salting' },
      { name: 'RESTful API Engineering', level: 'Expert', description: 'Contract-first DTO envelopes, validation, OpenAPI/Swagger' },
      { name: 'Microservices & Monoliths', level: 'Advanced', description: 'Decoupled module boundaries, messaging queues, telemetry' }
    ]
  },
  {
    category: 'Frontend & UI Engineering',
    skills: [
      { name: 'Angular (v17/v18/v19)', level: 'Expert', description: 'Standalone components, Signals, Reactive Forms, Guards', highlight: true },
      { name: 'TypeScript', level: 'Expert', description: 'Strict typing, generic interfaces, advanced utility types', highlight: true },
      { name: 'Tailwind CSS', level: 'Expert', description: 'Custom design systems, dark/light themes, responsive layout' },
      { name: 'RxJS & Reactive Streams', level: 'Advanced', description: 'Pipes, higher-order operators, state synchronization' },
      { name: 'Web Performance & Accessibility', level: 'Advanced', description: 'Lighthouse 95+, WCAG AA, Core Web Vitals optimization' }
    ]
  },
  {
    category: 'Databases & Persistence',
    skills: [
      { name: 'PostgreSQL & SQLite', level: 'Advanced', description: 'Schema migrations, indexing, WAL mode, transaction isolation', highlight: true },
      { name: 'Spring Data JPA & Hibernate', level: 'Expert', description: 'Optimistic locking, query optimization, entity auditing' },
      { name: 'Redis Cache', level: 'Proficient', description: 'Distributed caching, session store, rate limiting' }
    ]
  },
  {
    category: 'Cloud, DevOps & Tooling',
    skills: [
      { name: 'Docker & Multi-Stage Builds', level: 'Expert', description: 'Alpine/Distroless slim JRE images, persistent volumes', highlight: true },
      { name: 'CI/CD & GitHub Actions', level: 'Advanced', description: 'Automated test pipelines, GitHub Pages deployment workflows' },
      { name: 'Linux & Cloud Hosting', level: 'Advanced', description: 'Render, Fly.io, AWS EC2/S3, Cloud Run, Nginx reverse proxies' },
      { name: 'Git & Trunk-Based Dev', level: 'Expert', description: 'Conventional commits, release versioning, code reviews' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'modular-portfolio',
    title: 'Enterprise Modular Monolith Portfolio',
    tagline: 'Production-ready personal platform with Spring Boot 3 & Angular',
    description: 'Real banking-inspired modular monolith backend structured into bounded domain modules (common, contact, analytics, auth, web) with SQLite persistence and HttpOnly session authentication.',
    tags: ['Java 17', 'Spring Boot 3', 'Angular 18', 'SQLite', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/tengpanha/modular-portfolio',
    featured: true,
    category: 'Enterprise',
    metrics: '5 Bounded Modules · 100% Type-Safe · Zero External DB Cost'
  },
  {
    id: 'core-banking-ledger',
    title: 'Distributed Transaction Ledger Engine',
    tagline: 'High-throughput double-entry financial ledger service',
    description: 'Fault-tolerant financial ledger built with Java, Spring Boot, and PostgreSQL. Enforces strict double-entry balance consistency, cryptographic audit trails, and pessimistic locking during currency conversions.',
    tags: ['Java 21', 'Spring Data JPA', 'PostgreSQL', 'Docker', 'OpenAPI'],
    githubUrl: 'https://github.com/tengpanha/core-banking-ledger',
    featured: true,
    category: 'Enterprise',
    metrics: '2,400+ TPS · Sub-15ms P99 Latency'
  },
  {
    id: 'cloud-event-bus',
    title: 'Lightweight Event Broker & Telemetry Gateway',
    tagline: 'High-concurrency webhook ingestor with persistent retries',
    description: 'Event-driven telemetry ingestion engine featuring dead-letter queues, exponential backoff retries, and structured log streaming to centralized observabilities.',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'Actuator', 'Prometheus'],
    githubUrl: 'https://github.com/tengpanha/cloud-event-bus',
    featured: false,
    category: 'Systems',
    metrics: '99.99% Message Delivery Guarantee'
  },
  {
    id: 'angular-enterprise-ui',
    title: 'Modern Financial Dashboard UI Kit',
    tagline: 'Reusable enterprise component library with Angular signals',
    description: 'Clean, accessible design system featuring interactive financial tables, sparkline analytics, keyboard shortcuts, and seamless dark mode synchronization.',
    tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Signals'],
    githubUrl: 'https://github.com/tengpanha/angular-enterprise-ui',
    featured: true,
    category: 'Web & Cloud',
    metrics: 'Lighthouse 98/100 · Zero Layout Shift'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Full-Stack Engineer',
    company: 'Apex Financial Technologies',
    location: 'San Francisco, CA (Hybrid)',
    period: '2023 – Present',
    current: true,
    highlights: [
      'Architected core microservice decoupling initiatives, converting monolithic dependencies into cleanly bounded domains that reduced deployment cycle times by 45%.',
      'Designed and deployed mission-critical Spring Boot 3 financial transaction settlement services processing $12M+ in daily volume.',
      'Spearheaded frontend migration to Angular standalone components and reactive Signals, slashing initial bundle sizes by 32%.'
    ],
    technologies: ['Java 21', 'Spring Boot 3', 'Angular', 'PostgreSQL', 'Docker', 'Kubernetes']
  },
  {
    id: 'exp-2',
    role: 'Senior Software Engineer',
    company: 'Nexus Cloud Platforms',
    location: 'San Jose, CA',
    period: '2021 – 2023',
    current: false,
    highlights: [
      'Engineered multi-tenant telemetry and usage analytics pipeline ingesting over 50M events daily with sub-second dashboard query response.',
      'Implemented robust Spring Security filters, session clustering, and role-based access control protecting sensitive customer configurations.',
      'Mentored 6 junior/mid-level engineers on Java concurrency best practices and unit testing paradigms.'
    ],
    technologies: ['Java 17', 'Spring Boot', 'TypeScript', 'Redis', 'Fly.io', 'GitLab CI']
  },
  {
    id: 'exp-3',
    role: 'Software Engineer',
    company: 'InnoTech Solutions',
    location: 'Remote',
    period: '2019 – 2021',
    current: false,
    highlights: [
      'Built responsive customer-facing web applications using Angular, RxJS, and enterprise REST APIs.',
      'Developed automated CI/CD pipelines deploying Docker containers to production with zero-downtime rolling updates.',
      'Authored automated test suites maintaining >85% branch coverage across backend modules.'
    ],
    technologies: ['Java', 'Spring MVC', 'Angular 11', 'MySQL', 'Docker', 'AWS']
  }
];
