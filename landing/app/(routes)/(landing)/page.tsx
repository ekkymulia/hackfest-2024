import CalltoAction from '@/components/pages/CalltoAction'
import FeatureSection from '@/components/pages/FeatureSection'
import HeroSection from '@/components/pages/HeroSection'
import PricelistSection from '@/components/pages/PricelistSection'
import React from 'react'

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <PricelistSection />
      <CalltoAction />
    </main>
  )
}

export default LandingPage