import { Schema, model, Document, Types } from 'mongoose'

export interface IReview extends Document {
  orderId: Types.ObjectId
  reviewerId: Types.ObjectId
  revieweeId: Types.ObjectId
  rating: number
  comment: string
  createdAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    revieweeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
)

export const Review = model<IReview>('Review', reviewSchema)
