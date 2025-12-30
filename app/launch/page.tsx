'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'

gsap.registerPlugin(ScrollTrigger)

export default function LaunchPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const logoRef1 = useRef<HTMLImageElement>(null)
  const logoRef2 = useRef<HTMLImageElement>(null)
  const logoRef3 = useRef<HTMLImageElement>(null)
  const confettiRef = useRef<HTMLCanvasElement>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Confetti effect on load
    if (confettiRef.current && showConfetti) {
      const canvas = confettiRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const confetti: Array<{
        x: number
        y: number
        r: number
        d: number
        color: string
        tilt: number
        tiltAngleIncrement: number
        tiltAngle: number
      }> = []

      const colors = ['#ff1e1e', '#ff6b35', '#d4ff00', '#0e0e0e', '#f9f5ef']

      for (let i = 0; i < 150; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 4,
          d: Math.random() * confetti.length,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncrement: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
        })
      }

      let animationFrame: number
      const confettiAnimation = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        confetti.forEach((c, i) => {
          ctx.beginPath()
          ctx.lineWidth = c.r / 2
          ctx.strokeStyle = c.color
          ctx.moveTo(c.x + c.tilt + c.r, c.y)
          ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r)
          ctx.stroke()

          c.tiltAngle += c.tiltAngleIncrement
          c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2
          c.tilt = Math.sin(c.tiltAngle - i / 3) * 15

          if (c.y > canvas.height) {
            confetti[i] = {
              x: Math.random() * canvas.width,
              y: -20,
              r: c.r,
              d: c.d,
              color: c.color,
              tilt: Math.floor(Math.random() * 10) - 10,
              tiltAngleIncrement: c.tiltAngleIncrement,
              tiltAngle: 0,
            }
          }
        })

        animationFrame = requestAnimationFrame(confettiAnimation)
      }

      confettiAnimation()

      // Stop confetti after 8 seconds
      setTimeout(() => {
        cancelAnimationFrame(animationFrame)
        setShowConfetti(false)
      }, 8000)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [showConfetti])

  useEffect(() => {
    // Override navigation links to go to home
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && (target as HTMLAnchorElement).href.includes('#')) {
        e.preventDefault()
        window.location.href = '/'
      }
    }

    const nav = document.querySelector('nav')
    if (nav) {
      nav.addEventListener('click', handleNavClick)
      return () => {
        nav.removeEventListener('click', handleNavClick)
      }
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
          }
        )
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power2.out',
          }
        )
      }

      // Logo animations
      const logos = [logoRef1, logoRef2, logoRef3]
      logos.forEach((logoRef) => {
        if (logoRef.current) {
          gsap.fromTo(
            logoRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: logoRef.current,
                start: 'top 85%',
              },
            }
          )
        }
      })

      // Content animation
      if (contentRef.current) {
        const children = Array.from(contentRef.current.children) as HTMLElement[]
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            delay: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 80%',
            },
          }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-wrappy-cream via-wrappy-cream to-wrappy-cream/80 overflow-hidden">
      {/* Confetti Canvas */}
      {showConfetti && (
        <canvas
          ref={confettiRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
          style={{ position: 'fixed' }}
        />
      )}

      {/* Gradient Orbs */}
      <div className="fixed top-20 right-20 w-64 md:w-80 h-64 md:h-80 bg-wrappy-red/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-20 left-20 w-64 md:w-80 h-64 md:h-80 bg-wrappy-orange/10 rounded-full blur-3xl pointer-events-none z-0" />
      
      <Navigation />
      <div ref={containerRef} className="pt-20 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-24">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 border-2 border-black text-sm font-bold tracking-widest uppercase mb-8">
            Try Our Signature Collection
            </div>
          </div>
          
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 font-display leading-none text-black"
          >
            You're Invited!
          </h1>

          <div ref={subtitleRef} className="mb-8 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex-shrink-0">
              <img 
                ref={logoRef1}
                src="/images/logo2.png" 
                alt="WRAPPY" 
                className="h-16 md:h-20 lg:h-24 xl:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-black flex-shrink-0">
              is NOW OPEN
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-600 font-bold max-w-2xl mx-auto">
            Handcrafted with fresh ingredients, wrapped to perfection
          </p>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
          <div className="h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </div>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
          <div ref={contentRef} className="space-y-8 text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            <p className="text-3xl md:text-4xl font-bold text-black">
              Hey Foodies 👋
            </p>

            <div>
              <p className="text-base md:text-lg font-light text-black leading-relaxed">
                Come celebrate with us
              </p>
              <p className="text-base md:text-lg text-gray-600 mt-4">
                our doors are officially open and we're rolling out the{' '}
                <span className="font-bold text-green-600">freshest wraps</span> in town!
              </p>
            </div>

            <div className="py-8 border-t-2 border-b-2 border-black my-12 text-center">
              <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-bold text-black">
                  Bold flavours,
                </p>
                <p className="text-3xl md:text-4xl font-bold text-black">
                  fully loaded wraps,
                </p>
                <p className="text-3xl md:text-4xl font-bold text-black">
                  crispy golden fries
                </p>
              </div>
              <p className="text-lg md:text-xl text-gray-600 mt-6 italic">
                everything made fresh just for you.
              </p>
            </div>

            <p className="text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
              Your new favourite spot for quick, delicious bites is here:{' '}
              <span className="flex items-center gap-2 whitespace-nowrap">
                <img 
                  ref={logoRef2}
                  src="/images/logo2.png" 
                  alt="WRAPPY" 
                  className="h-12 md:h-16 lg:h-[40px] inline-block object-contain"
                />
                <span>– Fresh Wraps & Fries</span>
              </span>
            </p>
            <div className="mt-6 flex justify-center">
              <p className="text-base md:text-lg text-gray-600 text-center">
                Grab your one + one offer!
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </div>

        {/* Image Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-black font-display">
              Our Store
            </h2>
          </div>
          
          <div ref={ctaRef} className="w-full flex justify-center">
            <img 
              src="/images/image.jpeg" 
              alt="WRAPPY" 
              className="w-1/2 h-auto object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div ref={mapRef} className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 border-2 border-black text-sm font-bold tracking-widest uppercase mb-4">
                Location
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black font-display">
                Find Us Here
              </h2>
            </div>
            
            <div className="w-full h-[400px] md:h-[500px] border-4 border-black overflow-hidden relative bg-gray-100">
              <iframe
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=wrappy&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="WRAPPY Location"
              />
            </div>
            
            
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </div>

        {/* Footer Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-black text-black">
              Can't wait to see you!
            </p>
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-black mx-auto w-fit">
              <span className="text-lg md:text-xl lg:text-2xl font-black text-black font-display uppercase tracking-widest">
                Team
              </span>
              <img 
                ref={logoRef3}
                src="/images/logo2.png" 
                alt="WRAPPY" 
                className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
