export default function Solution() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-success-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8">
            <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Meet the AI that manages <br />your marketing for you.
          </h2>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Daily posts, weekly SEO improvements, automatic flyer creation, and website upgrades — all without lifting a finger.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: "📱", label: "Daily Posts" },
              { icon: "📊", label: "SEO Boost" },
              { icon: "🎨", label: "Auto Flyers" },
              { icon: "🌐", label: "Site Updates" }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

