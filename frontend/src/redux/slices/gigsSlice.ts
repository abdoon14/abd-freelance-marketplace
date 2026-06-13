import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Gig {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviewCount: number
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
  }
}

interface GigsState {
  gigs: Gig[]
  selectedGig: Gig | null
  loading: boolean
  error: string | null
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    search: string
  }
}

const initialState: GigsState = {
  gigs: [],
  selectedGig: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
  },
}

const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    setGigs: (state, action: PayloadAction<Gig[]>) => {
      state.gigs = action.payload
    },
    setSelectedGig: (state, action: PayloadAction<Gig | null>) => {
      state.selectedGig = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<GigsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setGigs, setSelectedGig, setLoading, setError, setFilters } = gigsSlice.actions
export default gigsSlice.reducer
