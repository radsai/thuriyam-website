/**
 * Observability Agent Demo - Shows observability concepts applied to Customer Support Agent
 * Auto-advances through Agent Observability, Guardrail Observability, and Access Observability
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Activity, Shield, User, Play, Pause, Bot, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';

interface ObservabilityConcept {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  description: string;
  example: string;
  color: string;
  bgColor: string;
  agentExample: string | string[];
}

const observabilityConcepts: ObservabilityConcept[] = [
  {
    id: 'agent',
    name: 'Agent Observability',
    shortName: 'Agent Observability',
    icon: Bot,
    description: 'Monitor agent performance and behavior',
    example: 'Track response times, accuracy, and customer satisfaction in real-time',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    agentExample: [
      'Monitoring agent performance...',
      '✓ Response time: 1.2s (target: <2s)',
      '✓ Accuracy: 98% (last 100 interactions)',
      '✓ Customer satisfaction: 4.8/5.0',
      '→ Tracking conversation metrics...',
      '→ Order #12345 query resolved in 45 seconds',
      '→ Performance: Excellent'
    ],
  },
  {
    id: 'guardrail',
    name: 'Guardrail Observability',
    shortName: 'Guardrail Observability',
    icon: Shield,
    description: 'Track safety and compliance metrics',
    example: 'Monitor guardrail triggers, compliance violations, and safety checks',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    agentExample: [
      'Monitoring guardrail activity...',
      '✓ Safety checks: 247 passed, 0 failed',
      '✓ Compliance violations: 0 detected',
      '✓ Sensitive data masked: 12 instances',
      '→ Guardrail triggered: Payment info masked',
      '→ Compliance status: All checks passed',
      '→ Safety score: 100%'
    ],
  },
  {
    id: 'access',
    name: 'Access Observability',
    shortName: 'Access Observability',
    icon: User,
    description: 'Monitor who accesses what and when',
    example: 'Track user access patterns, data requests, and authentication events',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    agentExample: [
      'Tracking access patterns...',
      '✓ User authenticated: john@example.com',
      '✓ Accessing: Order #12345 data',
      '✓ Timestamp: 12:45 PM',
      '→ Access granted: User has permission',
      '→ Data retrieved: Order details, shipping info',
      '→ Audit trail: Logged for compliance review'
    ],
  },
];

export const ObservabilityAgentDemo: React.FC = () => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentConcept((prev) => (prev + 1) % observabilityConcepts.length);
    }, 4000); // 4 seconds per concept

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const current = observabilityConcepts[currentConcept];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video-like container */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-xl overflow-hidden shadow-2xl border border-indigo-200">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200 text-indigo-700 hover:bg-white transition-colors shadow-sm"
          >
            {isPaused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-100 z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ 
              width: isPaused ? '100%' : `${((currentConcept + 1) / observabilityConcepts.length) * 100}%` 
            }}
            transition={{ duration: 4, ease: 'linear' }}
          />
        </div>

        {/* Main content area - Customer Support Agent Demo */}
        <div className="p-6 md:p-8 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentConcept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              {/* Concept Header */}
              <div className="mb-2">
                {/* Icon and Title in same line */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 mb-2"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className={`flex-shrink-0 p-4 rounded-full ${current.bgColor}`}
                  >
                    <Icon className={`w-10 h-10 ${current.color}`} />
                  </motion.div>
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {current.name}
                  </h3>
                </motion.div>

                {/* Description */}
                <p className="text-base text-gray-700 mb-3 max-w-2xl">
                  {current.description}
                </p>
              </div>

              {/* Customer Support Agent Demo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 border-2 border-indigo-200 shadow-lg max-w-2xl"
              >
                {/* Agent Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Bot className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Customer Support Agent</h4>
                    <p className="text-xs text-gray-600">Observability in action</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-700">Monitoring</span>
                  </div>
                </div>

                {/* Conversation Example */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">I need help with my order #12345</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1 bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                      <div className="flex items-start gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${current.color} flex-shrink-0 mt-0.5`} />
                        <p className="text-xs font-semibold text-gray-900">{current.name} Active</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">I can help you with that! Let me check your order details...</p>
                      <div className="bg-white rounded p-3 border border-gray-200 space-y-2">
                        {Array.isArray(current.agentExample) ? (
                          current.agentExample.map((step, stepIndex) => (
                            <motion.div
                              key={stepIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + (stepIndex * 0.1) }}
                              className={`flex items-start gap-2 ${
                                step.startsWith('✓') || step.startsWith('→') 
                                  ? 'text-green-700' 
                                  : 'text-gray-600'
                              }`}
                            >
                              <span className="text-xs font-mono">{step}</span>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-600">{current.agentExample}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 rounded-lg p-2 border border-green-200"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{current.example}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {observabilityConcepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => {
                setCurrentConcept(index);
                setIsPaused(true);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentConcept
                  ? 'w-8 bg-indigo-600'
                  : 'w-2 bg-indigo-300 hover:bg-indigo-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Concept cards below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {observabilityConcepts.map((concept, index) => {
          const ConceptIcon = concept.icon;
          const isActive = index === currentConcept;
          return (
            <motion.button
              key={concept.id}
              onClick={() => {
                setCurrentConcept(index);
                setIsPaused(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? `${concept.bgColor} border-${concept.color.split('-')[1]}-600 shadow-lg`
                  : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              <ConceptIcon className={`w-6 h-6 mb-2 ${isActive ? concept.color : 'text-foreground/60'}`} />
              <div className={`text-sm font-semibold ${isActive ? concept.color : 'text-foreground'}`}>
                {concept.shortName}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Simple explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-foreground/60">
          All observability features are <span className="font-semibold text-foreground">automatically applied</span> to your customer support agent
        </p>
      </motion.div>
    </div>
  );
};
