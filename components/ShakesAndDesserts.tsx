'use client'

import { useRef } from 'react'

export default function ShakesAndDesserts() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="shakes"
      ref={sectionRef}
      className="relative bg-wrappy-black text-wrappy-cream py-32 overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-wrappy-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wrappy-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-wrappy-red/3 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content removed */}
      </div>
    </section>
  )
}
