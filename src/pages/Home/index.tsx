import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target, ShieldCheck, BarChart3, ArrowRight
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { ProductionGapAnimation } from '@/components/animations/ProductionGapAnimation';

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


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans" style={{ position: 'relative', zIndex: 1 }}>
      <MainNavigation />

      <main style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {/* Hero Section with Colorful Animations */}
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-visible" style={{ minHeight: '600px' }}>
          {/* Animated background blobs */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ zIndex: 1 }}
          >
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
          </motion.div>

          <div className="relative" style={{ zIndex: 10 }}>
            <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#1e293b' }}>
                  The Operating System for Your AI Workforce
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={{ color: '#64748b' }}>
                  Stop building brittle bots. Start deploying a smart, secure, and scalable AI workforce that achieves your business goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
                  <Link
                    to="/platform/studio"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-white bg-black hover:bg-black transition-colors"
                  >
                    Start Building
                    <ArrowRight className="ml-2 w-5 h-5 text-white" />
                  </Link>
                  <Link
                    to="/solutions/horizontal"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium border border-white text-white bg-black hover:bg-black transition-colors"
                  >
                    Explore Solutions
                    <ArrowRight className="ml-2 w-5 h-5 text-white" />
                  </Link>
                </div>
              </motion.div>
            </div>
            </Container>
          </div>

          <style>{`
            @keyframes blob {
              0% {
                transform: translate(0px, 0px) scale(1);
              }
              33% {
                transform: translate(30px, -50px) scale(1.1);
              }
              66% {
                transform: translate(-20px, 20px) scale(0.9);
              }
              100% {
                transform: translate(0px, 0px) scale(1);
              }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
        </section>

        {/* Trusted By Section */}
        <Section className="bg-muted/30">
          <Container>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground mb-8"
            >
              Trusted by 500+ innovative companies
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60"
            >
              {['Acme Corp', 'GlobalTech', 'Nebula', 'Trio', 'FoxRun', 'Goldline'].map((logo, i) => (
                <div key={i} className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
                  <div className="w-6 h-6 bg-current rounded-full opacity-20"></div>
                  {logo}
                </div>
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* Problem Section */}
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 text-center"
                style={{ color: '#1e293b' }}
              >
                Building Production-Grade AI is Complex.{' '}
                <span className="text-black">We Make It Simple.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-center text-muted-foreground leading-relaxed"
                style={{ color: '#64748b' }}
              >
                Prototyping an AI is easy. Turning it into a secure, scalable, and reliable agent you can trust? That's where businesses get stuck in the "Production Gap"—wrestling with fragmented tools, security risks, and unpredictable performance.
              </motion.p>
            </div>

            {/* Production Gap Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ProductionGapAnimation />
            </motion.div>
          </Container>
        </Section>

        {/* Three Pillars Section */}
        <Section>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: '#1e293b' }}
              >
                From Prototype to Production: The Only Platform Built for AI Workforces.
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: 'The Goal-Driven Brain',
                  subtitle: 'The Studio: Your Agent Design Center',
                  description: 'Define the outcome, not the flowchart. Our revolutionary Goal-Driven framework lets you describe your agent\'s mission in plain English. The AI intelligently finds the best path to achieve that goal, making your agents more adaptive and effective than rigid, scripted bots.',
                  link: '/platform/studio',
                  linkText: 'Learn how you can build agents',
                },
                {
                  icon: ShieldCheck,
                  title: 'The Secure Foundation',
                  subtitle: 'AI Gateway & Guardrails',
                  description: 'Every agent is production-grade by default. Our integrated AI Gateway provides built-in model resilience, automatic failover, centralized cost control, and enterprise-grade security. Deploy with confidence, knowing every interaction is governed and secure.',
                  link: '/platform/ai-gateway',
                  linkText: 'Explore the AI Gateway',
                },
                {
                  icon: BarChart3,
                  title: 'The Insight Engine',
                  subtitle: 'IQA: The Analytics Powerhouse',
                  description: 'You can\'t improve what you can\'t measure. Our Interaction Quality Analytics (IQA) engine analyzes 100% of your agent and human conversations, uncovering deep insights into performance, customer sentiment, and compliance, creating a powerful feedback loop to continuously improve your entire workforce.',
                  link: '/platform/iqa',
                  linkText: 'See what you can measure',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-6 p-4 bg-gray-100 rounded-xl w-fit">
                    {React.createElement(pillar.icon, { className: "w-12 h-12 text-black" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">{pillar.subtitle}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed" style={{ color: '#64748b' }}>{pillar.description}</p>
                  <Link
                    to={pillar.link}
                    className="text-black font-medium hover:underline inline-flex items-center gap-2 group"
                  >
                    {pillar.linkText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Social Proof Section */}
        <Section className="bg-muted/30">
          <Container>
            {/* Scrolling Logos Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="overflow-hidden">
                <div className="flex animate-scroll gap-12 items-center">
                  {/* Duplicate logos for seamless scroll */}
                  {[...Array(2)].map((_, setIndex) => (
                    <React.Fragment key={setIndex}>
                      {['Acme Corp', 'GlobalTech', 'Nebula', 'Trio', 'FoxRun', 'Goldline', 'TechCorp', 'Enterprise Solutions'].map((logo, i) => (
                        <div
                          key={`${setIndex}-${i}`}
                          className="flex-shrink-0 text-xl font-bold font-serif text-foreground flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                        >
                          <div className="w-6 h-6 bg-current rounded-full opacity-20"></div>
                          {logo}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Featured Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed" style={{ color: '#1e293b' }}>
                "Thuriyam transformed our go-to-market. We went from a 6-month IT project to deploying a fully functional Lead Qualification Agent in a single afternoon. Our sales team now focuses only on hot leads, and our conversion rate has doubled. It's a complete game-changer."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                  CEO
                </div>
                <div>
                  <p className="font-semibold text-lg" style={{ color: '#1e293b' }}>CEO</p>
                  <p className="text-sm text-muted-foreground">Customer Company Name</p>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>


        {/* Final CTA Section */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Deploy Your AI Workforce?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Whether you need an instant solution for a common problem or a powerful studio to build your own custom agents, your journey to an AI-first business starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/platform/studio"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-white bg-black hover:bg-black transition-colors"
                >
                  Start Building
                  <ArrowRight className="ml-2 w-5 h-5 text-white" />
                </Link>
                <Link
                  to="/solutions/horizontal"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium border border-white text-white bg-black hover:bg-black transition-colors"
                >
                  Explore Solutions
                  <ArrowRight className="ml-2 w-5 h-5 text-white" />
                </Link>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
