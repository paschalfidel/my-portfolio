import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projects from '../../data/projects'

const ProjectPreview = ({ project, className = '' }) => (
  <div className={`relative overflow-hidden bg-[var(--color-bg-elevated)] ${className}`}>
    <img src={project.previewImage} alt={`${project.title} product interface`} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]" width="1200" height="675" loading={project.featured ? 'eager' : 'lazy'} decoding="async" />
    <span className="absolute left-3 top-3 rounded-full bg-[var(--color-paper)]/95 px-2.5 py-1 text-xs font-semibold text-[var(--color-ink)] shadow-sm">{project.status}</span>
  </div>
)

const Work = () => {
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [selectedProject, setSelectedProject] = useState(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [featured, ...rest] = projects

  const openProject = (project, trigger) => {
    triggerRef.current = trigger
    setSelectedProject(project)
  }

  const closeProject = () => setSelectedProject(null)

  useEffect(() => {
    if (!selectedProject) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeProject()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [selectedProject])

  const reveal = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: inView ? { opacity: 1, y: 0 } : {} }

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 border-t border-[var(--color-line)] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div ref={sectionRef} {...reveal} transition={{ duration: 0.5 }} className="mb-12 max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-[2.1rem]">Products I’ve shipped</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-muted)]">Full-stack work across marketplaces, discovery, and recommendation systems. Open a project for the problem, decisions, and proof.</p>
        </Motion.div>

        {featured && (
          <article className="group overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[0_16px_50px_rgba(46,38,25,0.06)]">
            <button type="button" className="block w-full text-left" aria-label={`Read ${featured.title} case study`} onClick={event => openProject(featured, event.currentTarget)}>
              <ProjectPreview project={featured} className="aspect-[16/8] w-full" />
            </button>
            <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-dim)]"><span>{featured.year}</span><span aria-hidden="true">·</span><span>{featured.role}</span></div>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--color-ink)]">{featured.title}</h3>
                <p className="mt-2 max-w-xl text-[var(--color-muted)]">{featured.oneLiner}</p>
                <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">{featured.proof}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={featured.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-11 !px-3.5 text-sm">View live <span className="sr-only">{featured.title}</span></a>
                <button type="button" onClick={event => openProject(featured, event.currentTarget)} className="btn-secondary min-h-11 !px-3.5 text-sm">Case study</button>
              </div>
            </div>
          </article>
        )}

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map(project => (
            <li key={project.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)]">
                <button type="button" className="block w-full text-left" aria-label={`Read ${project.title} case study`} onClick={event => openProject(project, event.currentTarget)}>
                  <ProjectPreview project={project} className="aspect-video w-full" />
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-[var(--color-dim)]">{project.year} · {project.role}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-[var(--color-ink)]">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{project.oneLiner}</p>
                  <p className="mt-3 text-xs font-semibold text-[var(--color-accent)]">{project.proof}</p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center">Live<span className="sr-only"> {project.title}</span></a>
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="quiet-link inline-flex min-h-11 items-center">Code<span className="sr-only"> for {project.title}</span></a>
                    <button type="button" className="quiet-link min-h-11" onClick={event => openProject(project, event.currentTarget)}>Details</button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Motion.div initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-ink)]/60 p-4" onMouseDown={event => event.target === event.currentTarget && closeProject()}>
            <Motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description" tabIndex="-1" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[var(--color-paper)] shadow-2xl outline-none">
              <div className="relative">
                <ProjectPreview project={selectedProject} className="h-48 w-full sm:h-64" />
                <button type="button" className="icon-button absolute right-3 top-3" onClick={closeProject} aria-label="Close project details"><span aria-hidden="true">×</span></button>
              </div>
              <div className="p-6 md:p-8">
                <p className="eyebrow">{selectedProject.year} · {selectedProject.role}</p>
                <h3 id="project-dialog-title" className="mt-1 font-display text-2xl font-semibold text-[var(--color-ink)]">{selectedProject.title}</h3>
                <p id="project-dialog-description" className="mt-4 leading-relaxed text-[var(--color-muted)]">{selectedProject.description}</p>
                <dl className="mt-6 grid gap-5 border-y border-[var(--color-line)] py-6 sm:grid-cols-3">
                  <div><dt className="eyebrow">Problem</dt><dd className="mt-1 text-sm text-[var(--color-muted)]">{selectedProject.challenge}</dd></div>
                  <div><dt className="eyebrow">Built</dt><dd className="mt-1 text-sm text-[var(--color-muted)]">{selectedProject.build}</dd></div>
                  <div><dt className="eyebrow">Proof</dt><dd className="mt-1 text-sm text-[var(--color-muted)]">{selectedProject.proof}</dd></div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Technology used">{selectedProject.tags.map(tag => <span key={tag} className="rounded-md border border-[var(--color-line)] px-2 py-1 text-xs text-[var(--color-dim)]">{tag}</span>)}</div>
                <div className="mt-7 flex flex-wrap gap-3"><a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Open live site</a><a href={selectedProject.codeLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">View source</a></div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Work
