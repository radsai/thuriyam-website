import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Tall Arc inspired landing page blocks
 */

interface FeatureBlockProps {
  icon: React.ReactNode
  title: string
  description: string
  link?: string
  linkText?: string
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  icon,
  title,
  description,
  link = "/components",
  linkText = "Learn more",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="border-2 hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader>
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-black text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to={link}
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center group"
          >
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface TestimonialBlockProps {
  quote: string
  author: string
  role?: string
  company?: string
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  quote,
  author,
  role,
  company,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary/20 bg-secondary">
        <CardContent className="pt-6">
          <motion.p
            className="text-lg text-gray-800 italic mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            "{quote}"
          </motion.p>
          <div>
            <p className="text-sm font-semibold text-black">{author}</p>
            {(role || company) && (
              <p className="text-xs text-gray-600 mt-1">
                {role && `${role}`}
                {role && company && ' at '}
                {company && `${company}`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface PricingBlockProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  ctaText: string
  ctaLink?: string
  highlighted?: boolean
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  title,
  price,
  period = "per month",
  description,
  features,
  ctaText,
  ctaLink = "/pricing",
  highlighted = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className={`border-2 h-full ${highlighted ? 'border-primary shadow-lg' : ''}`}>
        <CardHeader>
          <CardTitle className="text-black text-xl mb-2">{title}</CardTitle>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-black">{price}</span>
            <span className="text-gray-600">{period}</span>
          </div>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-primary">✓</span>
                {feature}
              </motion.li>
            ))}
          </ul>
          <Button asChild className="w-full" variant={highlighted ? "default" : "outline"}>
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

