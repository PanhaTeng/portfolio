export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  errorCode?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  clientIp?: string;
  isRead: boolean;
  createdAt: string;
}

export interface PageViewRequest {
  pagePath: string;
  referrer?: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  pageViewsByRoute: Record<string, number>;
  recentVisits: Array<{
    pagePath: string;
    referrer?: string;
    visitedAt: string;
  }>;
}

export interface AuthStatus {
  authenticated: boolean;
  username: string | null;
  role: string | null;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: 'Enterprise' | 'Systems' | 'Web & Cloud' | 'Open Source';
  metrics?: string;
}

export interface SkillCategory {
  category: string;
  skills: Array<{
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }>;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  technologies: string[];
}
