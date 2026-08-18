import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Define allowed origins
const allowedOrigins =[
    'https://paschalomereife.vercel.app',
    'https://portfolio-frontend.vercel.app', // Alternative URL
    'http://localhost:5173',  // Local development
    'http://localhost:3000',   // Alternative local port
]

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('Blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,  // Important for cookies/auth
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`)
    console.log(`Rate limiting: ${rateLimitWindowMs / 1000 / 60} minutes, ${rateLimitMax} requests max`)
})