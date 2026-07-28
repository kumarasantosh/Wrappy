'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SignatureWraps from '@/components/SignatureWraps'
import FryzShowcase from '@/components/FryzShowcase'
import WrapVariants from '@/components/WrapVariants'

import BrandStory from '@/components/BrandStory'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function HomeClient() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  return (
    <main className="relative">
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}
      {loaderComplete && (
        <>
          <Navigation />
          <Hero />
          <SignatureWraps />
          <FryzShowcase />
          <WrapVariants />
          <BrandStory />
          <FinalCTA />
          <Footer />
        </>
      )}
    </main>
  )
}

