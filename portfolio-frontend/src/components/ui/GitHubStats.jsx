import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const GitHubStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        
        const response = await fetch('https://api.github.com/users/paschalfidel', {
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          if (data && !data.message) {
            setStats(data)
          } else {
            setError(true)
          }
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchGitHubStats()
  }, [])

  if (loading) return null
  if (error || !stats) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect rounded-xl p-4 mt-6"
    >
      <div className="flex items-center justify-around">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{stats.public_repos || 0}</div>
          <div className="text-xs text-gray-400">Repositories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{stats.followers || 0}</div>
          <div className="text-xs text-gray-400">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{stats.following || 0}</div>
          <div className="text-xs text-gray-400">Following</div>
        </div>
      </div>
    </motion.div>
  )
}

export default GitHubStats