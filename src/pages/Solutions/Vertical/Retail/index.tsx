import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Users, TrendingUp, MessageSquare, HeadphonesIcon } from 'lucide-react';
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

const RetailSolutionsPage: React.FC = () => {
  const retailSolutions = [
    {
      id: 'customer-support',
      name: 'E-commerce Customer Support',
      description: '24/7 AI-powered customer support for order inquiries, returns, and product questions.',
      icon: HeadphonesIcon,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'inventory-management',
      name: 'Inventory Management Agent',
      description: 'Intelligent inventory tracking, restocking alerts, and demand forecasting.',
      icon: Package,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'personalized-recommendations',
      name: 'Personalized Product Recommendations',
      description: 'AI agents that analyze customer behavior to provide personalized product recommendations.',
      icon: ShoppingCart,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'order-tracking',
      name: 'Order Tracking & Updates',
      description: 'Automated order status updates, shipping notifications, and delivery coordination.',
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'customer-engagement',
      name: 'Customer Engagement Agent',
      description: 'Proactive customer outreach, abandoned cart recovery, and loyalty program management.',
      icon: MessageSquare,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'customer-insights',
      name: 'Customer Insights & Analytics',
      description: 'Analyze customer behavior, purchase patterns, and sentiment to drive business decisions.',
      icon: Users,
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
                  <span className="text-primary">Retail/E-commerce Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                  AI agents designed specifically for retail and e-commerce businesses to enhance customer experience and drive sales.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Solutions Grid */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retailSolutions.map((solution, i) => (
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

export default RetailSolutionsPage;

