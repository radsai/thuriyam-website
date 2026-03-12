import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ShieldCheck, FileCheck, Eye, BarChart3, CheckCircle, 
  AlertTriangle, Lock, Zap, Settings, ArrowRight, Sparkles 
} from 'lucide-react';

interface ProductionReadyAnimationProps {
  isVisible: boolean;
}

export const ProductionReadyAnimation: React.FC<ProductionReadyAnimationProps> = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const steps = [
    {
      id: 0,
      title: 'Agent Created',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Simple prototype built successfully',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 1,
      title: 'Security',
      icon: <ShieldCheck className="w-5 h-5" />,
      description: 'The Safety Pillar - Protecting your agent and data',
      color: 'from-indigo-500 to-indigo-600',
      details: [
        'Guardrails: Preventing toxic content & jailbreak attempts',
        'Data Privacy: PII detection & redaction enabled',
        'Access Control: Permission-based authorization configured',
        'Triple Gate Architecture: AI → MCP → API Gateway protection'
      ]
    },
    {
      id: 2,
      title: 'Scalability',
      icon: <Zap className="w-5 h-5" />,
      description: 'The Performance Pillar - Handling production workloads',
      color: 'from-purple-500 to-purple-600',
      details: [
        'Concurrency: Handling 500+ simultaneous users',
        'Latency: Sub-2 second response times optimized',
        'Cost Management: Token usage monitoring & limits configured',
        'Auto-scaling: Infrastructure adapts to demand'
      ]
    },
    {
      id: 3,
      title: 'Observability',
      icon: <Eye className="w-5 h-5" />,
      description: 'The Visibility Pillar - Turning the lights on',
      color: 'from-orange-500 to-orange-600',
      details: [
        'Tracing: Reasoning traces for debugging & analysis',
        'Evaluation: Automatic quality measurement & scoring',
        'Logging: Complete audit trail of inputs & outputs',
        'IQA Integration: Real-time conversation analytics'
      ]
    },
    {
      id: 4,
      title: 'Governance',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'The Control Pillar - Rules, laws, and standards',
      color: 'from-pink-500 to-pink-600',
      details: [
        'Compliance: GDPR, HIPAA, PCI-DSS templates applied',
        'Human-in-the-loop: Approval workflows for high-stakes actions',
        'Versioning: Safe model updates without breaking features',
        'Policy Management: Centralized governance & audit trails'
      ]
    },
    {
      id: 5,
      title: 'Production Ready',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'All four pillars configured - Enterprise-ready deployment',
      color: 'from-green-600 to-green-700',
      details: [
        '✓ Security: Guardrails & access control active',
        '✓ Scalability: Performance optimized for production',
        '✓ Observability: Full visibility into agent behavior',
        '✓ Governance: Compliance & policies enforced',
        '🚀 Ready for production deployment'
      ]
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setCompletedSteps(new Set());
      return;
    }

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        setCurrentStep(prev => prev + 1);
      } else {
        // Loop back to start after showing all steps
        setTimeout(() => {
          setCurrentStep(0);
          setCompletedSteps(new Set());
        }, 5000);
      }
    }, currentStep === 0 ? 2000 : 4000);

    return () => clearTimeout(timer);
  }, [isVisible, currentStep]);

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-6 border rounded-lg bg-white shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-sm text-gray-900">Production-Ready Setup</h3>
          </div>
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Current Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Step Header */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${currentStepData.color} text-white shadow-lg`}>
                {currentStepData.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900 mb-1">{currentStepData.title}</h4>
                <p className="text-sm text-gray-600">{currentStepData.description}</p>
              </div>
              {completedSteps.has(currentStep) && (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              )}
            </div>

            {/* Step Details */}
            {currentStepData.details && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500"
              >
                <ul className="space-y-2">
                  {currentStepData.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Visual Indicator */}
            {currentStep > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <div className="flex-1 h-0.5 bg-gray-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
                <div className="text-xs text-gray-500">Applying...</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Completed Steps Summary */}
        {completedSteps.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-4 border-t"
          >
            <div className="flex flex-wrap gap-2">
              {steps.slice(0, currentStep).map((step) => (
                <div
                  key={step.id}
                  className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-indigo-50 border-t">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">
              {currentStep === steps.length - 1 
                ? 'Production-Ready ✓' 
                : `Configuring: ${currentStepData.title}`}
            </span>
          </div>
          <div className="text-gray-500">
            Enterprise-grade security & compliance
          </div>
        </div>
      </div>
    </motion.div>
  );
};

