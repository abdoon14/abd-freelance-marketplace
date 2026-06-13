import api from './api'

export const gigsService = {
  getAll: async (filters?: any) => {
    const response = await api.get('/gigs', { params: filters })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/gigs/${id}`)
    return response.data
  },

  create: async (data: FormData) => {
    const response = await api.post('/gigs', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  update: async (id: string, data: FormData) => {
    const response = await api.put(`/gigs/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/gigs/${id}`)
    return response.data
  },

  getMyGigs: async () => {
    const response = await api.get('/gigs/my-gigs')
    return response.data
  },

  feature: async (id: string) => {
    const response = await api.post(`/gigs/${id}/feature`)
    return response.data
  },
}
