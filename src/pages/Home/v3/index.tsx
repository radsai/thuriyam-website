import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, Calendar, ArrowRight, Bot, User } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { v3NavItems } from '@/config/v3Nav';

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

const HomeV3Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans" style={{ position: 'relative', zIndex: 1 }}>
      <MainNavigation navItems={v3NavItems} logoLink="/v3" />

      <main style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {/* 1. Hero */}
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-visible" style={{ minHeight: '500px' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
          </div>
          <div className="relative" style={{ zIndex: 10 }}>
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#1e293b' }}>
                    Proactive Agents That Deliver Outcomes
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
            </Container>
          </div>
          <style>{`
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob { animation: blob 7s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
          `}</style>
        </section>

        {/* 2. Three Pillars */}
        <Section>
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
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Proactive by Default',
                  tagline: 'Agents that act before you ask',
                  description: 'From reactive to proactive. Agents anticipate, initiate, and act without waiting for prompts—monitoring, detecting, and responding to what matters.',
                },
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

        {/* 3. Beyond RPA */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#1e293b' }}>
                Beyond RPA: From Scripts to Intelligence
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-12" style={{ color: '#64748b' }}>
                RPA is brittle. Agentic is adaptive. Move from rigid scripts to goal-based, intelligent agents that handle change.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h4 className="font-bold text-lg mb-4 text-red-700">RPA</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Brittle, script-based</li>
                    <li>• Breaks when processes change</li>
                    <li>• Manual maintenance</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h4 className="font-bold text-lg mb-4 text-green-700">Agentic</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Goal-based, adaptive</li>
                    <li>• Handles change intelligently</li>
                    <li>• Self-improving</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/resources/blog/end-of-manual-company"
                  className="text-black font-medium hover:underline inline-flex items-center gap-2"
                >
                  Read: The End of the Manual Company
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* 4. HITL Where It Matters */}
        <Section>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1e293b' }}>
                Humans Where Judgment Matters. Agents Everywhere Else.
              </h2>
              <p className="text-lg text-muted-foreground mb-12" style={{ color: '#64748b' }}>
                HITL only where it counts. Agents handle the routine; humans focus on exceptions, empathy, and decisions that matter.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4">
                  <Bot className="w-10 h-10 text-black" />
                  <div className="text-left">
                    <p className="font-semibold">Agents</p>
                    <p className="text-sm text-muted-foreground">Routine, scale, 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4">
                  <User className="w-10 h-10 text-black" />
                  <div className="text-left">
                    <p className="font-semibold">Humans</p>
                    <p className="text-sm text-muted-foreground">Judgment, empathy, exceptions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* 5. Platform Teaser */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1e293b' }}>
                Studio & IQA: Built for Outcomes
              </h2>
              <p className="text-muted-foreground" style={{ color: '#64748b' }}>
                Define outcomes in the Studio. Measure and improve with IQA. No Security or Guardrails pages—framed around what matters.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link
                to="/platform/studio"
                className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>Studio</h3>
                <p className="text-muted-foreground mb-4">Outcome-first agent design. Goals, not scripts.</p>
                <span className="text-black font-medium inline-flex items-center gap-2">
                  Explore Studio <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/platform/iqa"
                className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>IQA</h3>
                <p className="text-muted-foreground mb-4">Analytics that drive improvement. Measure what matters.</p>
                <span className="text-black font-medium inline-flex items-center gap-2">
                  Explore IQA <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Container>
        </Section>

        {/* 6. CTA */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                See How Proactive Agents Can Transform Your Operations
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

export default HomeV3Page;
