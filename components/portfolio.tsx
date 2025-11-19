"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { ExternalLink, Clock, Loader2 } from 'lucide-react'

interface Portfolio {
  id: number
  title: string
  thumbnail?: string
  rank?: number
  time_to_develop?: string
  created_at?: string
}

export default function PortfolioShowcase() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('portfolio')
        .select('id, title, thumbnail, rank, time_to_develop, created_at')
        .order('rank', { ascending: true })

      if (!error && data) {
        setPortfolios(data)
      }
      setLoading(false)
    }

    loadPortfolios()
  }, [])

  if (loading) {
    return (
      <section className="relative w-full bg-background py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-background py-20 overflow-hidden">
      {/* Background Effects */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="portfolioGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portfolioGrid)" />
        <path d="M 0 500 Q 250 400 500 500 T 1000 500" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="3" fill="none" opacity="0.2" />
      </svg>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            💼 Portfolio
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my best work showcasing skills in web development and design.
          </p>
          {/* HUD decoration line */}
          <div className="mt-6 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* Portfolio Grid */}
        {portfolios.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((project, index) => (
              <div
                key={project.id}
                className="relative group"
                onMouseEnter={() => setSelectedId(project.id)}
                onMouseLeave={() => setSelectedId(null)}
              >
                {/* Gaming HUD Border */}
                <svg
                  className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300 ${
                    selectedId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  viewBox="0 0 300 400"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`project-grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.6" />
                      <stop offset="100%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id={`project-glow-${project.id}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Top-left corner */}
                  <g filter={`url(#project-glow-${project.id})`}>
                    <path d="M0 0 L50 0 L40 10 L10 10 L10 40 L0 50 Z" fill={`url(#project-grad-${project.id})`} />
                    <path d="M0 0 L50 0 M0 0 L0 50" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                    <circle cx="40" cy="10" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
                  </g>
                  
                  {/* Top-right corner */}
                  <g filter={`url(#project-glow-${project.id})`}>
                    <path d="M300 0 L250 0 L260 10 L290 10 L290 40 L300 50 Z" fill={`url(#project-grad-${project.id})`} />
                    <path d="M300 0 L250 0 M300 0 L300 50" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                    <circle cx="260" cy="10" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
                  </g>
                  
                  {/* Bottom-left corner */}
                  <g filter={`url(#project-glow-${project.id})`}>
                    <path d="M0 400 L50 400 L40 390 L10 390 L10 360 L0 350 Z" fill={`url(#project-grad-${project.id})`} />
                    <path d="M0 400 L50 400 M0 400 L0 350" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                    <circle cx="40" cy="390" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
                  </g>
                  
                  {/* Bottom-right corner */}
                  <g filter={`url(#project-glow-${project.id})`}>
                    <path d="M300 400 L250 400 L260 390 L290 390 L290 360 L300 350 Z" fill={`url(#project-grad-${project.id})`} />
                    <path d="M300 400 L250 400 M300 400 L300 350" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                    <circle cx="260" cy="390" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
                  </g>

                  {/* Side scan lines */}
                  <line x1="5" y1="120" x2="5" y2="150" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
                  <line x1="5" y1="250" x2="5" y2="280" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
                  <line x1="295" y1="120" x2="295" y2="150" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
                  <line x1="295" y1="250" x2="295" y2="280" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
                </svg>

                {/* Card */}
                <Card className="relative border-border bg-card hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/20 overflow-hidden cursor-pointer h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                        No Preview
                      </div>
                    )}
                    
                    {/* Rank Badge */}
                    {project.rank && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                          #{project.rank}
                        </Badge>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Button size="sm" variant="secondary" className="gap-2">
                        View Details
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      {/* Time to develop */}
                      {project.time_to_develop && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{project.time_to_develop}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats bar at bottom */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs text-muted-foreground font-mono">ACTIVE</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Project #{index + 1}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {portfolios.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" className="shadow-lg shadow-primary/20">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}