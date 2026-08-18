import nodemailer from 'nodemailer'

// Create transporter based on environment
const createTransporter = () => {
  // For development/testing with Ethereal (fake email service)
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD
      }
    })
  }
  
  // For production (Gmail, SendGrid, etc.)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

// Send notification email to yourself
export const sendEmailNotification = async (contact) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c084fc;">New Portfolio Contact</h2>
        <p><strong>From:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${contact.message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Received:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">
          Message ID: ${contact._id}<br>
          IP: ${contact.ipAddress}
        </p>
      </div>
    `
  }
  
  const info = await transporter.sendMail(mailOptions)
  console.log('Notification email sent:', info.messageId)
  return info
}

// Send auto-reply to the user
export const sendAutoReply = async (contact) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Paschal Omereife" <${process.env.EMAIL_USER}>`,
    to: contact.email,
    subject: 'Thank you for reaching out!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c084fc;">Thank You for Contacting Me! 🙏</h2>
        <p>Hi ${contact.name},</p>
        <p>Thank you for reaching out to me through my portfolio. I've received your message and will get back to you within 24-48 hours.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <p>${contact.message.replace(/\n/g, '<br>')}</p>
        </div>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Check out my <a href="https://github.com/paschalfidel">GitHub</a> for more projects</li>
          <li>Connect with me on <a href="https://linkedin.com/in/paschalomereife">LinkedIn</a></li>
        </ul>
        <p>Best regards,<br>
        <strong>Paschal Chidebe Omereife</strong><br>
        Full-Stack Software Engineer</p>
        <hr />
        <p style="font-size: 12px; color: #666;">
          This is an automated response. If you have urgent matters, please reply directly to this email.
        </p>
      </div>
    `
  }
  
  const info = await transporter.sendMail(mailOptions)
  console.log('Auto-reply email sent:', info.messageId)
  return info
}