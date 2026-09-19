import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILL_CATEGORIES } from '../../../../core/data/portfolio-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div class="mb-10">
        <h2 class="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          Technical Capabilities
        </h2>
        <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Core Competencies &amp; Production Tooling
        </h3>
        <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-2 max-w-xl">
          Battle-tested toolchains utilized in mission-critical distributed and transactional banking domains.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (category of skillCategories; track category.category) {
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h4 class="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span>{{ category.category }}</span>
              <span class="text-xs font-mono font-normal text-neutral-400">{{ category.skills.length }} skills</span>
            </h4>

            <div class="space-y-3.5">
              @for (skill of category.skills; track skill.name) {
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {{ skill.name }}
                      </span>
                      @if (skill.highlight) {
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          Focus
                        </span>
                      }
                    </div>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {{ skill.description }}
                    </p>
                  </div>
                  <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {{ skill.level }}
                  </span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class SkillsComponent {
  readonly skillCategories = SKILL_CATEGORIES;
}
