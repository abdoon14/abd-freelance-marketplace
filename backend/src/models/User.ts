import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  userType: 'client' | 'freelancer'
  phone?: string
  country?: string
  city?: string
  skills?: string[]
  languages?: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  status: 'active' | 'suspended' | 'banned'
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    bio: String,
    userType: { type: String, enum: ['client', 'freelancer'], required: true },
    phone: String,
    country: String,
    city: String,
    skills: [String],
    languages: [String],
    rating: { type: Number, default: 5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)
