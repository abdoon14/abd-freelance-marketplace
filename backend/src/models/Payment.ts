import { Schema, model, Document, Types } from 'mongoose'

export interface IPayment extends Document {
  orderId: Types.ObjectId
  buyerId: Types.ObjectId
  sellerId: Types.ObjectId
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  platformCommission: number
  sellerEarning: number
  stripePaymentIntentId?: string
  createdAt: Date
  completedAt?: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'EUR' },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    platformCommission: Number,
    sellerEarning: Number,
    stripePaymentIntentId: String,
    completedAt: Date,
  },
  { timestamps: true }
)

export const Payment = model<IPayment>('Payment', paymentSchema)
