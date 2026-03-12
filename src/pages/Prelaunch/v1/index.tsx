import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Zap, Shield, BarChart3, CheckCircle, ArrowRight, Mail, Lock, 
  TrendingUp, Target, Users, Clock, Gift, Share2, Copy, Star, Brain,
  Award, Rocket, Timer, AlertCircle, Unlock, Trophy, Crown, Sparkle, Eye
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

// Countdown Timer Component
const CountdownTimer: React.FC<{ launchDate: Date }> = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px] border border-white/20"
        >
          <div className="text-3xl font-bold text-white mb-1">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/80 uppercase tracking-wide">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
        setIsAnimating(false);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="inline-block">
      {Math.floor(displayValue).toLocaleString()}{suffix}
      {isAnimating && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Recent Signups Ticker Component
const RecentSignupsTicker: React.FC = () => {
  const signups = [
    { name: 'Sarah Chen', company: 'Acme Corp' },
    { name: 'Michael Rodriguez', company: 'TechCo' },
    { name: 'Emily Johnson', company: 'StartupXYZ' },
    { name: 'David Kim', company: 'InnovateLabs' },
    { name: 'Lisa Wang', company: 'DataFlow Inc' },
  ];

  return (
    <div className="overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
      <div className="flex items-center gap-4 animate-scroll">
        {[...signups, ...signups].map((signup, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap text-sm text-white/90">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">{signup.name}</span>
            <span className="text-white/60">from</span>
            <span>{signup.company}</span>
            <span className="text-white/60">just joined</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Progress Milestones Component
const ProgressMilestones: React.FC<{ currentCount: number }> = ({ currentCount }) => {
  const milestones = [
    { count: 100, label: 'Feature Preview', icon: Unlock, unlocked: currentCount >= 100 },
    { count: 500, label: 'Early Access', icon: Rocket, unlocked: currentCount >= 500 },
    { count: 1000, label: 'Exclusive Webinar', icon: Users, unlocked: currentCount >= 1000 },
    { count: 2500, label: 'Private Beta', icon: Crown, unlocked: currentCount >= 2500 },
  ];

  const nextMilestone = milestones.find(m => !m.unlocked) || milestones[milestones.length - 1];
  const progress = Math.min((currentCount / nextMilestone.count) * 100, 100);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Community Progress</h3>
        <span className="text-sm text-muted-foreground">
          {currentCount.toLocaleString()} / {nextMilestone.count.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {milestones.map((milestone, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: milestone.unlocked ? 1 : 0.5, scale: 1 }}
            className={`text-center p-2 rounded-lg ${
              milestone.unlocked 
                ? 'bg-green-100 border-2 border-green-400' 
                : 'bg-gray-100 border border-gray-300'
            }`}
          >
            {React.createElement(milestone.icon, {
              className: `w-5 h-5 mx-auto mb-1 ${
                milestone.unlocked ? 'text-green-600' : 'text-gray-400'
              }`
            })}
            <div className={`text-xs font-semibold ${
              milestone.unlocked ? 'text-green-700' : 'text-gray-500'
            }`}>
              {milestone.label}
            </div>
            {milestone.unlocked && (
              <CheckCircle className="w-3 h-3 mx-auto mt-1 text-green-600" />
            )}
          </motion.div>
        ))}
      </div>
      {!nextMilestone.unlocked && (
        <p className="text-sm text-center text-muted-foreground mt-4">
          <strong>{nextMilestone.count - currentCount}</strong> more signups to unlock{' '}
          <strong>{nextMilestone.label}</strong>!
        </p>
      )}
    </div>
  );
};

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
  
  // Mock data - replace with real API calls
  const waitlistCount = 1247;
  const spotsLeft = 500;
  const isEarlyBird = waitlistCount < 500; // First 500 are early birds
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14); // 14 days from now

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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Confetti trigger={showConfetti} />
      <MilestoneCelebration count={waitlistCount} />
      <MainNavigation />

      <main>
        {/* Hero Section with Clear Value Proposition - Superhuman Style */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-black text-white relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />
          </motion.div>

          <Container>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              {/* Social Proof Badge - Superhuman Style */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Users className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-medium text-white/90">
                    <AnimatedCounter value={waitlistCount} /> developers have joined
                  </span>
                </div>
              </motion.div>

              {/* Scarcity Indicator - Superhuman Style */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-300">
                    Only <strong>{spotsLeft} spots</strong> left in the beta
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Clear Value Proposition - Superhuman Style */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                  Deploy Production-Grade AI Agents{' '}
                  <span className="text-white/90">in Minutes, Not Months</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                  Stop wrestling with fragmented tools. Get enterprise security, observability, and governance—built-in from day one.
                </p>

                {/* Countdown Timer - Superhuman Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <Rocket className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">Beta Launches In</span>
                    </div>
                    <CountdownTimer launchDate={launchDate} />
                  </div>
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
                          'Join Waitlist'
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
                    
                    {/* Referral Section */}
                    {showReferral && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg p-4 border border-green-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Invite Friends, Get Priority Access</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Share your referral link and move up the waitlist!
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={`${window.location.origin}/prelaunch?ref=${referralCode}`}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm"
                          />
                          <button
                            onClick={copyReferralLink}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Progress Milestones */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 max-w-3xl mx-auto"
                >
                  <ProgressMilestones currentCount={waitlistCount} />
                </motion.div>

                {/* Recent Signups Ticker */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 max-w-2xl mx-auto"
                >
                  <RecentSignupsTicker />
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
          `}</style>
        </Section>

        {/* Benefit-Oriented Copy Section - Superhuman Style */}
        <Section className="bg-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Why Join the Beta?
              </h2>
              <p className="text-xl text-gray-600 font-light">
                Get exclusive early access and shape the future of AI development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Early Access',
                  description: 'Be among the first to use our revolutionary AI platform and shape its future.',
                  benefit: '6 months free for beta members',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Production-grade security, compliance, and governance built into every feature.',
                  benefit: 'SOC 2, GDPR, HIPAA ready',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  icon: BarChart3,
                  title: 'Priority Support',
                  description: 'Direct access to our team and priority support for all your questions.',
                  benefit: 'Dedicated Slack channel',
                  color: 'from-purple-500 to-pink-500'
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${benefit.color} text-white mb-6`}>
                    {React.createElement(benefit.icon, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-full">
                    <Star className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">{benefit.benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Visual Preview Section - Product Mockups - Superhuman Style */}
        <Section className="bg-gray-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  See What's Coming
                </h2>
                <p className="text-xl text-gray-600 font-light">
                  A glimpse of the platform you'll get access to
                </p>
              </div>

              {/* Product Preview Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'Goal-Driven Agent Builder',
                    description: 'Build AI agents by describing outcomes, not flowcharts.',
                    icon: <Target className="w-5 h-5" />,
                    preview: 'Visual interface mockup'
                  },
                  {
                    title: 'Virtual Keys & Budget Control',
                    description: 'Manage API keys with granular budget controls.',
                    icon: <Lock className="w-5 h-5" />,
                    preview: 'Dashboard mockup'
                  },
                  {
                    title: 'Full Observability',
                    description: 'Monitor every interaction with comprehensive analytics.',
                    icon: <TrendingUp className="w-5 h-5" />,
                    preview: 'Analytics mockup'
                  },
                  {
                    title: 'Enterprise Security Gateway',
                    description: 'Triple-gate security architecture protecting every interaction.',
                    icon: <Shield className="w-5 h-5" />,
                    preview: 'Security mockup'
                  },
                  ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 text-gray-900 text-lg">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    {/* Placeholder for product mockup/GIF */}
                    <motion.div 
                      className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm relative overflow-hidden group-hover:from-purple-100 group-hover:to-indigo-100 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10">{feature.preview}</span>
                      <motion.div
                        className="absolute top-2 right-2"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Eye className="w-4 h-4 text-purple-600" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Social Proof Section - Superhuman Style */}
        <Section className="bg-white">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
                Trusted by Forward-Thinking Companies
              </h2>
              
              {/* Press/Investor Logos - Superhuman Style */}
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 mb-16">
                {['TechCrunch', 'Product Hunt', 'Y Combinator', 'Forbes'].map((logo, i) => (
                  <div key={i} className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                    {logo}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-10 max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "Thuriyam transformed our AI development process. What used to take months now takes days. The enterprise security built-in gives us confidence to deploy at scale."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-600">CTO, TechCorp</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Final CTA Section with Scarcity - Superhuman Style */}
        <Section className="bg-black text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-sm mb-8">
                <Timer className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-300">
                  Limited Spots Available
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Ready to Deploy Production-Grade AI?
              </h2>
              <p className="text-xl mb-10 text-white/70 font-light max-w-2xl mx-auto">
                Join <AnimatedCounter value={waitlistCount} /> developers already on the waitlist. Get early access, exclusive pricing, and priority support.
              </p>
              {!submitted && (
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center h-14 px-10 rounded-lg font-semibold text-lg text-black bg-white hover:bg-white/90 transition-all transform hover:scale-105"
                >
                  Join the Waitlist Now
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

export default PrelaunchPage;
