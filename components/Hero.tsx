'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const keywordsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgPatternRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background pattern animation
      if (bgPatternRef.current) {
        gsap.to(bgPatternRef.current, {
          rotate: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
        })
      }

      // Headline animation - animate each line separately
      if (headlineRef.current) {
        const lines = Array.from(headlineRef.current.children) as HTMLElement[]
        
        gsap.fromTo(
          lines,
          { y: 120, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }

      // Subtext animation
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            delay: 0.6,
            ease: 'power3.out',
          }
        )
      }

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { scale: 0, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 1,
            ease: 'back.out(1.8)',
          }
        )
      }

      // Floating keywords animation
      if (keywordsRef.current) {
        const keywords = Array.from(keywordsRef.current.children) as HTMLElement[]
        gsap.fromTo(
          keywords,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 0.4,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            delay: 1.3,
            ease: 'power2.out',
          }
        )

        // Continuous float animation
        keywords.forEach((keyword, i) => {
          gsap.to(keyword, {
            y: -30,
            duration: 3 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.2,
          })
        })
      }

      // Scroll indicator animation
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 1.8,
            ease: 'power2.out',
          }
        )

        gsap.to(scrollIndicatorRef.current, {
          y: 15,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      }

      // Parallax effect on scroll
      if (sectionRef.current && keywordsRef.current) {
        gsap.to(keywordsRef.current, {
          y: -150,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const keywords = [
    'Crispy Chicken',
    'Cheesy Paneer',
    'Nutella',
    'Peri Peri Fries',
  ]

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-wrappy-cream via-wrappy-cream to-wrappy-cream/80 pt-20"
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgPatternRef}
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #ff1e1e 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-64 md:w-80 h-64 md:h-80 bg-wrappy-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 md:w-80 h-64 md:h-80 bg-wrappy-orange/10 rounded-full blur-3xl" />

      {/* Floating Keywords */}
      <div ref={keywordsRef} className="absolute inset-0 pointer-events-none z-0">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="absolute text-wrappy-black/15 text-2xl md:text-3xl lg:text-4xl font-extrabold font-display tracking-wider"
            style={{
              left: `${10 + index * 28}%`,
              top: `${15 + index * 20}%`,
              transform: `rotate(${-5 + index * 3}deg)`,
            }}
          >
            {keyword}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-block mb-4 md:mb-6">
            <div className="bg-wrappy-black/5 backdrop-blur-sm border border-wrappy-black/10 rounded-full px-6 py-2">
              <span className="text-sm font-semibold text-wrappy-black/70 tracking-widest uppercase">
                Fresh • Bold • Premium
              </span>
            </div>
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 md:mb-6 font-display leading-tight tracking-tight text-wrappy-black"
            style={{ perspective: '1000px' }}
          >
            <div className="block">
              <span>Wrap It.</span>{' '}
              <span>Bite It.</span>
            </div>
            <div className="block">Love It.</div>
          </h1>

          <p
            ref={subtextRef}
            className="text-base md:text-lg lg:text-xl text-wrappy-black/60 mb-6 md:mb-8 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Fresh wraps, crispy fries, thick shakes & chill drinks.
            <br />
            <span className="text-wrappy-black/40 text-sm md:text-base">
              Where street food meets bold flavour.
            </span>
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <button className="group relative bg-wrappy-black text-wrappy-cream px-7 md:px-9 py-3 md:py-4 rounded-full text-sm md:text-base font-bold overflow-hidden shadow-2xl hover:shadow-wrappy-red/20 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Order Now
                <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-wrappy-red to-wrappy-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button 
              onClick={() => {
                const menuSection = document.getElementById('wraps')
                if (menuSection) {
                  const offset = 100 // Offset for fixed navigation
                  const elementPosition = menuSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - offset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="group border-2 border-wrappy-black/20 text-wrappy-black px-7 md:px-9 py-3 md:py-4 rounded-full text-sm md:text-base font-bold hover:bg-wrappy-black hover:text-wrappy-cream hover:border-wrappy-black transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-wrappy-cream/50"
            >
              <span className="flex items-center gap-2">
                Explore Menu
                <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-wrappy-black/40 text-xs font-semibold tracking-widest uppercase">
          Scroll
        </span>
        <div className="relative">
          <div className="w-px h-10 bg-gradient-to-b from-wrappy-black/30 to-transparent" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-wrappy-red rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
