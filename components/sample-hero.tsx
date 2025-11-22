'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import DevProfileCard from './id'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

interface DevProfileProps {
  name: string
  level: number
  avatarUrl?: string
  skills?: string[]
  title?: string
  description?: string
  className?: string
}


const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#020617] py-20 overflow-hidden">
      {/* Background*/}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none text-blue-400"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        >
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
            </filter>
        </defs>

        {/* Top HUD bar */}
        <rect x="50" y="20" width="900" height="60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.1" filter="url(#glow)" rx="8" />

        {/* Bottom HUD bar */}
        <rect x="50" y="920" width="900" height="60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.1" filter="url(#glow)" rx="8" />

        {/* Left side panel */}
        <rect x="20" y="100" width="100" height="800" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.1" filter="url(#glow)" rx="6" />

        {/* Right side panel */}
        <rect x="880" y="100" width="100" height="800" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.1" filter="url(#glow)" rx="6" />

        {/* Floating neon UI boxes */}
        <g opacity="0.1" filter="url(#glow)">
            <rect x="150" y="150" width="80" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" rx="4" />
            <rect x="300" y="300" width="120" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" rx="4" />
            <rect x="600" y="200" width="100" height="100" stroke="currentColor" strokeWidth="1.5" fill="none" rx="6" />
            <rect x="700" y="700" width="140" height="70" stroke="currentColor" strokeWidth="1.5" fill="none" rx="4" />
        </g>

        {/* Background faint grid */}
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0 L0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.05" />
        </svg>





      <div className="container relative z-10 mt-20 mx-auto flex flex-col lg:flex-row items-center gap-12 px-4 lg:px-12">
        {/* Left */}
        <div className="flex-1 space-y-6 max-w-3xl">
          <div className="inline-block">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              My Portfolio
            </Badge>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Aspiring Full-Stack Developer
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            I design and implement scalable backend systems, create clean and secure APIs, and deploy production-ready applications.  
I also handle frontend development, ensuring end-to-end solutions that meet modern standards.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={'/#projects'}>
              <Button size="lg" className="shadow-lg shadow-primary/20">
              View Projects
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Download Resume
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-border gap-12">
            <div>
              <Link
                href="https://github.com/tristan8100"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-16 h-16" />
              </Link>
            </div>
            <div>
              <Link
                href="https://www.linkedin.com/in/mark-tristan-garcia-36086b370"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-16 h-16" />
              </Link>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground">Years Learning Web Dev</div>
            </div>
          </div>
        </div>

        {/* Right: Profile Card */}
        <div className="flex-1 max-w-md lg:ml-auto lg:max-w-2xl w-full">
          <DevProfileCard
            name="Mark Tristan C. Garcia"
            level="E"
            avatarUrl="/profile1.jpg"
            title="Aspiring Full-Stack Developer"
            year="4th Year"
            course="BSIT"
            school="BTECH"
            topSkills={['Laravel', 'NestJS', 'PostgreSQL', 'React', 'TypeScript']}
            projects="5+"
            capstone="completed"
            jobs="N/A"
            xp="1200"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection