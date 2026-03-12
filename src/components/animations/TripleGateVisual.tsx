import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database } from 'lucide-react';

interface TripleGateVisualProps {
  className?: string;
}

const TripleGateVisual: React.FC<TripleGateVisualProps> = ({ className = '' }) => {
  const gates = [
    {
      name: 'The Shield',
      subtitle: 'Sanitize the Intent',
      icon: Shield,
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-600',
      position: { x: '15%', y: '50%' }
    },
    {
      name: 'The Checkpoint',
      subtitle: 'Govern the Action',
      icon: Lock,
      color: 'from-purple-600 to-purple-800',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-600',
      position: { x: '50%', y: '50%' }
    },
    {
      name: 'The Vault',
      subtitle: 'Harden the Resource',
      icon: Database,
      color: 'from-green-600 to-green-800',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      position: { x: '85%', y: '50%' }
    }
  ];

  return (
    <div className={`relative w-full h-full ${className} overflow-visible`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 rounded-2xl" />

      {/* Connection lines - Using CSS-based arrows */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {/* Arrow from Shield to Checkpoint */}
        <motion.div
          className="absolute top-1/2 left-[30%] w-[20%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500"
          style={{ transform: 'translateY(-50%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-purple-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </motion.div>

        {/* Arrow from Checkpoint to Vault */}
        <motion.div
          className="absolute top-1/2 left-[55%] w-[20%] h-0.5 bg-gradient-to-r from-purple-500 via-green-500 to-green-500"
          style={{ transform: 'translateY(-50%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-green-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </motion.div>
      </div>

      {/* Gate cards */}
      {gates.map((gate, index) => {
        const Icon = gate.icon;
        return (
          <motion.div
            key={gate.name}
            className="absolute"
            style={{
              left: gate.position.x,
              top: gate.position.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className={`relative w-48 md:w-56 p-6 rounded-xl border-2 ${gate.borderColor} ${gate.bgColor} backdrop-blur-sm`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gate.color} opacity-20 blur-xl`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`${gate.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Text */}
                <h3 className="text-lg font-bold text-white mb-1 text-center">
                  {gate.name}
                </h3>
                <p className="text-sm text-slate-300 text-center">
                  {gate.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Animated particles/security indicators */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Threat indicators being blocked */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: '25%', opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
            <span className="text-xs text-red-300">⚠️ Threat Blocked</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TripleGateVisual;

