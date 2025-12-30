'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const shakes = [
  { name: 'Butterscotch Banana', emoji: '🥤', price: '₹129', category: 'shake', color: 'from-amber-400 to-yellow-500' },
  { name: 'Oreo', emoji: '🥤', price: '₹139', category: 'shake', color: 'from-gray-600 to-gray-800' },
  { name: 'Kitkat', emoji: '🥤', price: '₹139', category: 'shake', color: 'from-orange-400 to-red-500' },
  { name: 'Belgian Chocolate', emoji: '🥤', price: '₹149', category: 'shake', color: 'from-amber-700 to-amber-900' },
  { name: 'Nutella', emoji: '🥤', price: '₹149', category: 'shake', color: 'from-amber-600 to-brown-700' },
  { name: 'Protein', emoji: '🥤', price: '₹159', category: 'shake', color: 'from-blue-400 to-indigo-500' },
]

const coolers = [
  { name: 'Hard Rock Coffee', emoji: '☕', price: '₹119', category: 'cooler', color: 'from-amber-600 to-amber-800' },
  { name: 'Blue Heaven', emoji: '🧊', price: '₹109', category: 'cooler', color: 'from-blue-300 to-cyan-500' },
  { name: 'Virgin Mojito', emoji: '🍃', price: '₹99', category: 'cooler', color: 'from-green-300 to-emerald-500' },
  { name: 'Mint Mojito', emoji: '🌿', price: '₹99', category: 'cooler', color: 'from-green-400 to-teal-500' },
  { name: 'Watermelon', emoji: '🍉', price: '₹109', category: 'cooler', color: 'from-red-300 to-pink-500' },
  { name: 'Grilled Pineapple', emoji: '🍍', price: '₹119', category: 'cooler', color: 'from-yellow-300 to-orange-400' },
]

const desserts = [
  { name: 'Nutella Icecream', emoji: '🍨', price: '₹149', category: 'dessert', color: 'from-amber-500 to-brown-600' },
]

export default function ShakesAndDesserts() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const shakesRef = useRef<HTMLDivElement>(null)
  const coolersRef = useRef<HTMLDivElement>(null)
  const dessertsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
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
            duration: 0.5,
            delay: 0.1,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Animate each category section
      const sections = [
        { ref: shakesRef, delay: 0 },
        { ref: coolersRef, delay: 0.1 },
        { ref: dessertsRef, delay: 0.2 },
      ]

      sections.forEach(({ ref, delay }) => {
        if (ref.current) {
          const children = Array.from(ref.current.children) as HTMLElement[]

          children.forEach((child, index) => {
            gsap.fromTo(
              child,
              {
                opacity: 0,
                y: 60,
                scale: 0.9,
                rotationY: -10,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.4,
                delay: delay + index * 0.03,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: child,
                  start: 'top 90%',
                },
              }
            )

            // Parallax drift on scroll
            gsap.to(child, {
              y: -40,
              scrollTrigger: {
                trigger: child,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-wrappy-orange text-sm font-semibold tracking-widest uppercase">
              Refreshing Delights
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl font-extrabold mb-6 font-display"
          >
            Shakes, Mojitos & Desserts
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-wrappy-cream/70 max-w-2xl mx-auto font-light"
          >
            Cool down with our premium range of shakes, Mojitos, and sweet treats
          </p>
        </div>

        {/* Shakes Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
            <h3 className="text-3xl md:text-4xl font-bold font-display text-wrappy-cream">
              Shakes
            </h3>
            <div className="h-px bg-gradient-to-l from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
          </div>
          <div ref={shakesRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shakes.map((item, index) => (
              <PremiumItemCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Coolers Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
            <h3 className="text-3xl md:text-4xl font-bold font-display text-wrappy-cream">
              Mojitos
            </h3>
            <div className="h-px bg-gradient-to-l from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
          </div>
          <div ref={coolersRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {coolers.map((item, index) => (
              <PremiumItemCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Desserts Section */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
            <h3 className="text-3xl md:text-4xl font-bold font-display text-wrappy-cream">
              Desserts
            </h3>
            <div className="h-px bg-gradient-to-l from-transparent via-wrappy-cream/30 to-wrappy-cream/30 flex-1" />
          </div>
          <div ref={dessertsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {desserts.map((item, index) => (
              <PremiumItemCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PremiumItemCard({ item }: { item: typeof shakes[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const emojiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
      if (emojiRef.current) {
        gsap.to(emojiRef.current, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      if (emojiRef.current) {
        gsap.to(emojiRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative bg-wrappy-cream/5 backdrop-blur-sm text-wrappy-cream rounded-2xl p-6 cursor-pointer border border-wrappy-cream/10 hover:border-wrappy-cream/30 transition-all duration-300 transform-gpu overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Emoji */}
        <div
          ref={emojiRef}
          className="text-6xl mb-4 text-center transform-gpu"
          style={{ willChange: 'transform' }}
        >
          {item.emoji}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold font-display mb-2 text-center">
          {item.name}
        </h3>

        {/* Price */}
        <div className="text-center">
          <span className="text-wrappy-cream/60 text-sm">Starting at</span>
          <div className="text-xl font-extrabold text-wrappy-cream mt-1">
            {item.price}
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-0.5 bg-wrappy-orange" />
        </div>
      </div>
    </div>
  )
}
