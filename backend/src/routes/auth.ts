import { Router, Request, Response } from 'express'
import { register, login } from '../controllers/auth.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
