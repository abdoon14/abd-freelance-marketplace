import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { setUser, setToken } from '../redux/slices/authSlice'
import { AppDispatch } from '../redux/store'

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [userType, setUserType] = useState<'client' | 'freelancer'>('client')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        toast.success('Account created successfully!')
        navigate('/dashboard')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-secondary text-center mb-8">Join ABD Freelance today</p>

          {/* User Type Selection */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setUserType('client')}
              className={`p-4 rounded-lg border-2 transition ${
                userType === 'client'
                  ? 'border-accent bg-dark-700'
                  : 'border-dark-600 hover:border-dark-500'
              }`}
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-semibold">Client</div>
              <div className="text-xs text-secondary">Hire freelancers</div>
            </button>
            <button
              onClick={() => setUserType('freelancer')}
              className={`p-4 rounded-lg border-2 transition ${
                userType === 'freelancer'
                  ? 'border-accent bg-dark-700'
                  : 'border-dark-600 hover:border-dark-500'
              }`}
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="font-semibold">Freelancer</div>
              <div className="text-xs text-secondary">Sell services</div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
