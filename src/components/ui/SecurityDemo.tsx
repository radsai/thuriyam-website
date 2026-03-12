import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle, AlertTriangle, Eye, Key, FileCheck, Zap } from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  status: 'passed' | 'warning' | 'failed';
  lastChecked: string;
  description: string;
}

interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  detected: string;
  status: 'blocked' | 'monitored';
}

const SecurityDemo: React.FC = () => {
  const [checks, setChecks] = useState<SecurityCheck[]>([
    {
      id: '1',
      name: 'Data Encryption',
      status: 'passed',
      lastChecked: '2m ago',
      description: 'All data encrypted at rest and in transit'
    },
    {
      id: '2',
      name: 'Access Control',
      status: 'passed',
      lastChecked: '5m ago',
      description: 'Role-based access control active'
    },
    {
      id: '3',
      name: 'Rate Limiting',
      status: 'passed',
      lastChecked: '1m ago',
      description: 'API rate limits enforced'
    },
    {
      id: '4',
      name: 'Audit Logging',
      status: 'passed',
      lastChecked: '3m ago',
      description: 'All actions logged and monitored'
    },
  ]);

  const [threats, setThreats] = useState<Threat[]>([
    { id: '1', type: 'Suspicious API Pattern', severity: 'low', detected: '5m ago', status: 'blocked' },
    { id: '2', type: 'Unusual Request Volume', severity: 'medium', detected: '12m ago', status: 'blocked' },
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Auto-update security checks
    const interval = setInterval(() => {
      setChecks(prev => prev.map(check => ({
        ...check,
        lastChecked: check.id === '1' ? 'Just now' : check.lastChecked
      })));

      // Occasionally add a new threat
      if (Math.random() > 0.7) {
        const newThreat: Threat = {
          id: Date.now().toString(),
          type: ['Suspicious API Pattern', 'Unusual Request Volume', 'Invalid Token Attempt', 'Rate Limit Exceeded'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          detected: 'Just now',
          status: 'blocked'
        };
        setThreats(prev => [newThreat, ...prev.slice(0, 2)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Security Dashboard</h3>
              <p className="text-xs text-gray-600">Triple-gate security monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-700">Secure</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Security Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center relative">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{checks.filter(c => c.status === 'passed').length}</div>
            <div className="text-xs text-green-600">Active Protections</div>
            <p className="text-xs text-gray-500 italic mt-1">Operational control at your fingertips</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center relative">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{threats.filter(t => t.status === 'blocked').length}</div>
            <div className="text-xs text-blue-600">Threats Blocked</div>
            <p className="text-xs text-gray-500 italic mt-1">Detect failures before users notice</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center relative">
            <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">100%</div>
            <div className="text-xs text-purple-600">Compliance</div>
            <p className="text-xs text-gray-500 italic mt-1">Enforce SLAs across all agents</p>
          </div>
        </div>

        {/* Security Checks */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="w-5 h-5 text-gray-700" />
            <h4 className="font-semibold text-gray-900">Security Checks</h4>
          </div>
          <div className="space-y-2">
            {checks.map((check) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    check.status === 'passed' 
                      ? 'bg-green-100' 
                      : check.status === 'warning'
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}>
                    {check.status === 'passed' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{check.name}</span>
                      <span className="text-xs text-gray-500">{check.lastChecked}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{check.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Threats */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-gray-700" />
            <h4 className="font-semibold text-gray-900">Recent Threats</h4>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {threats.map((threat) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    threat.severity === 'high'
                      ? 'bg-red-50 border-red-200'
                      : threat.severity === 'medium'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      threat.severity === 'high'
                        ? 'bg-red-100'
                        : threat.severity === 'medium'
                        ? 'bg-yellow-100'
                        : 'bg-blue-100'
                    }`}>
                      <Shield className={`w-4 h-4 ${
                        threat.severity === 'high'
                          ? 'text-red-600'
                          : threat.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{threat.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          threat.severity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : threat.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {threat.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-600">{threat.detected}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          threat.status === 'blocked'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {threat.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4">
            {['SOC 2', 'GDPR', 'HIPAA'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDemo;
