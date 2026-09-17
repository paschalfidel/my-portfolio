import { motion as Motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const shouldReduceMotion = useReducedMotion()

  const experience = [
    {
      role: 'IT Support (Volunteer)',
      company: 'David Christian Centre, Lagos',
      period: '2024 — now',
      description: 'Keep live events running. When the network or AV dies mid-service, I fix it.'
    },
    {
      role: 'Founder',
      company: 'Spec360 Communication',
      period: '2017 — now',
      description: 'Small tech agency. I sell the work, then I often write it too.'
    },
    {
      role: 'Technical Support',
      company: 'Tech Mahindra · Airtel Nigeria',
      period: '2017 — 2023',
      description: 'Six years diagnosing network issues and talking to people who were already frustrated. That patience still shows up in how I debug.'
    }
  ]

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-[var(--color-line)] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div
          ref={ref}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid gap-14 lg:grid-cols-2"
        >
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-[2.1rem]">Support instincts. Product focus.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-[var(--color-muted)]">
              <p>
                I didn’t study computer science. I studied logistics at FUTO, then spent years
                on support floors. I started coding because I kept wishing the tools existed.
              </p>
              <p>
                I’m not the engineer who disappears when production is ugly. I grew up
                explaining technical problems to non-technical people — and I still write
                code that way: clear, shippable, a little stubborn.
              </p>
              <p>
                Stack I actually use: React, Node, Express, MongoDB, PostgreSQL. I’m also
                mid-way through an Applied AI programme with a German university partnership.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              <div className="fact-card"><dt>Core stack</dt><dd>React + Node.js</dd></div>
              <div className="fact-card"><dt>Strength</dt><dd>Product debugging</dd></div>
              <div className="fact-card"><dt>Location</dt><dd>Lagos / remote</dd></div>
              <div className="fact-card"><dt>Availability</dt><dd>Full-time / contract</dd></div>
            </dl>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
              Experience
            </h3>
            <div className="mt-6 space-y-8">
              {experience.map((exp) => (
                <div key={exp.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-[var(--color-ink)]">{exp.role}</p>
                    <p className="text-sm text-[var(--color-dim)]">{exp.period}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--color-accent)]">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-[var(--color-line)] pt-8">
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                School
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
                <li>
                  <span className="font-medium text-[var(--color-ink)]">B.Tech, Logistics Management</span>
                  <span className="block text-[var(--color-dim)]">Federal University of Technology, Owerri</span>
                </li>
                <li>
                  <span className="font-medium text-[var(--color-ink)]">Applied Artificial Intelligence</span>
                  <span className="block text-[var(--color-dim)]">In progress — German university partnership</span>
                </li>
              </ul>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default About
