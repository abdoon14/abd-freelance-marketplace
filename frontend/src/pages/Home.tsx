import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-900 to-dark-800 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Find Your Perfect <span className="text-accent">Freelancer</span>
              </h1>
              <p className="text-xl text-secondary mb-8">
                Connect with talented freelancers and get your projects done by professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  Browse Gigs
                </button>
                <button className="btn-outline">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-96 bg-dark-700 rounded-lg border-2 border-accent flex items-center justify-center">
                <span className="text-accent text-6xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose ABD Freelance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: 'Verified Freelancers',
                description: 'All freelancers are verified and reviewed by our community.',
              },
              {
                icon: '💳',
                title: 'Secure Payments',
                description: 'Your money is protected until you\'re satisfied with the work.',
              },
              {
                icon: '⏱️',
                title: 'Fast Delivery',
                description: 'Get your projects completed on time with our quality assurance.',
              },
            ].map((feature, index) => (
              <div key={index} className="card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-dark-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-dark-700 mb-8 text-lg">
            Join thousands of satisfied clients and freelancers on ABD Freelance.
          </p>
          <button className="bg-dark-900 text-accent font-bold py-3 px-8 rounded-lg hover:bg-dark-800 transition">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
