/**
 * Security Builder Demo - Interactive Video Component
 * Shows security capabilities built into agents during the Builder step
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Database, CheckCircle, User, Key, FileLock, AlertTriangle, Play, Pause } from 'lucide-react';

interface SecurityFeature {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  description: string;
  example: string;
  color: string;
  bgColor: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    id: 'authn',
    name: 'Authentication',
    shortName: 'AuthN',
    icon: User,
    description: 'Robust authentication mechanisms',
    example: 'Every user and API call is verified before access',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'authz',
    name: 'Authorization',
    shortName: 'AuthZ',
    icon: Key,
    description: 'Fine-grained authorization controls',
    example: 'Users only see and access what they\'re allowed to',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'data',
    name: 'Data Access',
    shortName: 'Data Access',
    icon: Database,
    description: 'Secure data handling and access policies',
    example: 'Data is encrypted and access is logged and controlled',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'guardrails',
    name: 'Guardrails',
    shortName: 'Guardrails',
    icon: Shield,
    description: 'Built-in safety and compliance checks',
    example: 'Automatic checks prevent unsafe or non-compliant actions',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export const SecurityBuilderDemo: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 3000); // 3 seconds per feature

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const current = securityFeatures[currentFeature];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Video-like container */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            {isPaused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700 z-10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ 
              width: isPaused ? '100%' : `${((currentFeature + 1) / securityFeatures.length) * 100}%` 
            }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </div>

        {/* Main content area */}
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className={`inline-flex p-6 rounded-full ${current.bgColor} mb-6`}
              >
                <Icon className={`w-16 h-16 ${current.color}`} />
              </motion.div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {current.name}
              </h3>

              {/* Short name badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">{current.shortName}</span>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/80 mb-6 max-w-2xl mx-auto">
                {current.description}
              </p>

              {/* Example */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 max-w-xl mx-auto"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/90 text-left">{current.example}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {securityFeatures.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => {
                setCurrentFeature(index);
                setIsPaused(true);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentFeature
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Feature list below */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {securityFeatures.map((feature, index) => {
          const FeatureIcon = feature.icon;
          const isActive = index === currentFeature;
          return (
            <motion.button
              key={feature.id}
              onClick={() => {
                setCurrentFeature(index);
                setIsPaused(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? `${feature.bgColor} border-${feature.color.split('-')[1]}-600 shadow-lg`
                  : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              <FeatureIcon className={`w-6 h-6 mb-2 ${isActive ? feature.color : 'text-foreground/60'}`} />
              <div className={`text-sm font-semibold mb-1 ${isActive ? feature.color : 'text-foreground'}`}>
                {feature.shortName}
              </div>
              <div className="text-xs text-foreground/60 line-clamp-2">
                {feature.description}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Simple explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-foreground/60">
          All security features are <span className="font-semibold text-foreground">automatically built in</span> when you create an agent
        </p>
      </motion.div>
    </div>
  );
};
