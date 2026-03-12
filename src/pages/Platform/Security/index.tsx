import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, CheckCircle, ArrowRight, XCircle } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import TripleGateVisual from '@/components/animations/TripleGateVisual';

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

const SecurityPage: React.FC = () => {
  const tripleGates = [
    {
      step: 1,
      name: 'The Shield',
      subtitle: 'Sanitize the Intent',
      quote: 'Stop the malicious prompt.',
      description: 'We act as the hyper-vigilant bouncer for your LLM. By inspecting payloads in real-time, we strip out toxic content and sensitive data (PII) before the model even processes a single token.',
      icon: Shield,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-600',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
      details: [
        'Real-time payload inspection',
        'Toxic content filtering',
        'PII detection and redaction',
        'Prompt injection prevention',
        'Jailbreak attempt blocking'
      ],
      blocks: ['Prompt injections', 'Jailbreaks', 'PII leaks', 'Toxic content']
    },
    {
      step: 2,
      name: 'The Checkpoint',
      subtitle: 'Govern the Action',
      quote: 'Authorize the tool use.',
      description: 'This is the missing link in modern AI security. Thuriyam validates that your agent has the specific permission to use a tool (like "Delete File" vs "Read File") ensuring scoped autonomy and preventing logic abuse.',
      icon: Lock,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-600',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-700',
      details: [
        'Tool-Based Access Control (TBAC)',
        'Function call authorization',
        'Scoped autonomy enforcement',
        'Logic abuse prevention',
        'Permission validation'
      ],
      blocks: ['Unauthorized tool calls', 'Logic abuse', 'Over-privileged actions']
    },
    {
      step: 3,
      name: 'The Vault',
      subtitle: 'Harden the Resource',
      quote: 'Protect the database.',
      description: 'Even if a rogue agent gets past the first two gates, our infrastructure layer holds the line. We enforce traditional, fine-grained identity checks to protect your core systems of record from unauthorized access. Data-level restrictions are respected—owned by respective applications.',
      icon: Database,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      iconColor: 'text-green-600',
      textColor: 'text-green-700',
      details: [
        'Customer-owned API Gateway infrastructure',
        'Application-level data visibility controls',
        'Respects existing security policies'
      ],
      blocks: ['Unauthorized access', 'Data breaches', 'System overload'],
      customerOwned: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>

          <Container className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                    AI Security
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Defense-in-Depth for the{' '}
                  <span className="text-blue-400">Agentic Era</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
                  Traditional firewalls protect your perimeter. Thuriyam protects your AI's Intent, Action, and Data.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  We deploy a <strong className="text-white">"Triple Gate"</strong> architecture to ensure your autonomous agents never go rogue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" to="/platform/studio" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                    Get Started
                  </Button>
                  <Button variant="outline" to="/developers" className="border-2 border-white/30 text-white hover:bg-white/10">
                    View API Docs
                  </Button>
                </div>
              </motion.div>

              {/* Right Column: Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-visible"
              >
                <div className="relative w-full h-96 md:h-[500px] px-4 md:px-8 overflow-visible">
                  <TripleGateVisual className="w-full h-full" />
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* The Triple Gate Architecture - Unified Section */}
        <Section className="bg-gradient-to-b from-background to-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Triple Gate Architecture
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
                Three layers of defense working together to protect your AI infrastructure from intent to action to data.
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Each gate serves a specific purpose: sanitizing malicious inputs, authorizing tool usage, and protecting your core systems.
              </p>
            </motion.div>

            {/* Three Card Layout with Flow */}
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {tripleGates.map((gate, i) => (
                  <motion.div
                    key={gate.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className={`relative ${gate.bgColor} border-2 ${gate.borderColor} rounded-2xl p-6 md:p-8`}
                  >
                    {/* Icon */}
                    <div className={`mb-6 p-4 ${gate.iconBg} rounded-xl w-fit`}>
                      <gate.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900">{gate.name}</h3>
                      <p className={`text-sm font-semibold ${gate.textColor} mb-3`}>{gate.subtitle}</p>

                      {/* Quote */}
                      <div className={`mb-4 p-3 bg-white rounded-lg border-l-4 ${gate.borderColor}`}>
                        <p className={`text-sm font-semibold ${gate.textColor} italic`}>"{gate.quote}"</p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{gate.description}</p>

                      {/* Blocks Section */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Blocks:</p>
                        <div className="flex flex-wrap gap-2">
                          {gate.blocks.map((block, j) => (
                            <div
                              key={j}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md border border-gray-200"
                            >
                              <XCircle className={`w-3 h-3 ${gate.iconColor}`} />
                              <span className="text-xs text-gray-700">{block}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details List */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-2">Features:</p>
                        <ul className="space-y-2">
                          {gate.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className={`w-4 h-4 ${gate.iconColor} mt-0.5 flex-shrink-0`} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Customer-Owned Badge for The Vault */}
                      {gate.customerOwned && (
                        <div className="mt-4 p-2 bg-white rounded-lg border border-green-300">
                          <p className="text-xs font-semibold text-green-800">Customer-Owned Infrastructure</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Flow Arrows - Desktop */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 transform -translate-y-1/2 z-0 pointer-events-none">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex justify-center"
                >
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </motion.div>
              </div>
              <div className="hidden md:block absolute top-1/2 left-2/3 right-1/3 transform -translate-y-1/2 z-0 pointer-events-none">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex justify-center"
                >
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </motion.div>
              </div>

              {/* Mobile Flow Arrows */}
              <div className="md:hidden flex justify-center items-center gap-2 my-6">
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Bottom Flow Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-full border-2 border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Protected from Intent → Action → Data
                </span>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Enterprise Ready Section */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Enterprise-Grade AI Defense
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built for organizations that can't afford to compromise on security. Every layer of the Triple Gate architecture is designed to meet enterprise security standards.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {[
                  { icon: CheckCircle, text: 'SOC 2 Compliant' },
                  { icon: CheckCircle, text: 'GDPR Ready' },
                  { icon: CheckCircle, text: 'HIPAA Compatible' },
                  { icon: CheckCircle, text: 'PCI-DSS Aligned' },
                  { icon: CheckCircle, text: 'ISO 27001 Standards' },
                  { icon: CheckCircle, text: 'Zero Trust Architecture' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-primary/5">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your AI Workforce?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience enterprise-grade security with the Triple Gate architecture. Protect your AI from intent to action to data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" to="/platform/studio">Get Started</Button>
                <Button variant="outline" to="/developers">View API Docs</Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;

