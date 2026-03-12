import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, Key, Shield, Zap, Book, Terminal, Lock, CheckCircle, 
  ShieldCheck, FileCode, Copy, GitBranch, Wrench, Send,
  Eye, DollarSign, Settings, Activity, BarChart3, TrendingUp,
  AlertCircle, Clock, Users, Server
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';

const Section = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = 'primary',
  className = '',
  to,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = "h-12 px-8 text-base";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };

  const button = (
    <button
      className={`${baseStyles} ${sizes} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  if (to) {
    return <Link to={to}>{button}</Link>;
  }

  return button;
};

// Virtual Keys Demo Component
const VirtualKeysDemo: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const demoCode = [
    '$ curl -X POST https://api.thuriyam.ai/v1/keys',
    '  -H "Authorization: Bearer YOUR_MASTER_KEY"',
    '  -H "Content-Type: application/json"',
    '  -d \'{',
    '      "name": "production-key",',
    '      "budget_limit": 1000,',
    '      "budget_period": "monthly",',
    '      "allowed_models": ["gpt-4", "claude-3"]',
    '    }\'',
    '',
    '→ Response:',
    '{',
    '  "key_id": "vk_abc123...",',
    '  "name": "production-key",',
    '  "budget_limit": 1000,',
    '  "budget_used": 0,',
    '  "status": "active"',
    '}',
  ];

  useEffect(() => {
    isMountedRef.current = true;
    
    const typeCode = () => {
      if (!isMountedRef.current) return;
      
      if (currentLine < demoCode.length) {
        setIsTyping(true);
        const line = demoCode[currentLine];
        let charIndex = 0;
        
        typingIntervalRef.current = setInterval(() => {
          if (!isMountedRef.current) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            return;
          }
          
          if (charIndex <= line.length) {
            setCodeLines(prev => {
              const newLines = [...prev];
              if (newLines.length <= currentLine) {
                newLines.push('');
              }
              newLines[currentLine] = line.substring(0, charIndex);
              return newLines;
            });
            charIndex++;
          } else {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            setIsTyping(false);
            timeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                setCurrentLine(prev => prev + 1);
              }
            }, 300);
          }
        }, 50);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setCodeLines([]);
            setCurrentLine(0);
          }
        }, 3000);
      }
    };

    typeCode();

    return () => {
      isMountedRef.current = false;
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLine]);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
        <Key className="w-4 h-4 text-yellow-400" />
        <span className="text-xs text-gray-400 ml-2 font-mono">Virtual Keys API</span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-100 min-h-[300px]">
        {codeLines.map((line, index) => (
          <div key={`vk-line-${index}`} className="mb-1">
            <span className={
              line.startsWith('$') ? 'text-green-400' :
              line.startsWith('→') ? 'text-blue-400' :
              line.startsWith('{') || line.startsWith('}') ? 'text-purple-400' :
              line.includes('"key_id"') || line.includes('"budget') ? 'text-yellow-400' :
              'text-gray-300'
            }>
              {line || '\u00A0'}
            </span>
          </div>
        ))}
        {isTyping && (
          <motion.span
            className="inline-block w-2 h-4 bg-white ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
};

// Observability Demo Component
const ObservabilityDemo: React.FC = () => {
  const [metrics, setMetrics] = useState([
    { label: 'Total Requests', value: '12,543', trend: '+12%' },
    { label: 'Avg Latency', value: '245ms', trend: '-8%' },
    { label: 'Success Rate', value: '99.2%', trend: '+0.5%' },
    { label: 'Cost Today', value: '$124.50', trend: '+5%' },
  ]);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-green-400" />
        <span className="text-xs text-gray-400 ml-2 font-mono">Real-time Observability</span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
              <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-green-400">{metric.trend}</div>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Recent Request</span>
            <span className="text-green-400">✓ Success</span>
          </div>
          <div className="bg-gray-800 rounded p-3 font-mono text-xs">
            <div className="text-gray-300">POST /v1/chat</div>
            <div className="text-gray-500 mt-1">Model: gpt-4 | Latency: 234ms | Cost: $0.002</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Budget Control Demo Component
const BudgetControlDemo: React.FC = () => {
  const [budget, setBudget] = useState(75); // 75% used

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-green-400" />
        <span className="text-xs text-gray-400 ml-2 font-mono">Budget Control</span>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Monthly Budget</span>
            <span className="text-white font-bold">$750 / $1,000</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${budget}%` }}
              transition={{ duration: 1 }}
              className={`h-3 rounded-full ${
                budget < 80 ? 'bg-green-500' : budget < 95 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-500">25% remaining</span>
            <span className="text-gray-500">Alert at 90%</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="text-sm text-white">Auto-throttle enabled</div>
              <div className="text-xs text-gray-400">Slows requests at 90%</div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="text-sm text-white">Email alerts</div>
              <div className="text-xs text-gray-400">Sent at 80%, 90%, 95%</div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DevelopersV2Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-8 md:pt-16 md:pb-12 bg-gradient-to-b from-primary/5 via-slate-50 to-background">
          <Container>
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-6">
                  <Code className="w-4 h-4" />
                  <span className="font-bold">Lite LLM Platform</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  Unified LLM Gateway with{' '}
                  <span className="text-primary">Complete Control</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
                  Virtual Keys, Real-time Observability, Budget Controls, and Enterprise Security—all in one unified API.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                  <Button variant="primary" to="/signup">Get Started</Button>
                  <Button variant="outline" to="/signin">Sign In</Button>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Virtual Keys Section */}
        <Section className="bg-primary/5 pt-0">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 mb-4">
                  <Key className="w-4 h-4" />
                  <span className="text-sm font-bold">Virtual Keys</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Secure API Key Management
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Create virtual keys with granular controls. Set budget limits, restrict models, and manage access—all programmatically.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Lock className="w-5 h-5" />,
                      title: 'Granular Access Control',
                      description: 'Control which models, endpoints, and features each key can access.'
                    },
                    {
                      icon: <DollarSign className="w-5 h-5" />,
                      title: 'Budget Limits',
                      description: 'Set monthly or per-request budget limits with automatic throttling.'
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      title: 'Team Management',
                      description: 'Create keys for different teams, projects, or environments.'
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="primary" to="/signup">Create Your First Key</Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <VirtualKeysDemo />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Observability Section */}
        <Section className="bg-muted/30">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <ObservabilityDemo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-bold">Observability</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Real-time Monitoring & Analytics
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Track every request, monitor performance, and gain insights into your LLM usage patterns.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Activity className="w-5 h-5" />,
                      title: 'Real-time Metrics',
                      description: 'Monitor latency, throughput, error rates, and success metrics in real-time.'
                    },
                    {
                      icon: <BarChart3 className="w-5 h-5" />,
                      title: 'Usage Analytics',
                      description: 'Track model usage, cost trends, and identify optimization opportunities.'
                    },
                    {
                      icon: <TrendingUp className="w-5 h-5" />,
                      title: 'Performance Insights',
                      description: 'Analyze response times, token usage, and model performance across your stack.'
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 bg-green-100 rounded-lg text-green-700 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Budget & Control Section */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-bold">Budget & Control</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Cost Control
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Set budgets, get alerts, and automatically throttle usage to prevent cost overruns.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <DollarSign className="w-5 h-5" />,
                      title: 'Budget Limits',
                      description: 'Set monthly, weekly, or per-key budget limits with automatic enforcement.'
                    },
                    {
                      icon: <AlertCircle className="w-5 h-5" />,
                      title: 'Smart Alerts',
                      description: 'Get notified at budget thresholds (80%, 90%, 95%) via email or webhook.'
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: 'Auto-throttling',
                      description: 'Automatically slow down or stop requests when approaching budget limits.'
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-700 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="primary" to="/signup">Start Managing Costs</Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <BudgetControlDemo />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Unified API Section */}
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-4">
                  <Server className="w-4 h-4" />
                  <span className="font-bold">Unified API</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  One API, All LLMs
                </h2>
                <p className="text-lg text-muted-foreground">
                  Access OpenAI, Anthropic, Google, and more through a single unified endpoint. Switch models without changing your code.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Model Agnostic',
                  description: 'Use any LLM provider through our unified API. Switch models with a single parameter change.',
                  icon: <Server className="w-6 h-6" />,
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Automatic Failover',
                  description: 'Built-in resilience with automatic failover to backup models when primary models are unavailable.',
                  icon: <ShieldCheck className="w-6 h-6" />,
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Rate Limiting',
                  description: 'Built-in rate limiting and request queuing to handle high-volume traffic gracefully.',
                  icon: <Zap className="w-6 h-6" />,
                  color: 'from-purple-500 to-purple-600'
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-0 rounded-xl p-6 flex flex-col items-start gap-4"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Quick Start Section */}
        <Section>
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Get Started in Minutes
                </h2>
                <p className="text-lg text-muted-foreground">
                  Three simple steps to start using the unified LLM gateway
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Sign Up & Get API Key',
                    description: 'Create your account and generate your first virtual key with budget controls.',
                    code: 'curl https://api.thuriyam.ai/v1/keys'
                  },
                  {
                    step: 2,
                    title: 'Make Your First Request',
                    description: 'Use our unified endpoint to call any LLM provider.',
                    code: 'curl -X POST https://api.thuriyam.ai/v1/chat \\\n  -H "Authorization: Bearer YOUR_KEY"'
                  },
                  {
                    step: 3,
                    title: 'Monitor & Control',
                    description: 'Track usage, set budgets, and monitor performance in real-time.',
                    code: 'curl https://api.thuriyam.ai/v1/metrics'
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <code className="block bg-muted p-3 rounded-lg text-xs font-mono text-left whitespace-pre-wrap">
                      {step.code}
                    </code>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="primary" to="/signup">Get Started Now</Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default DevelopersV2Page;
