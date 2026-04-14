/**
 * Traditional vs Event-Driven Workflow Hero
 * Split view: Traditional (left) | Our implementation (right), Metrics that matter below
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Clock,
  ArrowRight,
  Zap,
  MessageSquare,
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

const TRADITIONAL_STEPS = [
  { label: 'User submits', icon: User },
  { label: 'Queue wait', icon: Clock },
  { label: 'Manual assign', icon: User },
  { label: 'Process', icon: MessageSquare },
  { label: 'Done', icon: CheckCircle },
];

const EVENT_DRIVEN_STEPS = [
  { label: 'Event occurs', icon: Bell },
  { label: 'Agent triggered', icon: Zap },
  { label: 'Outcome delivered', icon: CheckCircle },
];

export const TraditionalVsEventDrivenHero: React.FC = () => {
  const [traditionalStep, setTraditionalStep] = useState(0);
  const [eventStep, setEventStep] = useState(0);

  // Animate traditional steps in sequence (slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setTraditionalStep((s) => (s >= TRADITIONAL_STEPS.length - 1 ? 0 : s + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Animate event-driven steps in sequence (faster)
  useEffect(() => {
    const interval = setInterval(() => {
      setEventStep((s) => (s >= EVENT_DRIVEN_STEPS.length - 1 ? 0 : s + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Top: Split demo - Traditional left, Our implementation right */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Traditional workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-200 bg-amber-50/50">
            <h3 className="font-semibold text-slate-800">Traditional Workflow</h3>
          </div>
          <div className="p-6 min-h-[280px] bg-gradient-to-br from-slate-50/50 to-white space-y-6">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {TRADITIONAL_STEPS.map((step, i) => (
                <TraditionalStepItem key={i} step={step} index={i} activeIndex={traditionalStep} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Avg. Wait', value: '4.2m' },
                { label: 'Resolution', value: '2.1h' },
                { label: 'Handoffs', value: '3.2' },
                { label: 'SLA Met', value: '62%' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                >
                  <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-slate-800">{m.value}</span>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-600 mb-3">Queue Wait by Step</div>
              <div className="flex gap-2 items-end h-12">
                {[40, 65, 55, 45, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                    className="flex-1 bg-amber-200 rounded-t"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Our implementation (event-driven) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-200 bg-emerald-50/50">
            <h3 className="font-semibold text-slate-800">Our Implementation</h3>
          </div>
          <div className="p-6 min-h-[280px] bg-gradient-to-br from-slate-50/50 to-white space-y-6">
            <div className="flex items-center justify-center gap-4">
              {EVENT_DRIVEN_STEPS.map((step, i) => (
                <EventDrivenStepItem key={i} step={step} index={i} activeIndex={eventStep} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Response Time', value: '<2s' },
                { label: 'Resolution', value: '8m' },
                { label: 'Handoffs', value: '0.3' },
                { label: 'SLA Met', value: '94%' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                >
                  <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-slate-800">{m.value}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-600 mb-3">Workflow Containment</div>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 28 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-800">72%</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  Resolved without human escalation
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Metrics that matter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">
          Metrics that matter with event-driven agents
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '60–70%', label: 'Reduction in processing time', sub: 'From intake to completion' },
            { value: '2x', label: 'Faster resolution', sub: 'Event-triggered, no queue wait' },
            { value: '65%+', label: 'Workflow containment', sub: 'Resolved without escalation' },
            { value: '50%', label: 'Fewer handoffs', sub: 'Agents handle end-to-end' },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{m.value}</div>
              <div className="text-sm font-semibold text-slate-800">{m.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const TraditionalStepItem: React.FC<{
  step: (typeof TRADITIONAL_STEPS)[0];
  index: number;
  activeIndex: number;
}> = ({ step, index, activeIndex }) => {
  const Icon = step.icon;
  const isActive = activeIndex >= index;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
        backgroundColor: isActive ? 'rgba(251, 191, 36, 0.15)' : 'rgba(248, 250, 252, 0.8)',
      }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-xl border border-slate-200 relative"
    >
      <Icon className="w-5 h-5 text-amber-600" />
      <span className="text-xs font-medium text-slate-700 text-center">{step.label}</span>
      {index < TRADITIONAL_STEPS.length - 1 && (
        <ArrowRight className="w-3 h-3 text-slate-400 absolute -right-3 top-1/2 -translate-y-1/2 hidden sm:block" />
      )}
    </motion.div>
  );
};

const EventDrivenStepItem: React.FC<{
  step: (typeof EVENT_DRIVEN_STEPS)[0];
  index: number;
  activeIndex: number;
}> = ({ step, index, activeIndex }) => {
  const Icon = step.icon;
  const isActive = activeIndex >= index;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
        backgroundColor: isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(248, 250, 252, 0.8)',
      }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 min-w-[90px] p-4 rounded-xl border border-slate-200 relative"
    >
      <Icon className="w-7 h-7 text-emerald-600" />
      <span className="text-xs font-medium text-slate-700 text-center">{step.label}</span>
      {index < EVENT_DRIVEN_STEPS.length - 1 && (
        <ArrowRight className="w-4 h-4 text-emerald-500 absolute -right-2 top-1/2 -translate-y-1/2" />
      )}
    </motion.div>
  );
};
