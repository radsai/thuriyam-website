import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, CheckCircle, Lock, 
  TrendingUp, Target, Users, Gift, Copy, Star,
  Award, Rocket, AlertCircle, Unlock, Trophy, Crown, Sparkle
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import { DynamicUIDemo } from '@/components/ui/DynamicUIDemo';
import LiteLLMDemo from '@/components/ui/LiteLLMDemo';
import ObservabilityDemo from '@/components/ui/ObservabilityDemo';
import SecurityDemo from '@/components/ui/SecurityDemo';

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

// Progress Milestones Component - Converging Animation in Grid
const ProgressMilestones: React.FC<{ currentCount: number }> = ({ currentCount }) => {
  const milestones = [
    { 
      count: 100, 
      label: 'Feature Preview', 
      icon: Unlock, 
      unlocked: currentCount >= 100, 
      color: 'from-green-500 to-emerald-500',
      reward: 'All early signups get exclusive product preview access',
      // Starting positions for convergence animation (spread out)
      startX: -300,
      startY: -200,
    },
    { 
      count: 500, 
      label: 'Early Access', 
      icon: Rocket, 
      unlocked: currentCount >= 500, 
      color: 'from-blue-500 to-indigo-500',
      reward: 'First 500 get guaranteed beta access + 6 months free',
      startX: 300,
      startY: -200,
    },
    { 
      count: 1000, 
      label: 'Exclusive Webinar', 
      icon: Users, 
      unlocked: currentCount >= 1000, 
      color: 'from-purple-500 to-pink-500',
      reward: 'Founders Q&A + early feature demos for all members',
      startX: -300,
      startY: 200,
    },
    { 
      count: 2500, 
      label: 'Private Beta', 
      icon: Crown, 
      unlocked: currentCount >= 2500, 
      color: 'from-yellow-500 to-orange-500',
      reward: '2,500 signups Full platform access + lifetime discount for early members',
      startX: 300,
      startY: 200,
    },
  ];

  return (
    <div className="w-full relative overflow-hidden">
      {/* Grid Container - Cards converge into this grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {milestones.map((milestone, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: milestone.startX,
              y: milestone.startY,
              scale: 0.7,
              rotate: (i % 2 === 0 ? -8 : 8)
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
            }}
            transition={{ 
              delay: 0.6 + (i * 0.15),
              duration: 1.4,
              type: 'spring',
              stiffness: 80,
              damping: 12
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`rounded-xl p-6 text-center transition-all relative z-10 ${
              milestone.unlocked 
                ? 'bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl' 
                : 'bg-white/60 backdrop-blur-sm border border-white/20'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${milestone.color} text-white mb-4 ${
              !milestone.unlocked && 'opacity-60'
            }`}>
              {React.createElement(milestone.icon, {
                className: "w-7 h-7"
              })}
            </div>
            <h4 className={`text-base font-bold mb-2 ${
              milestone.unlocked ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {milestone.label}
            </h4>
            {milestone.unlocked ? (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full mb-2">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Unlocked</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{milestone.reward}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 leading-relaxed">{milestone.reward}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
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
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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

  const scrollToSection = (index: number) => {
    setActiveFeatureTab(index);
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveFeatureTab(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              {/* Social Proof Badge - Magazine Style */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Users className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-medium text-white/90">
                    <AnimatedCounter value={waitlistCount} /> people have joined
                  </span>
                </div>
              </motion.div>

              {/* Scarcity Indicator - Magazine Style */}
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
                {/* Clear Value Proposition - Magazine Style */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] text-white tracking-tight">
                  Deploy Production-Grade AI Agents{' '}
                  <span className="text-white/90">in Minutes, Not Months</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Stop wrestling with fragmented tools. Get enterprise security, observability, and governance—built-in from day one.
                </p>

                {/* Countdown Timer - Magazine Style */}
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

                {/* Progress Milestones - Converging Animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 w-full max-w-6xl mx-auto"
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
              {/* Header with Title and CTA */}
              <div className="flex items-start justify-between mb-12">
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  See What's Coming
                </h2>
                <button className="px-6 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-colors whitespace-nowrap">
                  Get Early Access
                </button>
              </div>

              {/* Navigation Tabs - Spanning across with invisible space */}
              <div className="flex justify-between items-center mb-16 bg-white/10 backdrop-blur-sm p-2 rounded-lg gap-2 border border-white/20">
                {[
                  { id: 0, label: 'Agent Builder', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-100' },
                  { id: 1, label: 'Virtual Keys', icon: Lock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                  { id: 2, label: 'Observability', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100' },
                  { id: 3, label: 'Security', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-100' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all relative flex-1 justify-center ${
                      activeFeatureTab === tab.id
                        ? 'bg-white text-slate-900 border-2 border-slate-400 shadow-sm'
                        : 'bg-transparent text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      activeFeatureTab === tab.id ? tab.bgColor : 'bg-gray-100'
                    }`}>
                      {React.createElement(tab.icon, { 
                        className: `w-5 h-5 ${activeFeatureTab === tab.id ? tab.color : 'text-gray-500'}` 
                      })}
                    </div>
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Feature Sections - Each tab scrolls to its section */}
              {[
                {
                  id: 0,
                  title: 'Build AI Agents by Describing Outcomes',
                  description: 'Stop wrestling with complex flowcharts. Describe what you want to achieve, and our platform builds the agent for you.',
                  icon: Target,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-100',
                  label: 'Agent Builder',
                },
                {
                  id: 1,
                  title: 'Manage API Keys with Granular Control',
                  description: 'Virtual keys provide secure, budget-controlled access to AI services. Set limits, track usage, and maintain compliance.',
                  icon: Lock,
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-100',
                  label: 'Virtual Keys',
                },
                {
                  id: 2,
                  title: 'Monitor Every Interaction with Analytics',
                  description: 'Full observability into every agent interaction. Track performance, debug issues, and optimize your AI workflows.',
                  icon: TrendingUp,
                  color: 'text-green-600',
                  bgColor: 'bg-green-100',
                  label: 'Observability',
                },
                {
                  id: 3,
                  title: 'Enterprise Security Built-In from Day One',
                  description: 'Triple-gate security architecture protects every interaction. SOC 2, GDPR, and HIPAA ready out of the box.',
                  icon: Shield,
                  color: 'text-red-600',
                  bgColor: 'bg-red-100',
                  label: 'Security',
                },
              ].map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => { sectionRefs.current[feature.id] = el; }}
                  className={`mb-12 scroll-mt-24 ${index === 0 ? 'mt-0' : 'mt-12'}`}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                <div>
                  {/* Active Tab Element */}
                  <div className="mb-8">
                        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-lg shadow-sm border ${
                          index <= 2 
                            ? `bg-white/${10 + index * 5} backdrop-blur-sm border-white/${20 + index * 5}` 
                            : 'bg-white/80 backdrop-blur-sm border-slate-200'
                        }`}>
                          <div className={`w-8 h-8 rounded flex items-center justify-center ${feature.bgColor}`}>
                            {React.createElement(feature.icon, { 
                              className: `w-5 h-5 ${feature.color}` 
                            })}
                      </div>
                          <span className={`font-semibold ${
                            index <= 2 ? 'text-white' : 'text-slate-900'
                          }`}>{feature.label}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                          index <= 2 ? 'text-white' : 'text-slate-900'
                        }`}>
                          {feature.title}
                    </h3>
                        <p className={`text-lg leading-relaxed ${
                          index === 0 ? 'text-white/80' : index === 1 ? 'text-white/75' : index === 2 ? 'text-white/70' : 'text-slate-600'
                        }`}>
                          {feature.description}
                    </p>
                  </motion.div>
                </div>

                    {/* Right Side - Animation */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="rounded-xl overflow-hidden shadow-lg relative"
                      >
                        {feature.id === 0 ? (
                          // Agent Builder Demo with Background Gradient - Superhuman Style
                          <div className="relative min-h-[600px] flex items-center justify-center p-8">
                            {/* Background Gradient Layer - Full container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl">
                              {/* SVG Pattern Overlay */}
                              <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <defs>
                                  {/* Circular Pattern */}
                                  <pattern
                                    id="circles-agent"
                                    x="0"
                                    y="0"
                                    width="60"
                                    height="60"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="30" cy="30" r="2" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                                  </pattern>
                                  
                                  {/* Dotted Lines Pattern */}
                                  <pattern
                                    id="dots-agent"
                                    x="0"
                                    y="0"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
                                  </pattern>
                                  
                                  {/* Arc Pattern */}
                                  <pattern
                                    id="arcs-agent"
                                    x="0"
                                    y="0"
                                    width="200"
                                    height="200"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <path
                                      d="M 0 100 Q 50 50, 100 100 T 200 100"
                                      fill="none"
                                      stroke="rgba(139, 92, 246, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M 0 150 Q 50 100, 100 150 T 200 150"
                                      fill="none"
                                      stroke="rgba(236, 72, 153, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <animateTransform
                                      attributeName="patternTransform"
                                      type="translate"
                                      values="0,0; 200,0; 0,0"
                                      dur="25s"
                                      repeatCount="indefinite"
                                    />
                                  </pattern>
                                </defs>
                                
                                {/* Apply Patterns */}
                                <rect width="100%" height="100%" fill="url(#circles-agent)" />
                                <rect width="100%" height="100%" fill="url(#dots-agent)" />
                                <rect width="100%" height="100%" fill="url(#arcs-agent)" />
                                
                                {/* Floating Circles */}
                                <circle cx="15%" cy="20%" r="4" fill="rgba(139, 92, 246, 0.4)" />
                                <circle cx="85%" cy="25%" r="3" fill="rgba(236, 72, 153, 0.4)" />
                                <circle cx="20%" cy="80%" r="3.5" fill="rgba(59, 130, 246, 0.4)" />
                                <circle cx="80%" cy="75%" r="3" fill="rgba(139, 92, 246, 0.3)" />
                              </svg>
                            </div>
                            
                            {/* Demo Content - Centered with visible background around */}
                            <div className="relative z-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl w-full max-w-4xl">
                              <DynamicUIDemo 
                                highlightInput={false} 
                                showBadge={false} 
                                autoFocus={false}
                              />
                            </div>
                          </div>
                        ) : feature.id === 1 ? (
                          // Virtual Keys (Lite LLM) Demo with Background Gradient - Same as Agent Builder
                          <div className="relative min-h-[600px] flex items-center justify-center p-8">
                            {/* Background Gradient Layer - Full container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl">
                              {/* SVG Pattern Overlay */}
                              <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <defs>
                                  {/* Circular Pattern */}
                                  <pattern
                                    id="circles-vk"
                                    x="0"
                                    y="0"
                                    width="60"
                                    height="60"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="30" cy="30" r="2" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                                  </pattern>
                                  
                                  {/* Dotted Lines Pattern */}
                                  <pattern
                                    id="dots-vk"
                                    x="0"
                                    y="0"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
                                  </pattern>
                                  
                                  {/* Arc Pattern */}
                                  <pattern
                                    id="arcs-vk"
                                    x="0"
                                    y="0"
                                    width="200"
                                    height="200"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <path
                                      d="M 0 100 Q 50 50, 100 100 T 200 100"
                                      fill="none"
                                      stroke="rgba(139, 92, 246, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M 0 150 Q 50 100, 100 150 T 200 150"
                                      fill="none"
                                      stroke="rgba(236, 72, 153, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <animateTransform
                                      attributeName="patternTransform"
                                      type="translate"
                                      values="0,0; 200,0; 0,0"
                                      dur="25s"
                                      repeatCount="indefinite"
                                    />
                                  </pattern>
                                </defs>
                                
                                {/* Apply Patterns */}
                                <rect width="100%" height="100%" fill="url(#circles-vk)" />
                                <rect width="100%" height="100%" fill="url(#dots-vk)" />
                                <rect width="100%" height="100%" fill="url(#arcs-vk)" />
                                
                                {/* Floating Circles */}
                                <circle cx="15%" cy="20%" r="4" fill="rgba(139, 92, 246, 0.4)" />
                                <circle cx="85%" cy="25%" r="3" fill="rgba(236, 72, 153, 0.4)" />
                                <circle cx="20%" cy="80%" r="3.5" fill="rgba(59, 130, 246, 0.4)" />
                                <circle cx="80%" cy="75%" r="3" fill="rgba(139, 92, 246, 0.3)" />
                              </svg>
                            </div>
                            
                            {/* Demo Content - Centered with visible background around */}
                            <div className="relative z-10 w-full max-w-4xl">
                              <LiteLLMDemo />
                            </div>
                          </div>
                        ) : feature.id === 2 ? (
                          // Observability Demo with Background Gradient - Same as Agent Builder
                          <div className="relative min-h-[600px] flex items-center justify-center p-8">
                            {/* Background Gradient Layer - Full container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl">
                              {/* SVG Pattern Overlay */}
                              <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <defs>
                                  {/* Circular Pattern */}
                                  <pattern
                                    id="circles-obs"
                                    x="0"
                                    y="0"
                                    width="60"
                                    height="60"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="30" cy="30" r="2" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                                  </pattern>
                                  
                                  {/* Dotted Lines Pattern */}
                                  <pattern
                                    id="dots-obs"
                                    x="0"
                                    y="0"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
                                  </pattern>
                                  
                                  {/* Arc Pattern */}
                                  <pattern
                                    id="arcs-obs"
                                    x="0"
                                    y="0"
                                    width="200"
                                    height="200"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <path
                                      d="M 0 100 Q 50 50, 100 100 T 200 100"
                                      fill="none"
                                      stroke="rgba(139, 92, 246, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M 0 150 Q 50 100, 100 150 T 200 150"
                                      fill="none"
                                      stroke="rgba(236, 72, 153, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <animateTransform
                                      attributeName="patternTransform"
                                      type="translate"
                                      values="0,0; 200,0; 0,0"
                                      dur="25s"
                                      repeatCount="indefinite"
                                    />
                                  </pattern>
                                </defs>
                                
                                {/* Apply Patterns */}
                                <rect width="100%" height="100%" fill="url(#circles-obs)" />
                                <rect width="100%" height="100%" fill="url(#dots-obs)" />
                                <rect width="100%" height="100%" fill="url(#arcs-obs)" />
                                
                                {/* Floating Circles */}
                                <circle cx="15%" cy="20%" r="4" fill="rgba(139, 92, 246, 0.4)" />
                                <circle cx="85%" cy="25%" r="3" fill="rgba(236, 72, 153, 0.4)" />
                                <circle cx="20%" cy="80%" r="3.5" fill="rgba(59, 130, 246, 0.4)" />
                                <circle cx="80%" cy="75%" r="3" fill="rgba(139, 92, 246, 0.3)" />
                              </svg>
                            </div>
                            
                            {/* Demo Content - Centered with visible background around */}
                            <div className="relative z-10 w-full max-w-4xl">
                              <ObservabilityDemo />
                            </div>
                          </div>
                        ) : feature.id === 3 ? (
                          // Security Demo with Background Gradient - Same as Agent Builder
                          <div className="relative min-h-[600px] flex items-center justify-center p-8">
                            {/* Background Gradient Layer - Full container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl">
                              {/* SVG Pattern Overlay */}
                              <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <defs>
                                  {/* Circular Pattern */}
                                  <pattern
                                    id="circles-sec"
                                    x="0"
                                    y="0"
                                    width="60"
                                    height="60"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="30" cy="30" r="2" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                                  </pattern>
                                  
                                  {/* Dotted Lines Pattern */}
                                  <pattern
                                    id="dots-sec"
                                    x="0"
                                    y="0"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
                                  </pattern>
                                  
                                  {/* Arc Pattern */}
                                  <pattern
                                    id="arcs-sec"
                                    x="0"
                                    y="0"
                                    width="200"
                                    height="200"
                                    patternUnits="userSpaceOnUse"
                                  >
                                    <path
                                      d="M 0 100 Q 50 50, 100 100 T 200 100"
                                      fill="none"
                                      stroke="rgba(139, 92, 246, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M 0 150 Q 50 100, 100 150 T 200 150"
                                      fill="none"
                                      stroke="rgba(236, 72, 153, 0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <animateTransform
                                      attributeName="patternTransform"
                                      type="translate"
                                      values="0,0; 200,0; 0,0"
                                      dur="25s"
                                      repeatCount="indefinite"
                                    />
                                  </pattern>
                                </defs>
                                
                                {/* Apply Patterns */}
                                <rect width="100%" height="100%" fill="url(#circles-sec)" />
                                <rect width="100%" height="100%" fill="url(#dots-sec)" />
                                <rect width="100%" height="100%" fill="url(#arcs-sec)" />
                                
                                {/* Floating Circles */}
                                <circle cx="15%" cy="20%" r="4" fill="rgba(139, 92, 246, 0.4)" />
                                <circle cx="85%" cy="25%" r="3" fill="rgba(236, 72, 153, 0.4)" />
                                <circle cx="20%" cy="80%" r="3.5" fill="rgba(59, 130, 246, 0.4)" />
                                <circle cx="80%" cy="75%" r="3" fill="rgba(139, 92, 246, 0.3)" />
                              </svg>
                            </div>
                            
                            {/* Demo Content - Centered with visible background around */}
                            <div className="relative z-10 w-full max-w-4xl">
                              <SecurityDemo />
                            </div>
                          </div>
                        ) : null}
                  </motion.div>
                </div>
              </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Social Proof Section - Superhuman Style */}
        <Section className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 pt-8 pb-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
                Trusted by Forward-Thinking Companies
              </h2>
              
              {/* Press/Investor Logos - Superhuman Style */}
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10">
                {['TechCrunch', 'Product Hunt', 'Y Combinator', 'Forbes'].map((logo, i) => (
                  <div key={i} className="text-xl font-semibold text-slate-500 hover:text-slate-700 transition-colors">
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
                <blockquote className="text-xl text-slate-700 mb-4 italic leading-relaxed">
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
