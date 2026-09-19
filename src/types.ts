export interface ContactMessage {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  clientIp: string;
  isRead: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  pageViewsByRoute: Record<string, number>;
  recentVisits: Array<{
    pagePath: string;
    referrer?: string;
    visitedAt: string;
  }>;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  featured: boolean;
  category: 'Enterprise' | 'Systems' | 'Web & Cloud';
  metrics?: string;
}

export interface SkillGroup {
  category: string;
  skills: Array<{
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }>;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  technologies: string[];
  keyProject?: {
    name: string;
    details: string;
  };
}

export interface EducationRecord {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

export interface TrainingRecord {
  title: string;
  institution: string;
  topics: string[];
}

