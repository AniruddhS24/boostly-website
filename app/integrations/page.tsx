'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function IntegrationsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoMap: { [key: string]: string } = {
    'Facebook': '/logos/facebook.png',
    'Instagram': '/logos/instagram.png',
    'X (Twitter)': '/logos/twitter.png',
    'LinkedIn': '/logos/linkedin.png',
  };
  const integrations = [
    {
      name: 'Facebook',
      badge: null,
      description: 'Send your posts directly out onto your Facebook Business Pages.',
      badgeColor: null
    },
    {
      name: 'Instagram',
      badge: null,
      description: 'Post content directly onto Instagram Business profiles, seamlessly.',
      badgeColor: null
    },
    {
      name: 'X (Twitter)',
      badge: null,
      description: 'Schedule tweets, threads, and engage in real-time conversations on X.',
      badgeColor: null
    },
    {
      name: 'LinkedIn',
      badge: null,
      description: 'Schedule insightful articles and updates to LinkedIn with ease.',
      badgeColor: null
    },
    {
      name: 'Pinterest',
      badge: 'Try Beta',
      description: 'Schedule eye-catching Pins and organize your boards effortlessly on Pinterest.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Threads',
      badge: 'Try Beta',
      description: 'Schedule engaging text-based updates and connect with your community.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'TikTok',
      badge: 'Try Beta',
      description: 'Schedule your trending TikTok videos and manage your short-form content.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Google Business',
      badge: 'Try Beta',
      description: 'Schedule updates, posts, and manage your Google Business efficiently.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'YouTube Shorts',
      badge: 'Try Beta',
      description: 'Schedule and publish your engaging YouTube Shorts to reach a wider audience.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Discord',
      badge: 'Try Beta',
      description: 'Schedule announcements, share content, and manage your Discord server.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Telegram',
      badge: 'Try Beta',
      description: 'Schedule messages, share content, and manage your Telegram channels.',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Slack',
      badge: 'Try Beta',
      description: 'Schedule internal announcements and share important updates to Slack.',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation with patterned background */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{
        backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Floating Card Navigation */}
          <header className="bg-white rounded-2xl shadow-lg px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-8">
                <a href="/" className="flex items-center gap-2 h-7 overflow-hidden">
                  <img 
                    src="/BoostlyAI.png" 
                    alt="Boostly AI" 
                    className="h-8 w-auto object-contain object-center"
                  />
                </a>
                
                {/* Navigation Links - Desktop */}
                <nav className="hidden md:flex items-center gap-6">
                  <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                  <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
                  <a href="/integrations" className="text-gray-900 font-semibold">Platforms</a>
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
                    href="/#features" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="/#pricing" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a 
                    href="/integrations" 
                    className="text-gray-900 font-semibold py-2"
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
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-6">
              Platforms
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
              Easily integrate social media accounts so you can create and schedule content simultaneously.
            </p>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {logoMap[integration.name] && (
                      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center flex-shrink-0">
                        <Image
                          src={logoMap[integration.name]}
                          alt={`${integration.name} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="font-heading font-bold text-2xl text-gray-900 group-hover:text-primary-500 transition-colors">
                      {integration.name}
                    </h3>
                  </div>
                  {integration.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${integration.badgeColor} whitespace-nowrap`}>
                      {integration.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {integration.description}
                </p>
                <Link href="/trial" className="text-primary-500 font-medium hover:text-primary-600 transition-colors flex items-center gap-2 group-hover:gap-3">
                  Learn more
                  <svg className="w-4 h-4 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}

            {/* Custom Integration Card */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-dashed border-primary-300 rounded-2xl p-8 hover:border-primary-500 transition-all duration-300 group cursor-pointer">
              <div className="mb-4">
                <h3 className="font-heading font-bold text-2xl text-gray-900">
                  Custom
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Missing an integration? We can always explore options.
              </p>
              <Link href="/trial" className="text-primary-500 font-medium hover:text-primary-600 transition-colors flex items-center gap-2 group-hover:gap-3">
                Let's talk
                <svg className="w-4 h-4 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <a href="/#features" className="hover:text-white transition-colors text-sm">Features</a>
              <a href="/#pricing" className="hover:text-white transition-colors text-sm">Pricing</a>
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

