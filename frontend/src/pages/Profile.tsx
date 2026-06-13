import React, { useEffect, useState } from 'react'

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUser(data.user)
        })
        .finally(() => setLoading(false))
    }
  }, [])

  if (loading) return <div className="container-custom py-12">Loading...</div>

  if (!user) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-secondary mb-4">Please login to view profile</p>
        <a href="/login" className="btn-primary inline-block">
          Login
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-dark-900 font-bold text-4xl">
                {user.firstName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-secondary mb-2">{user.email}</p>
                <div className="flex gap-2">
                  <span className="badge badge-accent">{user.userType}</span>
                  {user.isVerified && <span className="badge badge-secondary">✓ Verified</span>}
                </div>
              </div>
            </div>
          </div>

          {user.bio && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Bio</h3>
              <p className="text-secondary">{user.bio}</p>
            </div>
          )}

          {user.skills && user.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string) => (
                  <span key={skill} className="badge badge-secondary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 p-4 bg-dark-700 rounded-lg">
            <div>
              <p className="text-secondary text-sm">Rating</p>
              <p className="font-bold text-lg">⭐ {user.rating}</p>
            </div>
            <div>
              <p className="text-secondary text-sm">Reviews</p>
              <p className="font-bold text-lg">{user.reviewCount}</p>
            </div>
            <div>
              <p className="text-secondary text-sm">Member Since</p>
              <p className="font-bold text-sm">{new Date(user.createdAt).getFullYear()}</p>
            </div>
            <div>
              <p className="text-secondary text-sm">Status</p>
              <p className="font-bold text-lg">✅ {user.status}</p>
            </div>
          </div>
        </div>

        <button className="btn-secondary">Edit Profile</button>
      </div>
    </div>
  )
}

export default Profile
