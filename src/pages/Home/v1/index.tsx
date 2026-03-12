import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AnimatedHero } from '@/components/animations/AnimatedHero'
import { TestimonialBlock } from '@/components/animations/LandingPageBlocks'
import { Marquee3D } from '@/components/animations/AeternityUI'
import { WaveText } from '@/components/animations/MotionPrimitives'
import { ProductionGapAnimation } from '@/components/animations/ProductionGapAnimation'
import { ProblemSolutionInfographic } from '@/components/animations/ProblemSolutionInfographic'

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Animated with Magic UI style */}
      <AnimatedHero
        title="Thuriyam: The Operating System for Your AI Workforce"
        subtitle="Stop building brittle bots. Start deploying a smart, secure, and scalable AI workforce that achieves your business goals."
        primaryButtonText="Explore Marketplace"
        primaryButtonLink="/solutions/marketplace"
        secondaryButtonText="Discover Studio"
        secondaryButtonLink="/platform/studio"
      />

      {/* Section 2: Problem & Solution Infographic */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
            The Operating System for Your AI Workforce
          </h2>
          <ProblemSolutionInfographic />
        </div>
      </section>

      {/* Section 3: Production Gap Animation (Simplified) */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-6">
            The Journey from Prototype to Production
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Watch how Thuriyam bridges the gap between simple prototypes and production-ready agents.
          </p>
          <ProductionGapAnimation />
        </div>
      </section>

      {/* Section 4: Social Proof */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Animated Marquee */}
          <div className="mb-12">
            <Marquee3D
              items={[
                "Trusted by Industry Leaders",
                "Enterprise-Grade Security",
                "99.9% Uptime",
                "10M+ Conversations",
                "3x Average ROI",
                "24/7 Support",
              ]}
              direction="left"
              speed={30}
            />
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-3xl mx-auto">
            <TestimonialBlock
              quote="Thuriyam transformed our go-to-market. We went from a 6-month IT project to deploying a fully functional Lead Qualification Agent in a single afternoon. Our sales team now focuses only on hot leads, and our conversion rate has doubled. It's a complete game-changer."
              author="CEO"
              company="Customer Company Name"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Final Call-to-Action */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            <WaveText>Ready to Deploy Your AI Workforce?</WaveText>
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you need an instant solution for a common problem or a powerful studio to build your own custom agents, your journey to an AI-first business starts here.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link to="/solutions/marketplace">
                Explore MarketPlace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/platform/studio">
                Discover Studio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

