import React from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          Technical Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Core Competencies &amp; Production Tooling
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
          Battle-tested toolchains utilized in mission-critical distributed and transactional banking domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKILL_GROUPS.map(category => (
          <div 
            key={category.category} 
            className="p-5 sm:p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span>{category.category}</span>
              <span className="text-xs font-mono font-normal text-neutral-400">
                {category.skills.length} skills
              </span>
            </h3>

            <div className="space-y-3">
              {category.skills.map(skill => (
                <div key={skill.name} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          Focus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {skill.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
