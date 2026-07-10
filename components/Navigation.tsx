"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const menuItems = menuRef.current.querySelectorAll(".menu-item");
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-wrappy-cream/95 backdrop-blur-md border-b border-wrappy-black/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="cursor-pointer">
                <span className="font-serif text-3xl font-bold tracking-tight text-wrappy-black">
                  Wrapz <span className="text-wrappy-red">N</span> Fryz
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/#wraps"
                className="text-wrappy-black hover:text-wrappy-red transition-colors"
              >
                Menu
              </a>
              <a
                href="/stores"
                className="text-wrappy-black hover:text-wrappy-red transition-colors"
              >
                Our Stores
              </a>
              <a
                href="/franchise"
                className="text-wrappy-black hover:text-wrappy-red transition-colors"
              >
                Franchise
              </a>
              <a
                href="https://shop.wrappy.co.in/"
                className="bg-wrappy-black text-wrappy-cream px-6 py-2 rounded-full hover:bg-wrappy-red transition-colors"
              >
                Order Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            >
              <span
                className={`absolute w-6 h-0.5 bg-wrappy-black transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-wrappy-black transition-all ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-wrappy-black transition-all ${
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-wrappy-black transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a
            href="/#wraps"
            className="menu-item text-4xl font-bold text-wrappy-cream hover:text-wrappy-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </a>
          <a
            href="/stores"
            className="menu-item text-4xl font-bold text-wrappy-cream hover:text-wrappy-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Stores
          </a>
          <a
            href="/franchise"
            className="menu-item text-4xl font-bold text-wrappy-cream hover:text-wrappy-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Franchise
          </a>
          <a
            href="https://shop.wrappy.co.in/"
            className="menu-item bg-wrappy-cream text-wrappy-black px-8 py-4 rounded-full text-xl font-bold hover:bg-wrappy-red hover:text-wrappy-cream transition-colors text-center inline-block"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      </div>
    </>
  );
}
