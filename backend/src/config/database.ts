import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/abd-freelance'
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log('✅ MongoDB Connected Successfully')
    
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    process.exit(1)
  }
}

export default connectDB
