import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition">
              <span className="text-dark-900 font-bold text-lg">ABD</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">ABD Freelance</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-secondary hover:text-accent transition">
              Browse
            </Link>
            <Link to="/sellers" className="text-secondary hover:text-accent transition">
              Sellers
            </Link>
            <Link to="/how-it-works" className="text-secondary hover:text-accent transition">
              How it Works
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-secondary hover:text-accent transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="btn-primary text-sm">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary hover:text-accent transition">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link to="/browse" className="block text-secondary hover:text-accent transition">
              Browse
            </Link>
            <Link to="/sellers" className="block text-secondary hover:text-accent transition">
              Sellers
            </Link>
            <Link to="/how-it-works" className="block text-secondary hover:text-accent transition">
              How it Works
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
