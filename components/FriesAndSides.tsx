'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { name: 'Classic Crispy Fries', emoji: '🍟' },
  { name: 'Peri Peri Fries', emoji: '🌶️' },
  { name: 'Signature Mixed Fries', emoji: '🍟' },
  { name: 'Chicken-Loaded Crispy Fries', emoji: '🍗' },
  { name: 'Cheesy Loaded Fries', emoji: '🧀' },
  { name: 'Golden Chicken Nuggets', emoji: '🍗' },
  { name: 'Crispy Chicken Strips', emoji: '🍗' },
]

export default function FriesAndSides() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mouseEnterHandlers: Array<{ child: HTMLElement; handler: () => void }> = []
    const mouseLeaveHandlers: Array<{ child: HTMLElement; handler: () => void }> = []
    
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      if (itemsRef.current) {
        const children = Array.from(itemsRef.current.children) as HTMLElement[]

        gsap.fromTo(
          children,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 80%',
            },
          }
        )

        // Hover shake effect with z-index increase
        children.forEach((child) => {
          const handleMouseEnter = () => {
            gsap.to(child, {
              scale: 1.1,
              rotation: 5,
              zIndex: 50,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            })
            // Set z-index via style for immediate effect
            child.style.zIndex = '50'
          }
          const handleMouseLeave = () => {
            child.style.zIndex = '1'
            gsap.to(child, {
              zIndex: 1,
              duration: 0.2,
            })
          }
          child.addEventListener('mouseenter', handleMouseEnter)
          child.addEventListener('mouseleave', handleMouseLeave)
          mouseEnterHandlers.push({ child, handler: handleMouseEnter })
          mouseLeaveHandlers.push({ child, handler: handleMouseLeave })
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      mouseEnterHandlers.forEach(({ child, handler }) => {
        child.removeEventListener('mouseenter', handler)
      })
      mouseLeaveHandlers.forEach(({ child, handler }) => {
        child.removeEventListener('mouseleave', handler)
      })
    }
  }, [])

  return (
    <section
      id="fries"
      ref={sectionRef}
      className="relative bg-wrappy-cream py-20 overflow-hidden"
      style={{ overflow: 'visible' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 text-center text-wrappy-black font-display"
        >
          Fries & Sides
        </h2>

        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-wrappy-black text-wrappy-cream rounded-2xl p-6 text-center cursor-pointer transform-gpu relative"
              style={{ willChange: 'transform', zIndex: 1 }}
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold font-display">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

