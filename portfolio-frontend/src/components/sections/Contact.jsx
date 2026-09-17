import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      if (!API_URL) throw new Error('VITE_API_URL is not configured')

      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const contentType = response.headers.get('content-type') || ''
      const data = contentType.includes('application/json') ? await response.json() : {}

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || "Got it — I'll reply within a day or two."
        })
        setFormData({ name: '', email: '', message: '', company: '' })
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Something went wrong. Email me directly instead.'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus({
        success: false,
        message: "Couldn't reach the server. Email paschalfidel@gmail.com."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const fieldClass =
    'w-full rounded-md border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-3.5 py-2.5 text-[var(--color-ink)] placeholder:text-[var(--color-dim)] focus:border-[var(--color-ink)] focus:outline-none disabled:opacity-50'

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-[var(--color-line)] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid gap-14 lg:grid-cols-2"
        >
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-[2.1rem]">
              Let’s talk
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--color-muted)]">
              If you’re hiring, contracting, or just curious — send a note. I read everything
              and I reply myself.
            </p>

            <dl className="mt-10 space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-sm text-[var(--color-dim)]">Email</dt>
                <dd>
                  <a href="mailto:paschalfidel@gmail.com" className="text-link inline-flex min-h-11 items-center">
                    paschalfidel@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-dim)]">Phone</dt>
                <dd><a className="text-link inline-flex min-h-11 items-center" href="tel:+2348038973539">+234 803 897 3539</a></dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-dim)]">Based in</dt>
                <dd className="text-[var(--color-ink)]">Lagos · open to remote</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-note" aria-busy={isSubmitting}>
            <p id="form-note" className="text-sm text-[var(--color-dim)]">Usually replies within two working days.</p>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company">Company website</label>
              <input id="company" name="company" type="text" tabIndex="-1" autoComplete="off" value={formData.company} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-[var(--color-muted)]">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                minLength="2"
                maxLength="100"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={fieldClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-[var(--color-muted)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                maxLength="254"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={fieldClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-[var(--color-muted)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                minLength="10"
                maxLength="1000"
                required
                disabled={isSubmitting}
                className={`${fieldClass} resize-none`}
                placeholder="Role, timeline, anything useful…"
              />
            </div>

            {submitStatus && (
              <p
                className={`rounded-md border px-3 py-2.5 text-sm ${
                  submitStatus.success
                    ? 'border-[var(--color-success)]/30 bg-green-50 text-[var(--color-success)]'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
                role="status"
                aria-live="polite"
              >
                {submitStatus.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        </Motion.div>
      </div>
    </section>
  )
}

export default Contact
