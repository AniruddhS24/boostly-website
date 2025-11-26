'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation with patterned background */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{
        backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}>
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${isScrolled ? 'max-w-4xl' : 'max-w-7xl'}`}>
          {/* Floating Card Navigation */}
          <header className="bg-white rounded-2xl shadow-lg px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 h-7 overflow-hidden">
                  <img 
                    src="/BoostlyAI.png" 
                    alt="Boostly AI" 
                    className="h-8 w-auto object-contain object-center"
                  />
                </Link>
                
                {/* Navigation Links - Desktop */}
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                  <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
                  <a href="/integrations" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Platforms</a>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>

                {/* CTA Button - Hidden on mobile */}
                <a 
                  href="https://calendly.com/founders-pharmie/marketing-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold shadow-md"
                >
                  Book a Demo
                </a>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                <nav className="flex flex-col gap-4">
                  <a 
                    href="#features" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#pricing" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a 
                    href="/integrations" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Platforms
                  </a>
                </nav>
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-36 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row items-center xl:items-start gap-12 justify-between">
            {/* Left Column - Text Content */}
            <div className="flex-1 max-w-2xl pl-0 lg:pl-4 text-center xl:text-left">
              {/* Headline */}
              <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
                AI Marketing for <br />
                <span className="text-primary-500">Local Businesses</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-lg sm:text-xl text-black mb-10 leading-relaxed">
              Reach more customers through consistent posts, graphics, and SEO.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center xl:items-start gap-4 mb-12">
                <Link href="/trial" className="px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
                  Try free
                </Link>
                <a 
                  href="https://calendly.com/founders-pharmie/marketing-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:hidden px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Book a Demo
                </a>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-col gap-3 items-center xl:items-start">
                <p className="text-lg font-semibold text-gray-500">Trusted by</p>
                <div className="flex items-center gap-8">
                  {/* Customer Logos */}
                  <a 
                    href="https://casapickle.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity block overflow-hidden rounded-2xl"
                  >
                    <img 
                      src="/customers/CasaWhiteOnNavyLogo.png" 
                      alt="Casa Pickle" 
                      className="h-20 w-auto"
                      style={{ objectFit: 'contain', display: 'block' }}
                    />
                  </a>
                  <a 
                    href="https://gayatribhavans.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/customers/GB-logo.png" 
                      alt="Gayatri Bhavan" 
                      className="h-20 w-auto rounded-2xl"
                      style={{ objectFit: 'contain' }}
                    />
                  </a>
                  <a 
                    href="https://www.homedreamsolutions.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/customers/homedreamsoln.png" 
                      alt="Home Dream Solutions" 
                      className="h-20 w-auto rounded-2xl"
                      style={{ objectFit: 'contain' }}
                    />
                  </a>
                  <img 
                    src="/customers/El_Rollis.jpg" 
                    alt="El Rollis" 
                    className="h-20 w-auto rounded-2xl"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Animated Vertical Cards */}
            <div className="hidden xl:block relative h-[600px] w-[320px] flex-shrink-0">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {/* Gradient overlays for fade effect */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
                
                {/* Scrolling cards container */}
                <div 
                  className="flex flex-col gap-4"
                  style={{
                    animation: 'scrollDown 30s linear infinite'
                  }}
                >
                  {/* First set of cards */}
                  {[
                    { title: "Social Media Posts", desc: "Daily AI-generated content for all your platforms" },
                    { title: "Custom Graphics", desc: "Eye-catching designs for events and promotions" },
                    { title: "Local SEO", desc: "Boost your Google ranking and visibility" },
                    { title: "Website Updates", desc: "Fresh content that converts visitors" },
                    { title: "Analytics Reports", desc: "Track growth and engagement metrics" },
                    { title: "Review Management", desc: "Automated responses to customer reviews" },
                  ].map((item, i) => (
                    <div key={`card-${i}`} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-shrink-0">
                      <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                  
                  {/* Duplicate set for seamless loop */}
                  {[
                    { title: "Social Media Posts", desc: "Daily AI-generated content for all your platforms" },
                    { title: "Custom Graphics", desc: "Eye-catching designs for events and promotions" },
                    { title: "Local SEO", desc: "Boost your Google ranking and visibility" },
                    { title: "Website Updates", desc: "Fresh content that converts visitors" },
                    { title: "Analytics Reports", desc: "Track growth and engagement metrics" },
                    { title: "Review Management", desc: "Automated responses to customer reviews" },
                  ].map((item, i) => (
                    <div key={`card-dup-${i}`} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-shrink-0">
                      <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automated marketing that drives walk-ins, trial signups, and class bookings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Automated Social Media Posting */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">Automated Social Media</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Your AI creates, schedules, and posts daily content across Instagram, Facebook, TikTok, and Google Business Profile.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-written captions
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Branded templates
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fitness/wellness hashtags
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Auto-scheduling & posting
                </li>
              </ul>
            </div>

            {/* AI Flyer & Graphic Designer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">AI Flyer & Graphic Designer</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Perfect for studios that constantly run classes, workshops, events, promotions, and challenges.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flyers & posters
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Event promos & carousels
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Class announcements
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Your branding & colors
                </li>
              </ul>
            </div>

            {/* Local SEO Booster */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">Local SEO Booster</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Get more walk-ins, trial signups, and class bookings by improving your studio's local visibility.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Optimize website keywords
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Improve Google Business ranking
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rewrite pages for conversions
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track ranking improvements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
              Workflow Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build powerful workflows that run on autopilot
            </p>
          </div>

          {/* Workflow Visual */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-2 border-primary-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-lg text-gray-900 mb-2">Scheduled Trigger</h4>
                <p className="text-sm text-gray-600 text-center max-w-xs">Set your automation schedule</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-2 border-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-lg text-gray-900 mb-2">Write AI Caption</h4>
                <p className="text-sm text-gray-600 text-center max-w-xs">AI generates your content</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-2 border-green-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-lg text-gray-900 mb-2">Publish Social Post</h4>
                <p className="text-sm text-gray-600 text-center max-w-xs">Auto-post to all platforms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {/* Basic */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">Basic</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$100</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">Perfect for small studios that want consistent, hands-off marketing.</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="text-gray-600">
                  • 8 social posts per week
                </li>
                <li className="text-gray-600">
                  • 2 flyers per month
                </li>
                <li className="text-gray-600">
                  • Basic local SEO improvements
                </li>
                <li className="text-gray-600">
                  • Branded templates
                </li>
                <li className="text-gray-600">
                  • Monthly performance summary
                </li>
              </ul>
              <a href="/trial" className="block w-full px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center mt-auto">
                Try 7 days free
              </a>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white relative shadow-xl flex flex-col h-full">
              <h3 className="font-heading font-bold text-2xl mb-4">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$250</span>
                <span className="text-primary-100">/mo</span>
              </div>
              <p className="text-sm text-primary-50 mb-6">Automated marketing to increase reach, trial signups, and bookings.</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="text-white">
                  • 15 social posts per week
                </li>
                <li className="text-white">
                  • 4 flyers per month
                </li>
                <li className="text-white">
                  • Weekly SEO optimization
                </li>
                <li className="text-white">
                  • Website content updates
                </li>
                <li className="text-white">
                  • Google Business optimization
                </li>
                <li className="text-white">
                  • Priority revisions
                </li>
                <li className="text-white">
                  • Monthly growth report
                </li>
              </ul>
              <a href="/trial" className="block w-full px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center mt-auto">
                Try 7 days free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <a href="#features" className="hover:text-white transition-colors text-sm">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors text-sm">Pricing</a>
              <a href="/integrations" className="hover:text-white transition-colors text-sm">Platforms</a>
            </nav>
            <p className="text-sm">
              © 2025 Boostly AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
