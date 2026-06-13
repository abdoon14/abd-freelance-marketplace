import api from './api'

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: 'client' | 'freelancer'
}

interface LoginData {
  email: string
  password: string
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  verifyEmail: async (email: string, code: string) => {
    const response = await api.post('/auth/verify-email', { email, code })
    return response.data
  },

  resetPassword: async (email: string) => {
    const response = await api.post('/auth/reset-password', { email })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },
}
