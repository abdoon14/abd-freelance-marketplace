import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth.js'
import { Payment } from '../models/Payment.js'
import { Order } from '../models/Order.js'

const router = Router()

// Get payment history
router.get('/history', authenticate, async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find({
      $or: [{ buyerId: req.userId }, { sellerId: req.userId }],
    })
      .populate('orderId')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      payments,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment history',
      message: error.message,
    })
  }
})

// Get earnings
router.get('/earnings', authenticate, async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find({
      sellerId: req.userId,
      status: 'completed',
    })

    const total = payments.reduce((sum, p) => sum + p.sellerEarning, 0)

    res.json({
      success: true,
      earnings: {
        total,
        available: total,
        pending: 0,
        currency: 'EUR',
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch earnings',
      message: error.message,
    })
  }
})

export default router
