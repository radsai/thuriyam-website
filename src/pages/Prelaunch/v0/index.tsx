import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, BarChart3, CheckCircle, ArrowRight, Mail, Lock, TrendingUp, Target } from 'lucide-react';
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

const PrelaunchV0Page: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-primary/10 via-purple-50 to-indigo-50 relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
          </motion.div>

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold text-sm">Join the Beta Program</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Be Among the First to Experience{' '}
                  <span className="text-primary">The Future of AI</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                  Get early access to Thuriyam's revolutionary AI platform. Build, deploy, and scale production-grade AI agents with enterprise security built-in.
                </p>

                {!submitted ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 rounded-lg font-medium bg-black text-white hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {isLoading ? 'Joining...' : 'Join Beta'}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      <Lock className="w-3 h-3 inline mr-1" />
                      We respect your privacy. No spam, unsubscribe anytime.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-green-50 border-2 border-green-200 rounded-xl p-6"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">You're In!</h3>
                    <p className="text-green-700">
                      We've sent a confirmation email to <strong>{email}</strong>. Check your inbox for next steps.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </Container>

          <style>{`
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
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
        </Section>

        {/* Benefits Section */}
        <Section>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You'll Get Access To
              </h2>
              <p className="text-lg text-muted-foreground">
                Early access to cutting-edge features and exclusive benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Early Access',
                  description: 'Be among the first to use our revolutionary AI platform and shape its future.',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Production-grade security, compliance, and governance built into every feature.',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  icon: BarChart3,
                  title: 'Priority Support',
                  description: 'Direct access to our team and priority support for all your questions.',
                  color: 'from-purple-500 to-pink-500'
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${benefit.color} text-white mb-4`}>
                    {React.createElement(benefit.icon, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Features Preview */}
        <Section className="bg-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Platform Features
                </h2>
                <p className="text-lg text-muted-foreground">
                  A glimpse of what's coming in the beta
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Goal-Driven Agent Builder',
                    description: 'Build AI agents by describing outcomes, not flowcharts. Let AI find the best path.',
                    icon: <Target className="w-5 h-5" />
                  },
                  {
                    title: 'Virtual Keys & Budget Control',
                    description: 'Manage API keys with granular budget controls and real-time cost tracking.',
                    icon: <Lock className="w-5 h-5" />
                  },
                  {
                    title: 'Full Observability',
                    description: 'Monitor every interaction with comprehensive analytics and insights.',
                    icon: <TrendingUp className="w-5 h-5" />
                  },
                  {
                    title: 'Enterprise Security Gateway',
                    description: 'Triple-gate security architecture protecting every AI interaction.',
                    icon: <Shield className="w-5 h-5" />
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-border rounded-lg p-6 flex items-start gap-4"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Join thousands of forward-thinking companies already on the waitlist.
              </p>
              {!submitted && (
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-white bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Join the Beta Program
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              )}
            </motion.div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default PrelaunchV0Page;
