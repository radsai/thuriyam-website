import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Zap, Sparkles, Network, Cpu, Bot } from 'lucide-react'

interface AnimatedHeroProps {
  title: string
  subtitle: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  primaryButtonText = "Explore Marketplace",
  primaryButtonLink = "/solutions/marketplace",
  secondaryButtonText = "Discover Studio",
  secondaryButtonLink = "/platform/studio",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Floating icons configuration
  const floatingIcons = [
    { Icon: Brain, delay: 0, duration: 6, x: '10%', y: '20%' },
    { Icon: Zap, delay: 1, duration: 8, x: '85%', y: '15%' },
    { Icon: Sparkles, delay: 2, duration: 7, x: '15%', y: '70%' },
    { Icon: Network, delay: 1.5, duration: 9, x: '80%', y: '65%' },
    { Icon: Cpu, delay: 0.5, duration: 6.5, x: '50%', y: '10%' },
    { Icon: Bot, delay: 2.5, duration: 8.5, x: '45%', y: '75%' },
  ]

  // Geometric shapes configuration
  const shapes = [
    { type: 'circle', size: 60, x: '5%', y: '10%', delay: 0, duration: 10 },
    { type: 'square', size: 40, x: '90%', y: '20%', delay: 2, duration: 12 },
    { type: 'triangle', size: 50, x: '8%', y: '80%', delay: 1, duration: 11 },
    { type: 'circle', size: 35, x: '92%', y: '75%', delay: 3, duration: 9 },
    { type: 'square', size: 45, x: '50%', y: '5%', delay: 1.5, duration: 13 },
    { type: 'triangle', size: 30, x: '3%', y: '50%', delay: 2.5, duration: 10 },
  ]

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </motion.div>

      {/* Floating animated icons */}
      {floatingIcons.map((item, index) => {
        const { Icon, delay, duration, x, y } = item
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-8 h-8 text-primary/40" />
          </motion.div>
        )
      })}

      {/* Animated geometric shapes */}
      {shapes.map((shape, index) => {
        const { type, size, x, y, delay, duration } = shape
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {type === 'circle' && (
              <div
                className="rounded-full border-2 border-primary/20"
                style={{ width: size, height: size }}
              />
            )}
            {type === 'square' && (
              <div
                className="border-2 border-primary/20 rotate-45"
                style={{ width: size, height: size }}
              />
            )}
            {type === 'triangle' && (
              <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                className="text-primary/20"
              >
                <polygon
                  points="50,10 90,90 10,90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </motion.div>
        )
      })}

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Animated connecting lines (network effect) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[
          { x1: '10%', y1: '20%', x2: '50%', y2: '10%', delay: 0 },
          { x1: '85%', y1: '15%', x2: '50%', y2: '10%', delay: 0.5 },
          { x1: '15%', y1: '70%', x2: '10%', y2: '20%', delay: 1 },
          { x1: '80%', y1: '65%', x2: '85%', y2: '15%', delay: 1.5 },
          { x1: '45%', y1: '75%', x2: '15%', y2: '70%', delay: 2 },
          { x1: '45%', y1: '75%', x2: '80%', y2: '65%', delay: 2.5 },
        ].map((line, index) => (
          <motion.line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.4, 0] }}
            transition={{
              duration: 4,
              delay: line.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, index) => {
        const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200
        const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
        const randomDuration = Math.random() * 3 + 2
        const randomDelay = Math.random() * 2

        return (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: randomX,
              y: randomY,
              opacity: 0,
            }}
            animate={{
              y: randomY - 200,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )
      })}

      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title with animated text, glow, and shimmer effects */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 text-black relative"
          variants={itemVariants}
        >
          {/* Shimmer overlay effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
            style={{ pointerEvents: 'none' }}
          />

          {/* Glow effect */}
          <motion.span
            className="absolute inset-0 blur-xl opacity-30"
            animate={{
              textShadow: [
                '0 0 20px rgba(79, 70, 229, 0.5)',
                '0 0 40px rgba(79, 70, 229, 0.8)',
                '0 0 20px rgba(79, 70, 229, 0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ pointerEvents: 'none' }}
          >
            {title}
          </motion.span>

          {/* Animated words */}
          <span className="relative z-10">
            {title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-normal"
          variants={itemVariants}
        >
          {subtitle}
        </motion.h2>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap mb-8"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg">
              <Link to={primaryButtonLink}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" variant="outline">
              <Link to={secondaryButtonLink}>
                {secondaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

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
  )
}

