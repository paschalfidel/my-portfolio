import express from 'express'
import { submitContactForm } from '../controllers/contactController.js'
import { validateContactForm } from '../middleware/validation.js'

const router = express.Router()

router.post('/submit', validateContactForm, submitContactForm)

export default router
