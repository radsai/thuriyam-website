import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, TestTube, ShieldCheck, BarChart3, Search } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import SupportAgentDemo from '@/components/ui/SupportAgentDemo';
import { ProductionReadyWizard } from '@/components/animations/ProductionReadyWizard';
import { v3NavItems } from '@/config/v3Nav';

const Section = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
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
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const sizes = 'h-12 px-8 text-base';
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  };
  const button = (
    <button className={`${baseStyles} ${sizes} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
  if (to) return <Link to={to}>{button}</Link>;
  return button;
};

const StudioV3Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation navItems={v3NavItems} logoLink="/v3" />

      <main>
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Build Production-Ready Agents{' '}
                  <span className="text-primary">in Minutes</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                  Create, test, and deploy AI agents with confidence. Build with natural language, test automatically, deploy securely.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SupportAgentDemo />
            </motion.div>
          </Container>
        </Section>

        <Section className="bg-gradient-to-br from-slate-50 to-blue-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Outcome-First: Goals, Not Scripts</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Define what success looks like—resolve 80% without escalation, first response within 2 minutes. The platform aligns agents to these outcomes. No rigid flowcharts, no step-by-step scripts.
                </p>
              </motion.div>
            </div>
            <div className="flex justify-center items-start">
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

        <Section className="bg-gradient-to-br from-slate-50 to-blue-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Complete Agent Development Lifecycle</h2>
              <p className="text-lg text-muted-foreground">
                Agent Builder provides everything you need to go from idea to production-ready agent—with confidence in safety, alignment, and performance.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { step: 1, title: 'Build', description: 'Define goals in natural language. AI creates the workflow automatically.', icon: <Target className="w-8 h-8" />, color: 'from-blue-500 to-blue-600' },
                { step: 2, title: 'Test', description: 'Automated behavioral evaluation tests alignment and safety before deployment.', icon: <TestTube className="w-8 h-8" />, color: 'from-purple-500 to-purple-600' },
                { step: 3, title: 'Audit', description: 'Safety auditing through diverse scenarios flags concerning behaviors.', icon: <Search className="w-8 h-8" />, color: 'from-pink-500 to-pink-600' },
                { step: 4, title: 'Deploy', description: 'Enterprise security ensures safe production deployment.', icon: <ShieldCheck className="w-8 h-8" />, color: 'from-green-500 to-green-600' },
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

        <Section className="bg-primary/5">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See How Proactive Agents Can Transform Your Operations</h2>
              <p className="text-lg text-muted-foreground mb-8">Define the outcome. Agents act. Less manual work. Fewer escalations.</p>
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

export default StudioV3Page;
