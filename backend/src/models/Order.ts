import { Schema, model, Document, Types } from 'mongoose'

export interface IOrder extends Document {
  gigId: Types.ObjectId
  buyerId: Types.ObjectId
  sellerId: Types.ObjectId
  title: string
  price: number
  status: 'pending' | 'in-progress' | 'delivered' | 'completed' | 'cancelled'
  createdAt: Date
  expectedDeliveryDate: Date
  actualDeliveryDate?: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    gigId: { type: Schema.Types.ObjectId, ref: 'Gig', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'delivered', 'completed', 'cancelled'], default: 'pending' },
    expectedDeliveryDate: Date,
    actualDeliveryDate: Date,
  },
  { timestamps: true }
)

export const Order = model<IOrder>('Order', orderSchema)
