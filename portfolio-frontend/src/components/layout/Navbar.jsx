import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex justify-between items-center h-16 md:h-[4.5rem]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-lg md:text-xl font-semibold text-[var(--color-cream)] hover:text-[var(--color-accent)] transition-colors"
          >
            Paschal<span className="text-[var(--color-accent)]">.</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-[var(--color-cream-muted)] hover:text-[var(--color-cream)] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://linkedin.com/in/paschalomereife"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm !py-2 !px-4"
            >
              Let's talk
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden text-[var(--color-cream-muted)] text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="text-left py-3 text-[var(--color-cream-muted)] hover:text-[var(--color-cream)] transition-colors"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://linkedin.com/in/paschalomereife"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3 justify-center"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
