import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const RESUME_URL = '/Paschal-Omereife-Resume.pdf'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined
    const closeOnEscape = event => event.key === 'Escape' && setMobileMenuOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--color-bg)]/92 backdrop-blur-md border-b border-[var(--color-line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="inline-flex min-h-11 items-center font-display text-[1.05rem] font-semibold tracking-tight text-[var(--color-ink)]">
            Paschal Omereife
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-[0.9375rem] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href={RESUME_URL} download="Paschal-Omereife-Resume.pdf" className="btn-primary !py-2 !px-3.5 text-sm">
              Resume
            </a>
          </nav>

          <button
            type="button"
            className="icon-button mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true">{mobileMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="border-b border-[var(--color-line)] bg-[var(--color-paper)] md:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="py-3 text-left text-[var(--color-muted)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                download="Paschal-Omereife-Resume.pdf"
                className="btn-primary mt-2 mb-3"
              >
                Resume
              </a>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
