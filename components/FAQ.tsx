"use client"

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Who is this for?",
      answer: "This AI marketing platform is built specifically for sports and fitness businesses including gyms, pickleball centers, yoga studios, martial arts schools, dance studios, and recreation centers. If you run classes, events, or memberships, this is for you."
    },
    {
      question: "Do I approve posts before they go live?",
      answer: "Absolutely! You have full control. Our AI creates the content, but you can review and approve everything before it's published. You can also set it to auto-publish if you prefer hands-off automation once you trust the system."
    },
    {
      question: "Can it create flyers?",
      answer: "Yes! Our AI flyer designer creates professional, eye-catching flyers for your events, classes, promotions, and special offers. Just tell us what you need, and we'll generate multiple design options for you to choose from."
    },
    {
      question: "Does it help with SEO?",
      answer: "Definitely. Our SEO engine continuously optimizes your local search presence. We handle keyword research, content optimization, local listings, and provide weekly reports on your rankings and visibility improvements."
    },
    {
      question: "Can it update my website?",
      answer: "Yes! The AI analyzes your website copy and suggests improvements to increase conversions. Depending on your plan, we can either provide you with the updated copy to implement, or integrate directly with your website to make changes automatically."
    }
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our AI marketing platform
          </p>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary-300"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg 
                  className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            Contact our team →
          </button>
        </div>
      </div>
    </section>
  )
}

