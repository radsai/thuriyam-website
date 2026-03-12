import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Lock, CheckCircle, 
  Shield, Eye, Rocket, Zap, Brain, Database,
  BarChart3, Cpu, Globe, Code, Upload, Gauge,
  ChevronDown, Menu, X
} from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';
import Logo from '@/components/Layout/Logo';
import { SecurityBuilderDemo } from '@/components/ui/SecurityBuilderDemo';

// ============================================
// SECTION 1: NAVBAR
// ============================================
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/40' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Platform</a>
          <a href="#use-cases" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Use Cases</a>
          <a href="#docs" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Docs</a>
          <a href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all relative overflow-hidden group"
        >
          <span className="relative z-10">Request Access</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 blur-xl"
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ============================================
// SECTION 2: HERO (INTERACTIVE AGENT TOUR)
// ============================================
interface OrbitNodeProps {
  label: string;
  icon: React.ElementType;
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  microcopy: string;
}

const OrbitNode: React.FC<OrbitNodeProps> = ({ 
  label, icon: Icon, angle, radius, isActive, onClick, onHover, onLeave, microcopy 
}) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: isActive ? 1.08 : 1,
        opacity: isActive ? 1 : 0.2,
      }}
      whileHover={{ scale: 1.15 }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center backdrop-blur-sm"
        whileHover={{ 
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
        }}
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-foreground bg-background/90 backdrop-blur-sm px-3 py-1 rounded border border-border"
      >
        {microcopy}
      </motion.div>
    </motion.div>
  );
};

const AgentCore: React.FC = () => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center"
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 20px rgba(139, 92, 246, 0.3)',
          '0 0 40px rgba(139, 92, 246, 0.5)',
          '0 0 20px rgba(139, 92, 246, 0.3)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Sparkles className="w-12 h-12 text-white" />
    </motion.div>
  );
};

const AgentSystemCanvas: React.FC<{ onNodeClick: (node: string) => void }> = ({ onNodeClick }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [currentMicrocopy, setCurrentMicrocopy] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const microcopies = [
    'Production-ready by default',
    'Governed. Observable. Secure.',
    'Built to scale.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMicrocopy((prev) => (prev + 1) % microcopies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeNode && !hoveredNode) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeNode, hoveredNode]);

  const nodes = [
    { label: 'Build', icon: Sparkles, microcopy: 'Build agents that survive production' },
    { label: 'Secure', icon: Shield, microcopy: 'Trust enforced at runtime' },
    { label: 'Observe', icon: Eye, microcopy: 'See what agents do — and why' },
    { label: 'Deploy', icon: Rocket, microcopy: 'From prototype to production' },
  ];

  const radius = 180;

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <AgentCore />
      {nodes.map((node, index) => {
        const baseAngle = (index * Math.PI / 2);
        const angle = baseAngle + (rotation * Math.PI / 180);
        return (
          <OrbitNode
            key={node.label}
            label={node.label}
            icon={node.icon}
            angle={angle}
            radius={radius}
            isActive={activeNode === node.label || hoveredNode === node.label}
            onClick={() => {
              setActiveNode(node.label);
              onNodeClick(node.label);
            }}
            onHover={() => {
              setHoveredNode(node.label);
              setActiveNode(null);
            }}
            onLeave={() => {
              setHoveredNode(null);
            }}
            microcopy={node.microcopy}
          />
        );
      })}
      
      {/* Rotating microcopy */}
      <motion.div
        key={currentMicrocopy}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-foreground/70 font-medium"
      >
        {microcopies[currentMicrocopy]}
      </motion.div>
    </div>
  );
};

const HeroSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-16 pb-24 px-4 md:px-6 bg-gradient-to-b from-background via-background to-slate-50/50">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Hero Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Run AI Agents in Production —{' '}
            <span className="text-primary">Not Demos</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Build, secure, observe, and deploy AI agents on one control plane. Security built-in from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExploreClick}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              Explore the Platform
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-background border-2 border-border rounded-lg font-semibold text-lg hover:bg-accent transition-all"
            >
              Request Early Access
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-foreground/60 mb-2">See how it works</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            <ChevronDown className="w-6 h-6 text-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: VALUE PROOF STRIP
// ============================================
const ValueCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ElementType;
  index: number;
}> = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors"
    >
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </motion.div>
  );
};

