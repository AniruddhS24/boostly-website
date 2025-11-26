export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/mo",
      description: "Perfect for small studios just getting started",
      features: [
        "3 social posts per week",
        "Basic flyer templates",
        "Monthly SEO report",
        "Email support",
        "1 social platform"
      ],
      highlighted: false,
      buttonText: "Start Free Trial",
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Pro",
      price: "$199",
      period: "/mo",
      description: "Most popular for growing fitness businesses",
      features: [
        "Daily social posts",
        "Custom flyer designs",
        "Weekly SEO optimization",
        "Website copy improvements",
        "Priority support",
        "3 social platforms",
        "Analytics dashboard"
      ],
      highlighted: true,
      buttonText: "Start Free Trial",
      gradient: "from-primary-50 to-success-50"
    },
    {
      name: "Elite",
      price: "$399",
      period: "/mo",
      description: "Complete marketing automation for enterprises",
      features: [
        "2x daily social posts",
        "Premium flyer designs",
        "Daily SEO optimization",
        "Full website management",
        "Dedicated account manager",
        "Unlimited platforms",
        "Advanced analytics",
        "A/B testing",
        "Custom integrations"
      ],
      highlighted: false,
      buttonText: "Start Free Trial",
      gradient: "from-amber-50 to-orange-50"
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent <span className="text-primary-600">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'bg-white border-2 border-primary-500 shadow-2xl scale-105 z-10' 
                  : `bg-gradient-to-br ${plan.gradient} border border-gray-200 shadow-lg`
              } transition-transform hover:scale-105 duration-300`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-success-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 text-sm">
                {plan.description}
              </p>
              
              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 text-lg">{plan.period}</span>
              </div>
              
              {/* CTA Button */}
              <button className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 mb-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-primary-600 to-success-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50'
              }`}>
                {plan.buttonText}
              </button>
              
              {/* Features List */}
              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            💳 No credit card required • Cancel anytime • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  )
}

