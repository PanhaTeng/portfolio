import React, { useState } from 'react';
import { ContactMessage, AnalyticsData } from '../types';
import { Shield, Eye, Trash2, Check, Lock, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminPortalProps {
  isAdminLoggedIn: boolean;
  onLogin: (u: string, p: string) => boolean;
  onLogout: () => void;
  messages: ContactMessage[];
  onMarkAsRead: (id: number) => void;
  onDeleteMessage: (id: number) => void;
  analytics: AnalyticsData;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isAdminLoggedIn,
  onLogin,
  onLogout,
  messages,
  onMarkAsRead,
  onDeleteMessage,
  analytics
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin123!@#');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'analytics' | 'architecture'>('messages');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const success = onLogin(username, password);
    if (!success) {
      setLoginError('Invalid credentials. Hint: use admin / Admin123!@#');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Portfolio Administration
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Session-based HttpOnly authentication protected by Spring Security
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all cursor-pointer">
              Authenticate Session
            </button>
          </form>

          <div className="mt-5 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-center">
            <span className="text-[11px] text-neutral-500 block">Default Seed Credentials:</span>
            <code className="text-xs font-mono text-neutral-800 dark:text-neutral-200">
              admin / Admin123!@#
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Admin Management Console
            </h2>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Active Spring Security Session (User: <code>admin</code>, Role: <code>ROLE_ADMIN</code>)
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-3.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer">
          <LogOut className="w-3.5 h-3.5" />
          <span>Terminate Session</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6 text-sm">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}>
          <span>Inbound Messages</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {messages.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}>
          <span>Visitor Telemetry</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {analytics.totalPageViews} Views
          </span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'architecture'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}>
          Architecture &amp; System Health
        </button>
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Inbound Inquiries ({messages.length})
            </h3>
            <span className="text-xs text-neutral-400">
              Audit logs stored with client IP
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                No inquiries recorded yet.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Use the Contact Form on the live portfolio to submit a test message!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-xl bg-white dark:bg-neutral-900 border transition-all ${
                    !msg.isRead
                      ? 'border-blue-400 dark:border-blue-700 shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div>
                      <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {msg.senderName}
                      </span>
                      <a
                        href={`mailto:${msg.senderEmail}`}
                        className="text-xs text-blue-600 dark:text-blue-400 ml-2 hover:underline">
                        &lt;{msg.senderEmail}&gt;
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          UNREAD
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3">
                    <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      {msg.subject}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono text-[11px]">
                      Client IP: {msg.clientIp}
                    </span>
                    <div className="flex items-center gap-2">
                      {!msg.isRead && (
                        <button
                          onClick={() => onMarkAsRead(msg.id)}
                          className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteMessage(msg.id)}
                        className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">Total Page Hits</span>
              <span className="block text-3xl font-extrabold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {analytics.totalPageViews}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">Unique Visitors (Hashed)</span>
              <span className="block text-3xl font-extrabold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {analytics.uniqueVisitors}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">Database Engine</span>
              <span className="block text-base font-bold font-mono mt-2 text-emerald-600 dark:text-emerald-400">
                SQLite + JPA
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">Privacy Anonymization</span>
              <span className="block text-base font-bold font-mono mt-2 text-blue-600 dark:text-blue-400">
                SHA-256 Hashes
              </span>
            </div>
          </div>

          {/* Route breakdown */}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-bold mb-4">Traffic by Route</h3>
            <div className="space-y-2.5">
              {Object.entries(analytics.pageViewsByRoute).map(([route, count]) => (
                <div key={route} className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-600 dark:text-neutral-300">{route}</span>
                  <span className="font-mono font-bold">{count} visits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Visits */}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-bold mb-4">Recent Inbound Telemetry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400">
                  <tr>
                    <th className="py-2">Timestamp</th>
                    <th className="py-2">Target Route</th>
                    <th className="py-2">Referrer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {analytics.recentVisits.map((v, i) => (
                    <tr key={i}>
                      <td className="py-2 text-neutral-500">{new Date(v.visitedAt).toLocaleTimeString()}</td>
                      <td className="py-2 font-semibold text-neutral-900 dark:text-neutral-100">{v.pagePath}</td>
                      <td className="py-2 text-neutral-400">{v.referrer || 'Direct Entry'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Health Tab */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Modular Monolith Bounded Contexts
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              All 5 modules interact solely across public service contracts (interfaces) with complete encapsulation of repositories and entities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-bold text-blue-600">portfolio-common</span>
                <p className="text-xs text-neutral-500 mt-1">ApiResponse&lt;T&gt; wrapper, centralized @ControllerAdvice, BaseEntity, AuditTrailLogger.</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-bold text-emerald-600">portfolio-contact</span>
                <p className="text-xs text-neutral-500 mt-1">ContactService contract, public submission REST API, admin inquiry moderation.</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-bold text-purple-600">portfolio-analytics</span>
                <p className="text-xs text-neutral-500 mt-1">Telemetry ingestion, IP hash anonymization, visitor count aggregation.</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-bold text-amber-600">portfolio-auth</span>
                <p className="text-xs text-neutral-500 mt-1">Spring Security 6, HttpOnly session cookie, salted BCrypt admin seeder.</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-bold text-rose-600">portfolio-web</span>
                <p className="text-xs text-neutral-500 mt-1">Application runner, multi-stage Dockerfile, SQLite JPA dialect configurations.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
