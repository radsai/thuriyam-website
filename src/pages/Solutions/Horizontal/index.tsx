import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Calendar, Phone, HeadphonesIcon } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { AgentBuilderPreview } from '@/components/ui/AgentBuilderPreview';


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

const HorizontalSolutionsPage: React.FC = () => {
  // Color mapping for section backgrounds
  const getSectionStyles = (colorName: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
      blue: {
        bg: 'bg-blue-50/40',
        border: 'border-blue-200/40',
        text: 'text-blue-700',
        dot: 'bg-blue-500'
      },
      green: {
        bg: 'bg-green-50/40',
        border: 'border-green-200/40',
        text: 'text-green-700',
        dot: 'bg-green-500'
      },
      purple: {
        bg: 'bg-purple-50/40',
        border: 'border-purple-200/40',
        text: 'text-purple-700',
        dot: 'bg-purple-500'
      },
      indigo: {
        bg: 'bg-indigo-50/40',
        border: 'border-indigo-200/40',
        text: 'text-indigo-700',
        dot: 'bg-indigo-500'
      },
      amber: {
        bg: 'bg-amber-50/40',
        border: 'border-amber-200/40',
        text: 'text-amber-700',
        dot: 'bg-amber-500'
      }
    };
    return colorMap[colorName] || colorMap.blue;
  };

  const horizontalSolutions = [
    {
      id: 'lead-qualification',
      name: 'Lead Qualification Engine',
      description: 'Automatically qualify and score leads based on multiple criteria, routing high-value prospects to sales teams.',
      icon: Target,
      color: 'text-blue-600 bg-blue-50',
      colorName: 'blue',
      headerGradient: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-200/30',
      bodyGradient: 'from-blue-50/5 to-white',
      previewMessage: 'Build a lead qualification agent',
      agentType: 'Qualifies leads and routes high-value prospects',
      uniqueContent: {
        keyMetrics: ['Lead scoring accuracy', 'Conversion rate improvement', 'Time saved per lead'],
        useCases: ['B2B sales qualification', 'Inbound lead routing', 'Sales team prioritization']
      }
    },
    {
      id: 'campaign-tracker',
      name: 'Campaign Tracker Agent',
      description: 'Monitor and optimize marketing campaigns in real-time, tracking performance metrics and ROI across channels.',
      icon: Zap,
      color: 'text-green-600 bg-green-50',
      colorName: 'green',
      headerGradient: 'from-green-50 to-green-100/50',
      borderColor: 'border-green-200/30',
      bodyGradient: 'from-green-50/5 to-white',
      previewMessage: 'Create a campaign tracker agent',
      agentType: 'Monitors and optimizes marketing campaigns',
      uniqueContent: {
        keyMetrics: ['ROI tracking', 'Multi-channel performance', 'Campaign optimization'],
        useCases: ['Digital marketing campaigns', 'Email campaign analysis', 'Social media tracking']
      }
    },
    {
      id: 'voice-sdr',
      name: 'Voice-SDR Agent/Tele Sales',
      description: 'AI agents that independently optimize sales conversations and drive conversions through intelligent dialogue management.',
      icon: Phone,
      color: 'text-purple-600 bg-purple-50',
      colorName: 'purple',
      headerGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200/30',
      bodyGradient: 'from-purple-50/5 to-white',
      previewMessage: 'Build a voice SDR agent',
      agentType: 'Optimizes sales conversations and drives conversions',
      uniqueContent: {
        keyMetrics: ['Call conversion rate', 'Average call duration', 'Sales coaching insights'],
        useCases: ['Outbound sales calls', 'Customer follow-ups', 'Sales team training']
      }
    },
    {
      id: 'meeting-scheduler',
      name: 'Sales Meeting-Scheduler Agent',
      description: 'Schedules appointments with clients automatically, coordinating calendars and sending confirmations.',
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-50',
      colorName: 'indigo',
      headerGradient: 'from-indigo-50 to-indigo-100/50',
      borderColor: 'border-indigo-200/30',
      bodyGradient: 'from-indigo-50/5 to-white',
      previewMessage: 'Create a meeting scheduler agent',
      agentType: 'Schedules appointments and coordinates calendars',
      uniqueContent: {
        keyMetrics: ['Meetings scheduled', 'Calendar conflicts avoided', 'Response time'],
        useCases: ['Sales team scheduling', 'Client appointment booking', 'Calendar management']
      }
    },
    {
      id: 'helpdesk',
      name: 'AI HelpDesk Employees',
      description: 'Agents can autonomously handle routine queries, card disputes, and transaction clarifications across all channels, providing 24/7 support and reducing call center reliance.',
      icon: HeadphonesIcon,
      color: 'text-amber-600 bg-amber-50',
      colorName: 'amber',
      headerGradient: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-200/30',
      bodyGradient: 'from-amber-50/5 to-white',
      previewMessage: 'Build a customer support agent',
      agentType: 'Handles queries and provides 24/7 support',
      uniqueContent: {
        keyMetrics: ['Resolution time', 'Customer satisfaction', 'Ticket volume reduction'],
        useCases: ['Customer support tickets', 'Transaction disputes', 'FAQ handling']
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-8 md:pt-16 md:pb-12 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-primary">Cross-Industry Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-0 leading-relaxed">
                  AI agents that work across multiple business functions and sectors.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Solutions Grid */}
        <Section className="pt-0">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {horizontalSolutions.map((solution, i) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Card Header with Agent Configuration Screenshot */}
                  <div className={`p-5 bg-gradient-to-br ${solution.headerGradient}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${solution.color}`}>
                        <solution.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{solution.name}</h3>
                    </div>
                    <AgentBuilderPreview
                      agentName={solution.name}
                      agentType={solution.agentType || solution.description}
                      previewMessage={solution.previewMessage}
                      className="border-0 shadow-none"
                      solutionId={solution.id}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className={`p-6 flex-1 flex flex-col bg-gradient-to-br ${solution.bodyGradient} border-t ${solution.borderColor}`}>
                    {solution.uniqueContent && (() => {
                      const styles = getSectionStyles(solution.colorName);
                      return (
                        <div className="mt-auto space-y-4">
                          <div className={`p-3 rounded-lg ${styles.bg} border ${styles.border}`}>
                            <h4 className={`text-xs font-semibold mb-2 uppercase tracking-wide ${styles.text}`}>Key Metrics</h4>
                            <ul className="space-y-1.5">
                              {solution.uniqueContent.keyMetrics.map((metric: string, i: number) => (
                                <li key={i} className={`text-xs flex items-center gap-2 ${styles.text}/80`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>
                                  {metric}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className={`p-3 rounded-lg ${styles.bg} border ${styles.border}`}>
                            <h4 className={`text-xs font-semibold mb-2 uppercase tracking-wide ${styles.text}`}>Use Cases</h4>
                            <ul className="space-y-1.5">
                              {solution.uniqueContent.useCases.map((useCase: string, i: number) => (
                                <li key={i} className={`text-xs flex items-center gap-2 ${styles.text}/80`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
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

export default HorizontalSolutionsPage;

