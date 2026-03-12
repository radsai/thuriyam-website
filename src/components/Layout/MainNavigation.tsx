import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const MobileDropdown: React.FC<{
  label: string;
  children: NavItem[];
  onClose: () => void;
}> = ({ label, children, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium hover:bg-accent rounded-lg"
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
                />
              );
            }
            // Regular menu items
            return (
              <Link
                key={child.path}
                to={child.path || '#'}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
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

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Platform',
    children: [
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

const MainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isPrelaunchPage = location.pathname.startsWith('/prelaunch');

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };


  return (
    <header className="sticky top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ zIndex: 10000 }}>
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between relative" style={{ zIndex: 10000 }}>
        {/* Logo */}
        <Link to="/" className="flex items-center relative" style={{ zIndex: 10001 }}>
          <Logo className="text-foreground" size={40} showText={true} />
        </Link>

        {/* Desktop Navigation - Hidden on prelaunch page */}
        {!isPrelaunchPage && (
          <nav className="hidden lg:flex items-center gap-1 relative" style={{ zIndex: 10001 }}>
            {navItems.map((item) => {
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
                      className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActive(item.path) || openDropdown === item.label
                          ? 'text-foreground bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="inline-block ml-1 w-4 h-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                        {item.children.map((child) => {
                          if (child.children) {
                            return (
                              <div
                                key={child.label}
                                className="relative"
                                onMouseEnter={() => setOpenNestedDropdown(child.label)}
                                onMouseLeave={() => setOpenNestedDropdown(null)}
                              >
                                <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-between">
                                  {child.label}
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                                {openNestedDropdown === child.label && (
                                  <div className="absolute left-full top-0 ml-1 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                                    {child.children.map((nested) => (
                                      <Link
                                        key={nested.path}
                                        to={nested.path || '#'}
                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
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
                              className={`block px-4 py-2 text-sm transition-colors ${
                                isActive(child.path)
                                  ? 'text-foreground bg-accent'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
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
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive(item.path)
                      ? 'text-foreground bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* CTA Buttons - Hidden on prelaunch page */}
        {!isPrelaunchPage && (
          <div className="hidden lg:flex items-center gap-3 relative" style={{ zIndex: 10001 }}>
            <Link to="/signin">
              <button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-9 px-4 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-9 px-4 text-sm bg-black text-white hover:bg-black/90">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
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
            className="lg:hidden border-t border-border bg-background"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {!isPrelaunchPage && (
                <>
                  {navItems.map((item) => (
                    <MobileDropdown key={item.label} label={item.label} children={item.children || []} onClose={() => setIsMobileMenuOpen(false)} />
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link to="/signin" className="block">
                      <button className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-9 px-4 text-sm border border-border bg-background hover:bg-accent hover:text-accent-foreground">
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

