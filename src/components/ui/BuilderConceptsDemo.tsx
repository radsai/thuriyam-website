/**
 * Builder Concepts Demo - Interactive Card Component with Live Demos
 * Shows builder capabilities with live demos building on the Customer Support Agent
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Shield, CheckCircle, Cpu, BarChart3, Upload, Play, Pause, Radio, MessageSquare, TrendingUp, FileText, Globe } from 'lucide-react';

interface BuilderConcept {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  description: string;
  example: string;
  color: string;
  bgColor: string;
  demo: React.ReactNode;
}

// Memory Demo Component
const MemoryDemo: React.FC = () => {
  const [conversations, setConversations] = useState([
    { id: 1, date: '2 days ago', summary: 'Refund request - Order #12345', context: 'Customer requested refund for damaged item' },
    { id: 2, date: '1 week ago', summary: 'Product inquiry - Widget X', context: 'Customer asked about compatibility' },
  ]);

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-sm">Long-term Memory</span>
        </div>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div key={conv.id} className="text-xs bg-purple-50 p-2 rounded border border-purple-100">
              <div className="font-medium text-purple-900">{conv.summary}</div>
              <div className="text-purple-600">{conv.context}</div>
              <div className="text-purple-500 mt-1">{conv.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-sm">Short-term Memory</span>
        </div>
        <div className="text-xs bg-blue-50 p-3 rounded border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Current Conversation</span>
          </div>
          <div className="space-y-1 text-blue-900">
            <div>User: "I need help with my order"</div>
            <div>Agent: "I can help! What's your order number?"</div>
            <div>User: "Order #12345"</div>
            <div className="font-semibold">Agent: "I see you requested a refund 2 days ago..."</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hallucination Testing Demo Component
const HallucinationTestingDemo: React.FC = () => {
  const [checks, setChecks] = useState([
    { id: 1, check: 'Fact Verification', status: 'pass', icon: CheckCircle },
    { id: 2, check: 'Source Citation', status: 'pass', icon: CheckCircle },
    { id: 3, check: 'Consistency Check', status: 'pass', icon: CheckCircle },
  ]);

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-sm">Quality Checks</span>
        </div>
        <div className="space-y-2">
          {checks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-2 text-xs bg-green-50 p-2 rounded border border-green-100">
                <Icon className="w-4 h-4 text-green-600" />
                <span className="text-green-900">{item.check}</span>
                <span className="ml-auto text-green-600 font-semibold">✓ Pass</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
        <div className="text-xs space-y-2">
          <div className="font-semibold text-green-900">Agent Response:</div>
          <div className="bg-green-50 p-3 rounded border border-green-100 text-green-900">
            "Your refund for Order #12345 was processed. You'll receive $49.99 in 3-5 business days."
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>Verified against order database</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Multiple LLMs Demo Component
const MultipleLLMsDemo: React.FC = () => {
  const [models] = useState([
    { name: 'GPT-4', task: 'Complex reasoning', active: true },
    { name: 'Claude 3', task: 'Analysis', active: false },
    { name: 'Llama 3', task: 'Cost efficiency', active: false },
  ]);

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-orange-600" />
          <span className="font-semibold text-sm">Smart Model Selection</span>
        </div>
        <div className="space-y-2">
          {models.map((model, idx) => (
            <div key={idx} className={`text-xs p-2 rounded border ${
              model.active 
                ? 'bg-orange-50 border-orange-300' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`font-medium ${model.active ? 'text-orange-900' : 'text-gray-600'}`}>
                  {model.name}
                </span>
                {model.active && (
                  <span className="text-orange-600 font-semibold">Active</span>
                )}
              </div>
              <div className={`text-xs mt-1 ${model.active ? 'text-orange-700' : 'text-gray-500'}`}>
                {model.task}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
        <div className="text-xs space-y-2">
          <div className="font-semibold text-orange-900">Customer Support Agent uses:</div>
          <div className="bg-orange-50 p-3 rounded border border-orange-100">
            <div className="text-orange-900">GPT-4 for complex refund requests</div>
            <div className="text-orange-700 mt-1">Llama 3 for simple FAQs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics Demo Component
const AnalyticsDemo: React.FC = () => {
  const [metrics] = useState([
    { label: 'Total Conversations', value: '1,247', trend: '+12%' },
    { label: 'Avg Response Time', value: '2.3s', trend: '-15%' },
    { label: 'Customer Satisfaction', value: '94%', trend: '+5%' },
  ]);

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-sm">Performance Metrics</span>
        </div>
        <div className="space-y-2">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs bg-indigo-50 p-2 rounded border border-indigo-100">
              <span className="text-indigo-900">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-indigo-900">{metric.value}</span>
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
        <div className="text-xs space-y-2">
          <div className="font-semibold text-indigo-900">Customer Support Agent Insights:</div>
          <div className="bg-indigo-50 p-3 rounded border border-indigo-100 text-indigo-900">
            Most common issue: Refund requests (34%)<br/>
            Peak hours: 2-4 PM<br/>
            Recommended: Add FAQ for common refund questions
          </div>
        </div>
      </div>
    </div>
  );
};

// BYO Agent Demo Component
const BYOAgentDemo: React.FC = () => {
  const [platforms] = useState([
    { name: 'OpenAI', status: 'Connected', icon: '🤖' },
    { name: 'Anthropic', status: 'Ready', icon: '🧠' },
  ]);

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-pink-200">
        <div className="flex items-center gap-2 mb-3">
          <Upload className="w-5 h-5 text-pink-600" />
          <span className="font-semibold text-sm">Import Your Agent</span>
        </div>
        <div className="space-y-2">
          {platforms.map((platform, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs bg-pink-50 p-2 rounded border border-pink-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">{platform.icon}</span>
                <span className="text-pink-900 font-medium">{platform.name}</span>
              </div>
              <span className="text-green-600 font-semibold">{platform.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-pink-200">
        <div className="text-xs space-y-2">
          <div className="font-semibold text-pink-900">Your existing Customer Support Agent:</div>
          <div className="bg-pink-50 p-3 rounded border border-pink-100 text-pink-900">
            Imported from OpenAI<br/>
            Now has: Memory, Quality Checks, Analytics<br/>
            Ready to deploy!
          </div>
        </div>
      </div>
    </div>
  );
};

const builderConcepts: BuilderConcept[] = [
  {
    id: 'memory',
    name: 'Memory Systems',
    shortName: 'Memory',
    icon: Brain,
    description: 'Your agent remembers past conversations and learns from every interaction',
    example: 'When a customer returns, your agent remembers their previous issues and preferences',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    demo: <MemoryDemo />,
  },
  {
    id: 'testing',
    name: 'Quality Checks',
    shortName: 'Quality Check',
    icon: Shield,
    description: 'Automatically verifies responses for accuracy before they reach customers',
    example: 'Every response is checked for facts, sources, and consistency',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    demo: <HallucinationTestingDemo />,
  },
  {
    id: 'llms',
    name: 'Multiple AI Models',
    shortName: 'AI Models',
    icon: Cpu,
    description: 'Use the best AI model for each task—smart, fast, or cost-effective',
    example: 'Complex questions use powerful models, simple ones use efficient models',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    demo: <MultipleLLMsDemo />,
  },
  {
    id: 'analytics',
    name: 'Performance Insights',
    shortName: 'Analytics',
    icon: BarChart3,
    description: 'See how your agent performs and where to improve',
    example: 'Track conversations, response times, and customer satisfaction in real-time',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    demo: <AnalyticsDemo />,
  },
  {
    id: 'byo',
    name: 'Bring Your Own Agent',
    shortName: 'Import Agent',
    icon: Upload,
    description: 'Already built an agent? Import it and get all these features automatically',
    example: 'Connect agents from OpenAI, Anthropic, or other platforms',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    demo: <BYOAgentDemo />,
  },
];

export const BuilderConceptsDemo: React.FC = () => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentConcept((prev) => (prev + 1) % builderConcepts.length);
    }, 4000); // 4 seconds per concept

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const current = builderConcepts[currentConcept];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Video-like container */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl overflow-hidden shadow-xl border border-purple-200">
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

        {/* Main content area */}
        <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentConcept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className={`inline-flex p-6 rounded-full ${current.bgColor} mb-6 shadow-lg`}
              >
                <Icon className={`w-16 h-16 ${current.color}`} />
              </motion.div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {current.name}
              </h3>

              {/* Short name badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-purple-200 shadow-sm">
                <Radio className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{current.shortName}</span>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-slate-700 mb-6 max-w-2xl mx-auto">
                {current.description}
              </p>

              {/* Example */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-purple-100 max-w-xl mx-auto shadow-sm mb-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-left">{current.example}</p>
                </div>
              </motion.div>

              {/* Live Demo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {current.demo}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Concept indicators */}
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

      {/* Concept list below */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
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
                  ? `${concept.bgColor} border-purple-600 shadow-lg`
                  : 'bg-background border-border hover:border-purple-300'
              }`}
            >
              <ConceptIcon className={`w-6 h-6 mb-2 ${isActive ? concept.color : 'text-foreground/60'}`} />
              <div className={`text-sm font-semibold mb-1 ${isActive ? concept.color : 'text-foreground'}`}>
                {concept.shortName}
              </div>
              <div className="text-xs text-foreground/60 line-clamp-2">
                {concept.description}
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
          All these features are <span className="font-semibold text-foreground">automatically built in</span> when you create an agent
        </p>
      </motion.div>
    </div>
  );
};
