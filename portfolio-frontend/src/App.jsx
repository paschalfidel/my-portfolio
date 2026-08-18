import React, { Suspense, lazy, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion'
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
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
    if ('serviceWorker' in navigator && import.meta.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.error('Service Worker registration failed:', error)
        })
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)]">
      <div className="page-grain" aria-hidden="true" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] origin-left z-50"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
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
