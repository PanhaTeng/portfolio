import { ProjectItem, SkillGroup, ExperienceRecord, EducationRecord, TrainingRecord } from '../types';

export const PERSONAL_INFO = {
  name: 'Panha Teng',
  role: 'Senior Backend Developer · Financial Systems & Architecture',
  tagline: 'Building mission-critical Web APIs, banking integrations, and resilient workflows (.NET, C#, Java, Python).',
  email: 'tengpanha2002@gmail.com',
  github: 'https://github.com/tengpanha',
  linkedin: 'https://linkedin.com',
  location: 'Phnom Penh, Cambodia',
  bio: "Backend developer with extensive experience in financial systems, primarily using C#/.NET, building robust Web APIs and services for web and mobile front-ends. Proven track record in backend workflow design, cross-functional integrations, authorization & security (OAuth2, JWT, IdentityServer, AES/RSA/HMAC), performance optimization, and production support for banking and digital payment platforms. Hands-on expertise with PHP, Python, RESTful API design, and Java/Spring Boot through personal projects and formal training.",
  stats: [
    { label: 'Years in Financial Systems', value: '4+ Years' },
    { label: 'Banking & Wallet APIs', value: '100+' },
    { label: 'Core Workflows Built', value: 'Maker-Checker' },
    { label: 'Production Uptime Standard', value: '99.99%' }
  ],
  coreStrengths: [
    'Backend development for financial systems',
    'API and system integration (Bakong, T24, eKYC, Insurance)',
    'Workflow and Maker-Checker design',
    'Authorization & security (OAuth2, JWT, IdentityServer, AES/RSA/HMAC)',
    'Performance fixes and production support (IIS, SQL, Caching)',
    'Enterprise backend & modular monolith architecture'
  ],
  education: {
    degree: 'Bachelor of Management Information System (MIS)',
    institution: 'SETEC Institute',
    period: '2020 – 2024',
    status: 'Graduated'
  } as EducationRecord,
  training: {
    title: 'Enterprise Java, Spring Boot & Microservices',
    institution: 'Piseth Java School',
    topics: ['Spring Boot 3', 'Spring Data JPA & Hibernate', 'Spring Security 6', 'Microservices & Modular Monoliths']
  } as TrainingRecord,
  languages: [
    { name: 'Khmer', proficiency: 'Native' },
    { name: 'English', proficiency: 'Professional Working Proficiency' }
  ]
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Backend & Frameworks',
    skills: [
      { name: 'C# & .NET Core / ASP.NET Core', level: 'Expert', description: 'Web API, MVC, Blazor, LINQ, Entity Framework, high-volume transactional services', highlight: true },
      { name: 'Java & Spring Boot', level: 'Advanced', description: 'Spring Security, JPA/Hibernate, Modular Monolith architecture, Piseth Java School certified', highlight: true },
      { name: 'Python & FastAPI', level: 'Advanced', description: 'Central API development, RESTful microservices, Basic Authentication', highlight: true },
      { name: 'PHP', level: 'Proficient', description: 'Cavac, MWM system maintenance, REST API design and bank connectors' }
    ]
  },
  {
    category: 'Financial Integration & Workflows',
    skills: [
      { name: 'Financial System Integration', level: 'Expert', description: 'Bakong, eKYC/CamDX, T24 Core API, AIA Insurance, Mekong SMS, Dispute & AML APIs', highlight: true },
      { name: 'Maker-Checker & Workflow Engine', level: 'Expert', description: 'Approval escalation, duplicate detection, customer onboarding, review auditing', highlight: true },
      { name: 'ESB Concepts & API Management', level: 'Expert', description: 'WSO2, enterprise service bus routing, SOAP/REST mediation, centralized gateways' },
      { name: 'Payment Wallets & Bulk Upload', level: 'Expert', description: 'IGlassV2 wallet administration, salary batch upload, fee/incentive rules, remittance' }
    ]
  },
  {
    category: 'Security & Cryptography',
    skills: [
      { name: 'OAuth2 & IdentityServer', level: 'Expert', description: 'Centralized token issuance, microservices auth, client credentials & PKCE', highlight: true },
      { name: 'JWT & Basic Authentication', level: 'Expert', description: 'Stateless API claims, multi-tenant authorization, backend permission filters' },
      { name: 'Payload Cryptography', level: 'Advanced', description: 'AES-256 data protection, RSA asymmetric key signing, HMAC request integrity' }
    ]
  },
  {
    category: 'Databases, Caching & Infrastructure',
    skills: [
      { name: 'SQL Server & PostgreSQL', level: 'Expert', description: 'Query tuning, loan detail indexing, stored procedures, execution plan debugging', highlight: true },
      { name: 'Oracle & PL/SQL', level: 'Advanced', description: 'Banking schema structures, transactional procedures, data consistency' },
      { name: 'Redis & RabbitMQ', level: 'Advanced', description: 'Central cache server architecture, asynchronous messaging, rate limiting' },
      { name: 'Docker, IIS & Nginx', level: 'Advanced', description: 'Multi-server microservice deployment, IIS production performance & chunked uploads' }
    ]
  },
  {
    category: 'Frontend & Tools',
    skills: [
      { name: 'Web Front-End Basics', level: 'Proficient', description: 'HTML5, CSS3, JavaScript, jQuery, Ajax, Portal UI implementation' },
      { name: 'Flutter', level: 'Familiar', description: 'Cross-platform mobile front-end basics and API client integration' },
      { name: 'Git & GitLab', level: 'Advanced', description: 'Branching workflows, trunk-based CI/CD deployment, code reviews' },
      { name: 'Firebase', level: 'Proficient', description: 'Authentication, cloud messaging, realtime data prototyping' }
    ]
  }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'amret-maker-checker',
    title: 'Maker-Checker Customer & Loan Engine',
    tagline: 'AMRET Microfinance Core Customer & Refinance Workflow',
    description: 'Designed and built the Maker-Checker customer management workflow (MYAPP) featuring duplicate checking, multi-stage approval, and customer amendment as a resilient alternative to core banking. Engineered loan settlement features (Paid Off, Principal Decrease), collateral loan optimizations, chunked uploads (>30MB), and AIA Insurance API integration.',
    tags: ['C#', '.NET Core', 'SQL Server', 'OAuth2', 'JWT', 'IdentityServer', 'IIS', 'AIA Insurance'],
    githubUrl: 'https://github.com/tengpanha',
    featured: true,
    category: 'Enterprise',
    metrics: 'Chunked 30MB+ Uploads · Zero Duplicate Records · AIA Insurance Integration'
  },
  {
    id: 'sbi-mobile-banking-esb',
    title: 'SBI Mobile Banking Integration Hub & ESB',
    tagline: 'SBI Bank Mobile Banking Platform (via Ly Hour Pay Pro)',
    description: 'Built and exposed high-throughput backend APIs powering the SBI MB mobile app. Architected central cache servers for latency reduction and implemented an ESB-like integration fabric connecting Bakong, eKYC/CamDX, Temenos T24 Core API, Dispute APIs, AML services, Mekong SMS, email, and card modules.',
    tags: ['ASP.NET Core', 'C#', 'Bakong', 'T24 Core API', 'eKYC/CamDX', 'Redis Cache', 'RabbitMQ', 'WSO2'],
    githubUrl: 'https://github.com/tengpanha',
    featured: true,
    category: 'Enterprise',
    metrics: 'Central Cache Server · Multi-Service ESB Gateway · Full SIT/UAT Delivery'
  },
  {
    id: 'iglass-wallet-platform',
    title: 'IGlassV2 Mobile Wallet & Bulk Payment Hub',
    tagline: 'Ly Hour Pay Pro Mobile Wallet Management Platform',
    description: 'Administered and extended IGlassV2, the central platform orchestrating the Ly Hour wallet mobile app. Engineered card controls, approval workflows, transaction limits, fee/incentive matrices, remittance, Bakong integration, and high-volume agent/salary bulk upload systems.',
    tags: ['C#', '.NET', 'SQL Server', 'Bakong', 'Bulk Processing', 'Redis', 'Payment Gateway'],
    githubUrl: 'https://github.com/tengpanha',
    featured: true,
    category: 'Systems',
    metrics: 'Batch Salary/Agent Uploads · Dynamic Fee Matrices · 99.99% Reliability'
  },
  {
    id: 'ppwsa-microservices',
    title: 'PPWSA Water Utility Portal & Microservices Inventory',
    tagline: 'Government Utility Web Portal & .NET 6 Microservices (Bill24 / ONE Technology)',
    description: 'Developed the PPWSA web portal for the government water authority alongside a containerized .NET 6 microservices inventory system deployed across multiple servers with Docker, centralized IdentityServer, and OAuth2 security.',
    tags: ['.NET 6', 'FastAPI / Python', 'IdentityServer', 'OAuth2', 'Docker', 'PostgreSQL', 'PHP'],
    githubUrl: 'https://github.com/tengpanha',
    featured: false,
    category: 'Web & Cloud',
    metrics: 'Multi-Server Docker Cluster · OAuth2 Central Identity · Bank API Connectors'
  },
  {
    id: 'spring-modular-monolith',
    title: 'Modular Monolith Banking Architecture',
    tagline: 'Enterprise Spring Boot 3 Modular Backend with SQLite & Session Security',
    description: 'Showcase modular monolith implementation designed according to banking domain principles learned from Piseth Java School and production experience. Features 5 isolated submodules, HttpOnly session authentication, SHA-256 IP anonymization, and clear boundaries for future microservices extraction.',
    tags: ['Java 17', 'Spring Boot 3', 'Spring Security 6', 'JPA', 'SQLite', 'Docker'],
    githubUrl: 'https://github.com/tengpanha/modular-portfolio',
    featured: true,
    category: 'Enterprise',
    metrics: '5 Strict Domain Modules · Zero-Leak Interfaces · Spring Security 6'
  }
];

