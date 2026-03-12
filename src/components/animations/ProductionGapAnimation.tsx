import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Building2, Shield, TrendingUp, Eye, Settings } from 'lucide-react'

interface ProductionGapAnimationProps {
  className?: string
}

/**
 * Animated journey from prototype to production
 * Continuous animation from bulb to production-ready agent icon
 */
export const ProductionGapAnimation: React.FC<ProductionGapAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Key milestones along the journey - evenly spaced with more room to prevent overlapping
  const milestones = [
    { label: 'Security', icon: Shield, position: 8, delay: 0.24 }, // 8% position
    { label: 'Scalability', icon: TrendingUp, position: 28, delay: 0.84 }, // 28% position
    { label: 'Observability', icon: Eye, position: 48, delay: 1.44 }, // 48% position
    { label: 'Governance', icon: Settings, position: 68, delay: 2.04 }, // 68% position
  ]

  return (
    <div ref={containerRef} className={`flex items-center justify-center gap-8 my-12 relative ${className}`}>
      {/* Simple Prototype - Left Side */}
      <div className="text-center flex-1">
        <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="h-10 w-10 text-gray-800" />
        </div>
        <h3 className="font-semibold text-black mb-2">
          Simple Prototype
        </h3>
      </div>

      {/* Animated Journey Line - Middle */}
      <div className="flex-1 relative min-w-0">
        {/* Background gradient line */}
        <div className="h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-full relative overflow-hidden">
          {/* Animated progress fill - always one way */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-full"
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.5,
            }}
          />

          {/* Animated moving dot - always one way */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            animate={{
              left: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.5,
            }}
          >
            <motion.div
              className="w-6 h-6 bg-black rounded-full shadow-lg flex items-center justify-center"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 0 0 rgba(30, 41, 59, 0.4)',
                  '0 0 0 8px rgba(30, 41, 59, 0)',
                  '0 0 0 0 rgba(30, 41, 59, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Milestone icons that appear as animation progresses */}
        <div className="relative mt-4" style={{ minHeight: '95px', width: '100%' }}>
          {milestones.map((milestone, index) => {
            const { icon: Icon, label, position, delay } = milestone
            const totalDuration = 3.5 // 3s animation + 0.5s repeat delay
            const appearTime = delay / totalDuration
            const disappearTime = 0.97 // Start fading near end before reset
            
            return (
              <motion.div
                key={label}
                className="absolute top-0"
                style={{
                  left: `${position}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 10 + index,
                  width: '80px',
                }}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.5, 0.5, 1, 1, 0.5],
                  y: [10, 10, 0, 0, 10],
                }}
                transition={{
                  duration: totalDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, appearTime, appearTime + 0.1, disappearTime, 1],
                }}
              >
                <div className="flex flex-col items-center gap-1.5 w-full px-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-400 flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-800" />
                  </div>
                  <span 
                    className="text-[10px] font-semibold text-gray-800 text-center leading-tight block w-full"
                    style={{ 
                      fontSize: '0.625rem',
                      lineHeight: '1.4',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Production-Ready Agent - Right Side */}
      <div className="text-center flex-1">
        <div className="bg-gray-300 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Building2 className="h-10 w-10 text-gray-800" />
        </div>
        <h3 className="font-semibold text-black mb-2">
          Production-Ready Agent
        </h3>
      </div>
    </div>
  )
}

