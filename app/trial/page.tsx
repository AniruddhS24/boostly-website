'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string; // Base64 image data
  flyerData?: any;
}

export default function TrialPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    email: '',
    instagramHandle: ''
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flyerGenerated, setFlyerGenerated] = useState(false);
  
  // New flyer parameters
  const [mainTitle, setMainTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [featureList, setFeatureList] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Log to Supabase
      const response = await fetch('/api/log-trial-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          studioName: formData.studioName,
          email: formData.email,
          instagramHandle: formData.instagramHandle,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        alert('Thank you! We\'ll contact you within 24 hours to set up your free trial.');
        // Reset form
        setFormData({
          name: '',
          studioName: '',
          email: '',
          instagramHandle: ''
        });
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    // Validate that at least main title is provided
    if (!mainTitle.trim() || isLoading) return;

    // Build a structured prompt with the new parameters
    const userMessage = `
Create a modern promotional flyer with the following specifications:

DESIGN STYLE:
- Modern pastel promo flyer aesthetic
- Bold layered text with drop-shadow titles
- Geometric blocks and shapes
- Repeating background words for texture
- Clean, contemporary aesthetic
- Aspect ratio: 9:16 (Instagram Story format, 1080x1920px)

CONTENT:
- Main Title: ${mainTitle}
${subtitle ? `- Subtitle: ${subtitle}` : ''}
${featureList ? `- Feature List: ${featureList}` : ''}
${dateTime ? `- Date & Time: ${dateTime}` : ''}

COLORS:
${primaryColor ? `- Primary Color: ${primaryColor}` : '- Primary Color: Pastel Pink'}
${secondaryColor ? `- Secondary Color: ${secondaryColor}` : '- Secondary Color: Navy'}
${additionalInfo ? `\nADDITIONAL DETAILS:\n${additionalInfo}` : ''}

Make the design eye-catching, professional, and suitable for any type of business (fitness, sports, food, real estate, salon, etc.).
    `.trim();

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-flyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          businessName: formData.studioName || 'Your Business',
          eventDetails: ''
        })
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Check if we got an image
        if (data.data.image) {
          const assistantMessage = {
            role: 'assistant' as const,
            content: data.data.description || 'Here\'s your flyer!',
            image: data.data.image,
            flyerData: data.data
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          setFlyerGenerated(true);

          // Log to Supabase
          try {
            await fetch('/api/log-chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: userMessage,
                userName: formData.studioName || null
              })
            });
          } catch (logError) {
            console.error('Failed to log chat:', logError);
            // Don't block the user experience if logging fails
          }
        } else {
          // Fallback for text-only responses
          const flyerContent = `
**${data.data.headline || 'Your Flyer'}**

${data.data.subheadline || ''}

**Key Features:**
${data.data.bulletPoints?.map((point: string) => `• ${point}`).join('\n') || ''}

**${data.data.callToAction || ''}**

${data.data.additionalDetails || ''}
          `.trim();

          setMessages(prev => [...prev, {
            role: 'assistant',
            content: flyerContent,
            flyerData: data.data
          }]);

          // Log to Supabase
          try {
            await fetch('/api/log-chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: userMessage,
                userName: formData.studioName || null
              })
            });
          } catch (logError) {
            console.error('Failed to log chat:', logError);
          }
        }
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error generating your flyer. Please try again with a different description.'
        }]);
      }
    } catch (error) {
      console.error('Error generating flyer:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please make sure your API key is configured and try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = (base64Data: string, filename: string = 'flyer.png') => {
    // Convert base64 to blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Link href="/" className="flex items-center gap-2 h-7 overflow-hidden">
                  <img 
                    src="/BoostlyAI.png" 
                    alt="Boostly AI" 
                    className="h-8 w-auto object-contain object-center"
                  />
                </Link>
                
                {/* Navigation Links - Desktop */}
                <nav className="hidden md:flex items-center gap-6">
                  <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                  <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
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

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Start Your Free Trial
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No credit card. We'll reach out to set everything up for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Chat Interface for Flyer Generation */}
            <div className="bg-white rounded-3xl shadow-sm border-2 border-purple-300 overflow-hidden flex flex-col h-[700px]">
              {/* Chat Header */}
              <div className={`px-6 pt-5 ${messages.length > 0 ? 'pb-2' : 'pb-0'} bg-white`}>
                <h2 className="font-heading font-bold text-lg text-gray-900 mb-1">
                  Try our Free AI Flyer Generator
                </h2>
                <p className="text-gray-500 text-xs mb-0">
                  Fill out the form on the right to access premium features and personalized flyers
                </p>
              </div>

              {/* Chat Area */}
              <div className={`${messages.length > 0 ? 'flex-1 overflow-hidden bg-gray-50/30' : 'flex-none'} ${flyerGenerated ? 'p-2' : messages.length > 0 ? 'p-6' : ''}`}>
                {messages.length > 0 && (
                  <div className={`${flyerGenerated ? 'h-full flex items-center justify-center' : 'space-y-4'}`}>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : flyerGenerated ? 'justify-center' : 'justify-start'} ${flyerGenerated ? 'h-full w-full' : ''}`}
                      >
                        <div
                          className={`${message.image ? 'max-w-full' : 'max-w-[85%]'} ${
                            message.role === 'user'
                              ? 'bg-primary-500 text-white rounded-2xl px-4 py-3'
                              : flyerGenerated ? 'bg-transparent shadow-none border-0 p-0 h-full flex flex-col items-center justify-center' : 'bg-white text-gray-900 rounded-2xl shadow-sm border border-gray-100'
                          }`}
                        >
                          {message.image ? (
                            <div className={flyerGenerated ? 'p-0 h-full flex flex-col items-center justify-center' : 'p-2'}>
                              <img 
                                src={`data:image/png;base64,${message.image}`}
                                alt="Generated flyer"
                                className={`${flyerGenerated ? 'max-h-[calc(100%-140px)] max-w-full mx-auto' : 'w-full'} ${flyerGenerated ? '' : 'rounded-lg shadow-md'} object-contain`}
                              />
                              {flyerGenerated && (
                                <p className="text-sm text-gray-600 mt-3 px-2 text-center max-w-md">
                                  {message.content ? `${message.content} If you would like to explore premium templates, more personalized flyers, and automated posting, fill out the form on the right.` : 'If you would like to explore premium templates, more personalized flyers, and automated posting, fill out the form on the right.'}
                                </p>
                              )}
                              {flyerGenerated && (
                                <button
                                  onClick={() => downloadImage(message.image!, `boostly-flyer-${Date.now()}.png`)}
                                  className="mt-3 mb-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  Download Flyer
                                </button>
                              )}
                              {!flyerGenerated && message.content && (
                                <p className="text-sm text-gray-600 mt-2 px-2">
                                  {message.content}
                                </p>
                              )}
                              {!flyerGenerated && (
                                <button
                                  onClick={() => downloadImage(message.image!, `boostly-flyer-${Date.now()}.png`)}
                                  className="mt-3 w-full px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  Download Flyer
                                </button>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-line leading-relaxed px-4 py-3">
                              {message.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-900 rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-sm text-gray-500 ml-2">Generating your flyer...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              {!flyerGenerated && (
              <div className="bg-white flex-shrink-0">
                  <div className={`px-6 ${messages.length > 0 ? 'pt-2' : 'pt-7'} pb-8 md:pb-5 space-y-3`}>
                    {/* Content Section */}
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Title *</label>
                        <input
                          type="text"
                          placeholder="SUMMER SALE · GRAND OPENING · YOGA BRUNCH"
                          value={mainTitle}
                          onChange={(e) => setMainTitle(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                        <input
                          type="text"
                          placeholder="Join us for an unforgettable experience"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Feature List</label>
                        <input
                          type="text"
                          placeholder="SPECIAL OFFERS · LIVE MUSIC · FREE DRINKS · PRIZES"
                          value={featureList}
                          onChange={(e) => setFeatureList(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Date & Time</label>
                        <input
                          type="text"
                          placeholder="Saturday, Dec 14 at 7pm"
                          value={dateTime}
                          onChange={(e) => setDateTime(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Color</label>
                          <input
                            type="text"
                            placeholder="Pastel Pink or #FFB6C1"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Secondary Color</label>
                          <input
                            type="text"
                            placeholder="Navy or #000080"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 transition-all bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Additional Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Information</label>
                      <textarea
                        placeholder="Add location, special instructions, contact info, aspect ratio: 9:16, etc."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        disabled={isLoading}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base disabled:bg-gray-50 disabled:opacity-50 resize-none transition-all bg-white"
                      />
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !mainTitle.trim()}
                      className="w-full px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-1"
                    >
                      {isLoading ? 'Generating Flyer...' : '✨ Generate Flyer'}
                    </button>
                  </div>
              </div>
              )}
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="flex flex-col">
              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border-2 border-green-300 pt-5 px-8 pb-8 space-y-5">
                <div className="mb-2">
                  <h2 className="font-heading font-bold text-lg text-gray-900 mb-1">
                    Get Started Today
                  </h2>
                  <p className="text-xs text-gray-500 mb-0">
                    Fill in your details to begin your free trial
                  </p>
                </div>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="studioName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="studioName"
                    required
                    value={formData.studioName}
                    onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base transition-all"
                    placeholder="Your Business Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Instagram Handle <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-base transition-all"
                    placeholder="@yourbusiness"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-colors font-medium text-base shadow-sm mt-6"
                >
                  Start Free Trial →
                </button>

                {/* Footer Text */}
                <p className="text-xs text-gray-500 text-center pt-1">
                  We'll contact you within 24 hours to set up your free trial
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

