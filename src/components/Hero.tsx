import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Github, Mail, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onProjectsClick }) => {
  return (
    <section id="hero-section" className="pt-10 sm:pt-16 pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping"></span>
        Available for Senior Backend &amp; Financial Systems Roles
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-4xl leading-[1.12]">
        {PERSONAL_INFO.role}
      </h1>

      <p className="mt-5 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
        {PERSONAL_INFO.tagline}
      </p>

      <p className="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
        {PERSONAL_INFO.bio}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          onClick={onProjectsClick}
          id="btn-hero-projects"
          className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5 shadow-sm">
          <span>View Selected Work</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          onClick={onContactClick}
          id="btn-hero-contact"
          className="px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5">
          <Mail className="w-4 h-4" />
          <span>Get in Touch</span>
        </button>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          id="link-hero-github"
          className="px-4 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
};
