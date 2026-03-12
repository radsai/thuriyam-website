import React from 'react'
import { motion } from 'framer-motion'

/**
 * Motion Primitives inspired subtle text effects
 * Shimmer and Wave effects for landing pages
 */

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </span>
  )
}

interface WaveTextProps {
  children: string
  className?: string
}

export const WaveText: React.FC<WaveTextProps> = ({ children, className = '' }) => {
  const letters = children.split('')
  
  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            delay: index * 0.05,
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

interface GlowTextProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  className = '',
  glowColor = '#4f46e5',
}) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          `0 0 10px ${glowColor}`,
          `0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
          `0 0 10px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  )
}

