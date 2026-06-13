import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import gigsReducer from './slices/gigsSlice'
import ordersReducer from './slices/ordersSlice'
import notificationsReducer from './slices/notificationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigsReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
