export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Request body must be valid JSON'
    })
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    })
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    })
  }
  
  const status = err.status || 500
  const isProduction = process.env.NODE_ENV === 'production'

  res.status(status).json({
    success: false,
    message: isProduction && status >= 500 ? 'Server Error' : (err.message || 'Server Error')
  })
}
