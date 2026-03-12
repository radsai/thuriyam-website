/**
 * Support Agent Creation Demo
 * Six-step demo aligned with vision board: outcome-driven, event-triggered, proactive
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Zap, Shield, CheckCircle, Bot, User, Bell, Calendar } from 'lucide-react';
import { UseCaseDemo, UseCaseStep } from './UseCaseDemo';

const SupportAgentDemo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const steps: UseCaseStep[] = [
    {
      id: '1',
      title: 'Describe Your Support Agent in Natural Language',
      description: 'Simply describe what you need: "Build a customer support agent." The platform creates the agent configuration—outcome-driven, event-triggered, proactive.',
      activeUSPs: ['builder'],
      timeSaved: 'Traditional: 2 weeks → Platform: 2 minutes',
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">You type:</div>
                <div className="text-sm font-medium text-gray-900">
                  "Build a customer support agent"
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200"
            >
              {['24/7 coverage', 'Multi-channel', 'Escalation rules', 'Knowledge base'].map((chip, i) => (
                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: '2',
      title: 'Define Support Outcomes, Not Scripts',
      description: 'Define what success looks like—resolve 80% without escalation, first response within 2 minutes. The platform aligns agents to these outcomes. No rigid flowcharts.',
      activeUSPs: ['builder', 'governance'],
      metrics: [
        { label: 'Resolution Rate', value: '80%' },
        { label: 'First Response', value: '<2 min' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Outcome Goals</div>
            <div className="space-y-2">
              {['80% resolution without escalation', 'First response within 2 minutes', 'CSAT > 4.5'].map((goal, idx) => (
                <motion.div
                  key={goal}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">{goal}</span>
                  <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: 'Event-Driven Support Triggers',
      description: 'Agents respond when it happens—new ticket, SLA breach, repeat caller. Event-triggered autonomy that scales.',
      activeUSPs: ['channels'],
      metrics: [
        { label: 'Triggers', value: '3+' },
        { label: 'Response', value: 'Instant' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'New ticket', icon: MessageSquare },
              { label: 'SLA breach', icon: Bell },
              { label: 'Repeat caller', icon: User },
            ].map((trigger, idx) => (
              <motion.div
                key={trigger.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-lg p-3 border border-gray-200 text-center"
              >
                <trigger.icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-xs font-semibold text-gray-700">{trigger.label}</div>
                <div className="flex items-center justify-center gap-1 text-green-600 mt-1">
                  <Zap className="w-3 h-3" />
                  <span className="text-xs">Trigger</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Calendar className="w-4 h-4" />
              <span>When it happens, agents respond</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '4',
      title: 'Proactive Support by Default',
      description: 'Agents that act before you ask. Monitor, detect, act—from reactive to proactive.',
      activeUSPs: ['memory', 'observability'],
      metrics: [
        { label: 'Proactive', value: 'Yes' },
        { label: 'Monitor', value: '24/7' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Proactive Flow</div>
            <div className="space-y-2">
              {['Monitor queues & sentiment', 'Detect at-risk tickets', 'Act before escalation'].map((step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-2 p-2 bg-indigo-50 rounded"
                >
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <Bot className="w-4 h-4" />
              <span>Agents that act before you ask</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '5',
      title: 'Security and Guardrails Built In',
      description: 'Every agent is production-grade by default. Authentication, authorization, content safety—no configuration needed.',
      activeUSPs: ['security', 'governance'],
      metrics: [
        { label: 'Encryption', value: 'TLS 1.3' },
        { label: 'Guardrails', value: 'Active' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {['Content safety', 'PII redaction', 'Auth & access', 'Audit trail'].map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-center gap-2 bg-red-50 rounded-lg p-3 border border-red-200"
              >
                <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm font-medium text-red-900">{item}</span>
                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: '6',
      title: 'Support Agent Ready to Deploy',
      description: 'Your outcome-driven, event-triggered, proactive support agent is ready. Deploy with confidence.',
      activeUSPs: ['builder', 'security', 'observability'],
      timeSaved: 'Traditional: 4 weeks → Platform: 10 minutes',
      metrics: [
        { label: 'Ready', value: 'Yes' },
        { label: 'Production', value: 'Grade' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mb-4"
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            </motion.div>
            <h4 className="text-lg font-bold text-green-900 mb-2">Support Agent Ready!</h4>
            <p className="text-sm text-green-700 mb-4">
              Outcome-driven • Event-triggered • Proactive
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Setup Time</div>
                <div className="text-lg font-bold text-green-700">10 min</div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Steps</div>
                <div className="text-lg font-bold text-green-700">6/6</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <UseCaseDemo
      title="Support Agent Creation"
      description="Create a customer support agent—outcome-driven, event-triggered, proactive"
      icon={MessageSquare}
      iconColor="text-indigo-600"
      iconBgColor="bg-indigo-100"
      steps={steps}
      autoPlay={false}
      onComplete={onComplete}
    />
  );
};

export default SupportAgentDemo;
