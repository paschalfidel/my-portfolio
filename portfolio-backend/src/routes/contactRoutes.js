import express from 'express'
import { 
  submitContactForm, 
  getMessages, 
  markAsRead 
} from '../controllers/contactController.js'
import { validateContactForm } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.post('/submit', validateContactForm, submitContactForm)

// Private routes (for learning - you can add basic auth later)
router.get('/messages', getMessages)
router.patch('/messages/:id/read', markAsRead)

export default router