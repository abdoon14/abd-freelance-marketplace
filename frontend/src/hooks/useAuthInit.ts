import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
import { RootState, AppDispatch } from '../redux/store'

const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) {
      // Fetch current user
      fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(setUser(data.user))
          }
        })
        .catch((err) => console.error('Auth init error:', err))
    }
  }, [token, dispatch])
}

export default useAuthInit
