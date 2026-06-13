import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth.js'
import { Gig } from '../models/Gig.js'

const router = Router()

// Create gig
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { title, description, category, price, deliveryTime } = req.body

    const gig = new Gig({
      sellerId: req.userId,
      title,
      description,
      category,
      price,
      deliveryTime,
      status: 'pending',
    })

    await gig.save()

    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      gig,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to create gig',
      message: error.message,
    })
  }
})

// Get all gigs
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 20 } = req.query

    let query: any = { status: 'active' }

    if (category) query.category = category
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) }
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) }

    const skip = (Number(page) - 1) * Number(limit)

    const gigs = await Gig.find(query)
      .populate('sellerId', 'firstName lastName avatar rating')
      .skip(skip)
      .limit(Number(limit))
      .sort({ isFeatured: -1, createdAt: -1 })

    const total = await Gig.countDocuments(query)

    res.json({
      success: true,
      gigs,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gigs',
      message: error.message,
    })
  }
})

// Get gig by ID
router.get('/:gigId', async (req: Request, res: Response) => {
  try {
    const gig = await Gig.findByIdAndUpdate(
      req.params.gigId,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('sellerId', 'firstName lastName avatar rating reviewCount')

    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found',
      })
    }

    res.json({
      success: true,
      gig,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gig',
      message: error.message,
    })
  }
})

// Get my gigs
router.get('/user/my-gigs', authenticate, async (req: Request, res: Response) => {
  try {
    const gigs = await Gig.find({ sellerId: req.userId })

    res.json({
      success: true,
      gigs,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gigs',
      message: error.message,
    })
  }
})

export default router
