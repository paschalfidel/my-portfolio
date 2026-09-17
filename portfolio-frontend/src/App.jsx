import { Suspense, lazy, useEffect } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { useAnalytics } from './hooks/useAnalytics'
import { reportPerformance } from './utils/performance'

const Hero = lazy(() => import('./components/sections/Hero'))
const Work = lazy(() => import('./components/sections/Work'))
const About = lazy(() => import('./components/sections/About'))
const Contact = lazy(() => import('./components/sections/Contact'))

function App() {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 40,
    restDelta: 0.001
  })

  useAnalytics()

  useEffect(() => {
    const timer = setTimeout(() => {
      reportPerformance()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return undefined
    const registerServiceWorker = () => navigator.serviceWorker.register('/sw.js').catch(error => console.error('Service Worker registration failed:', error))
    window.addEventListener('load', registerServiceWorker)
    return () => window.removeEventListener('load', registerServiceWorker)
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)]">
      <a href="#main-content" className="skip-link">Skip to content</a>
      {!shouldReduceMotion && <Motion.div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--color-accent)]" style={{ scaleX }} aria-hidden="true" />}

      <Navbar />

      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <Work />
          <About />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App
