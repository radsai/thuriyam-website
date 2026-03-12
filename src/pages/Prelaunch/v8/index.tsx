import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, CheckCircle, Lock, 
  Gift, Copy, Star,
  Award, Trophy, Crown, Sparkle, Rocket,
  Wrench, DollarSign, Eye, Network, Package, BarChart3,
  Building2, CreditCard, ShoppingCart
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { SecurityAgentDemo } from '@/components/ui/SecurityAgentDemo';
import { GovernanceAgentDemo } from '@/components/ui/GovernanceAgentDemo';
import { ObservabilityAgentDemo } from '@/components/ui/ObservabilityAgentDemo';
import { BuilderAgentDemo } from '@/components/ui/BuilderAgentDemo';
import { DynamicUIDemo } from '@/components/ui/DynamicUIDemo';

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

// Achievement Badges Component
const AchievementBadges: React.FC<{ position: number; isEarly: boolean }> = ({ position, isEarly }) => {
  const badges = [];
  
  if (position <= 100) {
    badges.push({ icon: Crown, label: 'Founding Member', color: 'from-yellow-400 to-orange-500' });
  } else if (position <= 500) {
    badges.push({ icon: Award, label: 'Early Adopter', color: 'from-purple-400 to-pink-500' });
  }
  
  if (isEarly) {
    badges.push({ icon: Sparkle, label: 'Early Bird', color: 'from-blue-400 to-cyan-500' });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white shadow-md`}
        >
          {React.createElement(badge.icon, { className: 'w-4 h-4' })}
          <span className="text-xs font-semibold">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Milestone Celebration Component
const MilestoneCelebration: React.FC<{ count: number }> = ({ count }) => {
  const milestones = [100, 500, 1000, 2500];
  const recentMilestone = milestones.find(m => count >= m && count < m + 50);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (recentMilestone) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [recentMilestone]);

  if (!showCelebration || !recentMilestone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-white/20"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <Trophy className="w-6 h-6" />
          </motion.div>
          <div>
            <div className="font-bold text-lg">🎉 Milestone Reached!</div>
            <div className="text-sm opacity-90">
              We just hit {recentMilestone.toLocaleString()} signups!
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Confetti Component
const Confetti: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {trigger && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                opacity: 1, 
                y: -10, 
                x: `${piece.x}vw`,
                rotate: 0 
              }}
              animate={{ 
                opacity: [1, 1, 0],
                y: '100vh',
                rotate: 360,
                x: `${piece.x + (Math.random() - 0.5) * 20}vw`
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut'
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

const PrelaunchPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [builderDemoReady, setBuilderDemoReady] = useState(false);

  // Scroll to solutions section if hash is present
  useEffect(() => {
    if (window.location.hash === '#solutions') {
      setTimeout(() => {
        const solutionsSection = document.getElementById('solutions');
        if (solutionsSection) {
          solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
  
  // Mock data - replace with real API calls
  const waitlistCount = 1247;
  const isEarlyBird = waitlistCount < 500; // First 500 are early birds

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random waitlist position
    const position = Math.floor(Math.random() * 500) + waitlistCount + 1;
    const code = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    setWaitlistPosition(position);
    setReferralCode(code);
    setSubmitted(true);
    setShowConfetti(true);
    setIsLoading(false);
    setShowReferral(true);
    
    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/prelaunch?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  const scrollToSection = (index: number) => {
    setActiveFeatureTab(index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Confetti trigger={showConfetti} />
      <MilestoneCelebration count={waitlistCount} />
      <MainNavigation />

      <main>
        {/* Hero Section with Magazine-Style Colors */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-700 via-slate-600 via-slate-500 to-slate-400 text-white relative overflow-hidden">
          {/* Superhuman-style SVG Background Pattern */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                {/* Grid Pattern */}
                <pattern
                  id="grid-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
                
                {/* Animated Wave Pattern */}
                <pattern
                  id="wave-pattern"
                  x="0"
                  y="0"
                  width="200"
                  height="200"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 100 Q 50 50, 100 100 T 200 100"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                  <animateTransform
                    attributeName="patternTransform"
                    type="translate"
                    values="0,0; 200,0; 0,0"
                    dur="30s"
                    repeatCount="indefinite"
                  />
                </pattern>
                
                {/* Subtle Dot Pattern */}
                <pattern
                  id="dot-pattern"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="30" cy="30" r="1.5" fill="rgba(255, 255, 255, 0.1)" />
                </pattern>
              </defs>
              
              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              
              {/* Wave Overlay */}
              <rect width="100%" height="100%" fill="url(#wave-pattern)" />
              
              {/* Dot Overlay */}
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
              
              {/* Subtle Geometric Shapes */}
              <g opacity="0.15">
                <circle cx="10%" cy="20%" r="3" fill="rgba(255, 255, 255, 0.3)" />
                <circle cx="90%" cy="30%" r="2" fill="rgba(255, 255, 255, 0.2)" />
                <circle cx="15%" cy="80%" r="2.5" fill="rgba(255, 255, 255, 0.25)" />
                <circle cx="85%" cy="70%" r="2" fill="rgba(255, 255, 255, 0.2)" />
              </g>
            </svg>
          </div>

          {/* Animated Dots Pattern Background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Subtle gradient overlay with color accents */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/90 via-slate-600/90 via-purple-600/10 to-slate-500/90" />
          </motion.div>

          <Container>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Clear Value Proposition - Magazine Style */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] text-white tracking-tight">
                  Deploy Production-Grade AI Agents{' '}
                  <span className="text-white/90">in Minutes, Not Months</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed max-w-3xl mx-auto">
                  Stop wrestling with fragmented tools. Get enterprise security, observability, and governance—built-in from day one.
                </p>
                
                {/* Role Anchoring */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <p className="text-lg md:text-xl text-white/70 font-medium">
                    For teams shipping AI agents to real users — not demos
                  </p>
                </motion.div>

                {/* Single Prominent CTA */}
                {!submitted ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-lg mx-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your work email"
                        required
                        className="flex-1 px-6 py-4 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 text-lg"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 rounded-lg font-semibold bg-white text-black hover:bg-white/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Joining...
                          </span>
                        ) : (
                          "Let's Connect!"
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-white/60 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      We respect your privacy. No spam, unsubscribe anytime.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 shadow-xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">You're In!</h3>
                    {waitlistPosition && (
                      <p className="text-lg text-green-800 mb-4">
                        You're <strong>#{waitlistPosition}</strong> on the waitlist
                      </p>
                    )}
                    <AchievementBadges 
                      position={waitlistPosition || 0} 
                      isEarly={isEarlyBird} 
                    />
                    <p className="text-green-700 mb-6">
                      We've sent a confirmation email to <strong>{email}</strong>. Check your inbox for next steps.
                    </p>
                    
                    {/* Referral Section with Clear Incentives */}
                    {showReferral && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg p-6 border-2 border-purple-200 shadow-lg"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Gift className="w-6 h-6 text-purple-600" />
                          <span className="font-bold text-lg text-gray-900">Unlock Rewards by Referring Friends</span>
                        </div>
                        
                        {/* Referral Rewards Tiers */}
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-purple-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">1</div>
                            <div className="text-xs text-gray-600">Move up 10 spots</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">3</div>
                            <div className="text-xs text-gray-600">Move up 50 spots</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">5</div>
                            <div className="text-xs text-gray-600">Guaranteed early access</div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4 font-medium">
                          🎁 <strong>Your Rewards:</strong> Each referral moves you up the waitlist and unlocks exclusive benefits. The more you refer, the sooner you get access!
                        </p>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={`${window.location.origin}/prelaunch?ref=${referralCode}`}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm font-mono"
                          />
                          <button
                            onClick={copyReferralLink}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center gap-2 font-semibold"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Link
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          Share on Twitter, LinkedIn, or email to start earning rewards
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Value Cards from v7 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 w-full max-w-6xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: 'Launch Fast', description: 'Start using immediately, no setup delays', icon: CheckCircle },
                      { title: 'Always Protected', description: 'Your data and customers stay safe automatically', icon: Shield },
                      { title: 'Know What\'s Happening', description: 'Track performance and understand your agents', icon: Eye },
                      { title: 'Grows With You', description: 'Start small, scale to any size', icon: Rocket },
                    ].map((value, i) => {
                      const Icon = value.icon;
                      return (
                        <motion.div
                          key={value.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + (i * 0.1) }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="rounded-xl p-6 text-center bg-white/60 backdrop-blur-sm border border-white/20 min-h-[200px] flex flex-col items-center justify-center"
                        >
                          <Icon className="w-8 h-8 text-white mb-4" />
                          <h3 className="text-lg font-bold mb-2 text-white">{value.title}</h3>
                          <p className="text-sm text-white/80">{value.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

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
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </Section>

        {/* Visual Preview Section - Superhuman Suite Style */}
        <Section className="bg-gradient-to-b from-slate-600 via-slate-500 via-slate-400 via-slate-200 to-slate-50 pt-24">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  From Idea to Production — End to End
                </h2>
                <p className="text-xl md:text-2xl text-white/90 font-medium">
                  Everything you need to build, secure, observe, and deploy AI agents
                </p>
              </div>
              
              {/* Feature Wizard - Following ProductionReadyWizard pattern */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/30 to-slate-100/50 shadow-2xl border border-white/50">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-200/20 to-gray-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Horizontal Tabs at Top */}
                <div className="border-b border-white/50 bg-gradient-to-b from-white to-slate-50/50 px-6 py-4">
                  <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Platform Capabilities</h4>
                  <div className="flex flex-wrap justify-center gap-6">
                    {[
                      { id: 0, label: 'Builder', icon: Wrench, color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Build agents with ease' },
                      { id: 1, label: 'Security', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-100', description: 'Enterprise-grade protection' },
                      { id: 2, label: 'Governance', icon: Lock, color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Compliance & control' },
                      { id: 4, label: 'Observability', icon: Eye, color: 'text-indigo-600', bgColor: 'bg-indigo-100', description: 'Full visibility' },
                    ].map((tab) => {
                      const isActive = activeFeatureTab === tab.id;
                      
                      return (
                        <motion.button
                          key={tab.id}
                          onClick={() => scrollToSection(tab.id)}
                          className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-2 border-slate-300 shadow-md'
                              : 'bg-white/80 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-md'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-slate-200' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                          }`}>
                            {React.createElement(tab.icon, { 
                              className: `w-4 h-4 ${isActive ? tab.color : 'text-gray-600'}` 
                            })}
                          </div>
                          
                          {/* Label */}
                          <span className={`font-semibold text-sm ${
                            isActive ? 'text-slate-800' : 'text-gray-900'
                          }`}>
                            {tab.label}
                          </span>

                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-600 rounded-full"
                              layoutId="activeTab"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-8 relative">
                    <AnimatePresence mode="wait">
                      {(() => {
                        const features = [
                          {
                            id: 0,
                            title: 'Builder: Create Agents That Actually Work',
                            description: 'Build, deploy, and test production-ready AI agents in minutes.',
                            capabilities: [],
                            icon: Wrench,
                            color: 'text-purple-600',
                            bgColor: 'bg-purple-100',
                            label: 'Builder',
                          },
                          {
                            id: 1,
                            title: 'Security: Enterprise-Grade Protection',
                            description: 'Multi-layered security architecture ensures your agents and data are protected at every level.',
                            capabilities: [
                              'AuthN: Every user and API call is verified before access, ensuring only authenticated users can interact with the agent',
                              'AuthZ: Fine-grained controls ensure users only see and access data they\'re authorized for, preventing unauthorized access',
                              'Data Access: Data is encrypted in transit and at rest, with all access logged and controlled through comprehensive policies',
                              'Guardrails: Automatic safety and compliance checks prevent unsafe actions and ensure all responses meet regulatory requirements'
                            ],
                            icon: Shield,
                            color: 'text-red-600',
                            bgColor: 'bg-red-100',
                            label: 'Security',
                          },
                          {
                            id: 2,
                            title: 'Governance: Complete Control & Compliance',
                            description: 'Maintain full visibility and control over your AI operations with comprehensive governance tools.',
                            capabilities: [],
                            icon: Lock,
                            color: 'text-blue-600',
                            bgColor: 'bg-blue-100',
                            label: 'Governance',
                          },
                          {
                            id: 4,
                            title: 'Observability: See Everything, Know Everything',
                            description: 'Complete visibility into your AI operations with comprehensive observability across all layers.',
                            capabilities: [],
                            icon: Eye,
                            color: 'text-indigo-600',
                            bgColor: 'bg-indigo-100',
                            label: 'Observability',
                          },
                        ];
                        
                        const feature = features.find(f => f.id === activeFeatureTab) || features[0];
                        
                        return (
                          <motion.div
                            key={activeFeatureTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6 relative"
                          >
                            {/* Content */}
                            <div className="text-center">
                              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-slate-900" data-demo-title="true">
                                {feature.title}
                              </h3>
                              {feature.description && (
                                <p className="text-base leading-relaxed mb-4 text-slate-600 max-w-3xl mx-auto">
                                  {feature.description}
                                </p>
                              )}
                              {feature.id !== 1 && feature.id !== 2 && feature.id !== 4 && feature.capabilities && feature.capabilities.length > 0 && (
                                <div className="space-y-2 mb-4">
                                  {feature.capabilities.map((capability, capIndex) => (
                                    <div key={capIndex} className="flex items-start gap-2 text-slate-700">
                                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />
                                      <span className="text-sm">{capability}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Animation */}
                            <div className="relative rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto -mt-2">
                              {(() => {
                                if (feature.id === 0) {
                                  // Builder Demo: First show interactive agent creation, then builder concepts
                                  return (
                                    <div className="relative w-full space-y-6" data-builder-demo-container="true">
                                      {/* Interactive Agent Creation Demo - Natural Language */}
                                      <div className="relative w-full">
                                        {/* Background Gradient Layer */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-xl">
                                          {/* SVG Pattern Overlay */}
                                          <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                            <defs>
                                              <pattern id="circles-agent-v8" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                                <circle cx="30" cy="30" r="2" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
                                                <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                                              </pattern>
                                              <pattern id="dots-agent-v8" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
                                              </pattern>
                                              <pattern id="arcs-agent-v8" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                                                <path d="M 0 100 Q 50 50, 100 100 T 200 100" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1.5" />
                                                <path d="M 0 150 Q 50 100, 100 150 T 200 150" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="1.5" />
                                                <animateTransform attributeName="patternTransform" type="translate" values="0,0; 200,0; 0,0" dur="25s" repeatCount="indefinite" />
                                              </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#circles-agent-v8)" />
                                            <rect width="100%" height="100%" fill="url(#dots-agent-v8)" />
                                            <rect width="100%" height="100%" fill="url(#arcs-agent-v8)" />
                                            <circle cx="15%" cy="20%" r="4" fill="rgba(139, 92, 246, 0.4)" />
                                            <circle cx="85%" cy="25%" r="3" fill="rgba(236, 72, 153, 0.4)" />
                                            <circle cx="20%" cy="80%" r="3.5" fill="rgba(59, 130, 246, 0.4)" />
                                            <circle cx="80%" cy="75%" r="3" fill="rgba(139, 92, 246, 0.3)" />
                                          </svg>
                                        </div>
                                        {/* Demo Content */}
                                        <div className="relative z-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
                                          <DynamicUIDemo 
                                            highlightInput={false} 
                                            showBadge={true} 
                                            autoFocus={false} 
                                            skipFeatureScreens={true}
                                            pauseAutoRestart={builderDemoReady}
                                            onDemoComplete={() => setBuilderDemoReady(true)}
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* Builder Concepts Demo - Auto-advancing cards with live demos */}
                                      {builderDemoReady && (
                                        <BuilderAgentDemo 
                                          onComplete={() => {
                                            // Scroll to agent chips in DynamicUIDemo
                                            setTimeout(() => {
                                              const agentChips = document.querySelector('[data-agent-chips]');
                                              if (agentChips) {
                                                agentChips.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                              } else {
                                                // Fallback: scroll to DynamicUIDemo card
                                                const demoCard = document.querySelector('[data-dynamic-ui-demo]');
                                                if (demoCard) {
                                                  demoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }
                                              }
                                            }, 300);
                                            
                                            // Reset builderDemoReady to allow DynamicUIDemo to restart
                                            setBuilderDemoReady(false);
                                            // Reset DynamicUIDemo state to restart the loop
                                            setTimeout(() => {
                                              // Force a re-render by toggling the state
                                              const event = new Event('builder-demo-complete');
                                              window.dispatchEvent(event);
                                            }, 500);
                                          }}
                                        />
                                      )}
                                    </div>
                                  );
                                } else if (feature.id === 1) {
                                  // Security Demo - Live demo showing security concepts applied to customer support agent
                                  return (
                                    <div className="relative w-full">
                                      <SecurityAgentDemo />
                                    </div>
                                  );
                                } else if (feature.id === 2) {
                                  // Governance Demo - Live demo showing governance concepts applied to customer support agent
                                  return (
                                    <div className="relative w-full">
                                      <GovernanceAgentDemo />
                                    </div>
                                  );
                                } else if (feature.id === 4) {
                                  // Observability Demo - Live demo showing observability concepts applied to customer support agent
                                  return (
                                    <div className="relative w-full">
                                      <ObservabilityAgentDemo />
                                    </div>
                                  );
                                } else {
                                  // Should not reach here with only 4 features
                                  return null;
                                }
                              })()}
                            </div>
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>
                </div>
            </div>
          </Container>
        </Section>

        {/* Unlock the Full Agent Operating System Section */}
        <Section className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 pt-16 pb-12">
          <Container>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 md:p-12 text-center shadow-lg"
              >
                <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Unlock the full Agent Operating System
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { label: 'Cost Controls', icon: DollarSign },
                    { label: 'MCP Connectivity', icon: Network },
                    { label: 'Agent & MCP Registry', icon: Package },
                    { label: 'Reporting', icon: BarChart3 },
                  ].map((cap, index) => {
                    const Icon = cap.icon;
                    return (
                      <motion.div
                        key={cap.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20"
                      >
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <Lock className="w-4 h-4 text-primary" />
                        </motion.div>
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{cap.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all"
                  >
                    Talk to Us
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Explore Solutions Section */}
        <Section id="solutions" className="bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50 pt-16 pb-12">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Header with Coming Soon Badge */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Explore Solutions
                  </h2>
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Three Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Banking Card */}
                <motion.a
                  href="/solutions/demo?type=banking"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Banking</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    AI-powered solutions for financial services, compliance, and customer engagement.
                  </p>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Watch Demo →
                  </div>
                </motion.a>

                {/* Insurance Card */}
                <motion.a
                  href="/solutions/demo?type=insurance"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Insurance</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Streamline claims processing, risk assessment, and customer support with AI agents.
                  </p>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Watch Demo →
                  </div>
                </motion.a>

                {/* Retail/eCommerce Card */}
                <motion.a
                  href="/solutions/demo?type=retail"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Retail/eCommerce</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Enhance customer experience, inventory management, and sales with intelligent automation.
                  </p>
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                    Watch Demo →
                  </div>
                </motion.a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Social Proof Section - Superhuman Style */}
        <Section className="bg-gradient-to-b from-slate-700 via-slate-600 via-slate-500 to-slate-400 pt-8 pb-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                Trusted by Forward-Thinking Companies
              </h2>
              
              {/* Press/Investor Logos - Superhuman Style */}
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10">
                {['TechCrunch', 'Product Hunt', 'Y Combinator', 'Forbes'].map((logo, i) => (
                  <div key={i} className="text-xl font-semibold text-slate-300 hover:text-white transition-colors">
                    {logo}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-8 max-w-3xl mx-auto shadow-lg"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl text-slate-800 mb-4 italic leading-relaxed">
                  "Thuriyam transformed our AI development process. What used to take months now takes days. The enterprise security built-in gives us confidence to deploy at scale."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">John Doe</p>
                    <p className="text-sm text-slate-600">CTO, TechCorp</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

      </main>

      <Footer />
    </div>
  );
};

export default PrelaunchPage;
