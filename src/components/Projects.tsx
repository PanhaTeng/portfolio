import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { Github, Star } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Enterprise', 'Systems', 'Web & Cloud'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Featured Projects
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Engineered Systems &amp; Open Source
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="p-5 sm:p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {project.title}
              </h3>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                {project.tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {project.description}
              </p>

              {project.metrics && (
                <div className="mt-3 px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-neutral-950 text-xs font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                  ⚡ {project.metrics}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
