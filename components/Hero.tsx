export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-success-50 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI Social Media Manager <br />
            <span className="bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
              for Sports & Fitness Businesses
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create content, flyers, SEO improvements, and website updates — automated for gyms, studios, and recreation centers.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-200">
              See How It Works
            </button>
          </div>
          
          {/* Hero Visual Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-300">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-success-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto text-primary-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-gray-600 font-medium text-lg">AI-Powered Marketing Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-success-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  )
}

