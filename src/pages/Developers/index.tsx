import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Key, Shield, Zap, Book, Terminal, Lock, CheckCircle, ShieldCheck, FileCode, Copy, GitBranch, Wrench, Send } from 'lucide-react';
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

// Animated API Demo Component
const APIDemo: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const demoCode = [
    '$ curl -X POST https://api.thuriyam.ai/v1/chat',
    '  -H "Authorization: Bearer sk-..."',
    '  -H "Content-Type: application/json"',
    '  -d \'{"model": "gpt-4",',
    '        "messages": [',
    '          {"role": "user",',
    '           "content": "Hello!"}',
    '        ]',
    '      }\'',
    '',
    '→ Response:',
    '{',
    '  "id": "chat-123",',
    '  "choices": [{',
    '    "message": {',
    '      "role": "assistant",',
    '      "content": "Hello! How can I help?"',
    '    }',
    '  }]',
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
        // Reset after showing all code
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
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-400 ml-4 font-mono">Terminal</span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-100 min-h-[300px]">
        {codeLines.map((line, index) => (
          <div
            key={`line-${index}`}
            className="mb-1"
          >
            <span className={line.startsWith('$') ? 'text-green-400' : line.startsWith('→') ? 'text-blue-400' : line.startsWith('{') || line.startsWith('}') ? 'text-purple-400' : 'text-gray-300'}>
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

// Animated Local Development Demo
const LocalDevelopmentDemo: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const demoCode = [
    '// Build locally in VS Code',
    'const agent = new Agent({',
    '  name: "fraud-detector",',
    '  model: "gpt-4"',
    '});',
    '',
    '→ Connecting to gateway...',
    '✓ Authenticated',
    '✓ Security checks passed',
    '✓ Ready to deploy',
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
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-400 ml-4 font-mono">VS Code</span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-100 min-h-[300px]">
        {codeLines.map((line, index) => (
          <div
            key={`local-line-${index}`}
            className="mb-1"
          >
            <span className={line.startsWith('//') ? 'text-gray-500' : line.startsWith('→') ? 'text-blue-400' : line.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}>
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

// Animated Code Upload Demo
const CodeUploadDemo: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const demoCode = [
    '$ thuriyam deploy ./my-agent',
    '',
    '→ Uploading agent...',
    '✓ Agent uploaded',
    '→ Configuring API keys...',
    '✓ API keys configured',
    '→ Deploying to platform...',
    '✓ Agent deployed',
    '',
    '→ Agent live at:',
    '  api.thuriyam.ai/agents/my-agent',
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
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-400 ml-4 font-mono">Terminal</span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-100 min-h-[300px]">
        {codeLines.map((line, index) => (
          <div
            key={`upload-line-${index}`}
            className="mb-1"
          >
            <span className={line.startsWith('$') ? 'text-green-400' : line.startsWith('→') ? 'text-blue-400' : line.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}>
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

// Animated Instant Tooling Demo (API to Tool conversion)
const InstantToolingDemo: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const phaseRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const phases = [
    // Phase 1: Original API
    [
      '// Your existing API',
      'GET /api/orders/{id}',
      '',
      'Response:',
      '{',
      '  "orderId": "12345",',
      '  "status": "shipped"',
      '}',
    ],
    // Phase 2: Converting...
    [
      '// Converting to agent tool...',
      '→ Reading OpenAPI spec...',
      '→ Generating tool definition...',
    ],
    // Phase 3: Tool ready
    [
      '// Agent tool ready!',
      'agent.tools.getOrderStatus(orderId)',
      '',
      '✓ Tool available in agent',
      '✓ No code changes needed',
    ],
  ];

  useEffect(() => {
    isMountedRef.current = true;
    
    const showPhase = () => {
      if (!isMountedRef.current) return;
      
      if (phaseRef.current < phases.length) {
        setCodeLines(phases[phaseRef.current]);
        phaseRef.current++;
        timeoutRef.current = setTimeout(showPhase, 3000);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setCodeLines([]);
            phaseRef.current = 0;
            timeoutRef.current = setTimeout(showPhase, 1000);
          }
        }, 2000);
      }
    };

    timeoutRef.current = setTimeout(showPhase, 1000);
    
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-xs text-gray-400 ml-2 font-mono">API → Tool Converter</span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-100 min-h-[300px]">
        {codeLines.map((line, index) => (
          <div
            key={`tool-line-${index}`}
            className="mb-1"
          >
            <span className={
              line.startsWith('//') ? 'text-gray-500' :
              line.startsWith('GET') || line.startsWith('POST') ? 'text-blue-400' :
              line.startsWith('→') ? 'text-yellow-400' :
              line.startsWith('✓') ? 'text-green-400' :
              line.startsWith('{') || line.startsWith('}') ? 'text-purple-400' :
              'text-gray-300'
            }>
              {line || '\u00A0'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DevelopersPage: React.FC = () => {
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
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  Beyond Visual Builders:{' '}
                  <span className="text-primary">Code-First Control</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
                  REST APIs for programmatic control. CLI tools, infrastructure as code, and seamless integration with your developer toolchain.
                </p>
                <div className="flex justify-center mb-8">
                  <Button variant="primary" to="/developer/virtual-keys">Get Your Free API Key</Button>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Quick Start */}
        <Section className="bg-primary/5 pt-0">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Steps</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get your API key, make your first call, and deploy your agent—all in minutes.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">1. Get Your API Key</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a virtual key with budget limits, real-time metering, and transparent costing.
                    </p>
                    <code className="block bg-muted p-3 rounded-lg text-sm font-mono">
                      curl -X POST https://api.thuriyam.ai/v1/keys
                    </code>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Make Your First Call</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use the unified endpoint to call any LLM.
                    </p>
                    <code className="block bg-muted p-3 rounded-lg text-sm font-mono">
                      curl -X POST https://api.thuriyam.ai/v1/chat \<br />
                      &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_KEY&quot; \<br />
                      &nbsp;&nbsp;-d &apos;{`{"model": "gpt-4", "messages": [...]}`}&apos;
                    </code>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3. Deploy Your Agent</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Deploy your custom agent to the platform.
                    </p>
                    <code className="block bg-muted p-3 rounded-lg text-sm font-mono">
                      thuriyam deploy ./my-agent
                    </code>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="primary" to="/developer/virtual-keys">Get API Key</Button>
                </div>
              </motion.div>

              {/* Animated API Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <APIDemo />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Instant Tooling */}
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-4">
                  <Wrench className="w-4 h-4" />
                  <span className="font-bold">Instant Tooling</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Turn Your APIs Into Agent Tools Automatically
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have an API for checking order status? Our system automatically converts it into a tool your agent can use—reducing integration time by 90%.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Infographic */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="grid gap-6">
                  {[
                    {
                      step: 1,
                      title: 'Your Existing API',
                      description: 'You already have APIs for your business—order tracking, customer data, inventory, etc.',
                      icon: <Code className="w-6 h-6" />,
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      step: 2,
                      title: 'Automatic Conversion',
                      description: 'Our system reads your API documentation and converts it into an agent-ready tool instantly.',
                      icon: <Zap className="w-6 h-6" />,
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      step: 3,
                      title: 'Agent Can Use It',
                      description: 'Your agent now has access to your business tools without any custom code or integration work.',
                      icon: <CheckCircle className="w-6 h-6" />,
                      color: 'from-green-500 to-green-600'
                    },
                  ].map((stage, i) => (
                    <motion.div
                      key={stage.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border-0 rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stage.color} text-white shadow-lg flex-shrink-0`}>
                        {stage.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">90% Reduction in Integration Time</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        What used to take weeks of engineering work now happens automatically. Your existing business APIs become agent tools in minutes, not months.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Animated Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <InstantToolingDemo />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* IDE Gateway - Build Locally, Deploy Securely */}
        <Section className="bg-gradient-to-b from-background to-muted/30">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Build Locally, Deploy Securely
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Build agents in VS Code or Cursor on your laptop. All traffic routes through the enterprise security gateway automatically.
                </p>
                
                <div className="grid gap-6">
                  {[
                    {
                      title: 'Safe Experimentation',
                      description: 'Prototype on your laptop without local API keys. The Gateway handles authentication and governance transparently.',
                      icon: <Terminal className="w-6 h-6" />,
                      color: 'from-green-500 to-green-600'
                    },
                    {
                      title: 'Transparent Security',
                      description: 'Local development connects to the enterprise gateway automatically. Security checks, rate limiting, and compliance controls—no configuration needed.',
                      icon: <ShieldCheck className="w-6 h-6" />,
                      color: 'from-blue-500 to-blue-600'
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border-0 rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${card.color} text-white shadow-lg flex-shrink-0`}>
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Animation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <LocalDevelopmentDemo />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Custom Agents */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Upload Your Custom-Coded Agents
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border-0 rounded-xl p-6 flex items-start gap-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg flex-shrink-0">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload Python, Node.js, or containerized agents. Get AI Gateway benefits—security, observability, and scale—without rewriting code.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Automatic API key management',
                        'Built-in monitoring and logging',
                        'Seamless platform integration',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <CodeUploadDemo />
              </motion.div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default DevelopersPage;

