'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wraps = [
  { name: 'Classic Veggie' },
  { name: 'Butter Garlic Mushroom' },
  { name: 'Crispy Paneer' },
  { name: 'Cheesy Paneer' },
  { name: 'Crispy Chicken' },
  { name: 'Chilli Chicken' },
  { name: 'Smoky Tandoori Chicken' },
  { name: 'Fully Loaded Chicken Wrap' },
  { name: 'Zinger Chicken' },
  { name: 'BBQ Chicken' },
  { name: 'Peri Peri Chicken' },
]

export default function SignatureWraps() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const titleSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility - make sure title is visible from start
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0 })
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
      }

      // Title animation - trigger when section enters viewport (optional fade-in)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Horizontal scroll animation - items visible immediately, scroll left to reveal more
      if (sectionRef.current && containerRef.current) {
        const items = Array.from(containerRef.current.children) as HTMLElement[]
        
        const calculateScroll = () => {
          if (!containerRef.current) return 0
          
          const containerWidth = containerRef.current.scrollWidth
          const viewportWidth = window.innerWidth
          const scrollWidth = Math.max(0, containerWidth - viewportWidth)

          return scrollWidth
        }

        const scrollWidth = calculateScroll()
        
        if (scrollWidth > 0) {
          // Reduce scroll distance significantly to minimize blank space
          const scrollDistance = scrollWidth * 0.3 // Use 30% of calculated scroll width for more compact section
          
          // Start with items visible (x: 0) and scroll left (x: -scrollWidth) to reveal more items
          // This ensures first items are visible immediately
          // Pin the entire section so title stays visible during scroll
          gsap.fromTo(containerRef.current, 
            { x: 0 }, // Start position (items visible)
            {
              x: -scrollWidth, // End position (scrolled left to show more)
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80px', // Account for fixed header (h-20 = 80px)
                end: `+=${scrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            }
          )
        }

        // Items are visible immediately - no fade animation needed
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="wraps"
      ref={sectionRef}
      className="relative bg-wrappy-black pb-12"
      style={{ overflow: 'visible', paddingTop: '80px' }}
    >
      {/* Title Section - Stays visible during scroll */}
      <div 
        ref={titleSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-4 md:mb-6"
        style={{ position: 'relative' }}
      >
        <div className="text-center">
          <div className="inline-block mb-1.5">
            <span className="text-wrappy-red text-xs font-semibold tracking-widest uppercase">
              Our Signature Collection
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-3 font-display text-wrappy-cream"
            style={{ opacity: 1 }}
          >
            Signature Wraps
          </h2>
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-wrappy-cream/70 max-w-2xl mx-auto font-light"
            style={{ opacity: 1 }}
          >
            Handcrafted with fresh ingredients, wrapped to perfection
          </p>
        </div>
      </div>

      {/* Scrollable Items Section - Centered */}
      <div className="w-full relative flex items-center justify-center pb-8" style={{ overflowY: 'visible', minHeight: '35vh' }}>
        <div className="overflow-x-hidden w-full">
          <div
            ref={containerRef}
            className="flex gap-10 overflow-y-hidden md:gap-14 lg:gap-16 xl:gap-20 will-change-transform items-center justify-center pl-6 md:pl-12 lg:pl-16 pr-6 md:pr-12 lg:pr-16"
            style={{ 
              width: 'max-content',
            }}
          >
            {wraps.map((wrap, index) => (
              <WrapItem key={index} wrap={wrap} index={index} />
            ))}
          </div>
        </div>
        
        {/* Skip to Next Section Button */}
        <button
          onClick={() => {
            const nextSection = document.getElementById('shakes')
            if (nextSection) {
              const offset = 100 // Offset for fixed navigation
              const elementPosition = nextSection.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - offset
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }
          }}
          className="absolute bottom-4 right-8 md:bottom-6 md:right-12 z-50 bg-wrappy-red hover:bg-wrappy-orange text-wrappy-cream px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-wrappy-red/50 flex items-center gap-2 group"
        >
          <span>Skip to Shakes</span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

function WrapItem({ wrap, index }: { wrap: typeof wraps[0]; index: number }) {
  const itemRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!itemRef.current) return

    const item = itemRef.current
    const handleMouseEnter = () => {
      gsap.to(item, {
        scale: 1.1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(item, {
        scale: 1,
        opacity: 0.7,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    item.addEventListener('mouseenter', handleMouseEnter)
    item.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter)
      item.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <h3 
      ref={itemRef}
      className="flex-shrink-0 text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-wrappy-cream/70 hover:text-wrappy-cream transform-gpu cursor-pointer transition-colors duration-300 whitespace-nowrap"
      style={{ willChange: 'transform', opacity: 0.7 }}
    >
      {wrap.name}
    </h3>
  )
}
