'use client'

import { useEffect, useState } from 'react'
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

  // lock scroll while the intro plays
  useEffect(() => {
    document.body.style.overflow = loaderComplete ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [loaderComplete])

  return (
    <main className="relative">
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      {/*
        Content is ALWAYS rendered so it exists in the server-side HTML for
        search engines. The `key` swap replays the entrance animations once
        the intro loader finishes.
      */}
      <div key={loaderComplete ? 'ready' : 'intro'}>
        <Navigation />
        <Hero />
        <SignatureWraps />
        <FryzShowcase />
        <WrapVariants />
        <BrandStory />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}
