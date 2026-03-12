import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Shield, BarChart3, Zap, MessageSquare, TrendingUp, Play, Pause, Phone, Headphones, FileText, Users } from 'lucide-react'

interface HeroVideoProps {
  className?: string
  autoPlay?: boolean
}

/**
 * Animated Hero Video Component
 * Visualizes the "Operating System for Your AI Workforce" narrative
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ className = '', autoPlay = true }) => {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)

  const scenes = [
    { id: 'gap', duration: 3000, label: 'Central Hub' },
    { id: 'hub', duration: 4000, label: 'Central Hub' },
    { id: 'pillars', duration: 5000, label: 'Three Pillars' },
    { id: 'developer', duration: 3000, label: 'Developer View' },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100
        if (newProgress >= totalDuration) {
          setCurrentScene(0)
          return 0
        }

        // Determine current scene based on progress
        let accumulated = 0
        for (let i = 0; i < scenes.length; i++) {
          accumulated += scenes[i].duration
          if (newProgress < accumulated) {
            if (i !== currentScene) {
              setCurrentScene(i)
            }
            break
          }
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, currentScene])

  const togglePlay = () => setIsPlaying(!isPlaying)

  return (
    <div className={`relative w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-lg overflow-hidden ${className}`} style={{ aspectRatio: '16/10', minHeight: '400px', maxHeight: '600px' }}>
      {/* Colorful Animated Background Blobs */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </motion.div>

      {/* Video Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="videoPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: '#6366f1' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#videoPattern)" />
        </svg>
      </div>

      {/* Colorful Light Rays Background Effect */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.6), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.6), transparent 70%)',
          }}
        />
      </div>

      {/* Scene 1: Production Gap */}
      <AnimatePresence mode="wait">
        {currentScene === 0 && (
          <ProductionGapScene key="gap" />
        )}
      </AnimatePresence>

      {/* Scene 2: Central Brain Hub */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <CentralHubScene key="hub" />
        )}
      </AnimatePresence>

      {/* Scene 3: Three Pillars */}
      <AnimatePresence mode="wait">
        {currentScene === 2 && (
          <ThreePillarsScene key="pillars" />
        )}
      </AnimatePresence>

      {/* Scene 4: Developer View */}
      <AnimatePresence mode="wait">
        {currentScene === 3 && (
          <DeveloperScene key="developer" />
        )}
      </AnimatePresence>

      {/* Video Controls - Colorful */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div
          className="backdrop-blur-md rounded-lg p-3 flex items-center gap-3 border-2 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.4) 50%, rgba(99, 102, 241, 0.4) 100%)',
            borderColor: '#8b5cf6',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <motion.button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderColor: '#ffffff',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 30px rgba(139, 92, 246, 1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
            )}
          </motion.button>
          <div
            className="flex-1 h-3 rounded-full overflow-hidden border-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${(progress / scenes.reduce((sum, s) => sum + s.duration, 0)) * 100}%`,
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 30%, #a855f7 60%, #6366f1 100%)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                  '0 0 30px rgba(139, 92, 246, 1), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <div
            className="text-xs font-bold px-3 py-1 rounded-full border-2"
            style={{
              color: '#ffffff',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%)',
              borderColor: '#ffffff',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)',
            }}
          >
            {scenes[currentScene]?.label}
          </div>
        </div>
      </div>

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
    </div>
  )
}

