import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileCheck, Shield, TrendingUp, BarChart3, Briefcase } from 'lucide-react';
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

const BFSISolutionsPage: React.FC = () => {
  const bfsiSolutions = [
    {
      id: 'account-opening',
      name: 'Account Opening/On Boarding',
      description: 'AI-driven document checks and KYC validations streamline the account opening process, lowering drop-off rates and reducing onboarding costs.',
      icon: FileCheck,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'intelligent-collections',
      name: 'Intelligent Collections',
      description: 'A bot acting as a Digital Collection Agent automates the traditionally manual, high-friction process of recovering outstanding debts.',
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
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'co-pilot',
      name: 'Co-Pilot (Wealth Advisor/Insurance Advisor)',
      description: 'By analyzing customer behavior and transaction flows in real-time, agents can recommend context-specific products that are truly relevant.',
      icon: Briefcase,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'fraud-management',
      name: 'Fraud Management',
      description: 'Continuous, real-time monitoring allows agents to instantly flag anomalies, dramatically reducing fraud losses and bolstering customer trust.',
      icon: Shield,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'credit-risk',
      name: 'Credit Risk Management',
      description: 'The use of alternative datasets enables agents to underwrite loans for SMEs and new-to-credit customers, expanding access while strengthening portfolio quality.',
      icon: BarChart3,
      color: 'text-pink-600 bg-pink-50'
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
                  <span className="text-primary">BFSI Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                  Industry-specific AI agents designed for Banking, Financial Services, and Insurance use cases.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Solutions Grid */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bfsiSolutions.map((solution, i) => (
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
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default BFSISolutionsPage;

