/**
 * Platform Overview — Marketing page for the platform hub.
 * Editorial, website-style. No dashboard UI.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';

const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-6xl ${className}`}>
    {children}
  </div>
);

const FEATURES = [
  {
    title: 'Studio',
    description: 'Build outcome-driven agents. Define the outcome; agents act.',
    icon: Bot,
    path: '/platform/studio/v3',
  },
  {
    title: 'IQA',
    description: 'Interaction Quality Analytics. Monitor, measure, improve.',
    icon: BarChart3,
    path: '/platform/iqa',
  },
  {
    title: 'Multi-Agent Orchestration',
    description: 'Coordinate agents across workflows seamlessly.',
    icon: GitBranch,
    path: '/platform/studio/v3',
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security, compliant by design.',
    icon: ShieldCheck,
    path: '/platform/security',
  },
];

const PlatformOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero — editorial, not dashboard */}
        <Section className="pt-8 pb-12 md:pt-16 md:pb-20 bg-gradient-to-b from-slate-50/80 to-background">
          <Container>
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
                  Platform
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  The Agentic Platform for Autonomous Operations
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                  Build, deploy, and monitor agents that deliver outcomes. Outcome-driven. Event-driven. Secure.
                </p>
                <Link
                  to="/platform/studio/v3"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Go to Studio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Features — editorial cards */}
        <Section className="bg-white">
          <Container>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-12"
            >
              Platform capabilities
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={feature.path}
                      className="group flex gap-6 p-0 border-0 bg-transparent hover:bg-transparent"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Updates — subtle highlight */}
        <Section className="bg-slate-50/50">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                Latest
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Event-driven agents
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Agents that respond when it happens—new ticket, SLA breach, inbound request. No queue, no wait, no manual handoff.
              </p>
              <Link
                to="/v4"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-700"
              >
                See how it works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default PlatformOverviewPage;
