import React, { useState, useEffect, useCallback, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import projects from '../../data/projects'

const Work = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const [screenshots, setScreenshots] = useState({})
  const [loadingScreenshots, setLoadingScreenshots] = useState({})

  const breakpointColumns = { default: 2, 900: 1 }

  const getScreenshotUrl = useCallback((url) => {
    if (!url) return null
    return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
  }, [])

  const loadScreenshot = useCallback(async (project) => {
    if (!project.demoLink || screenshots[project.id] || loadingScreenshots[project.id]) return

    setLoadingScreenshots(prev => ({ ...prev, [project.id]: true }))

    try {
      const screenshotUrl = getScreenshotUrl(project.demoLink)
      const img = new Image()

      const imageLoadPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Image load timeout')), 10000)
        img.onload = () => {
          clearTimeout(timeout)
          resolve(screenshotUrl)
        }
        img.onerror = () => {
          clearTimeout(timeout)
          reject(new Error('Failed to load screenshot'))
        }
        img.src = screenshotUrl
      })

      const loadedUrl = await imageLoadPromise
      setScreenshots(prev => ({ ...prev, [project.id]: loadedUrl }))
    } catch (error) {
      console.error(`Error loading screenshot for ${project.title}:`, error)
      setImageErrors(prev => ({ ...prev, [project.id]: true }))
    } finally {
      setLoadingScreenshots(prev => ({ ...prev, [project.id]: false }))
    }
  }, [screenshots, loadingScreenshots, getScreenshotUrl])

  useEffect(() => {
    const loadAllScreenshots = async () => {
      for (const project of projects) {
        if (project.demoLink && !screenshots[project.id] && !loadingScreenshots[project.id]) {
          await loadScreenshot(project)
        }
      }
    }
    loadAllScreenshots()
  }, [loadScreenshot, screenshots, loadingScreenshots])

  const getPreviewImage = useCallback((project) => {
    if (screenshots[project.id] && !imageErrors[project.id]) return screenshots[project.id]
    if (project.previewImage && !imageErrors[project.id]) return project.previewImage
    return null
  }, [screenshots, imageErrors])

  const handleImageError = useCallback((projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }))
  }, [])

  const isLoadingImage = useCallback(
    (projectId) => loadingScreenshots[projectId] === true,
    [loadingScreenshots]
  )

  const projectList = useMemo(() => {
    return projects.map((project, index) => ({
      ...project,
      index: String(index + 1).padStart(2, '0'),
      uniqueKey: `${project.id}_${index}_${project.title.replace(/\s/g, '_')}`
    }))
  }, [])

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-label mb-4">Selected work</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-cream)] mb-4">
            Projects I've shipped
          </h2>
          <p className="text-[var(--color-cream-muted)] leading-relaxed">
            Four projects that best show what I build — full-stack products, not tutorials.
            Click for details, or open the live site directly.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto -ml-6"
            columnClassName="pl-6 bg-clip-padding"
          >
            {projectList.map((project) => (
              <div key={project.uniqueKey} className="mb-6">
                <article
                  className="surface-card surface-card-hover overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative aspect-[16/10] bg-[var(--color-bg-muted)] overflow-hidden">
                    {isLoadingImage(project.id) ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[var(--color-border-strong)] border-t-[var(--color-accent)] rounded-full animate-spin" />
                      </div>
                    ) : getPreviewImage(project) ? (
                      <img
                        src={getPreviewImage(project)}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        onError={() => handleImageError(project.id)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <span className="font-display text-2xl text-[var(--color-cream-dim)]">{project.title}</span>
                      </div>
                    )}

                    {project.demoLink && (
                      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[var(--color-bg)]/80 text-[var(--color-success)] border border-[var(--color-border)]">
                        Live
                      </span>
                    )}
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <span className="font-mono text-xs text-[var(--color-accent)]">{project.index}</span>
                      <h3 className="font-display text-xl font-semibold text-[var(--color-cream)] group-hover:text-[var(--color-accent)] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--color-cream-dim)] leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={`${project.uniqueKey}_${tag}`}
                          className="font-mono text-[11px] text-[var(--color-cream-dim)] px-2 py-0.5 rounded border border-[var(--color-border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Masonry>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={`modal_${selectedProject.uniqueKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--color-bg)]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              className="surface-card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {isLoadingImage(selectedProject.id) ? (
                  <div className="w-full h-64 flex items-center justify-center bg-[var(--color-bg-muted)]">
                    <div className="w-8 h-8 border-2 border-[var(--color-border-strong)] border-t-[var(--color-accent)] rounded-full animate-spin" />
                  </div>
                ) : getPreviewImage(selectedProject) ? (
                  <img
                    src={getPreviewImage(selectedProject)}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover object-top"
                    onError={() => handleImageError(selectedProject.id)}
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-[var(--color-bg-muted)]">
                    <span className="font-display text-3xl text-[var(--color-cream-dim)]">{selectedProject.title}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)] text-[var(--color-cream)] hover:border-[var(--color-border-strong)] transition-colors"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-6 md:p-8">
                <span className="font-mono text-xs text-[var(--color-accent)]">{selectedProject.index}</span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-cream)] mt-1 mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-[var(--color-cream-muted)] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={`modal_${selectedProject.uniqueKey}_${tag}`}
                      className="font-mono text-xs text-[var(--color-cream-dim)] px-2.5 py-1 rounded border border-[var(--color-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.demoLink && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Visit live site
                      <i className="fas fa-external-link-alt text-xs"></i>
                    </a>
                  )}
                  {selectedProject.codeLink && (
                    <a
                      href={selectedProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <i className="fab fa-github"></i>
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Work
