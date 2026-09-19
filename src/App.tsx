import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { ContactForm } from './components/ContactForm';
import { AdminPortal } from './components/AdminPortal';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { ApiSandbox } from './components/ApiSandbox';
import { ContactMessage, AnalyticsData } from './types';

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    senderName: 'David Vance',
    senderEmail: 'david.vance@fintech-advisors.com',
    subject: 'Core Banking Monolith Modernization',
    message: 'Hello Panha, we reviewed your architecture notes on modular monoliths and domain decoupling. We are evaluating migrating a financial transaction system and would love to consult with you.',
    clientIp: '136.24.89.102',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 2,
    senderName: 'Elena Rostova',
    senderEmail: 'elena@cloudscale.io',
    subject: 'Staff Systems Architect Opportunity',
    message: 'Hi Panha! Our distributed platform team is looking for a systems engineer with deep Spring Boot and Angular standalone expertise. Let us know your availability for an intro chat.',
    clientIp: '54.210.12.77',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString()
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'admin' | 'architecture' | 'api'>('portfolio');
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('pt_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pt_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageViews: 142,
    uniqueVisitors: 68,
    pageViewsByRoute: {
      '/': 118,
      '/#projects': 74,
      '/#experience': 45,
      '/admin/dashboard': 12
    },
    recentVisits: [
      { pagePath: '/', referrer: 'https://github.com', visitedAt: new Date(Date.now() - 120000).toISOString() },
      { pagePath: '/#projects', referrer: 'Direct / Bookmark', visitedAt: new Date(Date.now() - 480000).toISOString() },
      { pagePath: '/#experience', referrer: 'https://linkedin.com', visitedAt: new Date(Date.now() - 900000).toISOString() }
    ]
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pt_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('pt_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleAdminLogin = (username: string, pass: string): boolean => {
    if (username === 'admin' && pass === 'Admin123!@#') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    if (activeView === 'admin') {
      setActiveView('portfolio');
    }
  };

  const handleMessageSent = (newMsg: ContactMessage) => {
    setMessages(prev => [newMsg, ...prev]);
    setAnalytics(prev => ({
      ...prev,
      totalPageViews: prev.totalPageViews + 1,
      pageViewsByRoute: {
        ...prev.pageViewsByRoute,
        '/#contact': (prev.pageViewsByRoute['/#contact'] || 0) + 1
      },
      recentVisits: [
        { pagePath: '/#contact', referrer: 'Direct Inbound Inquiry', visitedAt: new Date().toISOString() },
        ...prev.recentVisits.slice(0, 9)
      ]
    }));
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors selection:bg-blue-500 selection:text-white">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
        unreadCount={unreadCount}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {activeView === 'portfolio' && (
          <>
            <Hero
              onContactClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onProjectsClick={() => {
                const el = document.getElementById('projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onArchitectureClick={() => setActiveView('architecture')}
            />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <ContactForm onMessageSent={handleMessageSent} />
          </>
        )}

        {activeView === 'admin' && (
          <AdminPortal
            isAdminLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            messages={messages}
            onMarkAsRead={handleMarkAsRead}
            onDeleteMessage={handleDeleteMessage}
            analytics={analytics}
          />
        )}

        {activeView === 'architecture' && (
          <ArchitectureViewer />
        )}

        {activeView === 'api' && (
          <ApiSandbox
            isAdminLoggedIn={isAdminLoggedIn}
            messages={messages}
            onAddMessage={handleMessageSent}
          />
        )}
      </main>

      <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 py-10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            <p className="font-semibold text-neutral-700 dark:text-neutral-300">
              Panha Teng · Senior Backend Developer &amp; Financial Systems Architect
            </p>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
              C#/.NET Core · Java Spring Boot · Python · Financial Integrations (Bakong, T24, eKYC, AIA) · Maker-Checker Systems
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('architecture')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
              Module Boundaries
            </button>
            <button
              onClick={() => setActiveView('api')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
              REST Endpoints
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
              Admin Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
