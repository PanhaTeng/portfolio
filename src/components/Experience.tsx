import React from 'react';
import { EXPERIENCES_LIST } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          Career Path
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Professional Engineering Experience
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-9 border-l-2 border-neutral-200 dark:border-neutral-800 ml-2">
        {EXPERIENCES_LIST.map(exp => (
          <div key={exp.id} className="relative group">
            {/* Timeline bullet */}
            <div 
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-neutral-950 transition-colors ${
                exp.current ? 'bg-blue-600' : 'bg-neutral-400'
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {exp.role}{' '}
                <span className="text-blue-600 dark:text-blue-400 font-medium">@ {exp.company}</span>
              </h3>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {exp.period} · {exp.location}
              </span>
            </div>

            <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              {exp.highlights.map((item, idx) => {
                const isSpecialProject = item.startsWith('Selected Project Contribution');
                if (isSpecialProject) {
                  return (
                    <li key={idx} className="mt-3 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-neutral-800 dark:text-neutral-200">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-blue-700 dark:text-blue-300 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                        <span>Key Project Engagement</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        {item}
                      </p>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 select-none mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {exp.technologies.map(tech => (
                <span 
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
