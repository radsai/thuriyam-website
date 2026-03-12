/**
 * Governance Agent Demo - Shows governance concepts applied to Customer Support Agent
 * Auto-advances through Traces & Logs, Compliance, and Audits
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, CheckCircle, Play, Pause, Bot, User, ClipboardCheck } from 'lucide-react';

interface GovernanceConcept {
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

const governanceConcepts: GovernanceConcept[] = [
  {
    id: 'traces',
    name: 'Traces & Logs',
    shortName: 'Traces & Logs',
    icon: FileText,
    description: 'Complete audit trail of all interactions',
    example: 'Every conversation and action is logged with timestamps and user context',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    agentExample: [
      'Capturing conversation trace...',
      '✓ User: "I need help with my order #12345" logged',
      '✓ Agent response logged with timestamp: 12:45 PM',
      '→ Complete audit trail: User ID, Session ID, Order #12345, Timestamp recorded',
      '→ Trace available for compliance review'
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance',
    shortName: 'Compliance',
    icon: Shield,
    description: 'SOC 2, GDPR, HIPAA ready',
    example: 'All interactions meet regulatory requirements automatically',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    agentExample: [
      'Checking compliance requirements...',
      '✓ SOC 2: Data access controls verified',
      '✓ GDPR: User consent and data handling compliant',
      '✓ HIPAA: Protected health information secured',
      '→ Customer support agent operates within all compliance frameworks',
      '→ Compliance status: All checks passed'
    ],
  },
  {
    id: 'audits',
    name: 'Audits',
    shortName: 'Audits',
    icon: ClipboardCheck,
    description: 'Regular compliance audits and reporting',
    example: 'Automated audit reports generated for regulatory review',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    agentExample: [
      'Generating audit report...',
      '✓ All interactions audited for period: Last 30 days',
      '✓ Access logs reviewed: 1,247 interactions',
      '✓ Compliance violations: 0 detected',
      '→ Audit report generated: Ready for regulatory review',
      '→ Report includes: Access logs, Data handling, Compliance status'
    ],
  },
];

export const GovernanceAgentDemo: React.FC = () => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentConcept((prev) => (prev + 1) % governanceConcepts.length);
    }, 4000); // 4 seconds per concept

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const current = governanceConcepts[currentConcept];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video-like container */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl overflow-hidden shadow-2xl border border-blue-200">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-200 text-blue-700 hover:bg-white transition-colors shadow-sm"
          >
            {isPaused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ 
              width: isPaused ? '100%' : `${((currentConcept + 1) / governanceConcepts.length) * 100}%` 
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
                className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg max-w-2xl"
              >
                {/* Agent Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Customer Support Agent</h4>
                    <p className="text-xs text-gray-600">Governance in action</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-700">Governed</span>
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-200">
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
          {governanceConcepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => {
                setCurrentConcept(index);
                setIsPaused(true);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentConcept
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-blue-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Concept cards below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {governanceConcepts.map((concept, index) => {
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
          All governance features are <span className="font-semibold text-foreground">automatically applied</span> to your customer support agent
        </p>
      </motion.div>
    </div>
  );
};
