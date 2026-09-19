import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onMessageSent: (msg: ContactMessage) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onMessageSent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please populate all required fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (message.trim().length < 10) {
      setError('Message should be at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate backend Spring Boot roundtrip with realistic latency
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: Date.now(),
        senderName: name.trim(),
        senderEmail: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        clientIp: '192.168.1.42',
        isRead: false,
        createdAt: new Date().toISOString()
      };

      onMessageSent(newMsg);
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 400);
  };

  return (
    <section id="contact" className="py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Get In Touch
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">
            Reach out directly for senior backend, financial systems integration, or architectural consulting.
          </p>
          <div className="mt-3 flex justify-center">
            <a 
              href="mailto:tengpanha2002@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>Direct Email: tengpanha2002@gmail.com</span>
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Message Dispatched Successfully</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                Thank you! Your message has been logged to the portfolio contact module. You can also view it in the <strong>Admin Portal</strong>.
              </p>
              <button 
                type="button" 
                onClick={() => setSubmitted(false)} 
                className="mt-3 text-xs font-semibold underline cursor-pointer">
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {error && (
              <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Sarah Chen"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="sarah@fintech.io"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Subject *
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Systems Architecture Collaboration"
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Message *
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {message.length}/4000
                </span>
              </div>
              <textarea 
                rows={4} 
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe your project, team requirements, or technology challenges..."
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-neutral-400">
                🔒 Handled via Spring Security &amp; SQLite Audit Trail
              </span>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting...' : 'Transmit Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
