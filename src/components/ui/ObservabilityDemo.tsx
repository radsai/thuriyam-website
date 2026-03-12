import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Clock, CheckCircle, AlertCircle, MessageSquare, Zap } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  color: string;
}

interface Interaction {
  id: string;
  timestamp: string;
  agent: string;
  status: 'success' | 'error' | 'warning';
  duration: number;
  tokens: number;
}

const ObservabilityDemo: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: '1', label: 'Total Requests', value: 12450, change: 12.5, trend: 'up', color: 'text-blue-600' },
    { id: '2', label: 'Avg Response Time', value: 245, change: -8.3, trend: 'down', color: 'text-green-600' },
    { id: '3', label: 'Success Rate', value: 98.5, change: 2.1, trend: 'up', color: 'text-purple-600' },
    { id: '4', label: 'Active Agents', value: 12, change: 0, trend: 'up', color: 'text-orange-600' },
  ]);

  const [interactions, setInteractions] = useState<Interaction[]>([
    { id: '1', timestamp: '2m ago', agent: 'Customer Support', status: 'success', duration: 1.2, tokens: 450 },
    { id: '2', timestamp: '5m ago', agent: 'Lead Qualification', status: 'success', duration: 0.8, tokens: 320 },
    { id: '3', timestamp: '8m ago', agent: 'KYC Verification', status: 'warning', duration: 2.1, tokens: 680 },
    { id: '4', timestamp: '12m ago', agent: 'Fraud Detection', status: 'success', duration: 0.5, tokens: 210 },
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Auto-update metrics
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.id === '1' 
          ? metric.value + Math.floor(Math.random() * 10)
          : metric.id === '2'
          ? metric.value + (Math.random() > 0.5 ? -5 : 5)
          : metric.id === '3'
          ? Math.min(99.9, metric.value + (Math.random() * 0.2))
          : metric.value
      })));

      // Add new interaction
      const newInteraction: Interaction = {
        id: Date.now().toString(),
        timestamp: 'Just now',
        agent: ['Customer Support', 'Lead Qualification', 'KYC Verification', 'Fraud Detection'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.8 ? 'warning' : 'success',
        duration: Math.random() * 2 + 0.5,
        tokens: Math.floor(Math.random() * 500) + 200
      };

      setInteractions(prev => [newInteraction, ...prev.slice(0, 3)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Interaction Analytics</h3>
              <p className="text-xs text-gray-600">Real-time monitoring and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const callouts: { [key: string]: string } = {
              '1': '',
              '2': 'Enforce SLAs across all agents',
              '3': 'Detect failures before users notice',
              '4': ''
            };
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">{metric.label}</span>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.id === '3' 
                      ? `${metric.value.toFixed(1)}%`
                      : metric.id === '1'
                      ? metric.value.toLocaleString()
                      : metric.id === '2'
                      ? `${metric.value}ms`
                      : metric.value
                    }
                  </span>
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? '+' : ''}{metric.change.toFixed(1)}%
                  </span>
                </div>
                {callouts[metric.id] && (
                  <p className="text-xs text-gray-500 italic mt-1">
                    {callouts[metric.id]}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Recent Interactions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-gray-700" />
            <h4 className="font-semibold text-gray-900">Recent Interactions</h4>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {interactions.map((interaction, index) => (
                <motion.div
                  key={interaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      interaction.status === 'success' 
                        ? 'bg-green-100' 
                        : interaction.status === 'warning'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                    }`}>
                      {interaction.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{interaction.agent}</span>
                        <span className="text-xs text-gray-500">{interaction.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {interaction.duration.toFixed(1)}s
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Zap className="w-3 h-3" />
                          {interaction.tokens} tokens
                        </div>
                      </div>
                      {index === 0 && (
                        <p className="text-xs text-gray-400 italic mt-1">
                          See token cost + latency per interaction
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="pt-4 border-t border-gray-200">
          <div className="h-32 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-end justify-around p-4">
            {[65, 78, 82, 75, 88, 92, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-8 bg-green-500 rounded-t"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">Response Time Trend (Last 7 days)</p>
        </div>
      </div>
    </div>
  );
};

export default ObservabilityDemo;
