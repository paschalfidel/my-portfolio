import Contact from '../models/Contact.js'
import { sendEmailNotification, sendAutoReply } from '../utils/emailService.js'

// @desc    Submit contact form
// @route   POST /api/contact/submit
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message, company } = req.body

    // Honeypot fields catch simple form bots without inconveniencing people.
    if (company) {
      return res.status(201).json({
        success: true,
        message: 'Message received.'
      })
    }
    
    // Get IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get('user-agent')?.slice(0, 500) || null
    
    // Check for duplicate submissions (within 5 minutes)
    const recentSubmission = await Contact.findOne({
      email,
      createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) }
    })
    
    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'Please wait 5 minutes before sending another message'
      })
    }
    
    // Create new contact message
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress,
      userAgent
    })
    
    await contact.save()
    
    // Persist first; email delivery remains best-effort and does not delay the response.
    Promise.all([
      sendEmailNotification(contact),
      sendAutoReply(contact)
    ]).catch(error => {
      console.error('Email sending error:', error)
    })
    
    res.status(201).json({
      success: true,
      message: "Thanks — I received your message and I'll reply within two working days."
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
}
