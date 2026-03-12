import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, TrendingUp, Shield, Zap } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 ${className}`}>
    {children}
  </div>
);

const BlogPost: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Magazine Hero Section */}
        <Section className="pt-8 pb-20 md:pt-16 md:pb-32 bg-gradient-to-b from-slate-900 via-slate-800 to-background">
          <Container className="max-w-6xl">
            <Link 
              to="/resources/blog" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-12 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
                  Vision
                </span>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Calendar className="w-4 h-4" />
                  <span>January 12, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  <span>3 min read</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] text-white tracking-tight">
                The End of the Manual Company.
              </h1>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90 leading-tight">
                The Dawn of Organizational Autonomy.
              </h2>
              
              <div className="border-l-4 border-primary pl-6">
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                  The last decade gave us digital tools. Now it's time for autonomous workforces.
                </p>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Content - Magazine Layout */}
        <Section className="pt-0">
          <Container className="max-w-6xl">
            <article className="max-w-none">
              {/* Opening with Drop Cap */}
              <div className="grid md:grid-cols-12 gap-8 mb-16">
                <div className="md:col-span-8">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-8xl md:text-9xl font-bold text-primary leading-none float-left mr-3 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                      H
                    </span>
                    <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light">
                      ere's the thing: building an AI demo is easy. Getting it to production? That's where 80-95% of projects fail. Your team spends 40% of their time just switching between tools, acting as human glue. That's not scalable.
                    </p>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We're not building another tool. We're building the operating system that lets companies run themselves.
                  </p>
                </div>
                
                {/* Sidebar Stats */}
                <div className="md:col-span-4">
                  <div className="sticky top-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                    <div className="space-y-6">
                      <div>
                        <div className="text-5xl font-bold text-primary mb-2">80-95%</div>
                        <div className="text-sm text-muted-foreground">of AI projects fail in production</div>
                      </div>
                      <div className="border-t border-primary/20 pt-6">
                        <div className="text-5xl font-bold text-primary mb-2">40%</div>
                        <div className="text-sm text-muted-foreground">of productive time lost to context switching</div>
                      </div>
                      <div className="border-t border-primary/20 pt-6">
                        <div className="text-5xl font-bold text-primary mb-2">70%</div>
                        <div className="text-sm text-muted-foreground">faster experimentation with Marketplace</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Break */}
              <div className="border-t-2 border-muted my-16"></div>

              {/* The Problem Section - Two Column */}
              <div className="grid md:grid-cols-12 gap-8 mb-16">
                <div className="md:col-span-8">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Why Most AI Projects Fail
                  </h3>
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      The gap between a demo and production is huge. You need security, resilience, governance—all the boring stuff that makes things actually work. Most teams skip this and wonder why their agents break in production.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Your best people are stuck being the manual API between your tools. That's expensive, error-prone, and honestly, a waste of talent.
                    </p>
                  </div>
                </div>
                
                {/* Pull Quote */}
                <div className="md:col-span-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
                    <blockquote className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                      "The gap between a demo and production is huge."
                    </blockquote>
                    <p className="text-sm text-slate-600">
                      Most teams skip the boring stuff and wonder why their agents break.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Break */}
              <div className="border-t-2 border-muted my-16"></div>

              {/* The Solution - Full Width with Cards */}
              <div className="mb-16">
                <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-center max-w-3xl mx-auto">
                  The Operating System Approach
                </h3>
                <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto leading-relaxed">
                  Instead of point solutions, we built the whole stack: Studio for building agents, AI Gateway for unified model access, Guardrails for security, and a Marketplace for pre-built workflows.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold">Security That Doesn't Slow You Down</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Our Triple Gate defense (AI Gateway → MCP Gateway → API Gateway) means security is built-in, not bolted on. Developers ship 10x faster.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold">Agents That Use Your Identity</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Zero-trust architecture ensures agents act with the user's permissions, not some high-privilege service account. Every action is auditable.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Visual Break */}
              <div className="border-t-2 border-muted my-16"></div>

              {/* Marketplace - Asymmetric Layout */}
              <div className="grid md:grid-cols-12 gap-8 mb-16">
                <div className="md:col-span-7">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Don't Build from Scratch
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our Marketplace has pre-built agents for everything: lead onboarding, fraud detection, customer support, appointment booking. Clone, customize, deploy. Hours, not months.
                  </p>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 inline-block">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-xl font-bold">Teams reduce experimentation time by 70%</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-5">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 h-full">
                    <h4 className="text-xl font-bold mb-4">Marketplace Solutions</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Lead Onboarding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Fraud Detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Customer Support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Appointment Booking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>KYC Verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>And many more...</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Break */}
              <div className="border-t-2 border-muted my-16"></div>

              {/* Conclusion - Full Width Dark */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-12 md:p-16 mb-16">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                    The Bottom Line
                  </h3>
                  <p className="text-xl text-white/90 mb-12 leading-relaxed font-light">
                    We're turning the manual assembly line into a smart factory. Agents handle the micro-decisions. Humans focus on strategy. Companies run themselves.
                  </p>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-2xl font-bold mb-6 text-white/75 uppercase tracking-wide text-sm">From</h4>
                      <ul className="space-y-4 text-lg">
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 mt-1">→</span>
                          <span className="text-white/90">Manual handoffs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 mt-1">→</span>
                          <span className="text-white/90">Reactive fixes</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 mt-1">→</span>
                          <span className="text-white/90">Human micromanagement</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-6 text-white/75 uppercase tracking-wide text-sm">To</h4>
                      <ul className="space-y-4 text-lg">
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">→</span>
                          <span className="text-white/90">Autonomous workflows</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">→</span>
                          <span className="text-white/90">Proactive optimization</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">→</span>
                          <span className="text-white/90">Human supervision</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