export const EXPERIENCES_LIST: ExperienceRecord[] = [
  {
    id: 'exp-amret',
    role: 'Senior MYAPP, Development and Support',
    company: 'AMRET Microfinance',
    location: 'Phnom Penh, Cambodia',
    period: 'March 2026 – Present',
    current: true,
    highlights: [
      "Built backend integration between AMRET's internal systems and AIA Insurance, for seamless API and system communication.",
      "Engineered loan settlement features, including Paid Off and Principal Decrease business scenarios.",
      "Improved backend logic and database query performance for collateral loan processing.",
      "Built a configurable Question & Answer system for Loan Survey & Refinance, with review, escalation, and reviewer visibility of past comments.",
      "Built a Maker-Checker customer management workflow (MYAPP) — duplicate checking, review, approval, customer creation, and amendment — as an alternative to the existing Core Banking customer creation process.",
      "Resolved slow backend, API, and database logic; investigated slow Loan Detail performance and file upload bottlenecks; implemented chunked upload for files exceeding 30 MB.",
      "Audited production IIS settings, monitored real-time application performance, and resolved critical production issues.",
      "Enforced backend permission checks and authorization using OAuth2, JWT, Basic Authentication, and IdentityServer.",
      "Architected and maintaining a Modular Monolith system with clear module boundaries, designed with future microservice migration in mind."
    ],
    technologies: ['C#', '.NET Core', 'ASP.NET Core', 'SQL Server', 'IIS', 'OAuth2', 'JWT', 'IdentityServer', 'Modular Monolith', 'AIA Insurance API']
  },
  {
    id: 'exp-lyhour',
    role: '.NET Developer',
    company: 'Ly Hour Pay Pro Plc. (Mobile Wallet & Digital Payment Platform)',
    location: 'Phnom Penh, Cambodia',
    period: 'March 2024 – February 2026',
    current: false,
    highlights: [
      "Engineered core wallet backend features including transaction history, ledger lookups, and account-to-account transfers.",
      "Administered IGlassV2, the internal system used to manage the wallet mobile app — card controls, workflow approval, transaction limits, fee/incentive settings, and transaction listings including remittance and Bakong-related transactions.",
      "Built and managed high-volume bulk upload tools inside IGlassV2, including agent upload and corporate salary/employee transaction processing.",
      "Provided 24/7 production tier support and rapid incident mitigation for the digital wallet platform.",
      "Built a central cache server to improve response times for existing services; supported system monitoring and technical troubleshooting across group projects.",
      "Contributed to backend API development for mobile banking apps and complementary financial services.",
      "Collaborated with cross-functional teams, researched new technologies, and handled flexible tasks assigned by management; supported regular Bakong updates.",
      "Selected Project Contribution – SBI Bank Mobile Banking (SBI MB) Project (engaged as vendor developer): contributed backend integration and development, building and exposing APIs used by the SBI MB mobile app; built module control functionality and a central cache server for the platform, supporting system monitoring and technical support across the project; worked with API integrations connecting to Bakong, eKYC/CamDX, T24 Core API, Dispute APIs, AML services, Mekong SMS, email, and card modules — similar to an ESB setup; took part in SIT and UAT."
    ],
    technologies: ['C#', 'ASP.NET Core', 'Web API', 'SQL Server', 'Redis Cache', 'RabbitMQ', 'Bakong', 'eKYC/CamDX', 'T24 Core API', 'WSO2 / ESB']
  },
  {
    id: 'exp-bill24',
    role: 'Junior Software Developer',
    company: 'Bill24 Co., Ltd.',
    location: 'Phnom Penh, Cambodia',
    period: 'October 2022 – March 2024',
    current: false,
    highlights: [
      "Maintained the Cavac and MWM systems and the central API (built with FastAPI and Basic Authentication).",
      "Built web APIs and portal UI, connecting to other internal systems and partner bank APIs.",
      "Developed with PHP and Python, including designing RESTful APIs across the Cavac, MWM, and central API systems.",
      "Assisted with production deployments, automated monitoring, and fixing live production issues; supported peer teams across the organization.",
      "Selected Project Contribution (via ONE Technology, sister company): helped build the PPWSA web portal for the Phnom Penh Water Supply Authority, and a microservices inventory system (.NET 6) deployed with Docker across several servers, using IdentityServer and OAuth2 for authentication within the microservices architecture."
    ],
    technologies: ['.NET 6', 'C#', 'Python (FastAPI)', 'PHP', 'Docker', 'IdentityServer', 'OAuth2', 'PostgreSQL', 'Microservices', 'RESTful APIs']
  }
];

