/**
 * Insurance Claims Processing Demo
 * Interactive demo showing how the platform solves insurance claims processing use case
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Shield, CheckCircle, TrendingUp, Bot, User, Upload, AlertTriangle, Eye, Wrench, Camera } from 'lucide-react';
import { UseCaseDemo, UseCaseStep } from './UseCaseDemo';

const InsuranceClaimsDemo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const steps: UseCaseStep[] = [
    {
      id: '1',
      title: 'Multi-Channel Claim Intake',
      description: 'Customers can submit claims through chat, phone, email, or web form. The agent understands natural language descriptions and extracts all necessary information automatically.',
      activeUSPs: ['channels', 'builder'],
      timeSaved: 'Traditional: 30 min → Platform: 3 minutes',
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Customer (via chat):</div>
                <div className="text-sm text-gray-900">
                  "I had a car accident yesterday. My bumper is damaged and I need to file a claim."
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200"
            >
              <Bot className="w-5 h-5 text-green-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Agent understands:</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-700">• Claim type: Auto damage</div>
                  <div className="text-xs text-gray-700">• Date: Yesterday</div>
                  <div className="text-xs text-gray-700">• Damage: Bumper</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Chat', 'Phone', 'Email', 'Web Form'].map((channel) => (
              <div
                key={channel}
                className="bg-cyan-50 rounded-lg p-2 border border-cyan-200 text-center"
              >
                <div className="text-xs font-semibold text-cyan-900">{channel}</div>
                <div className="text-xs text-cyan-700">Available</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: '2',
      title: 'Smart Document Collection',
      description: 'The agent remembers previous claim history and automatically requests only the documents needed for this specific claim type. No redundant questions, faster processing.',
      activeUSPs: ['memory', 'builder'],
      metrics: [
        { label: 'Documents Requested', value: '3' },
        { label: 'Time Saved', value: '40%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Required Documents</div>
            <div className="space-y-2">
              {['Accident Report', 'Damage Photos', 'Police Report'].map((doc, idx) => (
                <motion.div
                  key={doc}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Upload className="w-4 h-4" />
                    <span className="text-xs">Requested</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
            <div className="flex items-start gap-2">
              <Bot className="w-4 h-4 text-pink-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-pink-900 mb-1">Agent remembers:</div>
                <div className="text-xs text-pink-700">
                  "Customer's policy details and previous claim history"
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: 'Real-Time Fraud Detection',
      description: 'Every claim is automatically screened for fraud patterns. Security guardrails prevent suspicious claims from auto-approval, protecting your business while maintaining speed.',
      activeUSPs: ['security', 'governance'],
      metrics: [
        { label: 'Fraud Detected', value: '0' },
        { label: 'Risk Level', value: 'Low' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Fraud Screening</div>
            <div className="space-y-2">
              {['Pattern Analysis', 'Document Verification', 'Claim History Check'].map((check, idx) => (
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
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <Shield className="w-4 h-4" />
              <span>Guardrails active - Suspicious claims flagged automatically</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '4',
      title: 'AI-Powered Damage Assessment',
      description: 'The platform uses multiple AI models to analyze damage photos and documents. Quality checks ensure accurate assessment, with confidence scores for every decision.',
      activeUSPs: ['builder', 'observability'],
      metrics: [
        { label: 'AI Models Used', value: '3' },
        { label: 'Confidence', value: '96%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Damage Assessment</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Bumper Damage</div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Estimated: $1,200</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-700">Assessment Confidence</span>
                  <span className="text-xs font-semibold text-green-700">96%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Eye className="w-4 h-4" />
              <span>See which AI model made each assessment decision</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '5',
      title: 'Automated Approval Workflow',
      description: 'Valid claims are approved automatically with full compliance tracking. Every decision is logged for audit, and you have complete visibility into the approval process.',
      activeUSPs: ['governance', 'observability'],
      metrics: [
        { label: 'Approval Time', value: '< 1 hour' },
        { label: 'Compliance', value: '100%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Approval Workflow</div>
            <div className="space-y-2">
              {['Claim Validated', 'Damage Assessed', 'Policy Verified', 'Approved'].map((step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${idx < 3 ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
                    <span className="text-sm text-gray-700">{step}</span>
                  </div>
                  {idx < 3 && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {['Audit Log', 'Compliance', 'Trace'].map((badge) => (
              <div
                key={badge}
                className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-200 text-center"
              >
                <div className="text-xs font-semibold text-blue-900">{badge}</div>
                <div className="text-xs text-blue-700">Complete</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: '6',
      title: 'Automated Payment & Notification',
      description: 'Once approved, payment is processed automatically and the customer is notified across all channels. The entire process is tracked end-to-end with complete observability.',
      activeUSPs: ['builder', 'channels', 'observability'],
      timeSaved: 'Traditional: 2 weeks → Platform: 1 hour',
      metrics: [
        { label: 'Processing Time', value: '45 min' },
        { label: 'Customer Satisfaction', value: '98%' },
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
            <h4 className="text-lg font-bold text-green-900 mb-2">Claim Approved & Paid!</h4>
            <p className="text-sm text-green-700 mb-4">
              Payment of $1,200 processed. Customer notified via email and SMS.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Total Time</div>
                <div className="text-lg font-bold text-green-700">45 min</div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Steps Completed</div>
                <div className="text-lg font-bold text-green-700">6/6</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-600 mb-2">Complete process trace available</div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>All metrics tracked in observability dashboard</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <UseCaseDemo
      title="Claims Processing"
      description="Streamline claims from intake to payment with intelligent automation"
      icon={CreditCard}
      iconColor="text-green-600"
      iconBgColor="bg-green-100"
      steps={steps}
      autoPlay={false}
      onComplete={onComplete}
    />
  );
};

export default InsuranceClaimsDemo;
