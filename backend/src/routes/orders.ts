import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth.js'
import { Order } from '../models/Order.js'

const router = Router()

// Create order
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { gigId, sellerId, title, price } = req.body

    const order = new Order({
      gigId,
      buyerId: req.userId,
      sellerId,
      title,
      price,
      status: 'pending',
      expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    await order.save()

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message,
    })
  }
})

// Get my orders
router.get('/my-orders', authenticate, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      $or: [{ buyerId: req.userId }, { sellerId: req.userId }],
    })
      .populate('gigId')
      .populate('buyerId', 'firstName lastName avatar')
      .populate('sellerId', 'firstName lastName avatar')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      orders,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message,
    })
  }
})

// Update order status
router.put('/:orderId/status', authenticate, async (req: Request, res: Response) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Order status updated',
      order,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to update order',
      message: error.message,
    })
  }
})

export default router
