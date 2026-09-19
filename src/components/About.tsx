import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GraduationCap, Award, Globe, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Bio, Core Strengths, and Background */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
              Professional Background
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              Financial Systems Engineering &amp; Integration
            </h2>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            {PERSONAL_INFO.bio}
          </p>

          {/* Core Strengths */}
          <div className="pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              Core Technical Strengths
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERSONAL_INFO.coreStrengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture badges */}
          <div className="pt-3 grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="block text-[11px] font-mono text-neutral-500">Core Stack</span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">C# / .NET Core</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="block text-[11px] font-mono text-neutral-500">Security</span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">OAuth2 / IdentityServer</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="block text-[11px] font-mono text-neutral-500">Java Training</span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Piseth Java School</span>
            </div>
          </div>
        </div>

        {/* Right: Stats, Education & Training Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-3.5">
            {PERSONAL_INFO.stats.map(stat => (
              <div 
                key={stat.label}
                className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight font-mono">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Education Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Education</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {PERSONAL_INFO.education.degree}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {PERSONAL_INFO.education.institution} · {PERSONAL_INFO.education.period} ({PERSONAL_INFO.education.status})
              </p>
            </div>
          </div>

          {/* Training & Java Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Formal Training</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {PERSONAL_INFO.training.institution}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {PERSONAL_INFO.training.title}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {PERSONAL_INFO.training.topics.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>Languages:</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {PERSONAL_INFO.languages.map(lang => (
                <span key={lang.name} className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {lang.name} <span className="font-normal text-neutral-400">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

