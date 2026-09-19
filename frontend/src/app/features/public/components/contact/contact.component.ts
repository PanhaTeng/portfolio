import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Inquiries
          </h2>
          <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Initiate Contact
          </h3>
          <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-2">
            Send an inquiry directly to the Spring Boot message queue. All submissions are audited and stored in SQLite.
          </p>
        </div>

        <!-- Success Alert -->
        @if (submissionSuccess()) {
          <div class="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-3">
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <div>
              <p class="font-semibold">Message Dispatched Successfully</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                Thank you! Your message has been logged to the portfolio contact module. I will get back to you shortly.
              </p>
              <button 
                type="button" 
                (click)="submissionSuccess.set(false)" 
                class="mt-2 text-xs font-semibold underline cursor-pointer">
                Send another message
              </button>
            </div>
          </div>
        }

        <!-- Error Alert -->
        @if (errorMessage()) {
          <div class="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3">
            <svg class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <p class="font-semibold">Submission Failed</p>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-0.5">{{ errorMessage() }}</p>
            </div>
          </div>
        }

        <!-- Contact Form -->
        @if (!submissionSuccess()) {
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label for="name" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Name *
                </label>
                <input 
                  id="name"
                  type="text" 
                  formControlName="name"
                  placeholder="Alex Rivera"
                  class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                @if (f['name'].touched && f['name'].invalid) {
                  <p class="text-rose-500 text-xs mt-1">Please enter your name (min 2 chars).</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input 
                  id="email"
                  type="email" 
                  formControlName="email"
                  placeholder="alex@company.com"
                  class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                @if (f['email'].touched && f['email'].invalid) {
                  <p class="text-rose-500 text-xs mt-1">Please provide a valid email.</p>
                }
              </div>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Subject *
              </label>
              <input 
                id="subject"
                type="text" 
                formControlName="subject"
                placeholder="Architecture Advisory / Systems Role"
                class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              @if (f['subject'].touched && f['subject'].invalid) {
                <p class="text-rose-500 text-xs mt-1">Subject is required.</p>
              }
            </div>

            <!-- Message -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="message" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Message *
                </label>
                <span class="text-[11px] text-neutral-400 font-mono">
                  {{ contactForm.get('message')?.value?.length || 0 }}/4000
                </span>
              </div>
              <textarea 
                id="message"
                rows="4" 
                formControlName="message"
                placeholder="Briefly describe the context, challenge, or opportunity..."
                class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y"></textarea>
              @if (f['message'].touched && f['message'].invalid) {
                <p class="text-rose-500 text-xs mt-1">Message must be at least 10 characters.</p>
              }
            </div>

            <div class="pt-2 flex items-center justify-between">
              <p class="text-[11px] text-neutral-400">
                🔒 Protected by Spring Security &amp; Audit Logging
              </p>

              <button 
                type="submit" 
                [disabled]="contactForm.invalid || isSubmitting()"
                class="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2">
                @if (isSubmitting()) {
                  <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span>Transmitting...</span>
                } @else {
                  <span>Transmit Inquiry</span>
                }
              </button>
            </div>
          </form>
        }
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly isSubmitting = signal<boolean>(false);
  readonly submissionSuccess = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]]
  });

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.contactService.submitContact(this.contactForm.value).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          this.submissionSuccess.set(true);
          this.contactForm.reset();
        } else {
          this.errorMessage.set(response.message || 'Submission error');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err?.error?.message || 'Network error communicating with Spring Boot backend.');
      }
    });
  }
}
