import { useEffect } from 'react'

export const useAnalytics = () => {
  useEffect(() => {
    // Track page view after mount
    const trackPageView = () => {
      if (import.meta.env.DEV) {
        console.log('Page view tracked:', window.location.pathname)
      }
      // Send to analytics service here
    }

    // Track outbound links
    const handleOutboundLink = (e) => {
      const target = e.target.closest('a')
      if (target && target.href && !target.href.includes(window.location.origin)) {
        if (import.meta.env.DEV) {
          console.log('Outbound click:', {
            url: target.href,
            text: target.innerText || target.textContent
          })
        }
      }
    }

    // Delay tracking to avoid blocking render
    const timer = setTimeout(() => {
      trackPageView()
    }, 100)
    
    document.addEventListener('click', handleOutboundLink)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleOutboundLink)
    }
  }, [])
}
