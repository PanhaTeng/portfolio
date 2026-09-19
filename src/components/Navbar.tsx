import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-neutral-950/85 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <a 
          href="#"
          className="flex items-center gap-2.5 group"
          id="navbar-brand">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
            PT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Panha Teng
            </span>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              Senior Backend Developer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className="px-3.5 py-1.5 rounded-lg hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer">
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
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

          <button
            onClick={() => handleScroll('#contact')}
            id="btn-nav-contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            id="btn-mobile-menu"
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
              {link.name}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => handleScroll('#contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
