import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Lock, CheckCircle, Copy, Eye, EyeOff, Settings, BarChart3, Zap } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  masked: boolean;
  usage: number;
  limit: number;
  status: 'active' | 'paused';
  models: string[];
}

const LiteLLMDemo: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk-1234567890abcdef',
      masked: true,
      usage: 75,
      limit: 100,
      status: 'active',
      models: ['gpt-4', 'claude-3', 'gemini-pro']
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk-abcdef1234567890',
      masked: true,
      usage: 25,
      limit: 50,
      status: 'active',
      models: ['gpt-3.5-turbo', 'claude-2']
    }
  ]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Auto-play sequence
    const sequence = [
      () => setCurrentStep(1), // Show keys
      () => setTimeout(() => setSelectedKey('1'), 1000), // Select first key
      () => setTimeout(() => {
        setApiKeys(prev => prev.map(k => k.id === '1' ? { ...k, masked: false } : k));
      }, 2000), // Reveal key
      () => setTimeout(() => {
        setApiKeys(prev => prev.map(k => k.id === '1' ? { ...k, usage: Math.min(k.usage + 5, k.limit) } : k));
      }, 3000), // Update usage
      () => setTimeout(() => {
        setSelectedKey(null);
        setApiKeys(prev => prev.map(k => ({ ...k, masked: true })));
        setCurrentStep(0);
      }, 5000), // Reset
    ];

    const interval = setInterval(() => {
      const step = sequence[currentStep];
      if (step) {
        step();
        setCurrentStep((prev) => (prev + 1) % sequence.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const toggleMask = (id: string) => {
    setApiKeys(prev => prev.map(k => 
      k.id === id ? { ...k, masked: !k.masked } : k
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Virtual API Keys</h3>
              <p className="text-xs text-gray-600">Manage and monitor your API access</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            New Key
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <AnimatePresence mode="wait">
          {apiKeys.map((key) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`border rounded-lg p-4 transition-all ${
                selectedKey === key.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{key.name}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      key.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {key.status}
                    </span>
                  </div>
                  
                  {/* API Key Display */}
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm font-mono text-gray-700">
                      {key.masked ? 'sk-' + '•'.repeat(20) : key.key}
                    </code>
                    <button
                      onClick={() => toggleMask(key.id)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      {key.masked ? (
                        <Eye className="w-4 h-4 text-gray-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Usage Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Usage</span>
                      <span>{key.usage} / {key.limit} requests</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(key.usage / key.limit) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${
                          key.usage / key.limit > 0.8 
                            ? 'bg-red-500' 
                            : key.usage / key.limit > 0.5 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 italic mt-1">
                      Set limits, track usage, and maintain compliance
                    </p>
                  </div>

                  {/* Models */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-600">Models:</span>
                    {key.models.map((model, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-200"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Stats Footer */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{apiKeys.length}</div>
              <div className="text-xs text-gray-600">Active Keys</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {apiKeys.reduce((sum, k) => sum + k.usage, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {apiKeys.reduce((sum, k) => sum + (k.limit - k.usage), 0)}
              </div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteLLMDemo;
