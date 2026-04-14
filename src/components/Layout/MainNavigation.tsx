import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { VersionSelector } from './VersionSelector';
import type { NavItem } from '@/types/nav';
import { cn } from '@/lib/utils';

export type { NavItem };

const MobileDropdown: React.FC<{
  label: string;
  children: NavItem[];
  onClose: () => void;
  dark?: boolean;
}> = ({ label, children, onClose, dark = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium',
          dark ? 'text-zinc-200 hover:bg-zinc-800' : 'hover:bg-accent'
        )}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="pl-4 space-y-1">
          {children.map((child) => {
            // Handle nested dropdowns
            if (child.children) {
              return (
                <MobileDropdown
                  key={child.label}
                  label={child.label}
                  children={child.children}
                  onClose={onClose}
                  dark={dark}
                />
              );
            }
            // Regular menu items
            return (
              <Link
                key={child.path}
                to={child.path || '#'}
                className={cn(
                  'block rounded-lg px-4 py-2 text-sm',
                  dark
                    ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
                onClick={onClose}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const defaultNavItems: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'Overview', path: '/platform/overview' },
      { label: 'Studio', path: '/platform/studio' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'By Function', path: '/solutions/horizontal' },
      { label: 'IQA', path: '/platform/iqa' },
    ],
  },
  { label: 'Developers', path: '/developers' },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', path: '/resources/blog' },
    ],
  },
];

interface MainNavigationProps {
  navItems?: NavItem[];
  logoLink?: string;
  /** Dark header for Home v9 and similar full-bleed dark pages */
  variant?: 'default' | 'dark';
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  navItems = defaultNavItems,
  logoLink = '/',
  variant = 'default',
}) => {
  const dark = variant === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isPrelaunchPage = location.pathname.startsWith('/prelaunch');
  const hideDevelopers = location.pathname === '/solutions/horizontal' || location.pathname === '/platform/iqa' || location.pathname.startsWith('/resources/blog');
  const effectiveNavItems = hideDevelopers ? navItems.filter((item) => item.label !== 'Developers') : navItems;

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };


  return (
    <header
      className={cn(
        'sticky top-0 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60',
        dark
          ? 'border-zinc-800 bg-zinc-950/95 supports-[backdrop-filter]:bg-zinc-950/80'
          : 'border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60'
      )}
      style={{ zIndex: 10000 }}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between relative" style={{ zIndex: 10000 }}>
        {/* Logo */}
        <Link to={logoLink} className="flex items-center relative" style={{ zIndex: 10001 }}>
          <Logo className="text-foreground" size={40} showText={true} invert={dark} />
        </Link>

        {/* Desktop Navigation - Hidden on prelaunch page */}
        {!isPrelaunchPage && (
          <nav className="hidden lg:flex items-center gap-1 relative" style={{ zIndex: 10001 }}>
            {effectiveNavItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (closeTimeout) {
                        clearTimeout(closeTimeout);
                        setCloseTimeout(null);
                      }
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 200);
                      setCloseTimeout(timeout);
                    }}
                  >
                    <button
                      className={cn(
                        'px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                        dark
                          ? isActive(item.path) || openDropdown === item.label
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                          : isActive(item.path) || openDropdown === item.label
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="inline-block ml-1 w-4 h-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className={cn(
                          'absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border py-2 shadow-lg',
                          dark ? 'border-zinc-700 bg-zinc-900' : 'border-border bg-background'
                        )}
                      >
                        {item.children.map((child) => {
                          if (child.children) {
                            return (
                              <div
                                key={child.label}
                                className="relative"
                                onMouseEnter={() => setOpenNestedDropdown(child.label)}
                                onMouseLeave={() => setOpenNestedDropdown(null)}
                              >
                                <button
                                  className={cn(
                                    'flex w-full items-center justify-between px-4 py-2 text-left text-sm',
                                    dark
                                      ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                  )}
                                >
                                  {child.label}
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                                {openNestedDropdown === child.label && (
                                  <div
                                    className={cn(
                                      'absolute left-full top-0 z-50 ml-1 w-48 rounded-lg border py-2 shadow-lg',
                                      dark ? 'border-zinc-700 bg-zinc-900' : 'border-border bg-background'
                                    )}
                                  >
                                    {child.children.map((nested) => (
                                      <Link
                                        key={nested.path}
                                        to={nested.path || '#'}
                                        className={cn(
                                          'block px-4 py-2 text-sm',
                                          dark
                                            ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                        )}
                                      >
                                        {nested.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={child.path}
                              to={child.path || '#'}
                              className={cn(
                                'block px-4 py-2 text-sm transition-colors',
                                dark
                                  ? isActive(child.path)
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                  : isActive(child.path)
                                    ? 'bg-accent text-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path || '#'}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    dark
                      ? isActive(item.path)
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      : isActive(item.path)
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Version Selector (top right) + CTA Buttons */}
        <div
          className={cn(
            'relative hidden items-center gap-3 lg:flex',
            dark && '[&_button]:border-zinc-700 [&_button]:text-zinc-300 [&_button]:hover:bg-zinc-800'
          )}
          style={{ zIndex: 10001 }}
        >
          <VersionSelector />
          {!isPrelaunchPage && (
            <>
              <Link to="/signin">
                <button
                  className={cn(
                    'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                    dark
                      ? 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-9 px-4 text-sm bg-black text-white hover:bg-black/90">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            'p-2 lg:hidden',
            dark ? 'text-zinc-300 hover:text-white' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn('border-t lg:hidden', dark ? 'border-zinc-800 bg-zinc-950' : 'border-border bg-background')}
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <div className={cn('mb-4 border-b pb-4 lg:hidden', dark ? 'border-zinc-800' : 'border-border')}>
                <div className={cn(dark && '[&_button]:border-zinc-700 [&_button]:text-zinc-300')}>
                  <VersionSelector />
                </div>
              </div>
              {!isPrelaunchPage && (
                <>
                  {effectiveNavItems.map((item) =>
                    item.children?.length ? (
                      <MobileDropdown
                        key={item.label}
                        label={item.label}
                        children={item.children}
                        onClose={() => setIsMobileMenuOpen(false)}
                        dark={dark}
                      />
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path || '#'}
                        className={cn(
                          'block rounded-lg px-4 py-2 text-sm font-medium',
                          dark
                            ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                  <div className="pt-4 space-y-2">
                    <Link to="/signin" className="block">
                      <button
                        className={cn(
                          'inline-flex h-9 w-full items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                          dark
                            ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                            : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link to="/signup" className="block">
                      <button className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-9 px-4 text-sm bg-black text-white hover:bg-black/90">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainNavigation;

