import { useEffect, useRef } from 'react'

export const usePerformance = (componentName) => {
  // Store start time in ref, but don't call performance.now during render
  const startTime = useRef(null)
  
  // Use useEffect to get performance.now after render
  useEffect(() => {
    // Set start time when component mounts
    startTime.current = performance.now()
    
    return () => {
      // Log unmount time when component unmounts
      if (startTime.current && import.meta.env.NODE_ENV === 'development') {
        const unmountTime = performance.now() - startTime.current
        console.log(`${componentName} was mounted for ${unmountTime.toFixed(2)}ms`)
      }
    }
  }, [componentName])
  
  // Optional: log mount time in separate effect
  useEffect(() => {
    if (startTime.current && import.meta.env.NODE_ENV === 'development') {
      const mountTime = performance.now() - startTime.current
      console.log(`${componentName} mounted in ${mountTime.toFixed(2)}ms`)
    }
  }, [componentName])
}

// Web Vitals reporting - moved to separate file to avoid impure calls during render
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}