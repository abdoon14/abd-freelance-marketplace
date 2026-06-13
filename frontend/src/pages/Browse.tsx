import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Browse: React.FC = () => {
  const [gigs, setGigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
  })

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.category) params.append('category', filters.category)
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
        if (filters.search) params.append('search', filters.search)

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/gigs?${params.toString()}`
        )
        const data = await response.json()
        if (data.success) {
          setGigs(data.gigs)
        }
      } catch (error) {
        toast.error('Failed to load gigs')
      } finally {
        setLoading(false)
      }
    }

    fetchGigs()
  }, [filters])

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Browse Gigs</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="card h-fit">
            <h3 className="text-xl font-bold mb-4">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search gigs..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input w-full"
                >
                  <option value="">All Categories</option>
                  <option value="web-development">Web Development</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="writing">Writing</option>
                  <option value="video-editing">Video Editing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">
                  Price Range: €{filters.minPrice} - €{filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card h-64 animate-pulse">
                    <div className="bg-dark-700 h-40 rounded mb-4"></div>
                    <div className="bg-dark-700 h-4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : gigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gigs.map((gig) => (
                  <a
                    key={gig._id}
                    href={`/gig/${gig._id}`}
                    className="card-hover group"
                  >
                    <div className="bg-dark-700 h-40 rounded-lg mb-4 group-hover:bg-dark-600 transition"></div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{gig.title}</h3>
                    <p className="text-sm text-secondary line-clamp-2 mb-4">{gig.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent font-bold">€{gig.price}</span>
                      <span className="text-sm">⭐ {gig.rating}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-secondary">
                <p className="text-lg">No gigs found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse
