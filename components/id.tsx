'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'

interface DevProfileProps {
  name: string
  level: string
  avatarUrl?: string
  skills?: string[]
  title?: string
  description?: string
  className?: string
}

const DevProfileCard: React.FC<DevProfileProps> = ({
  name,
  level,
  avatarUrl,
  skills = [],
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Gaming-style HUD overlay frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#0080ff', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#00ffff', stopOpacity: 0.8 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Top-left corner with tech details */}
        <g filter="url(#glow)">
          <path d="M0 0 L60 0 L50 10 L10 10 L10 50 L0 60 Z" fill="url(#neonGlow)" opacity="0.3" />
          <path d="M0 0 L60 0 M0 0 L0 60" stroke="#00ffff" strokeWidth="2" />
          <circle cx="50" cy="10" r="3" fill="#00ffff" />
          <circle cx="10" cy="50" r="3" fill="#00ffff" />
        </g>
        
        {/* Top-right corner */}
        <g filter="url(#glow)">
          <path d="M400 0 L340 0 L350 10 L390 10 L390 50 L400 60 Z" fill="url(#neonGlow)" opacity="0.3" />
          <path d="M400 0 L340 0 M400 0 L400 60" stroke="#00ffff" strokeWidth="2" />
          <circle cx="350" cy="10" r="3" fill="#00ffff" />
          <circle cx="390" cy="50" r="3" fill="#00ffff" />
        </g>
        
        {/* Bottom-left corner */}
        <g filter="url(#glow)">
          <path d="M0 300 L60 300 L50 290 L10 290 L10 250 L0 240 Z" fill="url(#neonGlow)" opacity="0.3" />
          <path d="M0 300 L60 300 M0 300 L0 240" stroke="#00ffff" strokeWidth="2" />
          <circle cx="50" cy="290" r="3" fill="#00ffff" />
          <circle cx="10" cy="250" r="3" fill="#00ffff" />
        </g>
        
        {/* Bottom-right corner */}
        <g filter="url(#glow)">
          <path d="M400 300 L340 300 L350 290 L390 290 L390 250 L400 240 Z" fill="url(#neonGlow)" opacity="0.3" />
          <path d="M400 300 L340 300 M400 300 L400 240" stroke="#00ffff" strokeWidth="2" />
          <circle cx="350" cy="290" r="3" fill="#00ffff" />
          <circle cx="390" cy="250" r="3" fill="#00ffff" />
        </g>
        
        {/* Decorative scan lines */}
        <line x1="60" y1="5" x2="120" y2="5" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
        <line x1="280" y1="5" x2="340" y2="5" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
        <line x1="60" y1="295" x2="120" y2="295" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
        <line x1="280" y1="295" x2="340" y2="295" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
        
        {/* Side accents */}
        <rect x="5" y="80" width="2" height="30" fill="#00ffff" opacity="0.6" />
        <rect x="5" y="190" width="2" height="30" fill="#00ffff" opacity="0.6" />
        <rect x="393" y="80" width="2" height="30" fill="#00ffff" opacity="0.6" />
        <rect x="393" y="190" width="2" height="30" fill="#00ffff" opacity="0.6" />
      </svg>

      {/* Actual card content */}
      <Card className="relative bg-zinc-900 border px-4 border-zinc-700 rounded-xl overflow-hidden">
        <CardHeader className="flex items-center space-x-4 p-4 z-10">
          <div className="w-20 h-20 border border-zinc-400 rounded-full shadow-md">
            {avatarUrl ? <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" /> : <AvatarFallback>{name.charAt(0)}</AvatarFallback>}
          </div>
          <div>
            <CardTitle className="text-xl text-white">{name}</CardTitle>
            {title && <CardDescription className="text-sm text-muted-foreground">{title}</CardDescription>}
            {/* <span className="text-sm font-medium text-white/80">Rank: {level}</span> */}
          </div>
        </CardHeader>

        <CardContent className="p-4 relative z-10">
          {skills.length > 0 && (
            <>
              <h3 className="text-sm font-semibold mb-2 text-white">Skills & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="bg-zinc-700 text-white border-none shadow-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </>
          )}
          {description && <p className="mt-4 text-sm text-white/80">{description}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default DevProfileCard