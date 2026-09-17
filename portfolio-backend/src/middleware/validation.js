import { body, validationResult } from 'express-validator'

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),

  body('company')
    .optional({ values: 'falsy' })
    .isLength({ max: 0 }).withMessage('Invalid submission'),
  
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map(err => ({ field: err.path, message: err.msg }))
      return res.status(400).json({
        success: false,
        message: validationErrors[0].message,
        errors: validationErrors
      })
    }
    next()
  }
]
