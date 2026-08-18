const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export const api = {
  // Contact form submission
  submitContact: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      return await response.json()
    } catch (error) {
      console.error('Contact form error:', error)
      throw error
    }
  },
  
  // Get GitHub stats
  getGitHubStats: async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      return await response.json()
    } catch (error) {
      console.error('GitHub API error:', error)
      return null
    }
  },
  
  // Track portfolio views (optional)
  trackView: async () => {
    try {
      await fetch(`${API_BASE_URL}/analytics/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, timestamp: new Date() })
      })
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }
}