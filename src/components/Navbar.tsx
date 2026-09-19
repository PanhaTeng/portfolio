import React from 'react';
import { Sun, Moon, Shield, Code2, Terminal, Layout } from 'lucide-react';

interface NavbarProps {
  activeView: 'portfolio' | 'admin' | 'architecture' | 'api';
  setActiveView: (view: 'portfolio' | 'admin' | 'architecture' | 'api') => void;
  isDark: boolean;
  toggleTheme: () => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  isDark,
  toggleTheme,
  isAdminLoggedIn,
  onLogout,
  unreadCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-neutral-950/85 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveView('portfolio')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="navbar-brand">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
            PT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Panha Teng
            </span>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              Financial Backend &amp; Architecture
            </span>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs">
          <button
            onClick={() => setActiveView('portfolio')}
            id="nav-view-portfolio"
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'portfolio'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}>
            <Layout className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          <button
            onClick={() => setActiveView('architecture')}
            id="nav-view-architecture"
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'architecture'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}>
            <Code2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">Architecture &amp; Code</span>
          </button>

          <button
            onClick={() => setActiveView('api')}
            id="nav-view-api"
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'api'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}>
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">REST API</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            id="nav-view-admin"
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'admin'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}>
            <Shield className="w-3.5 h-3.5 text-purple-500" />
            <span>Admin</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {isAdminLoggedIn && (
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Session Active (admin)
              </span>
              <button
                onClick={onLogout}
                id="btn-nav-logout"
                className="text-xs text-rose-600 hover:underline cursor-pointer">
                Logout
              </button>
            </div>
          )}

          <button
            onClick={toggleTheme}
            id="btn-toggle-theme"
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
