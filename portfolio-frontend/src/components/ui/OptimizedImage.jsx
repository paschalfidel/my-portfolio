import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const OptimizedImage = ({ src, alt, className, fallbackSrc }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      setIsLoaded(true)
      setError(false)
    }

    img.onerror = () => {
      setError(true)
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc)
      }
    }

    // cleanup (important for fast switching images)
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, fallbackSrc])

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Loading Skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 animate-pulse" />
      )}

      {/* Error State */}
      {error && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 bg-black/40">
          Failed to load image
        </div>
      )}

      <motion.img
        key={currentSrc} // 🔥 forces re-render when src changes
        src={currentSrc}
        alt={alt}
        className={`${className} ${
          isLoaded && !error ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        initial={{ scale: 1.05 }}
        animate={{ scale: isLoaded && !error ? 1 : 1.05 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

export default OptimizedImage