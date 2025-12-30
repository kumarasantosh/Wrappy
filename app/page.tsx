'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SignatureWraps from '@/components/SignatureWraps'
import FriesAndSides from '@/components/FriesAndSides'
import ShakesAndDesserts from '@/components/ShakesAndDesserts'
import BrandStory from '@/components/BrandStory'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  return (
    <main className="relative">
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}
      {loaderComplete && (
        <>
          <Navigation />
          <Hero />
          <SignatureWraps />
          <FriesAndSides />
        <ShakesAndDesserts />
        <BrandStory />
          <FinalCTA />
          <Footer />
        </>
      )}
    </main>
  )
}
