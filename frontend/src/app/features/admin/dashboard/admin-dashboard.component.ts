import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ContactService } from '../../../core/services/contact.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ContactMessage, AnalyticsSummary } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      
      <!-- Top Bar -->
      <header class="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            ⚙️
          </div>
          <div>
            <h1 class="text-sm font-bold tracking-tight">Portfolio Admin Console</h1>
            <p class="text-[11px] text-neutral-400">Spring Security Session · Bounded Monolith</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button"
            (click)="themeService.toggleTheme()" 
            class="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs">
            {{ themeService.isDark() ? '☀️ Light' : '🌙 Dark' }}
          </button>

          <a routerLink="/" class="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-2 py-1">
            View Live Site
          </a>

          <button 
            type="button" 
            (click)="onLogout()"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors cursor-pointer">
            Terminate Session
          </button>
        </div>
      </header>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Navigation Tabs -->
        <div class="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6 text-sm">
          <button 
            type="button" 
            (click)="activeTab.set('messages')"
            [class.border-blue-600]="activeTab() === 'messages'"
            [class.text-blue-600]="activeTab() === 'messages'"
            [class.dark:text-blue-400]="activeTab() === 'messages'"
            class="px-4 py-2 font-semibold border-b-2 border-transparent transition-all cursor-pointer flex items-center gap-2">
            <span>Inbound Messages</span>
            <span class="px-2 py-0.5 rounded-full text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {{ messages().length }}
            </span>
          </button>

          <button 
            type="button" 
            (click)="activeTab.set('analytics')"
            [class.border-blue-600]="activeTab() === 'analytics'"
            [class.text-blue-600]="activeTab() === 'analytics'"
            [class.dark:text-blue-400]="activeTab() === 'analytics'"
            class="px-4 py-2 font-semibold border-b-2 border-transparent transition-all cursor-pointer flex items-center gap-2">
            <span>Visitor Telemetry</span>
            <span class="px-2 py-0.5 rounded-full text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {{ analytics()?.totalPageViews || 0 }} Views
            </span>
          </button>

          <button 
            type="button" 
            (click)="activeTab.set('architecture')"
            [class.border-blue-600]="activeTab() === 'architecture'"
            [class.text-blue-600]="activeTab() === 'architecture'"
            [class.dark:text-blue-400]="activeTab() === 'architecture'"
            class="px-4 py-2 font-semibold border-b-2 border-transparent transition-all cursor-pointer">
            Architecture &amp; System Health
          </button>
        </div>

        <!-- TAB 1: MESSAGES -->
        @if (activeTab() === 'messages') {
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold">Contact Submissions</h2>
              <button 
                type="button" 
                (click)="loadMessages()"
                class="px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                ↻ Refresh Feed
              </button>
            </div>

            @if (isLoading()) {
              <div class="py-12 text-center text-sm text-neutral-400">Loading messages from SQLite database...</div>
            } @else if (messages().length === 0) {
              <div class="py-16 text-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <p class="text-sm font-semibold text-neutral-500">No contact submissions received yet.</p>
                <p class="text-xs text-neutral-400 mt-1">Submit a message via the public contact form to see it stream here.</p>
              </div>
            } @else {
              <div class="grid grid-cols-1 gap-3">
                @for (msg of messages(); track msg.id) {
                  <div 
                    class="p-5 rounded-xl bg-white dark:bg-neutral-900 border transition-all"
                    [class.border-blue-400]="!msg.isRead"
                    [class.dark:border-blue-800]="!msg.isRead"
                    [class.border-neutral-200]="msg.isRead"
                    [class.dark:border-neutral-800]="msg.isRead">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                      <div>
                        <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">{{ msg.senderName }}</span>
                        <a [href]="'mailto:' + msg.senderEmail" class="text-xs text-blue-600 dark:text-blue-400 ml-2 hover:underline">
                          &lt;{{ msg.senderEmail }}&gt;
                        </a>
                      </div>
                      <div class="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                        <span>{{ msg.createdAt | date:'medium' }}</span>
                        @if (!msg.isRead) {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            UNREAD
                          </span>
                        }
                      </div>
                    </div>

                    <div class="pt-3">
                      <h4 class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        {{ msg.subject }}
                      </h4>
                      <p class="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {{ msg.message }}
                      </p>
                    </div>

                    <div class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                      <span class="text-neutral-400 font-mono text-[11px]">
                        IP: {{ msg.clientIp || '127.0.0.1' }}
                      </span>
                      <div class="flex items-center gap-2">
                        @if (!msg.isRead) {
                          <button 
                            type="button" 
                            (click)="markAsRead(msg.id)"
                            class="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer">
                            Mark Read
                          </button>
                        }
                        <button 
                          type="button" 
                          (click)="deleteMessage(msg.id)"
                          class="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        }

        <!-- TAB 2: ANALYTICS -->
        @if (activeTab() === 'analytics') {
          <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span class="text-xs font-mono text-neutral-400">Total Page Hits</span>
                <span class="block text-3xl font-extrabold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                  {{ analytics()?.totalPageViews || 0 }}
                </span>
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span class="text-xs font-mono text-neutral-400">Unique Visitors (Hashed IP)</span>
                <span class="block text-3xl font-extrabold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                  {{ analytics()?.uniqueVisitors || 0 }}
                </span>
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span class="text-xs font-mono text-neutral-400">Tracking Engine</span>
                <span class="block text-lg font-bold font-mono mt-2 text-emerald-600 dark:text-emerald-400">
                  Spring JPA / SQLite
                </span>
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span class="text-xs font-mono text-neutral-400">Privacy Guarantee</span>
                <span class="block text-lg font-bold font-mono mt-2 text-blue-600 dark:text-blue-400">
                  SHA-256 Anonymized
                </span>
              </div>
            </div>

            <!-- Route Breakdown -->
            <div class="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h3 class="text-sm font-bold mb-4">Traffic by Route</h3>
              @if (analytics()?.pageViewsByRoute && getRouteKeys().length > 0) {
                <div class="space-y-3">
                  @for (key of getRouteKeys(); track key) {
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-mono text-neutral-600 dark:text-neutral-300">{{ key }}</span>
                      <span class="font-mono font-bold">{{ analytics()?.pageViewsByRoute?.[key] }} views</span>
                    </div>
                  }
                </div>
              } @else {
                <p class="text-xs text-neutral-400">No route logs recorded yet.</p>
              }
            </div>

            <!-- Recent Inbound Visits -->
            <div class="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h3 class="text-sm font-bold mb-4">Recent Inbound Telemetry</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono">
                    <tr>
                      <th class="py-2">Timestamp</th>
                      <th class="py-2">Target Route</th>
                      <th class="py-2">Referrer</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-mono">
                    @for (visit of analytics()?.recentVisits; track visit.visitedAt) {
                      <tr>
                        <td class="py-2.5 text-neutral-500">{{ visit.visitedAt | date:'short' }}</td>
                        <td class="py-2.5 font-semibold text-neutral-900 dark:text-neutral-100">{{ visit.pagePath }}</td>
                        <td class="py-2.5 text-neutral-400 truncate max-w-xs">{{ visit.referrer || 'Direct / Internal' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        }

        <!-- TAB 3: ARCHITECTURE & SYSTEM HEALTH -->
        @if (activeTab() === 'architecture') {
          <div class="space-y-6">
            <div class="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h3 class="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Modular Monolith Architecture Breakdown
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                All 5 modules interact solely across public service contracts (interfaces) with complete encapsulation of repositories and entities.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs font-mono font-bold text-blue-600">portfolio-common</span>
                  <p class="text-xs text-neutral-500 mt-1">ApiResponse&lt;T&gt; wrapper, centralized &#64;ControllerAdvice, BaseEntity, AuditTrailLogger.</p>
                </div>
                <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs font-mono font-bold text-emerald-600">portfolio-contact</span>
                  <p class="text-xs text-neutral-500 mt-1">ContactService contract, public submission REST API, admin inquiry moderation.</p>
                </div>
                <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs font-mono font-bold text-purple-600">portfolio-analytics</span>
                  <p class="text-xs text-neutral-500 mt-1">Telemetry ingestion, IP hash anonymization, visitor count aggregation.</p>
                </div>
                <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs font-mono font-bold text-amber-600">portfolio-auth</span>
                  <p class="text-xs text-neutral-500 mt-1">Spring Security 6, HttpOnly session cookie, salted BCrypt admin seeder.</p>
                </div>
                <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs font-mono font-bold text-rose-600">portfolio-web</span>
                  <p class="text-xs text-neutral-500 mt-1">Application runner, multi-stage Dockerfile, SQLite JPA dialect configurations.</p>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly contactService = inject(ContactService);
  readonly analyticsService = inject(AnalyticsService);
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly activeTab = signal<'messages' | 'analytics' | 'architecture'>('messages');
  readonly isLoading = signal<boolean>(false);
  readonly messages = signal<ContactMessage[]>([]);
  readonly analytics = signal<AnalyticsSummary | null>(null);

  ngOnInit(): void {
    this.loadMessages();
    this.loadAnalytics();
  }

  loadMessages(): void {
    this.isLoading.set(true);
    this.contactService.getAllMessages().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.messages.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadAnalytics(): void {
    this.analyticsService.getSummary().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.analytics.set(res.data);
        }
      }
    });
  }

  markAsRead(id: number): void {
    this.contactService.markAsRead(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.messages.update(list =>
            list.map(m => m.id === id ? { ...m, isRead: true } : m)
          );
        }
      }
    });
  }

  deleteMessage(id: number): void {
    this.contactService.deleteMessage(id).subscribe({
      next: () => {
        this.messages.update(list => list.filter(m => m.id !== id));
      }
    });
  }

  getRouteKeys(): string[] {
    const summary = this.analytics();
    return summary?.pageViewsByRoute ? Object.keys(summary.pageViewsByRoute) : [];
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
