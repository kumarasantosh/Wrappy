// app/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function LaunchingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, white 35px, white 36px)
          `,
          }}
        />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content */}
      <div
        className={`z-10 text-center px-4 sm:px-6 w-full max-w-6xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <img
            src="/wrappy-logo.png"
            alt="Wrappy"
            className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[600px] mx-auto h-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-[55px] font-bold mb-4 sm:mb-6 tracking-tight">
          Launching Soon
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Something extraordinary is on its way. Get ready to unwrap Your taste
          buds.
        </p>

        {/* Email Signup */}
        <div className="max-w-md mx-auto mb-8 sm:mb-12 px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm text-white placeholder-zinc-500 text-sm sm:text-base"
            />
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Notify Me
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {["twitter", "instagram", "linkedin"].map((social) => (
            <a
              key={social}
              href="#"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5 bg-white rounded-full" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
