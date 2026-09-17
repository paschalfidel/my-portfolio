import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const validateRuntimeConfig = () => {
  const required = ['MONGODB_URI']
  if (process.env.NODE_ENV === 'production') required.push('EMAIL_USER', 'EMAIL_PASS')

  const missing = required.filter(name => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Render terminates TLS before forwarding requests, so Express must trust one proxy
// hop for req.ip and express-rate-limit to identify visitors correctly.
app.set('trust proxy', 1)
app.disable('x-powered-by')

const productionOrigins = (process.env.ALLOWED_ORIGINS || 'https://paschalomereife.vercel.app')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

const developmentOrigins = ['http://localhost:5173', 'http://localhost:3000']
const allowedOrigins = new Set([
  ...productionOrigins,
  ...(process.env.NODE_ENV === 'production' ? [] : developmentOrigins)
])

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.has(origin)) {
      callback(null, true)
    } else {
      const error = new Error('Origin is not allowed')
      error.status = 403
      callback(error)
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}

// Convert environment variables to numbers
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 5

// Rate limiting
const limiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: rateLimitMax, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Middleware
app.use(cors(corsOptions));


// Rest of middleware
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }))

// Apply rate limiting to contact routes
app.use('/api/contact', limiter);

// Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware 
app.use(errorHandler);

const startServer = async () => {
  try {
    validateRuntimeConfig()
    await connectDB()
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })

    let isShuttingDown = false
    const shutdown = async signal => {
      if (isShuttingDown) return
      isShuttingDown = true
      console.log(`${signal} received. Closing server.`)
      server.close(async () => {
        await mongoose.disconnect()
        process.exit(0)
      })

      // Do not leave a deployment hanging indefinitely on open sockets.
      setTimeout(() => process.exit(1), 10000).unref()
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`)
    process.exit(1)
  }
}

startServer()
