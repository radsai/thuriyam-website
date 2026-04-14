import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Calendar, ArrowRight, Handshake } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { TraditionalVsEventDrivenHero } from '@/components/animations/TraditionalVsEventDrivenHero';
import { v4NavItems } from '@/config/v4Nav';

const Section = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>
    {children}
  </div>
);

const HomeV4Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans" style={{ position: 'relative', zIndex: 1 }}>
      <MainNavigation navItems={v4NavItems} logoLink="/v4" />

      <main style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {/* 1. Hero with Traditional vs Event-Driven */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-28 bg-white relative overflow-hidden">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#1e293b' }}>
                  Agents That Deliver Outcomes
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={{ color: '#64748b' }}>
                  Define the outcome. Agents act. Less manual work. Fewer escalations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
                  <Link
                    to="/platform/studio"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-white bg-black hover:bg-black transition-colors"
                  >
                    See How It Works
                    <ArrowRight className="ml-2 w-5 h-5 text-white" />
                  </Link>
                  <Link
                    to="/solutions/demo"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium border border-slate-700 text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    Explore Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Traditional vs Event-Driven Hero (NuPlay style) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TraditionalVsEventDrivenHero />
            </motion.div>
          </Container>
        </section>

        {/* 2. Platform Pillars */}
        <Section className="bg-slate-50/50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: '#1e293b' }}
              >
                The Agentic Platform for Autonomous Operations
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Target,
                  title: 'Outcome-Driven',
                  tagline: 'Define the outcome. Agents deliver.',
                  description: 'Success is measured by business outcomes—revenue, SLA, compliance. Outcomes, not outputs. No rigid flowcharts, no step-by-step scripts.',
                },
                {
                  icon: Calendar,
                  title: 'Event-Driven',
                  tagline: 'When it happens, agents respond',
                  description: 'Triggered by events, not manual invocation. Inbound ticket, SLA breach, repeat caller—event-triggered autonomy that scales.',
                },
                {
                  icon: Handshake,
                  title: 'HITL Where It Matters',
                  tagline: 'Humans where judgment matters. Agents everywhere else.',
                  description: 'Agents handle routine work at scale; humans focus on exceptions, empathy, and decisions that matter. Escalation and approval flows are built in.',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-6 p-4 bg-gray-100 rounded-xl w-fit">
                    {React.createElement(pillar.icon, { className: 'w-12 h-12 text-black' })}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">{pillar.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed" style={{ color: '#64748b' }}>{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. CTA */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                See How Agents Can Transform Your Operations
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Define the outcome. Let agents deliver. Less manual work. Fewer escalations.
              </p>
              <Link
                to="/platform/studio"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-black bg-white hover:bg-white/90 transition-colors"
              >
                See How It Works
                <ArrowRight className="ml-2 w-5 h-5 text-black" />
              </Link>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeV4Page;
