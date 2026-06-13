import { Request, Response } from 'express'
import { User } from '../models/User.js'
import { generateToken } from '../utils/jwt.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { sendEmail } from '../utils/email.js'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
        message: 'Email is already registered',
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to ABD Freelance',
      `<h1>Welcome ${firstName}!</h1><p>Your account has been created successfully.</p>`
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
      token,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message,
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      })
    }

    // Check password
    const isPasswordCorrect = await comparePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
      token,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message,
    })
  }
}