const ValueStrip: React.FC = () => {
  const values = [
    { title: 'Production-Ready', description: 'Built for real workloads from day one', icon: CheckCircle },
    { title: 'Security by Default', description: 'Enterprise-grade security built-in', icon: Shield },
    { title: 'Full Observability', description: 'Complete visibility into agent behavior', icon: Eye },
    { title: 'Enterprise Deployable', description: 'Scale with confidence and control', icon: Rocket },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ValueCard key={value.title} {...value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: 4-PILLAR INTERACTIVE TOUR
// ============================================
interface Pillar {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: { label: string; unlocked: boolean }[];
  cta: string;
}

const pillars: Pillar[] = [
  {
    id: 'build',
    label: 'Build',
    icon: Sparkles,
    title: 'Build agents that survive production.',
    description: 'Security, memory, testing, and multi-model routing — all built in automatically.',
    features: [
      { label: 'Security (AuthN, AuthZ, Data Access, Guardrails)', unlocked: true },
      { label: 'Memory systems', unlocked: true },
      { label: 'Multi-model routing', unlocked: true },
      { label: 'Hallucination testing', unlocked: true },
      { label: 'Advanced orchestration', unlocked: false },
      { label: 'BYO agent frameworks', unlocked: false },
    ],
    cta: 'Explore build →',
  },
  {
    id: 'secure',
    label: 'Secure',
    icon: Shield,
    title: 'Trust enforced at runtime.',
    description: 'Every agent action is identity-aware and policy-controlled.',
    features: [
      { label: 'AuthN / AuthZ', unlocked: true },
      { label: 'Data access control', unlocked: true },
      { label: 'Runtime guardrails', unlocked: true },
      { label: 'Policy engines', unlocked: false },
      { label: 'Isolation layers', unlocked: false },
    ],
    cta: 'Explore security →',
  },
  {
    id: 'observe',
    label: 'Observe',
    icon: Eye,
    title: 'See what agents do — and why.',
    description: 'Live telemetry across reasoning, tools, and outcomes.',
    features: [
      { label: 'Execution traces', unlocked: true },
      { label: 'Guardrail events', unlocked: true },
      { label: 'Error telemetry', unlocked: true },
      { label: 'Access observability', unlocked: false },
      { label: 'Root cause pipelines', unlocked: false },
    ],
    cta: 'Explore observability →',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: Rocket,
    title: 'From prototype to production rollout.',
    description: 'Ship agents like software — versioned, scalable, controlled.',
    features: [
      { label: 'Agent registry', unlocked: true },
      { label: 'Versioning', unlocked: true },
      { label: 'Rollouts', unlocked: true },
      { label: 'Kubernetes-native orchestration', unlocked: false },
      { label: 'Advanced deployment controls', unlocked: false },
    ],
    cta: 'Explore deployment →',
  },
];

const PillarSelector: React.FC<{ 
  activePillar: string; 
  onSelect: (id: string) => void;
}> = ({ activePillar, onSelect }) => {
  return (
    <div className="space-y-4">
      {pillars.map((pillar) => {
        const Icon = pillar.icon;
        const isActive = activePillar === pillar.id;
        return (
          <motion.button
            key={pillar.id}
            onClick={() => onSelect(pillar.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              isActive
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-border hover:border-primary/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-foreground/60'}`} />
              <span className={`font-semibold ${isActive ? 'text-primary' : 'text-foreground/80'}`}>
                {pillar.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="pillarHighlight"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

const FeatureItem: React.FC<{ 
  label: string; 
  unlocked: boolean;
  index: number;
}> = ({ label, unlocked, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-2 py-2"
    >
      {unlocked ? (
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      ) : (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative group"
        >
          <Lock className="w-5 h-5 text-foreground/40 flex-shrink-0" />
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border px-3 py-2 rounded text-xs whitespace-nowrap z-10">
            Unlock inside the platform
          </div>
        </motion.div>
      )}
      <span className={unlocked ? 'text-foreground' : 'text-foreground/50'}>{label}</span>
    </motion.li>
  );
};

const PillarDetailPanel: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  const Icon = pillar.icon;

  return (
    <motion.div
      key={pillar.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-background border border-border rounded-xl p-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
          <p className="text-foreground/70">{pillar.description}</p>
        </div>
      </div>

      {/* Show Security Demo for Build pillar */}
      {pillar.id === 'build' && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Security Built-In</h4>
          <SecurityBuilderDemo />
        </div>
      )}

      <ul className="space-y-2 mb-6">
        {pillar.features.map((feature, index) => (
          <FeatureItem key={feature.label} {...feature} index={index} />
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
      >
        {pillar.cta}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

const PillarTourSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState(pillars[0].id);
  const activePillarData = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <section id="platform" className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Complete Agent Operating System
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to build, secure, observe, and deploy AI agents
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PillarSelector activePillar={activePillar} onSelect={setActivePillar} />
          </div>
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <PillarDetailPanel key={activePillar} pillar={activePillarData} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: LOCKED CAPABILITIES GATE
// ============================================
const LockedCapabilitiesGate: React.FC = () => {
  const capabilities = [
    'Governance',
    'Cost Controls',
    'MCP Connectivity',
    'Advanced Security',
    'Enterprise Compliance',
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-background border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center shadow-xl"
        >
          <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock the full Agent Operating System
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap}
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
                <span className="text-sm font-medium">{cap}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all"
            >
              Request Early Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-background border-2 border-border rounded-lg font-semibold text-lg hover:bg-accent transition-all"
            >
              View Platform Architecture
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: SOCIAL PROOF STRIP
// ============================================
const SocialProofStrip: React.FC = () => {
  const logos = ['TechCorp', 'FinTech Co', 'HealthAI', 'SaaS Pro'];

  return (
    <section className="py-12 px-4 md:px-6 bg-slate-50/50">
      <div className="container mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-foreground/60 mb-8 uppercase tracking-wide"
        >
          Trusted by teams building real AI systems
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center h-16 bg-background border border-border rounded-lg text-foreground/60 font-semibold hover:text-foreground transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: FINAL CTA
// ============================================
const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Ready to deploy real AI agents?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl mb-8 text-white/90"
        >
          Join early teams building production-grade AI systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-white/90 transition-all"
          >
            Request Early Access
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Talk to Founders
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const PrelaunchPageV7: React.FC = () => {
  const pillarTourRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    pillarTourRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection onExploreClick={handleExploreClick} />
      <ValueStrip />
      <div ref={pillarTourRef}>
        <PillarTourSection />
      </div>
      <LockedCapabilitiesGate />
      <SocialProofStrip />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default PrelaunchPageV7;
