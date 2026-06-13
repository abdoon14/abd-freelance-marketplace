import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home: React.FC = () => {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gigs?limit=6`)
        const data = await response.json()
        if (data.success) {
          setGigs(data.gigs)
        }
      } catch (error) {
        console.error('Error fetching gigs:', error)
        toast.error('Failed to load gigs')
      } finally {
        setLoading(false)
      }
    }

    fetchGigs()
  }, [])

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
                Connect with talented freelancers and get your projects done by professionals worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse" className="btn-primary text-center">
                  Browse Gigs
                </Link>
                <button className="btn-outline text-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-96 bg-gradient-to-br from-accent to-gold-700 rounded-lg border-2 border-accent flex items-center justify-center shadow-2xl shadow-accent/30">
                <span className="text-6xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-4">Featured Gigs</h2>
          <p className="text-secondary mb-12">Explore top-rated services from our best freelancers</p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card h-64 animate-pulse">
                  <div className="bg-dark-700 h-40 rounded mb-4"></div>
                  <div className="bg-dark-700 h-4 rounded mb-2"></div>
                  <div className="bg-dark-700 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gigs.length > 0 ? (
                gigs.map((gig: any) => (
                  <Link
                    key={gig._id}
                    to={`/gig/${gig._id}`}
                    className="card-hover group"
                  >
                    <div className="bg-dark-700 h-40 rounded-lg mb-4 group-hover:bg-dark-600 transition"></div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition line-clamp-2">
                      {gig.title}
                    </h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-accent font-bold">€{gig.price}</span>
                      <span className="text-sm text-secondary">⭐ {gig.rating}</span>
                    </div>
                    <p className="text-sm text-secondary line-clamp-2">{gig.description}</p>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center text-secondary py-12">
                  <p className="text-lg">No gigs available yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-dark-800">
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
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
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
          <Link
            to="/signup"
            className="inline-block bg-dark-900 text-accent font-bold py-3 px-8 rounded-lg hover:bg-dark-800 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
