import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, BarChart3, Building2, Briefcase, CreditCard, FileCheck, Calendar, Phone, HeadphonesIcon, Target, Zap } from 'lucide-react';
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

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vertical' | 'horizontal'>('vertical');

  const verticalSolutions = [
    {
      id: 'account-opening',
      name: 'Account Opening/On Boarding',
      description: 'AI-driven document checks and KYC validations streamline the account opening process, lowering drop-off rates and reducing onboarding costs.',
      icon: FileCheck,
      reference: 'Agentic AI in Banking: Use Cases Emerging in 2025',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'intelligent-collections',
      name: 'Intelligent Collections',
      description: 'A bot acting as a Digital Collection Agent automates the traditionally manual, high-friction process of recovering outstanding debts. This transformation shifts debt collection from a purely transactional (and often aggressive) process to a consultative, user-friendly experience.',
      icon: CreditCard,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'kyc',
      name: 'KYC',
      description: 'Automated Know Your Customer verification and compliance checks for seamless onboarding.',
      icon: Shield,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'loan-origination',
      name: 'Loan Origination and Disbursal',
      description: 'Streamlined loan processing with automated document verification, risk assessment, and disbursal workflows.',
      icon: TrendingUp,
      reference: 'https://thedigitalfifth.com/agentic-ai-banking-use-cases-2025/',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'co-pilot',
      name: 'Co-Pilot (Wealth Advisor/Insurance Advisor)',
      description: 'By analyzing customer behavior and transaction flows in real-time, agents can recommend context-specific products that are truly relevant, leading to higher conversion rates and stronger customer loyalty.',
      icon: Briefcase,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'insurance-claims',
      name: 'Insurance - Claim Processing',
      description: 'Automated claim validation, processing, and settlement workflows for faster claim resolution.',
      icon: FileCheck,
      color: 'text-teal-600 bg-teal-50'
    },
    {
      id: 'underwriting',
      name: 'Underwriting Agent',
      description: 'Their primary job is to evaluate whether a company should accept a specific risk—like insuring a driver, approving a mortgage, or issuing a business loan—and at what price.',
      icon: BarChart3,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'fraud-management',
      name: 'Fraud Management',
      description: 'Continuous, real-time monitoring allows agents to instantly flag anomalies, dramatically reducing fraud losses and bolstering customer trust.',
      icon: Shield,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'credit-risk',
      name: 'Credit Risk Management',
      description: 'The use of alternative datasets, such as cash flows and digital footprints, enables agents to underwrite loans for SMEs and new-to-credit customers, expanding access while strengthening portfolio quality.',
      icon: TrendingUp,
      color: 'text-pink-600 bg-pink-50'
    }
  ];

  const horizontalSolutions = [
    {
      id: 'lead-qualification',
      name: 'Lead Qualification Engine',
      description: 'Automatically qualify and score leads based on multiple criteria, routing high-value prospects to sales teams.',
      icon: Target,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'campaign-tracker',
      name: 'Campaign Tracker Agent',
      description: 'Monitor and optimize marketing campaigns in real-time, tracking performance metrics and ROI across channels.',
      icon: BarChart3,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'voice-sdr',
      name: 'Voice-SDR Agent/Tele Sales',
      description: 'AI agents that independently optimize sales conversations and drive conversions through intelligent dialogue management.',
      icon: Phone,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'meeting-scheduler',
      name: 'Sales Meeting-Scheduler Agent',
      description: 'Schedules appointments with clients automatically, coordinating calendars and sending confirmations.',
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'helpdesk',
      name: 'AI HelpDesk Employees',
      description: 'Agents can autonomously handle routine queries, card disputes, and transaction clarifications across all channels, providing 24/7 support and reducing call center reliance.',
      icon: HeadphonesIcon,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />
      
      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Agent Marketplace.{' '}
                  <span className="text-primary">Pre-Built Solutions.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
                  Browse our catalog of pre-built AI agents ready to deploy. Each agent is a complete, production-ready solution for specific business needs.
                </p>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  <strong>What is the Marketplace?</strong> A curated collection of industry-tested AI agents that you can deploy instantly. No custom development required—just choose, configure, and launch.
                </p>
                <Button variant="primary" to="/signup">Browse All Agents</Button>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Solutions Tabs */}
        <Section>
          <Container>
            <div className="mb-12">
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('vertical')}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      activeTab === 'vertical'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      BFSI
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('horizontal')}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      activeTab === 'horizontal'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Cross-Industry Solutions
                    </div>
                  </button>
                </div>
              </div>

              {/* By Industry */}
              {activeTab === 'vertical' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      BFSI Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      Industry-specific AI agents designed for Banking, Financial Services, and Insurance use cases.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {verticalSolutions.map((solution, i) => (
                      <motion.div
                        key={solution.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                      >
                        <div className={`mb-4 p-3 rounded-lg w-fit ${solution.color}`}>
                          <solution.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{solution.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {solution.description}
                        </p>
                        {solution.reference && (
                          <div className="pt-3 border-t border-border">
                            <p className="text-xs text-primary font-medium">
                              Reference: {solution.reference}
                            </p>
                    </div>
                  )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Cross-Industry Solutions */}
              {activeTab === 'horizontal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Cross-Industry Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      Function-specific AI agents that work across multiple industries and business functions.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {horizontalSolutions.map((solution, i) => (
                      <motion.div
                        key={solution.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                      >
                        <div className={`mb-4 p-3 rounded-lg w-fit ${solution.color}`}>
                          <solution.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{solution.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </Container>
        </Section>

        {/* Custom Agent CTA */}
        <Section className="bg-muted/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto bg-card border border-border rounded-2xl p-12"
            >
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need a Custom Agent?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Build your own agent with the Studio, or work with our team to create a custom solution for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" to="/platform/studio">Build with Studio</Button>
                <Button variant="outline" to="/signup">Request Custom Agent</Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePage;
