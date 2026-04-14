import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, CheckCircle, UserCheck, Eye, AlertCircle, 
  TestTube, ShieldCheck, BarChart3, Search, Code, 
  PlayCircle
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import SupportAgentDemo from '@/components/ui/SupportAgentDemo';
import { ProductionReadyWizard } from '@/components/animations/ProductionReadyWizard';
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

const StudioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />
      
      <main>
        {/* Hero Section with Natural Language Programming */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Agents That{' '}
                  <span className="text-primary">Deliver Outcomes</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                  Define the outcome. Agents act. Less manual work. Fewer escalations.
                </p>
              </motion.div>
            </div>
            {/* Support Agent Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SupportAgentDemo />
            </motion.div>
          </Container>
        </Section>

        {/* Prototype to Production */}
        <Section className="bg-gradient-to-br from-slate-50 to-blue-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Outcome-First: Goals, Not Scripts
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Define what success looks like—resolve 80% without escalation, first response within 2 minutes. The platform aligns agents to these outcomes. No rigid flowcharts, no step-by-step scripts.
                </p>
              </motion.div>
            </div>
            
            <div className="flex justify-center items-start">
              {/* Production Ready Setup Wizard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-6xl"
              >
                <ProductionReadyWizard isVisible={true} />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Complete Agent Lifecycle */}
        <Section className="bg-gradient-to-br from-slate-50 to-blue-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Complete Agent Development Lifecycle
              </h2>
              <p className="text-lg text-muted-foreground">
                Agent Builder provides everything you need to go from idea to production-ready agent—with confidence in safety, alignment, and performance.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  step: 1,
                  title: 'Build',
                  description: 'Define goals in natural language. AI creates the workflow automatically.',
                  icon: <Target className="w-8 h-8" />,
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  step: 2,
                  title: 'Test',
                  description: 'Automated behavioral evaluation tests alignment and safety before deployment.',
                  icon: <TestTube className="w-8 h-8" />,
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  step: 3,
                  title: 'Audit',
                  description: 'Safety auditing through diverse scenarios flags concerning behaviors.',
                  icon: <Search className="w-8 h-8" />,
                  color: 'from-pink-500 to-pink-600'
                },
                {
                  step: 4,
                  title: 'Deploy',
                  description: 'Enterprise security ensures safe production deployment.',
                  icon: <ShieldCheck className="w-8 h-8" />,
                  color: 'from-green-500 to-green-600'
                },
              ].map((stage, i) => (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} text-white mb-4 shadow-lg`}>
                      {stage.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-0.5 bg-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>


        {/* Priority 5: Agent Sandbox & Simulator - Enhanced */}
        {/* COMMENTED OUT - Removed Flight Simulator section */}
        {/* 
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white mb-4">
                  <PlayCircle className="w-4 h-4" />
                  <span className="font-bold">Flight Simulator for Agents</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Test Against Synthetic Users Before Real Customers
                </h2>
                <p className="text-lg text-muted-foreground">
                  Before letting your "Support Agent" talk to angry customers, simulate 100 conversations to see if it hallucinates, gets rude, or makes mistakes. Catch problems before they reach production.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="mb-6 p-4 bg-orange-50 rounded-xl w-fit">
                  <Users className="w-10 h-10 text-orange-600" />
                      </div>
                <h3 className="text-2xl font-bold mb-4">Synthetic User Testing</h3>
                <p className="text-muted-foreground mb-6">
                  Create realistic test scenarios with synthetic users. Simulate different customer personalities, edge cases, and challenging situations to see how your agent responds.
                </p>
                <ul className="space-y-2">
                  {[
                    'Test with 100+ synthetic conversations',
                    'Simulate different customer personalities',
                    'Explore edge cases safely',
                    'No risk to real customers',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="mb-6 p-4 bg-red-50 rounded-xl w-fit">
                  <Eye className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Shadow Mode & Mirroring</h3>
                <p className="text-muted-foreground mb-6">
                  Run your agent in "Shadow Mode" alongside production. See how it would have responded to real customer interactions without actually letting it reply. Perfect for testing improvements safely.
                </p>
                <ul className="space-y-2">
                  {[
                    'Mirror live traffic to test agents',
                    'Compare responses side-by-side',
                    'Test improvements without risk',
                    'Validate changes before deployment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <PlayCircle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Catch Problems Before They Reach Customers</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Discover if your agent hallucinates, gets rude, or makes mistakes by testing it thoroughly in a safe environment. Fix issues before they impact real customers or damage your brand.
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>
        */}

        {/* Behavioral Evaluation & Testing */}
        {/* COMMENTED OUT - Removed Behavioral Evaluation section */}
        {/* 
        <Section className="bg-gradient-to-b from-background to-muted/30">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-4">
                  <TestTube className="w-4 h-4" />
                  <span className="font-bold">Automated Behavioral Evaluation</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Test Agent Behaviors Before Deployment
                </h2>
                <p className="text-lg text-muted-foreground">
                  Don't wait for production to discover misalignment. Agent Builder automatically generates evaluation suites to test your agent's behaviors, measuring frequency, severity, and alignment before deployment.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="mb-6 p-4 bg-blue-50 rounded-xl w-fit">
                  <TestTube className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Automated Evaluation Generation</h3>
                <p className="text-muted-foreground mb-6">
                  Describe any behavioral trait you want to test—deception, self-preservation, bias, or alignment—and Agent Builder automatically generates diverse evaluation scenarios to quantify how often and how severely the behavior occurs.
                </p>
                <ul className="space-y-2">
                  {[
                    'Generate evaluation suites for arbitrary behaviors',
                    'Automatically create diverse test scenarios',
                    'Quantify behavior frequency and severity',
                    'Compare agents across behavioral dimensions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl w-fit">
                  <BarChart3 className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Behavioral Scoring & Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Get quantitative metrics on agent behaviors with automated scoring. Judge models evaluate each interaction, and meta-analysis provides suite-level insights to help you understand your agent's behavioral profile.
                </p>
                <ul className="space-y-2">
                  {[
                    'Automated scoring across multiple dimensions',
                    'Correlates strongly with human judgment',
                    'Suite-level behavioral analysis',
                    'Flag concerning behaviors before deployment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </Container>
        </Section>
        */}

        {/* Automated Auditing & Safety Testing */}
        {/* COMMENTED OUT - Removed Automated Auditing section
        <Section>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-4">
                  <Search className="w-4 h-4" />
                  <span className="font-bold">Automated Safety Auditing</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Agent Behaviors Through Automated Auditing
                </h2>
                <p className="text-lg text-muted-foreground">
                  Test hypotheses about agent behavior in minutes, not weeks. Agent Builder deploys automated auditing agents that explore your agent through diverse multi-turn conversations, scoring behaviors and surfacing concerning patterns.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="w-10 h-10 text-purple-600" />,
                  title: 'Hypothesis Testing',
                  description: 'Test specific hypotheses about agent behavior with seed instructions. Want to know if your agent exhibits deception, self-preservation, or reward hacking? Describe it in natural language and get results in minutes.',
                  features: [
                    'Natural language hypothesis specification',
                    'Automated scenario generation',
                    'Parallel testing across scenarios',
                    'Quick iteration on research questions',
                  ]
                },
                {
                  icon: <MessageSquare className="w-10 h-10 text-purple-600" />,
                  title: 'Multi-Turn Exploration',
                  description: 'Automated auditor agents conduct realistic multi-turn conversations with your agent, simulating users and tools to explore behavioral boundaries and edge cases you might not have considered.',
                  features: [
                    'Simulated user interactions',
                    'Tool use scenarios',
                    'Dynamic conversation flows',
                    'Realistic environment simulation',
                  ]
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-purple-600" />,
                  title: 'Safety Scoring',
                  description: 'Each interaction is automatically scored across multiple safety-relevant dimensions. Quickly filter and search transcripts to find the most concerning behaviors for human review.',
                  features: [
                    'Multi-dimensional behavior scoring',
                    'Automated flagging of concerns',
                    'Transcript search and filtering',
                    'Prioritized human review queue',
                  ]
                },
              ].map((capability, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className="mb-6 p-4 bg-purple-50 rounded-xl w-fit">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                  <ul className="space-y-2">
                    {capability.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
        */}

        {/* Human in the Loop Section */}
        {/* COMMENTED OUT - Removed Human in the Loop section
        <Section className="bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 border-2 border-amber-200">
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-2xl opacity-30 animate-pulse" />
                        <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 w-24 h-24 rounded-full flex items-center justify-center shadow-xl">
                          <UserCheck className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Human Oversight</h3>
                        <p className="text-gray-600">The final layer of security</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-4">
                    <Eye className="w-4 h-4" />
                    <span className="font-bold">Human in the Loop</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Human Oversight When It Matters Most
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    While automated agents handle routine tasks, some decisions require human judgment. Thuriyam's Human in the Loop (HITL) ensures critical actions are reviewed and approved by authorized personnel before execution.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 rounded-lg p-2 mt-1">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Critical Action Review</h4>
                        <p className="text-sm text-gray-600">
                          High-risk operations like data deletion, financial transactions, or sensitive data access require explicit human approval before execution.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 rounded-lg p-2 mt-1">
                        <Eye className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Real-Time Monitoring</h4>
                        <p className="text-sm text-gray-600">
                          Security teams can monitor agent activities in real-time, with alerts for suspicious patterns or policy violations that need immediate attention.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 rounded-lg p-2 mt-1">
                        <UserCheck className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Escalation Workflows</h4>
                        <p className="text-sm text-gray-600">
                          Automated escalation paths ensure that complex decisions or edge cases are routed to the right human expert for review and resolution.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </Section>
        */}

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
                See How Agents Can Transform Your Operations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Define the outcome. Agents act. Less manual work. Fewer escalations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" to="/signup">Start Building</Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default StudioPage;

