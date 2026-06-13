import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { RootState } from '../redux/store'

const GigDetail: React.FC = () => {
  const { gigId } = useParams()
  const { user } = useSelector((state: RootState) => state.auth)
  const [gig, setGig] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gigs/${gigId}`)
        const data = await response.json()
        if (data.success) {
          setGig(data.gig)
        }
      } catch (error) {
        toast.error('Failed to load gig')
      } finally {
        setLoading(false)
      }
    }

    if (gigId) fetchGig()
  }, [gigId])

  if (loading) {
    return <div className="container-custom py-12">Loading...</div>
  }

  if (!gig) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Gig not found</h1>
        <Link to="/browse" className="text-accent hover:underline">Browse other gigs</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="bg-dark-700 h-96 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{gig.title}</h1>

              {/* Seller Info */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-dark-700 rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-dark-900 font-bold">
                  {gig.sellerId.firstName[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{gig.sellerId.firstName} {gig.sellerId.lastName}</p>
                  <p className="text-sm text-secondary">⭐ {gig.sellerId.rating} • {gig.sellerId.reviewCount} reviews</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">About this gig</h2>
              <p className="text-secondary leading-relaxed mb-8">{gig.description}</p>

              <div className="grid grid-cols-3 gap-4 p-4 bg-dark-700 rounded-lg">
                <div>
                  <p className="text-secondary text-sm">Delivery Time</p>
                  <p className="font-bold text-lg">{gig.deliveryTime} days</p>
                </div>
                <div>
                  <p className="text-secondary text-sm">Rating</p>
                  <p className="font-bold text-lg">⭐ {gig.rating}</p>
                </div>
                <div>
                  <p className="text-secondary text-sm">Orders</p>
                  <p className="font-bold text-lg">{gig.orderCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="card sticky top-24">
              <div className="text-center mb-6">
                <p className="text-secondary mb-2">Starting at</p>
                <p className="text-5xl font-bold text-accent">€{gig.price}</p>
              </div>

              {user?.userType === 'client' ? (
                <>
                  <button className="btn-primary w-full mb-4">Continue (Payment)</button>
                  <button className="btn-outline w-full">Contact Seller</button>
                </>
              ) : (
                <p className="text-center text-secondary text-sm">Login as a client to purchase</p>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-secondary text-sm mb-2">Category</p>
                  <p className="font-semibold">{gig.category}</p>
                </div>
                <div>
                  <p className="text-secondary text-sm mb-2">Views</p>
                  <p className="font-semibold">{gig.views}</p>
                </div>
                <div>
                  <p className="text-secondary text-sm mb-2">Listed</p>
                  <p className="font-semibold">{new Date(gig.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GigDetail
