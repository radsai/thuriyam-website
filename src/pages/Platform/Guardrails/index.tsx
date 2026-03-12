import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Code, Lock, FileCode, Users, Zap, X } from 'lucide-react';
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

const GuardrailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-green-50 via-emerald-50 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                    ENTERPRISE AI SAFETY & COMPLIANCE
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Thuriyam Guardrails:{' '}
                  <span className="text-primary">Policy-as-Code Security</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                  Policy-as-Code Security for Production AI Applications
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Thuriyam Guardrails provides enterprise-grade AI safety and compliance through policy-as-code templates. Integrated with AI Gateway and Insights Agent, it automatically enforces security, compliance, and content safety policies across all your AI applications—without writing custom code.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Problem Section */}
        <Section>
          <Container>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What problem does Thuriyam Guardrails solve?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Thuriyam Guardrails solves the "AI Safety & Compliance Gap" for production AI applications.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Today, organizations deploying AI applications face critical safety and compliance challenges. Building custom validation logic for every application is time-consuming, error-prone, and impossible to maintain at scale.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: Code,
                    title: 'Fragmented Security Implementation',
                    description: 'Each AI application requires custom code to detect PII, block toxic content, prevent prompt injection, and enforce compliance rules. This creates inconsistent security postures and massive technical debt.'
                  },
                  {
                    icon: FileCode,
                    title: 'Compliance Complexity',
                    description: 'Different applications need different compliance requirements (HIPAA, PCI-DSS, GDPR). Building and maintaining compliance logic for each application is expensive and error-prone. Most organizations can\'t keep up with evolving regulations.'
                  },
                  {
                    icon: AlertTriangle,
                    title: 'Lack of Centralized Governance',
                    description: 'Without a central policy engine, security policies are scattered across codebases. When a new threat emerges or regulations change, every application must be updated individually.'
                  },
                  {
                    icon: Shield,
                    title: 'Reactive, Not Proactive',
                    description: 'Most guardrail solutions detect violations after they occur. By then, sensitive data may have been exposed and compliance violations have happened. Organizations need prevention, not just detection.'
                  },
                  {
                    icon: Zap,
                    title: 'Integration Overhead',
                    description: 'Standalone guardrail solutions require separate integrations, additional infrastructure, and custom code. This adds complexity, latency, and operational overhead.'
                  }
                ].map((problem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <problem.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                        <p className="text-muted-foreground">{problem.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg"
              >
                <p className="text-lg text-foreground leading-relaxed">
                  <strong>Thuriyam Guardrails solves this</strong> by providing policy-as-code templates that integrate seamlessly with AI Gateway and Insights Agent. We make enforcing enterprise-grade security, compliance, and content safety radically simple—without writing custom code.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Target Users Section */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who is the target user?
              </h2>
              <p className="text-lg text-muted-foreground">
                We have three primary target users:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Security & Compliance Officers',
                  subtitle: 'Primary Target',
                  description: 'CISOs, Compliance Officers, and Risk Managers responsible for ensuring AI applications meet security and regulatory requirements. They need centralized governance, audit trails, and consistent policy enforcement across all AI applications.',
                  color: 'text-green-600 bg-green-50'
                },
                {
                  icon: Code,
                  title: 'AI Platform Engineers & DevOps',
                  description: 'Platform engineers and DevOps teams building AI infrastructure. They are frustrated by the complexity of integrating security tools and maintaining compliance logic. They want policy-as-code that integrates seamlessly with their existing infrastructure.',
                  color: 'text-blue-600 bg-blue-50'
                },
                {
                  icon: Users,
                  title: 'Application Developers',
                  description: 'Developers building AI-powered applications. They want to focus on building features, not security infrastructure. They need guardrails that "just work" without requiring deep security expertise or custom integration code.',
                  color: 'text-purple-600 bg-purple-50'
                }
              ].map((user, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className={`mb-6 p-4 rounded-xl w-fit ${user.color}`}>
                    <user.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{user.title}</h3>
                  {user.subtitle && (
                    <p className="text-sm text-primary font-semibold mb-3">{user.subtitle}</p>
                  )}
                  <p className="text-muted-foreground">{user.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Transformation Section */}
        <Section>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What transformation do they experience after using it?
              </h2>
              <p className="text-lg text-muted-foreground">
                The transformation is a profound shift from reactive security management to proactive, policy-driven governance.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-red-50 border-2 border-red-200 rounded-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-red-900">Before Thuriyam Guardrails</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Custom Security Code',
                      text: '"Every application needs custom validation logic. We\'re reinventing the wheel for PII detection, toxic content filtering, and compliance checks. Our security code is scattered across 20+ repositories."'
                    },
                    {
                      title: 'Compliance Gaps',
                      text: '"We can\'t keep up with compliance requirements. HIPAA rules change, GDPR updates happen, and we have to update every application individually. We\'re always behind."'
                    },
                    {
                      title: 'Inconsistent Enforcement',
                      text: '"Different teams implement security differently. Some applications have strict guardrails, others have none. We have no way to ensure consistent policy enforcement."'
                    },
                    {
                      title: 'Reactive Security',
                      text: '"We discover security issues after they happen. By then, PII has been exposed, compliance violations have occurred, and we\'re dealing with incidents instead of preventing them."'
                    },
                    {
                      title: 'Integration Overhead',
                      text: '"Integrating standalone guardrail solutions requires custom code, additional infrastructure, and ongoing maintenance. It adds complexity and latency to every application."'
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-red-800 italic">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-green-50 border-2 border-green-200 rounded-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-green-900">After Thuriyam Guardrails</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Policy-as-Code Governance',
                      text: '"For the first time, we have centralized, version-controlled security policies. We define compliance templates once, and they\'re automatically enforced across all AI applications. Policy changes are deployed instantly."'
                    },
                    {
                      title: 'Proactive Prevention',
                      text: '"Our guardrails prevent violations before they happen. PII is detected and redacted automatically. Toxic content is blocked. Prompt injection attempts are stopped. We\'re preventing incidents, not responding to them."'
                    },
                    {
                      title: 'Consistent Enforcement',
                      text: '"Every AI application uses the same compliance templates. Security policies are enforced consistently across all applications. We have a single source of truth for AI governance."'
                    },
                    {
                      title: 'Zero Integration Overhead',
                      text: '"Guardrails are built into our AI Gateway and Insights Agent. There\'s no separate infrastructure, no custom integration code, no additional latency. Security is automatic and transparent."'
                    },
                    {
                      title: 'Audit-Ready Compliance',
                      text: '"We have complete audit trails of all guardrail violations, policy changes, and enforcement actions. Compliance audits are simple because everything is documented and centralized."'
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-green-800 italic">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg max-w-4xl mx-auto"
            >
              <p className="text-lg text-foreground leading-relaxed">
                <strong>In essence, the transformation is:</strong> You stop being a reactive security manager and become a proactive policy architect. Guardrails become infrastructure, not application code. Security and compliance are automatic, consistent, and auditable.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Key Differentiators */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key Differentiators
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { vs: 'Policy-as-Code', vs2: 'Custom Security Code' },
                { vs: 'Integrated Platform', vs2: 'Standalone Tools' },
                { vs: 'Proactive Prevention', vs2: 'Reactive Detection' },
                { vs: 'Centralized Governance', vs2: 'Fragmented Policies' },
                { vs: 'Enterprise Templates', vs2: 'Generic Rules' },
                { vs: 'Zero-Latency Integration', vs2: 'Additional Infrastructure' }
              ].map((diff, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center"
                >
                  <div className="mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-lg text-foreground">{diff.vs}</p>
                  </div>
                  <div className="text-muted-foreground text-sm">vs.</div>
                  <div className="mt-2">
                    <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">{diff.vs2}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Use Cases & Outcomes */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Use Cases & Outcomes
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: 'Compliance Assurance',
                  description: 'Ensure 100% compliance with regulations (HIPAA, PCI-DSS, GDPR) through pre-built templates.',
                  outcome: 'Zero compliance violations, automated enforcement, audit-ready documentation.',
                  color: 'text-green-600 bg-green-50'
                },
                {
                  icon: Lock,
                  title: 'PII Protection',
                  description: 'Automatically detect and redact personally identifiable information across all AI applications.',
                  outcome: 'Zero PII exposure incidents, automated data protection, regulatory compliance.',
                  color: 'text-blue-600 bg-blue-50'
                },
                {
                  icon: Shield,
                  title: 'Content Safety',
                  description: 'Block toxic language, profanity, and inappropriate content in real-time.',
                  outcome: 'Brand-safe AI applications, improved user experience, reduced moderation costs.',
                  color: 'text-purple-600 bg-purple-50'
                },
                {
                  icon: AlertTriangle,
                  title: 'Security Hardening',
                  description: 'Prevent prompt injection, jailbreak attempts, and other security attacks.',
                  outcome: 'Zero security breaches, protected AI applications, reduced security incidents.',
                  color: 'text-red-600 bg-red-50'
                },
                {
                  icon: FileCode,
                  title: 'Enterprise Governance',
                  description: 'Centralized policy management and consistent enforcement across all AI applications.',
                  outcome: 'Single source of truth, simplified audits, reduced compliance risk.',
                  color: 'text-indigo-600 bg-indigo-50'
                }
              ].map((useCase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className={`mb-4 p-3 rounded-lg w-fit ${useCase.color}`}>
                    <useCase.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-primary mb-1">Outcome:</p>
                    <p className="text-xs text-muted-foreground">{useCase.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Ready to Secure Your AI Applications?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start enforcing enterprise-grade security and compliance policies without writing custom code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" to="/platform/studio">Get Started</Button>
                <Button variant="outline" to="/solutions/marketplace">Explore Marketplace</Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default GuardrailsPage;

