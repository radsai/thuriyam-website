import React from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText, Code, Lock, AlertTriangle, CheckCircle2, Brain, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Problem-Solution Infographic Component
 * Visualizes "The Operating System for Your AI Workforce"
 * Split layout: Problem (left) | Solution Flywheel (right)
 */
export const ProblemSolutionInfographic: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE: THE PROBLEM */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                The Problem: The AI Production Gap
              </h3>
            </motion.div>

            {/* 80% Failure Statistic */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card className="border-2 border-orange-200 bg-orange-50/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Broken Pie Chart Visual */}
                    <motion.div
                      className="relative w-20 h-20 flex-shrink-0"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Large orange slice (80%) */}
                        <motion.path
                          d="M 50 50 L 50 0 A 50 50 0 1 1 10 50 Z"
                          fill="#f97316"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        {/* Small teal slice (20%) */}
                        <motion.path
                          d="M 50 50 L 10 50 A 50 50 0 0 1 50 0 Z"
                          fill="#14b8a6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                        {/* Cracks in the pie */}
                        <motion.path
                          d="M 50 50 L 30 20 M 50 50 L 20 40"
                          stroke="#dc2626"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                        />
                      </svg>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <p className="text-lg font-bold text-black mb-1">
                        80% of AI Projects Fail to Leave the Lab
                      </p>
                      <p className="text-sm text-gray-700">
                        They get stuck wrestling with security, scalability, and observability challenges.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sub-problems */}
            <div className="space-y-4">
              {/* Fragmented Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex gap-1.5 flex-shrink-0">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-12 h-9 bg-gray-800 rounded border border-orange-400/50 relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            >
                              <Code className="w-3 h-3 text-orange-400 absolute top-0.5 left-0.5" />
                            </motion.div>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            >
                              <Lock className="w-2.5 h-2.5 text-red-400 absolute top-0.5 right-0.5" />
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        <h4 className="font-bold text-black mb-1 text-sm">Fragmented Security</h4>
                        <p className="text-xs text-gray-700">
                          Creates massive technical debt. Teams write inconsistent, custom code for PII detection and compliance.
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Lack of Centralized Governance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="w-10 h-10 bg-gray-100 rounded border-2 border-dashed border-orange-300 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.8 + i * 0.1,
                              type: "spring",
                              stiffness: 200,
                              damping: 15
                            }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                          >
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            >
                              <FileText className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          </motion.div>
                        ))}
                        <motion.div
                          className="w-10 h-10 bg-red-100 rounded border-2 border-red-400 flex items-center justify-center relative"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 1.2,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.15 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Shield className="w-4 h-4 text-red-600" />
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <AlertTriangle className="w-2.5 h-2.5 text-red-600 absolute -top-0.5 -right-0.5" />
                          </motion.div>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                      >
                        <h4 className="font-bold text-black mb-1 text-sm">Lack of Centralized Governance</h4>
                        <p className="text-xs text-gray-700">
                          Policies are scattered across codebases, making updates and audits nearly impossible.
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: THE SOLUTION - FLYWHEEL */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                The Solution: The Thuriyam Flywheel
              </h3>
            </div>

            {/* Animated Flywheel */}
            <div className="relative w-full" style={{ minHeight: '500px' }}>
              {/* SVG Container for connecting lines and animated ball - positioned behind cards */}
              <svg
                viewBox="0 0 800 500"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="flywheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connecting paths between cards - counter-clockwise loop */}
                {/* Path from Build (top center ~400, 80) to Measure (bottom left ~200, 420) */}
                <motion.path
                  d="M 400 80 Q 300 250 200 420"
                  stroke="url(#flywheelGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="6,4"
                  opacity="0.5"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: 1 }}
                />

                {/* Path from Measure (bottom left ~200, 420) to Run & Secure (bottom right ~600, 420) */}
                <motion.path
                  d="M 200 420 Q 400 420 600 420"
                  stroke="url(#flywheelGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="6,4"
                  opacity="0.5"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: 1 }}
                />

                {/* Path from Run & Secure (bottom right ~600, 420) back to Build (top center ~400, 80) */}
                <motion.path
                  d="M 600 420 Q 500 250 400 80"
                  stroke="url(#flywheelGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="6,4"
                  opacity="0.5"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: 1 }}
                />

                {/* Animated ball following the path between cards */}
                <motion.circle
                  r="8"
                  fill="#4f46e5"
                  filter="url(#glow)"
                  animate={{
                    cx: [400, 200, 600, 400],
                    cy: [80, 420, 420, 80],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </svg>

              {/* Cards positioned in a compact triangle layout - aligned with left side */}
              <div className="relative flex flex-col gap-6">
                {/* BUILD: THE STUDIO - Top */}
                <div className="flex justify-center">
                  <FlywheelCard
                    title="Build"
                    subtitle="The Studio"
                    icon={Brain}
                    color="blue"
                    description="A no-code builder where you define an agent's mission in plain English."
                    demo="It could be to design what you build an agent's mission in plain English."
                  />
                </div>

                {/* Bottom row: Run & Secure (right) and Measure & Improve (left) */}
                <div className="flex justify-between items-center gap-8">
                  {/* MEASURE & IMPROVE: IQA - Left */}
                  <div className="flex-1 flex justify-center">
                    <FlywheelCard
                      title="Measure & Improve"
                      subtitle="Interaction Quality Analytics (IQA)"
                      icon={BarChart3}
                      color="purple"
                      description="Analyzes 100% of conversations to provide insights that make your workforce smarter."
                      isDashboard={true}
                    />
                  </div>

                  {/* RUN & SECURE: THE AI GATEWAY - Right */}
                  <div className="flex-1 flex justify-center">
                    <FlywheelCard
                      title="Run & Secure"
                      subtitle="The AI Gateway"
                      icon={Shield}
                      color="green"
                      description="Deploys agents with built-in resilience, cost controls, and enterprise-grade security."
                      isGateway={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  )
}

interface FlywheelCardProps {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'purple'
  description: string
  demo?: string
  isGateway?: boolean
  isDashboard?: boolean
}

const FlywheelCard: React.FC<FlywheelCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  color,
  description,
  demo,
  isGateway = false,
  isDashboard = false,
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: 'text-blue-600',
      text: 'text-blue-700',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      icon: 'text-green-600',
      text: 'text-green-700',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      icon: 'text-purple-600',
      text: 'text-purple-700',
    },
  }

  const colors = colorClasses[color]

  return (
    <Card className={`border-2 ${colors.border} ${colors.bg} w-56 shadow-lg`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center border-2 ${colors.border}`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <div>
            <h4 className={`font-bold ${colors.text} text-xs`}>{title}</h4>
            <p className="text-xs text-gray-600 leading-tight">{subtitle}</p>
          </div>
        </div>

        {isGateway && (
          <div className="mb-2 flex justify-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,10 90,50 50,90 10,50"
                  fill="none"
                  stroke={colors.icon}
                  strokeWidth="2.5"
                />
                <circle cx="50" cy="50" r="12" fill={colors.icon} opacity="0.3" />
                <Shield className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: colors.icon }} />
                <CheckCircle2 className="w-3 h-3 absolute top-1.5 right-1.5" style={{ color: colors.icon }} />
              </svg>
            </div>
          </div>
        )}

        {isDashboard && (
          <div className="mb-2 bg-white rounded p-1.5 border border-gray-200">
            <div className="text-xs font-semibold text-gray-700 mb-1">Analytics</div>
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Score:</span>
                <span className="font-bold text-black">72.06%</span>
              </div>
              <div className="flex gap-1.5">
                <div className="flex-1 h-6 bg-blue-200 rounded" />
                <div className="flex-1 h-6 bg-green-200 rounded" />
                <div className="flex-1 h-6 bg-purple-200 rounded" />
              </div>
              <div className="text-xs text-gray-600">400 conversations • 3.46 avg</div>
            </div>
          </div>
        )}

        {demo && (
          <div className="mb-2 bg-gray-900 rounded p-1.5 text-xs text-green-400 font-mono">
            {demo}
          </div>
        )}

        <p className="text-xs text-gray-700 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

