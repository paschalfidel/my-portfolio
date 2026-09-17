import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page content">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[var(--color-line-strong)] border-t-[var(--color-accent)] motion-reduce:animate-none" aria-hidden="true" />
    </div>
  )
}

export default LoadingSpinner
