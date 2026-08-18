import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const experience = [
    {
      role: 'IT Support Specialist (Volunteer)',
      company: 'David Christian Centre, Lagos',
      period: '2024 — Present',
      description: 'Keep live events running — troubleshooting AV, networks, and workstations under pressure when things break mid-service.'
    },
    {
      role: 'Managing Director & Founder',
      company: 'Spec360 Communication',
      period: '2017 — Present',
      description: 'Started a small tech agency from scratch. Handle client relationships, project delivery, and the engineering when the team is thin.'
    },
    {
      role: 'Customer Service / Technical Support',
      company: 'Tech Mahindra (Airtel Nigeria BPO)',
      period: '2017 — 2023',
      description: 'Six years on the front line — diagnosing network issues, coordinating with backend teams, and learning how to explain technical problems to non-technical people.'
    }
  ]

  const skills = [
    'React & modern JavaScript',
    'Node.js & Express',
    'MongoDB & PostgreSQL',
    'REST API design',
    'Git & CI/CD basics',
    'Remote collaboration',
    'Technical troubleshooting',
  ]

  return (
    <section id="about" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">About</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-cream)] mb-8 max-w-2xl">
            From support calls to shipping code
          </h2>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20">
            <div className="space-y-5 text-[var(--color-cream-muted)] leading-relaxed">
              <p>
                I didn't take the traditional CS-degree path. I studied Logistics Management,
                spent years on customer support lines, and picked up programming because I wanted
                to build the tools I kept wishing existed.
              </p>
              <p>
                That background shows up in how I work: I care about the person on the other
                end of the screen, I debug systematically, and I don't disappear when production
                has a bad day.
              </p>
              <p>
                These days I'm focused on full-stack web development — React on the front,
                Node on the back — and I'm completing an Applied AI programme through a
                German university partnership.
              </p>

              <div className="pt-6">
                <p className="section-label mb-4">What I bring</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2 text-sm text-[var(--color-cream-dim)]"
                    >
                      <span className="text-[var(--color-accent)] mt-0.5">→</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="section-label mb-6">Experience</p>
              <div className="space-y-0">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + idx * 0.08 }}
                    className="relative pl-6 pb-8 border-l border-[var(--color-border)] last:pb-0"
                  >
                    <span className="absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--color-cream)]">{exp.role}</h3>
                      <span className="font-mono text-xs text-[var(--color-cream-dim)]">{exp.period}</span>
                    </div>
                    <p className="text-sm text-[var(--color-accent)] mb-2">{exp.company}</p>
                    <p className="text-sm text-[var(--color-cream-dim)] leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
                <p className="section-label mb-4">Education</p>
                <ul className="space-y-3 text-sm text-[var(--color-cream-muted)]">
                  <li>
                    <span className="text-[var(--color-cream)]">B.Tech, Logistics Management</span>
                    <span className="block text-[var(--color-cream-dim)] mt-0.5">
                      Federal University of Technology, Owerri
                    </span>
                  </li>
                  <li>
                    <span className="text-[var(--color-cream)]">Applied Artificial Intelligence</span>
                    <span className="block text-[var(--color-cream-dim)] mt-0.5">
                      In progress — German university partnership
                    </span>
                  </li>
                  <li className="text-[var(--color-cream-dim)]">
                    Certifications: Full Stack Web Dev · IT Support &amp; Networking · Customer Experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
