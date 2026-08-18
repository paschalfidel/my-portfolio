import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-lg text-[var(--color-cream)]">
              Paschal Omereife
            </p>
            <p className="text-sm text-[var(--color-cream-dim)] mt-1">
              Full-stack engineer · Lagos, Nigeria
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href="mailto:paschalfidel@gmail.com"
              className="text-[var(--color-cream-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/paschalfidel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-cream-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/paschalomereife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-cream-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p className="text-xs text-[var(--color-cream-dim)] mt-8 pt-6 border-t border-[var(--color-border)]">
          © {year} Paschal Chidebe Omereife. Built with React &amp; a lot of coffee.
        </p>
      </div>
    </footer>
  )
}

export default Footer
