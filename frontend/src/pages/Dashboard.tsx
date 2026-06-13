import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { logout } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-secondary mb-2">{user.email}</p>
              <p className="text-sm">
                <span className="badge badge-secondary">{user.userType}</span>
              </p>
            </div>
            {user.userType === 'freelancer' && (
              <button className="btn-primary">Create New Gig</button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <p className="text-secondary mb-2">Total Orders</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="card">
            <p className="text-secondary mb-2">Total Earnings</p>
            <p className="text-3xl font-bold text-accent">€0.00</p>
          </div>
          <div className="card">
            <p className="text-secondary mb-2">Rating</p>
            <p className="text-3xl font-bold">⭐ 5.0</p>
          </div>
          <div className="card">
            <p className="text-secondary mb-2">Account Status</p>
            <p className="text-3xl font-bold">✅ Active</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#" className="card-hover">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-bold mb-2">My Orders</h3>
            <p className="text-secondary text-sm">View and manage your orders</p>
          </a>
          <a href="#" className="card-hover">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold mb-2">Messages</h3>
            <p className="text-secondary text-sm">Chat with clients</p>
          </a>
          <a href="#" className="card-hover">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold mb-2">Earnings</h3>
            <p className="text-secondary text-sm">Manage your wallet</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
