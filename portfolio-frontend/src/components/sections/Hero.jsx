import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const RESUME_URL = '/Paschal-Omereife-Resume.pdf'

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs']

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-5xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-cream-muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                Open to full-time &amp; contract roles
              </span>
              <span className="hidden sm:inline text-[var(--color-cream-dim)]">·</span>
              <span className="text-sm text-[var(--color-cream-dim)]">Lagos, Nigeria</span>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.05] font-semibold text-[var(--color-cream)] mb-6 max-w-3xl">
              I build web products that solve{' '}
              <em className="not-italic text-[var(--color-accent)]">real</em> problems.
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-cream-muted)] leading-relaxed max-w-2xl mb-4">
              Hi — I'm Paschal. Full-stack engineer with seven years of customer-facing and IT
              support experience. I ship React frontends, Node backends, and the glue in between.
            </p>

            <p className="text-base text-[var(--color-cream-dim)] leading-relaxed max-w-xl mb-10">
              Previously resolving telecom issues at scale. Now building platforms like movie
              recommendations and local service marketplaces.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button type="button" onClick={scrollToWork} className="btn-primary">
                View selected work
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
              <a
                href={RESUME_URL}
                download="Paschal-Omereife-Resume.pdf"
                className="btn-secondary"
              >
                <i className="fas fa-file-pdf text-sm"></i>
                Download résumé
              </a>
            </div>

            <div className="pt-8 border-t border-[var(--color-border)]">
              <p className="section-label mb-4">Stack I work with</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-sm text-[var(--color-cream-dim)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:block shrink-0"
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl border border-[var(--color-border)] rotate-2"
                aria-hidden="true"
              />
              <div className="relative w-64 xl:w-72 aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-muted)]">
                <img
                  src="/headshot.PNG"
                  alt="Paschal Omereife — Full-stack software engineer"
                  className="w-full h-full object-cover object-top"
                  width={288}
                  height={360}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <p className="mt-4 text-center font-mono text-xs text-[var(--color-cream-dim)]">
                Paschal Omereife
              </p>
            </div>
          </motion.div>

          {/* Mobile headshot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden flex items-center gap-5 mb-2 -mt-4"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-border-strong)] shrink-0">
              <img
                src="/headshot.PNG"
                alt="Paschal Omereife"
                className="w-full h-full object-cover object-top"
                width={80}
                height={80}
              />
            </div>
            <div>
              <p className="font-display text-lg text-[var(--color-cream)]">Paschal Omereife</p>
              <p className="text-sm text-[var(--color-cream-dim)]">Full-stack engineer</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