// Scene 1: Central Hub Orchestrating Business Tasks
const ProductionGapScene: React.FC = () => {
  const businessTasks = [
    { icon: Phone, label: 'Sales Calls', angle: 0, color: '#3b82f6', bgColor: '#3b82f620', glowColor: '#3b82f6' },
    { icon: Headphones, label: 'Support Chats', angle: 60, color: '#8b5cf6', bgColor: '#8b5cf620', glowColor: '#8b5cf6' },
    { icon: BarChart3, label: 'Data Analysis', angle: 120, color: '#6366f1', bgColor: '#6366f120', glowColor: '#6366f1' },
    { icon: MessageSquare, label: 'Customer Outreach', angle: 180, color: '#a855f7', bgColor: '#a855f720', glowColor: '#a855f7' },
    { icon: FileText, label: 'Document Processing', angle: 240, color: '#3b82f6', bgColor: '#3b82f620', glowColor: '#3b82f6' },
    { icon: Users, label: 'Team Coordination', angle: 300, color: '#8b5cf6', bgColor: '#8b5cf620', glowColor: '#8b5cf6' },
  ]

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Central Brain Hub */}
      <div className="relative w-40 h-40">
        {/* Central Hub - Colorful Gradient Circle with Glow */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center z-10 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)',
            boxShadow: '0 0 60px rgba(99, 102, 241, 0.6), 0 0 100px rgba(139, 92, 246, 0.4)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              '0 0 60px rgba(99, 102, 241, 0.6), 0 0 100px rgba(139, 92, 246, 0.4)',
              '0 0 80px rgba(99, 102, 241, 0.8), 0 0 120px rgba(139, 92, 246, 0.6)',
              '0 0 60px rgba(99, 102, 241, 0.6), 0 0 100px rgba(139, 92, 246, 0.4)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Rotating Container for Orbiting Tasks */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {businessTasks.map((task, index) => {
            const radius = 90
            const angle = (task.angle * Math.PI) / 180
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  x: x - 30,
                  y: y - 20,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-14 h-14 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 shadow-lg"
                    style={{
                      borderColor: task.color,
                      backgroundColor: task.bgColor,
                      boxShadow: `0 0 20px ${task.glowColor}60, 0 4px 12px rgba(0, 0, 0, 0.3)`,
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        `0 0 20px ${task.glowColor}60, 0 4px 12px rgba(0, 0, 0, 0.3)`,
                        `0 0 30px ${task.glowColor}80, 0 6px 16px rgba(0, 0, 0, 0.4)`,
                        `0 0 20px ${task.glowColor}60, 0 4px 12px rgba(0, 0, 0, 0.3)`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    <task.icon className="w-7 h-7" style={{ color: task.color, filter: `drop-shadow(0 0 8px ${task.glowColor})` }} />
                  </motion.div>
                  <p className="text-xs text-white font-semibold mt-2 whitespace-nowrap drop-shadow-lg" style={{ fontSize: '0.7rem', textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    {task.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Colorful Connecting Lines with Gradient */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          {businessTasks.map((task, index) => (
            <linearGradient key={`gradient-${index}`} id={`lineGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={task.color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={task.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={task.color} stopOpacity="0.3" />
            </linearGradient>
          ))}
        </defs>
        {businessTasks.map((task, index) => {
          const radius = 90
          const angle = (task.angle * Math.PI) / 180
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.line
              key={`line-${index}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={`url(#lineGradient-${index})`}
              strokeWidth="2.5"
              strokeDasharray="6,4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.15,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
              style={{
                filter: `drop-shadow(0 0 4px ${task.glowColor})`,
              }}
            />
          )
        })}
      </svg>

      {/* Title Overlay */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-base font-bold text-white mb-0.5">Thuriyam: The Central Hub</h3>
        <p className="text-xs text-white/70">Orchestrating Your Business Tasks</p>
      </motion.div>
    </motion.div>
  )
}

// Scene 2: Central Brain Hub with Orbiting Tasks
const CentralHubScene: React.FC = () => {
  const orbitingTasks = [
    { icon: MessageSquare, label: 'Support', angle: 0, color: '#3b82f6', glowColor: '#3b82f6' },
    { icon: TrendingUp, label: 'Sales', angle: 60, color: '#8b5cf6', glowColor: '#8b5cf6' },
    { icon: BarChart3, label: 'Analytics', angle: 120, color: '#6366f1', glowColor: '#6366f1' },
    { icon: Shield, label: 'Security', angle: 180, color: '#a855f7', glowColor: '#a855f7' },
    { icon: Zap, label: 'Automation', angle: 240, color: '#3b82f6', glowColor: '#3b82f6' },
    { icon: Brain, label: 'AI Agents', angle: 300, color: '#8b5cf6', glowColor: '#8b5cf6' },
  ]

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Central Brain Hub */}
      <div className="relative w-36 h-36">
        {/* Central Brain with Colorful Gradient */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)',
            boxShadow: '0 0 60px rgba(99, 102, 241, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            boxShadow: [
              '0 0 60px rgba(99, 102, 241, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)',
              '0 0 80px rgba(99, 102, 241, 0.9), 0 0 120px rgba(139, 92, 246, 0.7)',
              '0 0 60px rgba(99, 102, 241, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Brain className="w-18 h-18 text-white" style={{ width: '4.5rem', height: '4.5rem', filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))' }} />
          </motion.div>
        </motion.div>

        {/* Rotating Container for Orbiting Tasks */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {orbitingTasks.map((task, index) => {
            const radius = 75
            const angle = (task.angle * Math.PI) / 180
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={index}
                className="absolute w-6 h-6"
                style={{
                  left: '50%',
                  top: '50%',
                  x: x - 12,
                  y: y - 12,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 shadow-lg"
                  style={{
                    backgroundColor: `${task.color}30`,
                    borderColor: task.color,
                    boxShadow: `0 0 20px ${task.glowColor}60, 0 4px 8px rgba(0, 0, 0, 0.3)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 20px ${task.glowColor}60, 0 4px 8px rgba(0, 0, 0, 0.3)`,
                      `0 0 30px ${task.glowColor}80, 0 6px 12px rgba(0, 0, 0, 0.4)`,
                      `0 0 20px ${task.glowColor}60, 0 4px 8px rgba(0, 0, 0, 0.3)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <task.icon className="w-5 h-5" style={{ color: task.color, filter: `drop-shadow(0 0 6px ${task.glowColor})` }} />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Title Overlay */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-base font-bold text-white mb-0.5">Thuriyam: The Central Hub</h3>
        <p className="text-xs text-white/70">Orchestrating Your AI Workforce</p>
      </motion.div>
    </motion.div>
  )
}

// Scene 3: Three Pillars (Build, Run, Measure)
const ThreePillarsScene: React.FC = () => {
  const pillars = [
    {
      title: 'Build',
      subtitle: 'The Studio',
      icon: Brain,
      bgColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
      iconColor: '#3b82f6',
      glowColor: '#3b82f6',
      cardBg: 'rgba(59, 130, 246, 0.4)',
      demo: 'User types: "I need an agent to handle returns"',
    },
    {
      title: 'Run',
      subtitle: 'AI Gateway',
      icon: Shield,
      bgColor: 'rgba(139, 92, 246, 0.2)',
      borderColor: '#8b5cf6',
      iconColor: '#8b5cf6',
      glowColor: '#8b5cf6',
      cardBg: 'rgba(139, 92, 246, 0.4)',
      demo: 'Data flows through Guardrails → Models',
    },
    {
      title: 'Measure',
      subtitle: 'IQA',
      icon: BarChart3,
      bgColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366f1',
      iconColor: '#6366f1',
      glowColor: '#6366f1',
      cardBg: 'rgba(99, 102, 241, 0.4)',
      demo: 'Sentiment: 95% Positive | Compliance: ✓',
    },
  ]

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-3 w-full max-w-3xl">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <motion.div
              key={pillar.title}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
            >
              {/* Colorful Spotlight Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg blur-2xl"
                style={{
                  background: `radial-gradient(circle at center, ${pillar.glowColor}80, ${pillar.glowColor}40 50%, transparent 80%)`,
                  zIndex: -1,
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />

              <div
                className="relative border-3 rounded-lg p-4 h-full shadow-2xl"
                style={{
                  borderColor: pillar.borderColor,
                  borderWidth: '4px',
                  background: `linear-gradient(135deg, ${pillar.cardBg} 0%, ${pillar.glowColor}50 50%, ${pillar.cardBg} 100%)`,
                  boxShadow: `0 0 60px ${pillar.glowColor}90, 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 40px ${pillar.glowColor}30`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3 border-3 shadow-2xl"
                  style={{
                    backgroundColor: `${pillar.glowColor}50`,
                    borderColor: pillar.borderColor,
                    borderWidth: '3px',
                    boxShadow: `0 0 40px ${pillar.glowColor}100, 0 4px 16px rgba(0, 0, 0, 0.5)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 40px ${pillar.glowColor}100, 0 4px 16px rgba(0, 0, 0, 0.5)`,
                      `0 0 60px ${pillar.glowColor}120, 0 6px 24px rgba(0, 0, 0, 0.6)`,
                      `0 0 40px ${pillar.glowColor}100, 0 4px 16px rgba(0, 0, 0, 0.5)`,
                    ],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: pillar.iconColor, filter: `drop-shadow(0 0 15px ${pillar.glowColor})` }}
                  />
                </motion.div>
                <h4
                  className="text-base font-bold mb-1 drop-shadow-2xl"
                  style={{
                    color: pillar.iconColor,
                    textShadow: `0 0 15px ${pillar.glowColor}, 0 2px 8px rgba(0, 0, 0, 0.8)`,
                    fontSize: '1rem',
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  className="text-xs mb-2 font-semibold"
                  style={{ color: `${pillar.glowColor}dd` }}
                >
                  {pillar.subtitle}
                </p>
                <div
                  className="rounded-lg p-2 text-xs font-mono leading-tight border-2"
                  style={{
                    backgroundColor: `${pillar.glowColor}30`,
                    borderColor: `${pillar.glowColor}60`,
                    color: '#ffffff',
                    boxShadow: `inset 0 0 10px ${pillar.glowColor}20`,
                  }}
                >
                  {pillar.demo}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Scene 4: Developer Terminal View
const DeveloperScene: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([])

  useEffect(() => {
    const lines = [
      '$ curl -X POST https://api.thuriyam.ai/v1/agents',
      '{',
      '  "goal": "Handle customer returns",',
      '  "model": "auto-select",',
      '  "guardrails": true',
      '}',
      '',
      '→ Routing to: OpenAI GPT-4',
      '→ Latency: 245ms',
      '→ Status: ✓ Active',
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < lines.length) {
        setCodeLines((prev) => [...prev, lines[currentIndex]])
        currentIndex++
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-3xl bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <div className="w-3 h-3 rounded-full bg-gray-600" />
          </div>
          <span className="text-xs text-gray-400 ml-4">Terminal</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              className="mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={line.startsWith('$') ? 'text-gray-400' : line.startsWith('→') ? 'text-gray-400' : line.startsWith('✓') ? 'text-white' : 'text-gray-300'}>
                {line || '\u00A0'}
              </span>
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-4 bg-white ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  )
}

