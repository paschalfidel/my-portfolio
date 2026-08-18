import React, { useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion'

const Cursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`
      }
    }

    window.addEventListener('mousemove', moveCursor)
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(2)'
        cursorRef.current.style.borderColor = '#ffffff'
        cursorRef.current.style.backgroundColor = 'rgba(192,132,252,0.2)'
      }
    }
    
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)'
        cursorRef.current.style.borderColor = 'rgba(192, 132, 252, 0.6)'
        cursorRef.current.style.backgroundColor = 'transparent'
      }
    }
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-purple-400/60 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: 'transform'
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          transition: 'transform 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          willChange: 'transform'
        }}
      />
    </>
  )
}

export default Cursor