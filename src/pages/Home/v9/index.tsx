import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Eye,
  Building2,
  Shield,
  Lock,
  FileCheck,
  Zap,
  Bell,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Users,
  Headphones,
  LineChart,
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { v9NavItems } from '@/config/v9Nav';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>{children}</div>
);

/** Kinetic flywheel: Studio ↔ Workflows ↔ IQA ↔ Evolve */
const FlywheelVisual: React.FC = () => {
  const nodes = [
    { id: 'build', label: 'DESIGN', sub: 'Studio', angle: -90 },
    { id: 'act', label: 'RUN', sub: 'Automations', angle: 0 },
    { id: 'observe', label: 'MEASURE', sub: 'IQA', angle: 90 },
    { id: 'evolve', label: 'IMPROVE', sub: 'Updates', angle: 180 },
  ];
  const r = 42;
  const cx = 50;
  const cy = 50;

  return (
    <div className="relative mx-auto aspect-square max-w-md">
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-2xl">
        <defs>
          <linearGradient id="flywheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <motion.g
          style={{ transformOrigin: '50px 50px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke="url(#flywheelGrad)" strokeWidth="0.35" strokeDasharray="1.5 2" />
        </motion.g>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#flywheelGrad)" strokeWidth="0.4" className="animate-pulse" />
        {nodes.map((n, i) => {
          const rad = ((n.angle - 90) * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={n.id}>
              <motion.circle
                cx={x}
                cy={y}
                r="7"
                className="fill-zinc-900 stroke-cyan-500/60"
                strokeWidth="0.35"
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.92, 1, 0.92] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              />
              <text x={x} y={y + 0.8} textAnchor="middle" className="fill-cyan-400 font-bold" style={{ fontSize: '2.8px' }}>
                {n.label.slice(0, 1)}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy - 2} textAnchor="middle" className="fill-zinc-300 font-bold" style={{ fontSize: '3px' }}>
          MEASURE · REFINE
        </text>
        <text x={cx} y={cy + 3} textAnchor="middle" className="fill-zinc-500" style={{ fontSize: '2.2px' }}>
          From production, not slides
        </text>
      </svg>
      <ul className="mt-6 space-y-2 text-center text-sm text-zinc-500 md:hidden">
        {nodes.map((n) => (
          <li key={n.id}>
            <span className="font-semibold text-zinc-300">{n.label}</span> · {n.sub}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MiniCaseStudies = () => {
  const slides = [
    {
      company: 'Partner operations',
      problem: 'Escalations spiked every Friday; teams chased deadlines manually.',
      outcome: 'In three weeks, clearer wording and routing cut how often issues escalated.',
      metric: '−34% escalations',
    },
    {
      company: 'Customer success',
      problem: 'Replies sounded confident but sometimes missed policy details.',
      outcome: 'Analytics flagged the gaps; the team updated guidance—fewer handoffs to people.',
      metric: '−41% policy errors',
    },
    {
      company: 'Revenue operations',
      problem: 'Playbooks couldn’t keep up with seasonal demand.',
      outcome: 'Faster routing and smarter handoffs—when something happens, the system responds.',
      metric: '4.2m → <2s response',
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((s) => (s + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 md:p-10">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500/90">Example story</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-sm text-zinc-500">{slides[i].company}</p>
          <p className="text-lg font-medium text-zinc-100">
            <span className="text-zinc-500">Problem: </span>
            {slides[i].problem}
          </p>
          <p className="text-zinc-300">{slides[i].outcome}</p>
          <p className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
            {slides[i].metric}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous"
          className="rounded-lg border border-zinc-700 p-2 text-zinc-400 hover:bg-zinc-800"
          onClick={() => setI((s) => (s - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`h-2 w-2 rounded-full ${idx === i ? 'bg-cyan-500' : 'bg-zinc-600'}`}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
        <button
          type="button"
          aria-label="Next"
          className="rounded-lg border border-zinc-700 p-2 text-zinc-400 hover:bg-zinc-800"
          onClick={() => setI((s) => (s + 1) % slides.length)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

type DemoPhase = 'idle' | 'breach' | 'route' | 'done';

const SlaTriggerDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');

  const run = () => {
    setPhase('breach');
    setTimeout(() => setPhase('route'), 600);
    setTimeout(() => setPhase('done'), 1400);
    setTimeout(() => setPhase('idle'), 3200);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Try a quick example</h3>
          <p className="text-sm text-zinc-500">Tap the button—see how a missed deadline triggers the next step.</p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={phase !== 'idle'}
          className="shrink-0 rounded-xl bg-amber-500/90 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 disabled:opacity-50"
        >
          Missed deadline
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 md:items-center">
        <div
          className={`rounded-xl border p-4 transition-colors ${
            phase === 'breach' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 bg-zinc-950/50'
          }`}
        >
          <Bell className="mb-2 h-5 w-5 text-amber-400" />
          <div className="text-xs text-zinc-500">What happened</div>
          <div className="font-mono text-sm text-zinc-200">Urgent ticket waiting too long</div>
        </div>
        <div
          className={`rounded-xl border p-4 transition-colors ${
            phase === 'route' || phase === 'done' ? 'border-cyan-500 bg-cyan-500/10' : 'border-zinc-700 bg-zinc-950/50'
          }`}
        >
          <Cpu className="mb-2 h-5 w-5 text-cyan-400" />
          <div className="text-xs text-zinc-500">Automation</div>
          <div className="font-mono text-sm text-zinc-200">
            {phase === 'idle' && 'Waiting'}
            {phase === 'breach' && 'Starting…'}
            {(phase === 'route' || phase === 'done') && 'Reroute + notify owner'}
          </div>
        </div>
        <div
          className={`rounded-xl border p-4 transition-colors ${
            phase === 'done' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-950/50'
          }`}
        >
          <Zap className="mb-2 h-5 w-5 text-emerald-400" />
          <div className="text-xs text-zinc-500">Result</div>
          <div className="font-mono text-sm text-zinc-200">
            {phase !== 'done' && '—'}
            {phase === 'done' && 'Back on track · on record'}
          </div>
        </div>
      </div>
    </div>
  );
};

const IQALiveFeedback: React.FC = () => (
  <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
      <div className="mb-2 text-xs font-semibold uppercase text-zinc-500">Conversation</div>
      <p className="font-mono text-sm leading-relaxed text-zinc-300">
        User: &quot;Why was my refund split across two cycles?&quot;
        <br />
        <span className="text-zinc-500">Agent: explains policy (slightly ambiguous phrasing)</span>
      </p>
    </div>
    <div className="rounded-xl border border-violet-500/30 bg-violet-950/30 p-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-violet-300">
        <Eye className="h-4 w-4" /> What we notice
      </div>
      <p className="text-sm text-zinc-200">
        Customers stumble on <span className="text-violet-300">&quot;split refund&quot;</span> wording—the intent was fine; the phrasing wasn’t.
      </p>
      <p className="mt-3 text-xs text-zinc-500">More than a dashboard—clear next steps for your team.</p>
    </div>
    <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-5">
      <div className="mb-2 text-xs font-semibold uppercase text-cyan-400">Builder</div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
        </span>
        <span className="text-sm font-medium text-cyan-100">Update applied: clearer refund wording</span>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Next conversations use the improved wording automatically.</p>
    </div>
  </div>
);

const HomeV9Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased" style={{ position: 'relative', zIndex: 1 }}>
      <MainNavigation navItems={v9NavItems} logoLink="/v9" variant="dark" />

      <main style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {/* Hero */}
        <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(34,211,238,0.15), transparent 40%),
                radial-gradient(circle at 80% 10%, rgba(167,139,250,0.12), transparent 35%),
                linear-gradient(to bottom, rgba(9,9,11,0), rgb(9,9,11))`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="relative z-10 max-w-xl"
              >
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-400">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Customer journeys · back-office execution · proof you can audit
                </p>
                <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.05rem]">
                  From signal to resolution—
                  <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    without the usual gaps.
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
                  Most teams don’t lack automation; they lack <span className="text-zinc-300">closure</span>: who acts when something breaks, whether policy held, and what to change next. Thuriyam ties the front conversation to the systems behind it—measured end to end—so you’re not tuning models from anecdotes.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/solutions/demo"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Schedule a demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-600 px-8 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900"
                  >
                    See how it works
                  </a>
                </div>
                <p className="mt-6 text-sm text-zinc-500">
                  Below: how we build, run, and measure—without drowning you in product names up front.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-sm md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">At a glance</div>
                      <div className="text-sm text-zinc-300">Queues and handoffs vs. triggered execution</div>
                    </div>
                    <Building2 className="h-8 w-8 text-zinc-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/80 p-4">
                      <div className="text-xs text-zinc-500">Typical setup</div>
                      <div className="mt-2 space-y-2">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="h-2 rounded bg-zinc-800" style={{ width: `${100 - n * 12}%` }} />
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-zinc-600">Queues · handoffs · playbooks that don’t adapt</p>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/50 to-zinc-950 p-4">
                      <motion.div
                        className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="text-xs text-cyan-400/90">With Thuriyam</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {['CRM', 'Ticketing', 'Voice', 'Policy'].map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="relative z-10 mt-3 text-xs text-zinc-400">Event in → action out · evidence captured</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Closed-loop flywheel */}
        <section id="how-it-works" className="scroll-mt-24 border-t border-zinc-900 bg-zinc-950 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">A loop you can defend in a review</h2>
              <p className="mt-4 text-lg text-zinc-400">
                Quarterly audits guess at what broke. Thuriyam is built so <span className="text-zinc-300">production traffic</span> shows what worked—then that evidence feeds the next change. Same stack for design, execution, and measurement (Studio, workflows, IQA—linked where it matters).
              </p>
            </div>
            <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
              <FlywheelVisual />
              <div className="space-y-6">
                {[
                  {
                    title: 'Define success and boundaries',
                    body: 'In Studio: outcomes and guardrails first—so execution isn’t a maze of one-off steps.',
                  },
                  {
                    title: 'Execute on real signals',
                    body: 'Tickets, SLAs, spikes—automation runs across the CRM, ticketing stack, and policy tools you already use.',
                  },
                  {
                    title: 'Record what occurred',
                    body: 'IQA scores the interaction against your rules: accuracy, tone, compliance—so “what went wrong” is evidence-backed.',
                  },
                  {
                    title: 'Ship the next fix deliberately',
                    body: 'Friction rolls back into Studio as changes you approve—not a vague “model update.”',
                  },
                ].map((row) => (
                  <div key={row.title} className="flex gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    <div>
                      <div className="font-semibold text-zinc-100">{row.title}</div>
                      <p className="mt-1 text-sm text-zinc-500">{row.body}</p>
                    </div>
                  </div>
                ))}
                <Link
                  to="/platform/iqa"
                  className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  IQA: quality analytics in depth
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Evolution gap metrics */}
        <section className="border-t border-zinc-900 py-20 md:py-24">
          <Container>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">What shifts in the numbers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-500">
              Illustrative deltas—where measured feedback and faster execution typically show up first.
            </p>
            <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400">
                    <th className="px-4 py-3 font-medium">Metric</th>
                    <th className="px-4 py-3 font-medium">Static</th>
                    <th className="px-4 py-3 font-medium text-cyan-400/90">Thuriyam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {[
                    ['Response time', '4.2m (queued)', '<2s (instant)'],
                    ['Improvement cycle', 'Monthly manual audits', 'Feedback from live traffic'],
                    ['Containment', '22% (fixed playbooks)', '72% (measured iteration)'],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="hover:bg-zinc-900/30">
                      <td className="px-4 py-4 font-medium text-zinc-200">{a}</td>
                      <td className="px-4 py-4 text-zinc-500">{b}</td>
                      <td className="px-4 py-4 text-emerald-400/90">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Personas */}
        <section className="border-t border-zinc-900 bg-zinc-950/80 py-20 md:py-24">
          <Container>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">Who feels it first</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-500">
              The job titles vary; the pain is the same—surprises in production and weak paper trails.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: LineChart,
                  role: 'Director of Operations',
                  pain: 'SLA misses and firefighting every sprint.',
                  win: 'Signals surface early; you see where execution broke—not just that volume went up.',
                },
                {
                  icon: Headphones,
                  role: 'Customer Success Lead',
                  pain: 'Front line sounds confident but policy slips through.',
                  win: 'Scored interactions show what to fix; fewer surprises escalated to your leads.',
                },
                {
                  icon: Users,
                  role: 'Head of Digital / Transformation',
                  pain: 'Pilots that stall because nobody owns the measurement story.',
                  win: 'One thread from design to production evidence—easier to fund the next phase.',
                },
              ].map((p) => (
                <div key={p.role} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                  <p.icon className="mb-4 h-8 w-8 text-cyan-500/80" />
                  <h3 className="text-lg font-semibold text-white">{p.role}</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    <span className="text-zinc-400">Daily headache: </span>
                    {p.pain}
                  </p>
                  <p className="mt-3 text-sm text-zinc-300">{p.win}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Trust strip */}
        <section className="border-t border-zinc-900 py-12">
          <Container>
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">Built for regulated, high-stakes operations</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-zinc-600">
              {['FinTech', 'Healthcare', 'BFSI', 'Retail ops'].map((x) => (
                <span key={x} className="text-sm font-medium">
                  {x}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* Case study + demo */}
        <section className="border-t border-zinc-900 py-20 md:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Proof in motion</h2>
                <p className="mt-3 text-zinc-500">
                  Problem → change → number. Replace with your own benchmarks when you brief us.
                </p>
              </div>
              <MiniCaseStudies />
            </div>
            <div className="mt-16">
              <SlaTriggerDemo />
            </div>
          </Container>
        </section>

        {/* IQA live feedback */}
        <section className="border-t border-zinc-900 bg-zinc-950 py-20 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Evidence beats opinion in the war room</h2>
              <p className="mt-4 text-lg text-zinc-400">
                IQA scores what happened against <span className="text-zinc-200">your policies and customers</span>—so the next fix targets the failure mode, not the loudest anecdote.
              </p>
            </div>
            <div className="mt-12">
              <IQALiveFeedback />
            </div>
          </Container>
        </section>

        {/* Enterprise security */}
        <section className="border-t border-zinc-900 py-20 md:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Enterprise-grade safety</h2>
                <p className="mt-4 text-zinc-500">
                  Speed without controls doesn’t pass procurement. Posture, auditability, and isolation belong in the same story as the demo.
                </p>
                <Link
                  to="/platform/security"
                  className="mt-6 inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  Security &amp; gateway
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  to="/platform/guardrails"
                  className="ml-6 inline-flex items-center text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  Guardrails
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                {[
                  { icon: Shield, label: 'SOC 2 ready posture' },
                  { icon: FileCheck, label: 'HIPAA-friendly patterns' },
                  { icon: Lock, label: 'Encryption in transit & at rest' },
                  { icon: Building2, label: 'Tenant isolation' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center"
                  >
                    <s.icon className="mb-2 h-8 w-8 text-zinc-400" />
                    <span className="text-xs text-zinc-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-black py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">See it on your own bottlenecks</h2>
              <p className="mt-4 text-lg text-zinc-500">
                Bring a journey that hurts—support, sales ops, or internal workflow. We’ll map signal → execution → measurement, not a generic tour.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/solutions/demo"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                  Book a demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/platform/overview"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-600 px-8 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
                >
                  Platform overview
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomeV9Page;
