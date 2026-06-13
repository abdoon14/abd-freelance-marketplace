import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth.js'
import { Review } from '../models/Review.js'
import { User } from '../models/User.js'

const router = Router()

// Create review
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { orderId, revieweeId, rating, comment } = req.body

    const review = new Review({
      orderId,
      reviewerId: req.userId,
      revieweeId,
      rating,
      comment,
    })

    await review.save()

    // Update user rating
    const reviews = await Review.find({ revieweeId })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await User.findByIdAndUpdate(revieweeId, {
      rating: avgRating,
      reviewCount: reviews.length,
    })

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to create review',
      message: error.message,
    })
  }
})

// Get reviews for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ revieweeId: req.params.userId })
      .populate('reviewerId', 'firstName lastName avatar')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      reviews,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
      message: error.message,
    })
  }
})

export default router
