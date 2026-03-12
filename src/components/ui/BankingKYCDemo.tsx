/**
 * Banking KYC/Account Opening Demo
 * Interactive demo showing how the platform solves KYC and account opening use case
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileCheck, Shield, CheckCircle, BarChart3, UserCheck, Bot, User, Upload, Lock, Eye, Wrench } from 'lucide-react';
import { UseCaseDemo, UseCaseStep } from './UseCaseDemo';

const BankingKYCDemo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const steps: UseCaseStep[] = [
    {
      id: '1',
      title: 'Build Agent with Natural Language',
      description: 'Simply describe what you need: "Build a KYC verification agent for account opening." The platform automatically creates the agent configuration with all necessary capabilities.',
      activeUSPs: ['builder', 'channels'],
      timeSaved: 'Traditional: 2 weeks → Platform: 2 minutes',
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">You type:</div>
                <div className="text-sm font-medium text-gray-900">
                  "Build a KYC verification agent for account opening"
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200"
            >
              <Bot className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Platform creates:</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Document verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Identity verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Compliance checking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Risk assessment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <Wrench className="w-4 h-4" />
              <span className="font-semibold">Agent configured automatically</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '2',
      title: 'Collect Documents Across Channels',
      description: 'The agent works everywhere your customers are—website, mobile app, email, or chat. It remembers each customer\'s context and guides them through document submission seamlessly.',
      activeUSPs: ['channels', 'memory'],
      metrics: [
        { label: 'Channels', value: '4+' },
        { label: 'Drop-off Rate', value: '-60%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {['Website', 'Mobile App', 'Email', 'Chat'].map((channel, idx) => (
              <motion.div
                key={channel}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-3 border border-gray-200 text-center"
              >
                <div className="text-xs font-semibold text-gray-700 mb-1">{channel}</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Active</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-start gap-2">
              <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-blue-900 mb-1">Agent remembers:</div>
                <div className="text-xs text-blue-700">
                  "Customer started on website, continued via email"
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: 'Verify Identity Securely',
      description: 'Every verification happens through encrypted connections. The platform automatically applies authentication, authorization, and data encryption—no configuration needed.',
      activeUSPs: ['security'],
      metrics: [
        { label: 'Encryption', value: 'TLS 1.3' },
        { label: 'Compliance', value: 'SOC 2' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Identity Verification</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Verified</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['AuthN', 'AuthZ', 'Encryption'].map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-red-50 rounded-lg p-2 border border-red-200 text-center"
              >
                <Shield className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <div className="text-xs font-semibold text-red-900">{item}</div>
                <div className="text-xs text-red-700">Active</div>
              </motion.div>
            ))}
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <Lock className="w-4 h-4" />
              <span>All data encrypted in transit and at rest</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '4',
      title: 'Automated Compliance Checking',
      description: 'The agent automatically checks against compliance databases and regulatory requirements. Guardrails prevent any non-compliant actions, and every check is logged for audit.',
      activeUSPs: ['governance', 'security'],
      metrics: [
        { label: 'Compliance Rate', value: '100%' },
        { label: 'Audit Trail', value: 'Complete' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Compliance Checks</div>
            <div className="space-y-2">
              {['KYC Database', 'Sanctions List', 'PEP Screening', 'AML Check'].map((check, idx) => (
                <motion.div
                  key={check}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-700">{check}</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Passed</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {['SOC 2', 'GDPR', 'HIPAA'].map((badge) => (
              <div
                key={badge}
                className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-200 text-center"
              >
                <div className="text-xs font-semibold text-blue-900">{badge}</div>
                <div className="text-xs text-blue-700">Ready</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Lock className="w-4 h-4" />
              <span>Full audit trail created automatically</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '5',
      title: 'Risk Assessment with Full Visibility',
      description: 'The platform provides complete observability into the risk scoring process. See exactly how decisions are made, with quality checks ensuring accuracy at every step.',
      activeUSPs: ['observability', 'governance'],
      metrics: [
        { label: 'Risk Score', value: 'Low' },
        { label: 'Confidence', value: '98%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Risk Assessment</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Identity Match</span>
                  <span className="text-xs font-semibold text-green-600">95%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Document Validity</span>
                  <span className="text-xs font-semibold text-green-600">100%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Compliance Status</span>
                  <span className="text-xs font-semibold text-green-600">100%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Eye className="w-4 h-4" />
              <span>Full decision trace available in observability dashboard</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '6',
      title: 'Automated Approval & Account Creation',
      description: 'Once all checks pass, the account is created automatically and the customer is notified. The entire process is tracked end-to-end, with metrics showing time saved and efficiency gains.',
      activeUSPs: ['builder', 'governance', 'observability'],
      timeSaved: 'Traditional: 5 days → Platform: 5 minutes',
      metrics: [
        { label: 'Success Rate', value: '98%' },
        { label: 'Time Saved', value: '99%' },
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
            <h4 className="text-lg font-bold text-green-900 mb-2">Account Created Successfully!</h4>
            <p className="text-sm text-green-700 mb-4">
              Customer has been notified via email and SMS
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Processing Time</div>
                <div className="text-lg font-bold text-green-700">5 min</div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Steps Completed</div>
                <div className="text-lg font-bold text-green-700">6/6</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-600 mb-2">Complete audit trail saved</div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>All documents verified and stored securely</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <UseCaseDemo
      title="KYC & Account Opening"
      description="Automate customer onboarding with intelligent verification and compliance"
      icon={Building2}
      iconColor="text-blue-600"
      iconBgColor="bg-blue-100"
      steps={steps}
      autoPlay={false}
      onComplete={onComplete}
    />
  );
};

export default BankingKYCDemo;
