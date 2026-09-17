import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-dim)]">
          © {year} Paschal Chidebe Omereife
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="mailto:paschalfidel@gmail.com" className="quiet-link inline-flex min-h-11 items-center">
            Email
          </a>
          <a
            href="https://github.com/paschalfidel"
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link inline-flex min-h-11 items-center"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/paschalomereife"
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link inline-flex min-h-11 items-center"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
