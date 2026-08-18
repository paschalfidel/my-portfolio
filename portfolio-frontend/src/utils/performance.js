// Safe performance monitoring - only runs after render
export const reportPerformance = () => {
  // Use requestIdleCallback to avoid blocking render
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      if ('performance' in window) {
        // Get paint metrics safely
        const paintMetrics = performance.getEntriesByType('paint')
        if (paintMetrics.length > 0 && import.meta.env.NODE_ENV === 'development') {
          paintMetrics.forEach(metric => {
            console.log(`${metric.name}: ${metric.startTime.toFixed(2)}ms`)
          })
        }
        
        // Get navigation timing safely
        const navigationTiming = performance.getEntriesByType('navigation')[0]
        if (navigationTiming && import.meta.env.NODE_ENV === 'development') {
          const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart
          const domInteractive = navigationTiming.domInteractive - navigationTiming.fetchStart
          console.log('Page Load Time:', loadTime.toFixed(2), 'ms')
          console.log('DOM Interactive:', domInteractive.toFixed(2), 'ms')
        }
      }
    })
  }
}

// Safe interaction tracking
export const trackInteraction = (elementName, action) => {
  if (import.meta.env.NODE_ENV === 'development') {
    console.log(`Interaction tracked: ${elementName} - ${action}`)
  }
}