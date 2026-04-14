import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, GitBranch, BarChart3, Sparkles } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { TraditionalVsEventDrivenHero } from '@/components/animations/TraditionalVsEventDrivenHero';
import { OneLoopCardPlayer } from '@/components/remotion/OneLoopCardPlayer';
import { v11NavItems } from '@/config/v11Nav';

const Section = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>{children}</div>
);

/** Single merged trio: agents + workflow + IQA — no duplicate pillar grid */
const LOOP_CARDS = [
  {
    icon: Bot,
    title: 'Agents',
    lead: 'Define what “done” means. Agents follow through—on policy, on brand, on the outcome you set.',
    detail: 'Less one-off prompting; more behavior you can stand behind in production.',
  },
  {
    icon: GitBranch,
    title: 'Workflow',
    lead: 'Intuitive paths for real work: events, approvals, handoffs—so agents aren’t floating outside how your team actually operates.',
    detail: 'Paths that match how your team really works—events, approvals, and handoffs in one place.',
  },
  {
    icon: BarChart3,
    title: 'IQA',
    lead: 'See what happened in the wild: what worked, what broke, what to fix next.',
    detail: 'Proof feeds the next version—so learning stays tied to your runs, not a black box.',
  },
] as const;

const HomeV11Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground" style={{ position: 'relative', zIndex: 1 }}>
      <MainNavigation navItems={v11NavItems} logoLink="/v11" />

      <main style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {/* 1. Hero — two columns */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/90">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

          <Container className="py-12 md:py-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Durable agents · Intuitive workflow · Proof from IQA
                </p>
                <h1 className="font-bold leading-[1.2] text-slate-900" style={{ color: '#0f172a' }}>
                  <span className="block text-2xl font-semibold text-slate-600 md:text-3xl">When your process changes,</span>
                  <span className="mt-2 block text-2xl font-semibold text-slate-600 md:text-3xl">fragile agents fall apart.</span>
                  <span className="mt-5 block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-4xl text-transparent md:mt-6 md:text-5xl lg:text-[3.25rem]">
                    Thuriyam doesn&apos;t.
                  </span>
                </h1>
                <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl lg:mx-0">
                  Build <span className="font-semibold text-slate-800">durable</span> agents in Studio, run them in{' '}
                  <span className="font-semibold text-slate-800">workflow</span> you own, and let{' '}
                  <Link to="/platform/iqa" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-600">
                    IQA
                  </Link>{' '}
                  show what really happened—so your automations{' '}
                  <span className="font-semibold text-slate-800">keep learning</span> instead of stalling after launch.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Link
                    to="/platform/studio/v3"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-8 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-900"
                  >
                    Build in Studio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/solutions/demo"
                    className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Explore demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>

              {/* Right column: Remotion “One loop” card — sequential reveal + looping */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
              >
                <OneLoopCardPlayer />
              </motion.div>
            </div>
          </Container>
        </section>

        {/* 2. Traditional vs event-driven (was third block — now second) */}
        <section className="border-b border-slate-200/80 bg-white py-12 md:py-16">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TraditionalVsEventDrivenHero />
            </motion.div>
          </Container>
        </section>

        {/* 3. Agents / workflow / IQA cards (was second — now third) */}
        <section className="border-b border-slate-200/80 bg-slate-50/90 py-14 md:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mx-auto max-w-5xl"
            >
              <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl" style={{ color: '#1e293b' }}>
                Agents, workflow, and IQA—in one loop
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600 md:text-lg">
                Design in Studio, run in workflow, improve from IQA—intuitive blocks, aligned on outcomes.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {LOOP_CARDS.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm ring-1 ring-slate-100"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <item.icon className="h-6 w-6 text-slate-900" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ color: '#1e293b' }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.lead}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-center text-sm leading-relaxed text-slate-600"
              >
                <span className="font-medium text-slate-800">Same loop, one platform: </span>
                durable agents + workflow + IQA—not a grab-bag of unrelated tools.
              </motion.p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Learning stays grounded in your runs and your rules—never opaque.</span>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* CTA */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to build agents that last?</h2>
              <p className="mb-8 text-lg text-white/90">Start in Studio, connect workflow, and let IQA show what to improve next.</p>
              <Link
                to="/platform/studio/v3"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 font-semibold text-black transition-colors hover:bg-white/90"
              >
                See how it works
                <ArrowRight className="ml-2 h-5 w-5 text-black" />
              </Link>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeV11Page;
