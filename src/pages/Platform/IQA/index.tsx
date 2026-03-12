import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, CheckCircle, TrendingUp, MessageSquare, 
  ArrowRight, Shield, Zap, Eye, Clock, Users, Target
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

const IQAPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />
      
      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-purple-50 via-indigo-50 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                    MEASURE & IMPROVE
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Turn Every Conversation into{' '}
                  <span className="text-primary">Actionable Intelligence.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  You can't improve what you don't measure. IQA is the central nervous system of the Thuriyam platform, analyzing 100% of your interactions to provide the "Ground Truth" of your business.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Dashboard Overview */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-4">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-semibold text-sm">Real-Time Analytics</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Comprehensive Dashboard Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Monitor all your agent interactions in real-time with a unified dashboard. Track key metrics, analyze trends, and gain insights into customer conversations across all channels.
                </p>
                <ul className="space-y-4">
                  {[
                    'Real-time conversation monitoring',
                    'Key performance indicators at a glance',
                    'Call volume trends and analytics',
                    'Sentiment distribution tracking',
                    'Top performing agent insights'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Dashboard Images */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                {/* First Image */}
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden relative z-10">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src="/iqa/dashboard-overview.png" 
                      alt="IQA Dashboard Overview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Conversation Analytics */}
        <Section className="bg-muted/30">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold text-sm">Deep Analysis</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Deep Conversation Analysis
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every conversation is analyzed in real-time for sentiment, intent, compliance, and business outcomes. Get detailed transcripts with AI-powered insights and powerful filtering capabilities.
                </p>
                <ul className="space-y-4">
                  {[
                    'Search and filter conversations by multiple criteria',
                    'Detailed conversation transcripts with timestamps',
                    'Quality score tracking and analysis',
                    'Export data for further analysis',
                    'Team and goal-based filtering'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Conversation Screenshot */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden relative">
                  <img 
                    src="/iqa/conversations-analytics.png" 
                    alt="Conversation Analytics"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Performance Metrics */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-4">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold text-sm">Performance Tracking</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Agent Performance & Team Analytics
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Monitor agent performance with comprehensive metrics and trends. Identify top performers, track quality scores, and discover coaching opportunities through detailed analytics.
                </p>
                <ul className="space-y-4">
                  {[
                    'Agent leaderboard with quality scores',
                    'Performance matrix and quadrant analysis',
                    'Priority coaching opportunities identification',
                    'Team-level performance metrics',
                    'Trend analysis over time'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Agent Analytics Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden relative">
                  <img 
                    src="/iqa/agent-analytics.png" 
                    alt="Agent Analytics Dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Key Features Grid */}
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Analytics Capabilities
              </h2>
              <p className="text-lg text-muted-foreground">
                IQA provides everything you need to understand and improve your agent interactions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: '100% Coverage',
                  description: 'Every conversation, every channel, analyzed in real-time. No gaps, no blind spots.',
                  color: 'text-blue-600 bg-blue-50'
                },
                {
                  icon: TrendingUp,
                  title: 'Contextual Understanding',
                  description: 'Goes beyond keywords to understand intent, sentiment, and business outcomes.',
                  color: 'text-purple-600 bg-purple-50'
                },
                {
                  icon: Shield,
                  title: 'Compliance Monitoring',
                  description: 'Automatically flags compliance risks and ensures regulatory adherence across all interactions.',
                  color: 'text-green-600 bg-green-50'
                },
                {
                  icon: Eye,
                  title: 'Real-Time Insights',
                  description: 'Get instant visibility into conversations as they happen, with alerts for critical issues.',
                  color: 'text-orange-600 bg-orange-50'
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Analytics',
                  description: 'Deep dive into trends, patterns, and correlations with powerful analytics tools.',
                  color: 'text-indigo-600 bg-indigo-50'
                },
                {
                  icon: Target,
                  title: 'Actionable Recommendations',
                  description: 'AI-powered suggestions to improve agent performance and customer satisfaction.',
                  color: 'text-pink-600 bg-pink-50'
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8 text-center"
                >
                  <div className={`mb-6 p-4 rounded-xl w-fit mx-auto ${feature.color}`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Integration & Benefits Section */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Beyond Keywords
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our engine understands context. It detects customer sentiment, identifies coaching opportunities, and flags compliance risks in real-time.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Unified Analysis
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Whether it's a voice call, a WhatsApp chat, or an email thread, IQA ingests it all into a single, unified view of the customer journey.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    The Feedback Loop
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    IQA doesn't just report data; it improves your agents. Use insights from top-performing conversations to update your Goals in the Studio, making your entire workforce smarter every day.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    to="/platform/studio"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group"
                  >
                    See IQA in Action
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold mb-6 text-center">Key Integrations</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'Voice Calls', 'WhatsApp', 'Email', 'SMS',
                      'Chat Widgets', 'CRM Systems', 'Helpdesk', 'APIs'
                    ].map((integration, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm"
                      >
                        <div className="font-semibold text-gray-900">{integration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
                Ready to Measure What Matters?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start analyzing 100% of your conversations and turn insights into action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" to="https://dashboard.thuriyam.ai/">Access Dashboard</Button>
                <Button variant="outline" to="/platform/studio">See IQA in Action</Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default IQAPage;
