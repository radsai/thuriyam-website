import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Twitter, Linkedin, Github, Youtube, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const Container = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>
    {children}
  </div>
);

const Footer: React.FC = () => {
  const location = useLocation();
  const isPrelaunchPage = location.pathname.startsWith('/prelaunch');
  const isV3Page = location.pathname.startsWith('/v3') || location.pathname.startsWith('/platform/studio/v3');
  const isResourcesBlog = location.pathname.startsWith('/resources/blog');
  const isDarkHomeVariant = location.pathname === '/v9' || location.pathname === '/v10';

  return (
    <footer
      className={
        isDarkHomeVariant
          ? 'border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-300 [&_a]:text-zinc-400 [&_a:hover]:text-white [&_h3]:text-zinc-100 [&_p.text-sm]:text-zinc-500'
          : 'border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 py-12'
      }
    >
      <Container>
        {isPrelaunchPage ? (
          // Simplified footer for prelaunch pages
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex flex-col items-start mb-6 md:mb-0">
                <div className="mb-4">
                  <Logo className="text-foreground" size={40} showText={true} invert={isDarkHomeVariant} />
                </div>
                <p className="text-sm text-slate-600">
                  The Operating System for Your AI Workforce
                </p>
              </div>
              {/* Social Media Links - Centered */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://twitter.com/thuriyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/thuriyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/thuriyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@thuriyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/thuriyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div
              className={`pt-8 border-t text-center text-sm ${
                isDarkHomeVariant ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-600'
              }`}
            >
              © 2026 Thuriyam. All rights reserved.
            </div>
          </>
        ) : (
          // Full footer for main website
          <>
            <div className={`grid grid-cols-1 gap-8 mb-8 ${(isV3Page || isResourcesBlog) ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
              {/* Logo and Tagline */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <Logo className="text-foreground" size={40} showText={true} invert={isDarkHomeVariant} />
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  The Operating System for Your AI Workforce
                </p>
                {/* Social Media Links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/thuriyam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/thuriyam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/thuriyam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@thuriyam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://discord.gg/thuriyam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Discord"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Product (v3: Studio and IQA only per vision) */}
              <div>
                <h3 className="font-semibold text-sm mb-4 text-foreground">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/platform/studio" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      Studio
                    </Link>
                  </li>
                  {!isV3Page && (
                    <li>
                      <Link to="/platform/security" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        Security
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/platform/iqa" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      IQA
                    </Link>
                  </li>
                  {!isV3Page && (
                    <li>
                      <Link to="/platform/guardrails" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        Guardrails
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-sm mb-4 text-foreground">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/resources/blog" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="https://twitter.com/thuriyam" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/company/thuriyam" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Developers Bay (hidden on v3 per vision, hidden on resources/blog) */}
              {!isV3Page && !isResourcesBlog && (
                <div>
                  <h3 className="font-semibold text-sm mb-4 text-foreground">Developers Bay</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/developers" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link to="/developers/v2" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        API Reference
                      </Link>
                    </li>
                    <li>
                      <a href="https://github.com/thuriyam" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div
              className={`pt-8 border-t text-center text-sm ${
                isDarkHomeVariant ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-600'
              }`}
            >
              © 2026 Thuriyam. All rights reserved.
            </div>
          </>
        )}
      </Container>
    </footer>
  );
};

export default Footer;

