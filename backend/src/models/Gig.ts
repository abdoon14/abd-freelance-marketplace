import { Schema, model, Document, Types } from 'mongoose'

export interface IGig extends Document {
  sellerId: Types.ObjectId
  title: string
  description: string
  category: string
  price: number
  deliveryTime: number
  images: string[]
  status: 'pending' | 'active' | 'inactive' | 'rejected'
  rating: number
  reviewCount: number
  orderCount: number
  views: number
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

const gigSchema = new Schema<IGig>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 5 },
    deliveryTime: { type: Number, required: true, min: 1 },
    images: [String],
    status: { type: String, enum: ['pending', 'active', 'inactive', 'rejected'], default: 'pending' },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Index for search
gigSchema.index({ title: 'text', description: 'text' })

export const Gig = model<IGig>('Gig', gigSchema)
