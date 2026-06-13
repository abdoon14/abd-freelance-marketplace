export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  userType: 'client' | 'freelancer'
  rating: number
  reviewCount: number
  isVerified: boolean
  createdAt: string
}

export interface Gig {
  id: string
  title: string
  description: string
  price: number
  deliveryTime: number
  category: string
  images: string[]
  status: 'pending' | 'active' | 'inactive' | 'rejected'
  rating: number
  reviewCount: number
  seller: User
  createdAt: string
}

export interface Order {
  id: string
  gigId: string
  buyerId: string
  sellerId: string
  status: 'pending' | 'in-progress' | 'delivered' | 'completed' | 'cancelled'
  price: number
  createdAt: string
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}

export interface Review {
  id: string
  orderId: string
  rating: number
  comment: string
  reviewer: User
  reviewee: User
  createdAt: string
}

export interface Notification {
  id: string
  type: 'order' | 'message' | 'review' | 'payment' | 'system'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}
