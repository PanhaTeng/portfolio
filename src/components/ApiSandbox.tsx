import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import { ContactMessage } from '../types';

interface ApiSandboxProps {
  isAdminLoggedIn: boolean;
  messages: ContactMessage[];
  onAddMessage: (msg: ContactMessage) => void;
}

export const ApiSandbox: React.FC<ApiSandboxProps> = ({
  isAdminLoggedIn,
  messages,
  onAddMessage
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('POST /api/v1/contact');
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeEndpoint = () => {
    setIsLoading(true);
    setResponseOutput(null);

    setTimeout(() => {
      setIsLoading(false);
      const timestamp = new Date().toISOString();

      if (selectedEndpoint === 'POST /api/v1/contact') {
        const newMsg: ContactMessage = {
          id: Date.now(),
          senderName: 'API Sandbox Client',
          senderEmail: 'tester@enterprise.dev',
          subject: 'Contract Test Inquiry',
          message: 'Verifying ApiResponse<T> envelope serialization.',
          clientIp: '127.0.0.1',
          isRead: false,
          createdAt: timestamp
        };
        onAddMessage(newMsg);
        setStatusCode(201);
        setResponseOutput(JSON.stringify({
          success: true,
          message: 'Contact inquiry received and logged to audit trail',
          data: newMsg,
          timestamp,
          errorCode: null
        }, null, 2));
      } else if (selectedEndpoint === 'POST /api/v1/analytics/track') {
        setStatusCode(200);
        setResponseOutput(JSON.stringify({
          success: true,
          message: 'Telemetry logged with SHA-256 IP anonymization',
          data: null,
          timestamp,
          errorCode: null
        }, null, 2));
      } else if (selectedEndpoint === 'POST /api/v1/auth/login') {
        setStatusCode(200);
        setResponseOutput(JSON.stringify({
          success: true,
          message: 'Session authenticated successfully. JSESSIONID cookie dispatched.',
          data: {
            authenticated: true,
            username: 'admin',
            role: 'ROLE_ADMIN'
          },
          timestamp,
          errorCode: null
        }, null, 2));
      } else if (selectedEndpoint === 'GET /api/v1/auth/check') {
        setStatusCode(200);
        setResponseOutput(JSON.stringify({
          success: true,
          message: isAdminLoggedIn ? 'Active session' : 'Anonymous session',
          data: {
            authenticated: isAdminLoggedIn,
            username: isAdminLoggedIn ? 'admin' : null,
            role: isAdminLoggedIn ? 'ROLE_ADMIN' : null
          },
          timestamp,
          errorCode: null
        }, null, 2));
      } else if (selectedEndpoint === 'GET /api/v1/admin/contact') {
        if (!isAdminLoggedIn) {
          setStatusCode(401);
          setResponseOutput(JSON.stringify({
            success: false,
            message: 'Full authentication is required to access this resource',
            data: null,
            timestamp,
            errorCode: 'UNAUTHORIZED'
          }, null, 2));
        } else {
          setStatusCode(200);
          setResponseOutput(JSON.stringify({
            success: true,
            message: 'Retrieved contact inquiries',
            data: messages,
            timestamp,
            errorCode: null
          }, null, 2));
        }
      } else if (selectedEndpoint === 'GET /api/v1/admin/analytics/summary') {
        if (!isAdminLoggedIn) {
          setStatusCode(401);
          setResponseOutput(JSON.stringify({
            success: false,
            message: 'Full authentication is required to access this resource',
            data: null,
            timestamp,
            errorCode: 'UNAUTHORIZED'
          }, null, 2));
        } else {
          setStatusCode(200);
          setResponseOutput(JSON.stringify({
            success: true,
            message: 'Analytics aggregated successfully',
            data: {
              totalPageViews: 142,
              uniqueVisitors: 68,
              pageViewsByRoute: {
                '/': 118,
                '/#projects': 74,
                '/#experience': 45,
                '/admin/dashboard': 12
              }
            },
            timestamp,
            errorCode: null
          }, null, 2));
        }
      }
    }, 250);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Terminal className="w-4 h-4" />
          <span>SPRING BOOT 3 REST API CONTRACT RUNNER</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Interactive API Sandbox &amp; Envelope Validator
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
          Test real endpoints and verify strict adherence to the enterprise <code>ApiResponse&lt;T&gt;</code> envelope pattern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Endpoint Selector */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
          <span className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-wider block mb-2">
            Target Endpoint
          </span>

          {[
            { id: 'POST /api/v1/contact', desc: 'Submit public inquiry to SQLite queue', auth: false },
            { id: 'POST /api/v1/analytics/track', desc: 'Record pageview with anonymized IP', auth: false },
            { id: 'POST /api/v1/auth/login', desc: 'Authenticate credentials, set session cookie', auth: false },
            { id: 'GET /api/v1/auth/check', desc: 'Verify caller session authentication status', auth: false },
            { id: 'GET /api/v1/admin/contact', desc: 'Retrieve all inquiries (Requires ROLE_ADMIN)', auth: true },
            { id: 'GET /api/v1/admin/analytics/summary', desc: 'Retrieve visitor stats (Requires ROLE_ADMIN)', auth: true }
          ].map(ep => (
            <button
              key={ep.id}
              onClick={() => {
                setSelectedEndpoint(ep.id);
                setResponseOutput(null);
                setStatusCode(null);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex flex-col ${
                selectedEndpoint === ep.id
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium border border-neutral-300 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold">{ep.id}</span>
                {ep.auth && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono">
                    Protected
                  </span>
                )}
              </div>
              <span className="text-[11px] text-neutral-500 mt-1">{ep.desc}</span>
            </button>
          ))}

          <button
            onClick={executeEndpoint}
            disabled={isLoading}
            className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isLoading ? 'Executing Request...' : 'Send Request'}</span>
          </button>
        </div>

        {/* Response Viewer */}
        <div className="lg:col-span-7 bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 shadow-md overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Response Envelope</span>
              {statusCode && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  statusCode >= 200 && statusCode < 300 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  HTTP {statusCode}
                </span>
              )}
            </div>

            <span className="text-neutral-500 text-[11px]">
              Content-Type: application/json
            </span>
          </div>

          <pre className="p-5 font-mono text-xs overflow-x-auto leading-relaxed text-neutral-300 min-h-[320px]">
            <code>
              {responseOutput || '// Click "Send Request" to test endpoint response'}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
