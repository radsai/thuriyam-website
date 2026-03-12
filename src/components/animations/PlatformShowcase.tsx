import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, Settings, BarChart3, CheckCircle2,
  Activity
} from 'lucide-react'

interface PlatformShowcaseProps {
  className?: string
}

/**
 * Animated platform showcase showing three overlapping windows
 * Similar to Lyzr.ai's "self-serve platform" section
 */
export const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({ className = '' }) => {
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const panels = [
    {
      id: 'studio',
      title: 'For Developers',
      subtitle: 'Code-Level Control & Flexibility',
      icon: Code,
      color: 'from-blue-500/20 to-purple-500/20',
      borderColor: 'border-blue-500/30',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Code className="w-3 h-3" />
            <span>studio/agent-config.yaml</span>
          </div>
          <div className="bg-gray-900 rounded p-3 font-mono text-xs text-green-400">
            <div className="mb-1">goal: "Handle customer returns"</div>
            <div className="mb-1">model: "auto-select"</div>
            <div className="mb-1">guardrails: true</div>
            <div className="text-gray-500">→ Status: ✓ Active</div>
          </div>
        </div>
      ),
    },
    {
      id: 'gateway',
      title: 'For Business Users',
      subtitle: 'Agentic Workflows & Studio Empowerment',
      icon: Settings,
      color: 'from-green-500/20 to-blue-500/20',
      borderColor: 'border-green-500/30',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">AI Gateway</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Requests/sec</span>
              <span className="font-medium">245</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Latency</span>
              <span className="font-medium">156ms</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Security</span>
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'iqa',
      title: 'For CXOs/CIOs',
      subtitle: 'Observability, Traceability & Governance',
      icon: BarChart3,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">IQA Analytics</span>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Coverage</span>
              <span className="text-sm font-bold">100%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Quality Score</span>
              <span className="font-medium">98.5</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={`relative w-full ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-3xl -z-10" />
      
      {/* Main container */}
      <div className="relative p-8 md:p-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#1e293b' }}
          >
            Thuriyam is a self-serve platform built for every enterprise role
          </motion.h2>
        </div>

        {/* Three overlapping panels */}
        <div className="relative max-w-6xl mx-auto" style={{ height: '500px' }}>
          {panels.map((panel, index) => {
            const Icon = panel.icon
            const isActive = activePanel === index
            const zIndex = isActive ? 30 : 20 - index * 5
            const scale = isActive ? 1 : 0.95 - index * 0.05
            const yOffset = index * 40
            const xOffset = (index - 1) * 60

            return (
              <motion.div
                key={panel.id}
                className="absolute inset-0"
                style={{
                  zIndex,
                }}
                animate={{
                  scale: isActive ? 1 : scale,
                  y: isActive ? 0 : yOffset,
                  x: isActive ? 0 : xOffset,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
                onClick={() => setActivePanel(index)}
                onHoverStart={() => setActivePanel(index)}
              >
                <motion.div
                  className={`relative bg-white rounded-2xl shadow-2xl border-2 ${panel.borderColor} overflow-hidden h-full`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Window header */}
                  <div className={`bg-gradient-to-r ${panel.color} border-b ${panel.borderColor} p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-primary`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm" style={{ color: '#1e293b' }}>
                            {panel.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{panel.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                  </div>

                  {/* Window content */}
                  <div className="p-6 h-full overflow-auto">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={panel.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {panel.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex gap-1">
                        {panels.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === activePanel ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Panel indicators (below) */}
        <div className="flex justify-center gap-4 mt-8">
          {panels.map((panel, index) => {
            const Icon = panel.icon
            return (
              <motion.button
                key={panel.id}
                onClick={() => setActivePanel(index)}
                className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activePanel === index
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{panel.title}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

