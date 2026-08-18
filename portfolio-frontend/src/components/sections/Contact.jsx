import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

    try {
      const response = await fetch(`${apiUrl}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || "Got it — I'll reply within a day or two."
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Something went wrong. Try again or email me directly.'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus({
        success: false,
        message: "Couldn't reach the server. Email me at paschalfidel@gmail.com instead."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <div>
              <p className="section-label mb-4">Contact</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-cream)] mb-4">
                Say hello
              </h2>
              <p className="text-[var(--color-cream-muted)] leading-relaxed mb-8 max-w-md">
                Hiring for a role, need a contractor, or just want to talk shop?
                Drop a message — I read everything.
              </p>

              <div className="space-y-5 text-sm">
                <div>
                  <p className="section-label mb-1">Email</p>
                  <a
                    href="mailto:paschalfidel@gmail.com"
                    className="text-[var(--color-cream)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    paschalfidel@gmail.com
                  </a>
                </div>
                <div>
                  <p className="section-label mb-1">Phone</p>
                  <p className="text-[var(--color-cream-muted)]">+234 803 897 3539</p>
                </div>
                <div>
                  <p className="section-label mb-1">Location</p>
                  <p className="text-[var(--color-cream-muted)]">Lagos, Nigeria · open to remote</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-[var(--color-border)]">
                <a
                  href="https://linkedin.com/in/paschalomereife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-cream-dim)] hover:text-[var(--color-accent)] transition-colors"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://github.com/paschalfidel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-cream-dim)] hover:text-[var(--color-accent)] transition-colors"
                >
                  GitHub →
                </a>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="section-label block mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-[var(--color-cream)] placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-accent)] focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="section-label block mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-[var(--color-cream)] placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-accent)] focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="section-label block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-[var(--color-cream)] placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="What's on your mind?"
                />
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded-lg text-sm border ${
                    submitStatus.success
                      ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30'
                      : 'bg-red-500/10 text-red-300 border-red-500/20'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
