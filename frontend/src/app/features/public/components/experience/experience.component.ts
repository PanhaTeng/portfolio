import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCES } from '../../../../core/data/portfolio-data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div class="mb-10">
        <h2 class="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          Career Path
        </h2>
        <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Professional Engineering Experience
        </h3>
      </div>

      <div class="relative pl-6 sm:pl-8 space-y-10 border-l-2 border-neutral-200 dark:border-neutral-800 ml-2">
        @for (exp of experiences; track exp.id) {
          <div class="relative group">
            <!-- Timeline bullet -->
            <div 
              class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-neutral-950 transition-colors"
              [class.bg-blue-600]="exp.current"
              [class.bg-neutral-400]="!exp.current">
            </div>

            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h4 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {{ exp.role }}
                <span class="text-blue-600 dark:text-blue-400 font-medium">@ {{ exp.company }}</span>
              </h4>
              <span class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {{ exp.period }} · {{ exp.location }}
              </span>
            </div>

            <ul class="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              @for (item of exp.highlights; track item) {
                <li class="flex items-start gap-2">
                  <span class="text-neutral-400 select-none mt-1">▸</span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>

            <div class="mt-4 flex flex-wrap gap-1.5">
              @for (tech of exp.technologies; track tech) {
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  {{ tech }}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
