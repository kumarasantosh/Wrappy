"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        // Links animation
        if (linksRef.current) {
          gsap.fromTo(
            linksRef.current.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
              },
            },
          );
        }

        // Contact info animation
        if (contactRef.current) {
          gsap.fromTo(
            contactRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
              },
            },
          );
        }

        // Copyright animation
        if (copyrightRef.current) {
          gsap.fromTo(
            copyrightRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
              },
            },
          );
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-wrappy-cream border-t-4 border-black mt-16"
    >
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wrappy-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-wrappy-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Mobile: Minimal Layout */}
        <div className="md:hidden">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4">
              <span className="font-serif text-3xl font-bold tracking-tight text-wrappy-black">
                Wrapz <span className="text-wrappy-red">N</span> Fryz
              </span>
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-wrappy-black/60 mt-1">
                Fresh Wraps. Loaded Fryz.
              </p>
            </div>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/heywrappy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-black/20 my-4"></div>
          <div className="text-center text-xs text-gray-600">
            <p>© {new Date().getFullYear()} wrappy. All rights reserved.</p>
          </div>
        </div>

        {/* Desktop: Full Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Brand */}
          <div className="lg:col-span-1 text-center">
            <div className="mb-6">
              <span className="font-serif text-4xl font-bold tracking-tight text-wrappy-black">
                Wrapz <span className="text-wrappy-red">N</span> Fryz
              </span>
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-wrappy-black/60 mt-1">
                Fresh Wraps. Loaded Fryz.
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fresh wraps, crispy fries, thick shakes & chill drinks. Where
              street food meets bold flavour.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black text-black mb-6 font-display uppercase tracking-wider">
              Quick Links
            </h3>
            <div ref={linksRef} className="space-y-3">
              <Link
                href="/#wraps"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Signature Wraps
              </Link>
              <Link
                href="/#shakes"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Shakes & Desserts
              </Link>
              <Link
                href="/#build"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Build Your Wrap
              </Link>
              <Link
                href="/stores"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Our Stores
              </Link>
              <Link
                href="/launch"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Grand Opening
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-black text-black mb-6 font-display uppercase tracking-wider">
              Company
            </h3>
            <div className="space-y-3">
              <Link
                href="/franchise"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Franchise Opportunities
              </Link>
              <Link
                href="/#brand-story"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Our Story
              </Link>
              <a
                href="#"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Careers
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-wrappy-red transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black text-black mb-6 font-display uppercase tracking-wider">
              Contact Us
            </h3>
            <div ref={contactRef} className="space-y-4">
              <div>
                <p className="text-sm font-bold text-black mb-1">Email</p>
                <a
                  href="mailto:hello@wrappy.com"
                  className="text-gray-600 hover:text-wrappy-red transition-colors text-sm"
                >
                  hello@wrappy.com
                </a>
              </div>
              <div>
                <p className="text-sm font-bold text-black mb-1">Phone</p>
                <a
                  href="tel:+919177599393"
                  className="text-gray-600 hover:text-wrappy-red transition-colors text-sm"
                >
                  9177599393
                </a>
              </div>
              <div className="pt-4">
                <p className="text-sm font-bold text-black mb-3">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/heywrappy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-wrappy-red hover:border-wrappy-red transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Divider */}
        <div className="hidden md:block border-t-2 border-black my-8"></div>

        {/* Desktop: Copyright */}
        <div
          ref={copyrightRef}
          className="hidden md:flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600"
        >
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} wrappy. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-black font-bold">Made with</span>
            <span className="text-wrappy-red">❤️</span>
            <span className="text-black font-bold">for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
