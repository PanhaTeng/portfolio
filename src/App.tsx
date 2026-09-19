import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { ContactForm } from './components/ContactForm';
import { ContactMessage } from './types';
import { Github, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('pt_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleMessageSent = (newMsg: ContactMessage) => {
    try {
      const existing = JSON.parse(localStorage.getItem('pt_messages') || '[]');
      localStorage.setItem('pt_messages', JSON.stringify([newMsg, ...existing]));
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors selection:bg-blue-500 selection:text-white">
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <Hero
          onContactClick={() => scrollToSection('contact')}
          onProjectsClick={() => scrollToSection('projects')}
        />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <ContactForm onMessageSent={handleMessageSent} />
      </main>

      <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200/80 dark:border-neutral-800/80">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  PT
                </div>
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  {PERSONAL_INFO.name}
                </p>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {PERSONAL_INFO.role} · {PERSONAL_INFO.location}
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <button 
                onClick={() => scrollToSection('about')} 
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
                About
              </button>
              <button 
                onClick={() => scrollToSection('experience')} 
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
                Contact
              </button>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
            <p>© {new Date().getFullYear()} Panha Teng. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer">
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
