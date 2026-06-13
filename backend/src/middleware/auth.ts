import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.js'

declare global {
  namespace Express {
    interface Request {
      userId?: string
      user?: any
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'No token provided',
      })
    }

    const decoded: any = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      })
    }

    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Authentication failed',
    })
  }
}
