import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getVersionConfigForPath } from '@/config/versionRoutes';

export const VersionSelector: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const config = getVersionConfigForPath(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!config || config.versions.length <= 1) {
    return null;
  }

  const currentVersion = config.versions.find((v) => {
    if (v.path === '/') return location.pathname === '/';
    return location.pathname === v.path || location.pathname.startsWith(v.path + '/');
  });
  const currentLabel = currentVersion?.label ?? '—';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg border border-border/60 transition-colors"
      >
        <span className="hidden sm:inline">{config.pageName}</span>
        <span>{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-lg shadow-lg py-2 z-[10002]">
          {config.versions.map((version) => {
            const isActive = location.pathname === version.path || (version.path !== '/' && location.pathname.startsWith(version.path));
            return (
              <Link
                key={version.path}
                to={version.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isActive ? 'text-foreground bg-accent font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {version.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
