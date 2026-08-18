import Contact from '../models/Contact.js'
import { sendEmailNotification, sendAutoReply } from '../utils/emailService.js'

// @desc    Submit contact form
// @route   POST /api/contact/submit
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body
    
    // Get IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.headers['user-agent']
    
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
    
    // Send email notifications (don't await to avoid blocking response)
    Promise.all([
      sendEmailNotification(contact),
      sendAutoReply(contact)
    ]).catch(error => {
      console.error('Email sending error:', error)
    })
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
      }
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
}

// @desc    Get all messages (Admin only - for your learning)
// @route   GET /api/contact/messages
// @access  Private (you'll add auth later)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100)
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    })
  }
}

// @desc    Mark message as read
// @route   PATCH /api/contact/messages/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    )
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: message
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    })
  }
}