import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Aeternity UI inspired high-impact components
 * Spotlight effects, interactive Bento grids, 3D marquee
 */

interface SpotlightProps {
  children: React.ReactNode
  className?: string
}

export const Spotlight: React.FC<SpotlightProps> = ({ children, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleMouseMove)
      return () => card.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
    >
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  span?: 1 | 2 | 3
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  span = 1,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const colSpan = span === 2 ? 'md:col-span-2' : span === 3 ? 'md:col-span-3' : ''

  return (
    <motion.div
      className={`${colSpan} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card className="border-2 h-full hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </motion.div>
  )
}

interface Marquee3DProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
}

export const Marquee3D: React.FC<Marquee3DProps> = ({
  items,
  direction = 'left',
  speed = 50,
}) => {
  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          width: 'max-content',
        }}
      >
        {[...items, ...items].map((item, index) => (
          <motion.div
            key={index}
            className="px-8 py-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20"
            whileHover={{ scale: 1.05, rotateY: 15 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-lg font-semibold text-black">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

