/**
 * Base Use Case Demo Component
 * Reusable component for interactive use case demonstrations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Shield, Lock, Eye, Wrench } from 'lucide-react';

export interface UseCaseStep {
  id: string;
  title: string;
  description: string;
  visualContent: React.ReactNode;
  activeUSPs: ('builder' | 'security' | 'governance' | 'observability' | 'memory' | 'channels')[];
  timeSaved?: string; // e.g., "5 days → 5 minutes"
  metrics?: { label: string; value: string }[];
}

interface UseCaseDemoProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  steps: UseCaseStep[];
  autoPlay?: boolean;
  onComplete?: () => void;
}

const uspConfig = {
  builder: { label: 'Builder', icon: Wrench, color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Built with natural language' },
  security: { label: 'Security', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-100', description: 'Enterprise-grade protection' },
  governance: { label: 'Governance', icon: Lock, color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Full compliance & audit' },
  observability: { label: 'Observability', icon: Eye, color: 'text-indigo-600', bgColor: 'bg-indigo-100', description: 'Complete visibility' },
  memory: { label: 'Memory', icon: Sparkles, color: 'text-pink-600', bgColor: 'bg-pink-100', description: 'Remembers context' },
  channels: { label: 'Multi-Channel', icon: Sparkles, color: 'text-cyan-600', bgColor: 'bg-cyan-100', description: 'Works everywhere' },
};

export const UseCaseDemo: React.FC<UseCaseDemoProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  steps,
  autoPlay = false,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(!autoPlay);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (next === 0 && prev === steps.length - 1 && onComplete) {
          // Call onComplete without causing any scroll behavior
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
        return next;
      });
    }, 5000); // 5 seconds per step

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, steps.length, onComplete]);

  const current = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
      setIsPaused(true);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${iconBgColor}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                {isPaused ? (
                  <Play className="w-5 h-5" />
                ) : (
                  <Pause className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Left: Step Info & USPs */}
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">Step {currentStep + 1}</span>
                  <span>/</span>
                  <span>{steps.length}</span>
                </div>

                {/* Step Title */}
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {current.title}
                </h4>

                {/* Step Description */}
                <p className="text-lg text-gray-700 leading-relaxed">
                  {current.description}
                </p>

                {/* Time Saved */}
                {current.timeSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Time Saved</span>
                    </div>
                    <p className="text-sm text-green-700">{current.timeSaved}</p>
                  </motion.div>
                )}

                {/* Metrics */}
                {current.metrics && current.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {current.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                      >
                        <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Active USPs */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Active Platform Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.activeUSPs.map((usp) => {
                      const config = uspConfig[usp];
                      const UspIcon = config.icon;
                      return (
                        <motion.div
                          key={usp}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor} border-2 ${config.color.replace('text-', 'border-')}`}
                        >
                          <UspIcon className={`w-4 h-4 ${config.color}`} />
                          <div>
                            <div className={`text-xs font-semibold ${config.color}`}>
                              {config.label}
                            </div>
                            <div className="text-xs text-gray-600">{config.description}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Visual Demo */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                {current.visualContent}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Step Dots */}
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToStep(currentStep + 1)}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentStep === steps.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
