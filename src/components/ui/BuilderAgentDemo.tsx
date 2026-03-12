/**
 * Builder Agent Demo - Shows builder concepts applied to Customer Support Agent
 * Auto-advances through Channels, Memory, Quality Checks, AI Models, Performance Insights, and Import Agent
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Brain, Shield, Cpu, BarChart3, Upload, Play, Pause, Bot, User, CheckCircle } from 'lucide-react';

interface BuilderConcept {
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

const builderConcepts: BuilderConcept[] = [
  {
    id: 'channels',
    name: 'Works Everywhere',
    shortName: 'Channels',
    icon: Globe,
    description: 'Deploy your agent on your website, through an API, in Slack, or anywhere else—all from one place',
    example: 'One agent, multiple places where your customers are',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    agentExample: [
      'Setting up agent on your website...',
      '✓ Website channel connected',
      'Connecting to API...',
      '✓ API endpoint ready',
      'Adding to Slack workspace...',
      '✓ Slack integration active',
      '→ Agent now works in 3 places',
      '→ Customers can reach you via website, API, or Slack'
    ],
  },
  {
    id: 'memory',
    name: 'Remembers What Matters',
    shortName: 'Memory',
    icon: Brain,
    description: 'It remembers recent conversations and important details about your business, so every interaction feels personal',
    example: 'When a customer returns, your agent remembers their previous issues and preferences',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    agentExample: [
      'Checking past conversations...',
      '✓ Found: You requested a refund 2 days ago',
      'Remembering your preferences...',
      '✓ Customer prefers email updates',
      '→ Agent: "I see you requested a refund for Order #12345"',
      '→ "Let me check the status for you..."'
    ],
  },
  {
    id: 'quality',
    name: 'Every Answer Checked',
    shortName: 'Quality Check',
    icon: Shield,
    description: 'Before your agent responds, it automatically checks if the answer is correct and helpful—no more wrong information',
    example: 'Every response is verified for facts, sources, and consistency',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    agentExample: [
      'Agent preparing response...',
      'Checking if answer is correct...',
      '✓ Verifying against order database...',
      '✓ Facts confirmed: Order #12345 status is Shipped',
      'Checking if answer is helpful...',
      '✓ Response approved',
      '→ Safe to send to customer'
    ],
  },
  {
    id: 'aimodels',
    name: 'Pick the Perfect AI',
    shortName: 'AI Models',
    icon: Cpu,
    description: 'Choose from the best AI models—some are super smart, others are fast and affordable. Pick what works best for you',
    example: 'Complex questions use powerful models, simple ones use efficient models',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    agentExample: [
      'Analyzing customer question...',
      '✓ Question type: Complex refund request',
      'Selecting best AI model...',
      '✓ Using powerful model for complex reasoning',
      'For simple FAQs, using efficient model...',
      '✓ Cost optimized: Right model for each task',
      '→ Smart model selection saves time and money'
    ],
  },
  {
    id: 'insights',
    name: 'See How It\'s Working',
    shortName: 'Insights',
    icon: BarChart3,
    description: 'Watch real-time stats: How fast it responds, how many questions it answers correctly, and how much it costs',
    example: 'Track conversations, response times, and customer satisfaction in real-time',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    agentExample: [
      'Tracking performance metrics...',
      '✓ Response time: 1.2s (target: <2s)',
      '✓ Accuracy: 98% (last 100 interactions)',
      '✓ Customer satisfaction: 4.8/5.0',
      'Generating insights...',
      '→ Most common issue: Refund requests (34%)',
      '→ Recommendation: Add FAQ for common questions'
    ],
  },
  {
    id: 'import',
    name: 'Bring Your Agent',
    shortName: 'Import Agent',
    icon: Upload,
    description: 'If you\'ve built an agent elsewhere, you can bring it to our platform and get all these features—memory, quality checks, analytics, and more',
    example: 'Connect agents from OpenAI, Anthropic, or other platforms and get all features automatically',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    agentExample: [
      'Connecting existing agent...',
      '✓ Agent imported from OpenAI',
      'Adding platform features...',
      '✓ Memory system enabled',
      '✓ Quality checks activated',
      '✓ Analytics tracking started',
      '→ Your agent now has all platform features',
      '→ Ready to deploy with enhanced capabilities'
    ],
  },
];

interface BuilderAgentDemoProps {
  onComplete?: () => void;
}

export const BuilderAgentDemo: React.FC<BuilderAgentDemoProps> = ({ onComplete }) => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentConcept((prev) => {
        const next = (prev + 1) % builderConcepts.length;
        // If we've completed all concepts and looped back to 0, call onComplete
        if (next === 0 && prev === builderConcepts.length - 1 && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 1000); // Wait 1 second after completing to show the last concept
        }
        return next;
      });
    }, 4000); // 4 seconds per concept

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, onComplete]);

  const current = builderConcepts[currentConcept];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video-like container */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl overflow-hidden shadow-2xl border border-purple-200">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-200 text-purple-700 hover:bg-white transition-colors shadow-sm"
          >
            {isPaused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-100 z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: '0%' }}
            animate={{ 
              width: isPaused ? '100%' : `${((currentConcept + 1) / builderConcepts.length) * 100}%` 
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
                className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg max-w-2xl"
              >
                {/* Agent Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Customer Support Agent</h4>
                    <p className="text-xs text-gray-600">Builder features in action</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-700">Active</span>
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
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-3 border border-purple-200">
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
          {builderConcepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => {
                setCurrentConcept(index);
                setIsPaused(true);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentConcept
                  ? 'w-8 bg-purple-600'
                  : 'w-2 bg-purple-300 hover:bg-purple-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Concept cards below */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {builderConcepts.map((concept, index) => {
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
          All builder features are <span className="font-semibold text-foreground">automatically applied</span> to your customer support agent
        </p>
      </motion.div>
    </div>
  );
};
