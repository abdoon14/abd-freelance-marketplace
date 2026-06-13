import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()

// Get current user profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      message: error.message,
    })
  }
})

// Get user by ID
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
      message: error.message,
    })
  }
})

// Update user profile
router.put('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, bio, country, city, skills } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        bio,
        country,
        city,
        skills,
      },
      { new: true }
    ).select('-password')

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      message: error.message,
    })
  }
})

export default router
