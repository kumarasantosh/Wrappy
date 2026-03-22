'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function FranchisePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.8,
            ease: 'back.out(1.7)',
          }
        )
      }

      // Form animation - will be handled by container animation

      // Info section animation
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Footer animation
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExperienceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure required selections are made
    if (!formData.experience) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/franchise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        message: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-wrappy-cream overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0e0e0e 1px, transparent 1px),
            linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Navigation />
      <div ref={containerRef} className="pt-24 pb-16 relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 font-display leading-tight text-wrappy-black"
          >
            Talk to our friendly franchise team
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 max-w-2xl"
          >
            We'll help you find the perfect franchise opportunity, no matter your business size.
          </p>
        </section>

        {/* Main Content - Two Column Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-wrappy-black mb-2">
                      First name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-wrappy-black mb-2">
                      Last name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-wrappy-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-wrappy-black mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400"
                    placeholder="+91 9****"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-wrappy-black mb-2">
                    Preferred Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400"
                    placeholder="City, State"
                  />
                </div>

                {/* Experience Selection with Radio Buttons */}
                <div>
                  <label className="block text-sm font-bold text-wrappy-black mb-4">
                    Restaurant Experience *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'none', label: 'No Experience' },
                      { value: 'some', label: 'Some Experience' },
                      { value: 'extensive', label: 'Extensive Experience' },
                      { value: 'franchise', label: 'Franchise Owner' },
                      { value: 'management', label: 'Restaurant Management' },
                      { value: 'other', label: 'Other' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option.value}
                          checked={formData.experience === option.value}
                          onChange={(e) => handleExperienceChange(e.target.value)}
                          className="w-5 h-5 border-2 border-gray-300 focus:ring-2 focus:ring-wrappy-red text-wrappy-red cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-wrappy-black transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-wrappy-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-wrappy-black focus:outline-none focus:ring-2 focus:ring-wrappy-red focus:border-transparent transition-colors placeholder-gray-400 resize-none"
                    placeholder="Leave us a message..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Thank you! We've received your inquiry and will contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.experience}
                  className="w-full bg-wrappy-black text-wrappy-cream px-6 py-3 rounded-lg font-bold hover:bg-wrappy-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div ref={infoRef} className="space-y-12">
              {/* Chat with us */}
              <div>
                <h3 className="text-lg font-bold text-wrappy-black mb-2">
                  Chat with us
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Speak to our friendly team via live chat.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com/heywrappy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-wrappy-black hover:text-wrappy-red transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Start a live chat
                  </a>
                </div>
              </div>

              {/* Call us */}
              <div>
                <h3 className="text-lg font-bold text-wrappy-black mb-2">
                  Call us
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Call our team Mon-Fri from 8am to 5pm.
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+1800WRAPPY"
                    className="block text-wrappy-black hover:text-wrappy-red transition-colors font-bold underline"
                  >
                    1-800-WRAPPY
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="block text-wrappy-black hover:text-wrappy-red transition-colors font-bold underline"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>

              {/* Visit us */}
              <div>
                <h3 className="text-lg font-bold text-wrappy-black mb-2">
                  Visit us
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Chat to us in person at our headquarters.
                </p>
                <a
                  href="https://www.google.com/maps?s=web&lqi=CgZ3cmFwcHlaCCIGd3JhcHB5kgEEY2FmZQ&phdesc=OYnrx5lF4O4&vet=12ahUKEwihucWnmuWRAxXlZWwGHVzVKvgQ1YkKegQIKxAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KU-izR80kcs7Md0cm5ix8g4Y&daddr=Shop+5A,+Plot+192,+Addagutta+Society+-+Jal+Vayu+Vihar+Raod,+near+JNTU,+Addagutta+Society,+Jal+Vayu+Vihar,+Kukatpally,+Hyderabad,+Telangana+500085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wrappy-black font-medium hover:text-wrappy-red transition-colors block"
                >
                  Shop 5A, <br />
                  Plot 192,<br />
                  Addagutta Society
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
