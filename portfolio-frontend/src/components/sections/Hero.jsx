import { motion as Motion, useReducedMotion } from 'framer-motion'

const RESUME_URL = '/Paschal-Omereife-Resume.pdf'

const Hero = () => {
  const shouldReduceMotion = useReducedMotion()
  const reveal = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

  return (
    <section id="home" aria-labelledby="hero-title" className="pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-5xl items-start gap-12 px-6 lg:grid-cols-[1fr_220px]">
        <Motion.div {...reveal} transition={{ duration: 0.55, ease: 'easeOut' }}>
          <p className="mb-5 flex flex-wrap items-center gap-2 text-[0.95rem] text-[var(--color-muted)]"><span className="status-dot" aria-hidden="true" /> Available for full-time and contract roles <span aria-hidden="true">·</span> Lagos / remote</p>

          <h1 id="hero-title" className="font-display text-[clamp(2.6rem,6vw,4.35rem)] font-semibold leading-[1.04] tracking-tight text-[var(--color-ink)]">
            I build useful web products, end to end.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)] md:text-[1.2rem]">
            I’m Paschal, a full-stack engineer who turns real customer problems into reliable React and Node.js products.
          </p>

          <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-dim)]">
            Six years solving telecom issues taught me how to listen, debug under pressure, and explain the difficult parts clearly. Now I bring that discipline to product engineering.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">See selected work</a>
            <a href={RESUME_URL} download="Paschal-Omereife-Resume.pdf" className="btn-secondary">
              Download resume
            </a>
            <a href="#contact" className="btn-secondary">
              Email me
            </a>
          </div>
        </Motion.div>

        <Motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.12, ease: 'easeOut' }}
          className="flex items-center gap-4 lg:block"
        >
          <img
            src="/headshot.webp"
            alt="Paschal Omereife, full-stack software engineer"
            width={220}
            height={275}
            className="h-20 w-20 rounded-lg object-cover object-top ring-1 ring-[var(--color-line-strong)] lg:h-auto lg:w-full lg:aspect-[4/5]"
            loading="eager"
            fetchPriority="high"
          />
          <div className="lg:mt-3 lg:text-center">
            <p className="font-display text-base font-semibold text-[var(--color-ink)]">
              Paschal Omereife
            </p>
            <p className="text-sm text-[var(--color-dim)]">Lagos, Nigeria</p>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default Hero
