'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const AboutMeSection: React.FC = () => {
  const expertise = [
    { 
      category: 'Frontend', 
      level: 85,
      skills: [
        { name: 'React', level: 90, icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
        { name: 'Next.js', level: 85, icon: '▲', color: 'from-gray-700 to-gray-900' },
        { name: 'TypeScript', level: 88, icon: 'TS', color: 'from-blue-500 to-blue-700' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨', color: 'from-teal-400 to-cyan-500' }
      ]
    },
    { 
      category: 'Backend', 
      level: 80,
      skills: [
        { name: 'Node.js', level: 82, icon: '🟢', color: 'from-green-500 to-green-700' },
        { name: 'Express', level: 80, icon: '⚡', color: 'from-gray-600 to-gray-800' },
        { name: 'PostgreSQL', level: 78, icon: '🐘', color: 'from-blue-600 to-indigo-600' },
        { name: 'Prisma', level: 75, icon: '◭', color: 'from-indigo-500 to-purple-600' }
      ]
    },
    { 
      category: 'Tools & DevOps', 
      level: 75,
      skills: [
        { name: 'Git', level: 85, icon: '🔀', color: 'from-orange-500 to-red-600' },
        { name: 'Docker', level: 70, icon: '🐳', color: 'from-blue-400 to-blue-600' },
        { name: 'VS Code', level: 90, icon: '💻', color: 'from-blue-500 to-blue-700' },
        { name: 'Figma', level: 72, icon: '🎭', color: 'from-purple-500 to-pink-500' }
      ]
    }
  ]

  const achievements = [
    { title: 'Clean Code Advocate', description: 'Writing maintainable, scalable solutions', icon: '🎯' },
    { title: 'Problem Solver', description: 'Tackling complex challenges head-on', icon: '⚡' },
    { title: 'Team Player', description: 'Collaborating for better outcomes', icon: '🤝' },
    { title: 'Lifelong Learner', description: 'Always exploring new technologies', icon: '📚' }
  ]

  return (
    <section className="relative w-full bg-background py-20 overflow-hidden">
      {/* Background decorative elements */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="aboutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aboutGrid)" />
        <path d="M 0 500 Q 250 400 500 500 T 1000 500" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="3" fill="none" opacity="0.2" />
      </svg>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            👨‍💻 About Me
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Crafting Digital Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer dedicated to building innovative solutions that make a difference.
          </p>
        </div>

        {/* Main About Card with Gaming Border */}
        <div className="relative w-full mb-12">
          {/* Gaming-style HUD overlay frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aboutNeonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.8" />
                <stop offset="50%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.6" />
                <stop offset="100%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.8" />
              </linearGradient>
              <filter id="aboutGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Top-left corner */}
            <g filter="url(#aboutGlow)">
              <path d="M0 0 L80 0 L65 15 L15 15 L15 65 L0 80 Z" fill="url(#aboutNeonGlow)" opacity="0.3" />
              <path d="M0 0 L80 0 M0 0 L0 80" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
              <circle cx="65" cy="15" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
              <circle cx="15" cy="65" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
            </g>
            
            {/* Top-right corner */}
            <g filter="url(#aboutGlow)">
              <path d="M1000 0 L920 0 L935 15 L985 15 L985 65 L1000 80 Z" fill="url(#aboutNeonGlow)" opacity="0.3" />
              <path d="M1000 0 L920 0 M1000 0 L1000 80" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
              <circle cx="935" cy="15" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
              <circle cx="985" cy="65" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
            </g>
            
            {/* Bottom-left corner */}
            <g filter="url(#aboutGlow)">
              <path d="M0 500 L80 500 L65 485 L15 485 L15 435 L0 420 Z" fill="url(#aboutNeonGlow)" opacity="0.3" />
              <path d="M0 500 L80 500 M0 500 L0 420" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
              <circle cx="65" cy="485" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
              <circle cx="15" cy="435" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
            </g>
            
            {/* Bottom-right corner */}
            <g filter="url(#aboutGlow)">
              <path d="M1000 500 L920 500 L935 485 L985 485 L985 435 L1000 420 Z" fill="url(#aboutNeonGlow)" opacity="0.3" />
              <path d="M1000 500 L920 500 M1000 500 L1000 420" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
              <circle cx="935" cy="485" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
              <circle cx="985" cy="435" r="4" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
            </g>
            
            {/* Top scan lines */}
            <line x1="100" y1="8" x2="200" y2="8" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
            <line x1="800" y1="8" x2="900" y2="8" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
            
            {/* Bottom scan lines */}
            <line x1="100" y1="492" x2="200" y2="492" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
            <line x1="800" y1="492" x2="900" y2="492" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
            
            {/* Side accents */}
            <rect x="8" y="150" width="2" height="50" className="[fill:oklch(0.6912_0.1569_240.2888)]" opacity="0.6" />
            <rect x="8" y="300" width="2" height="50" className="[fill:oklch(0.6912_0.1569_240.2888)]" opacity="0.6" />
            <rect x="990" y="150" width="2" height="50" className="[fill:oklch(0.6912_0.1569_240.2888)]" opacity="0.6" />
            <rect x="990" y="300" width="2" height="50" className="[fill:oklch(0.6912_0.1569_240.2888)]" opacity="0.6" />
          </svg>

          {/* Card Content */}
          <Card className="relative border-border bg-card overflow-hidden">
            <CardContent className="p-8 lg:p-12 relative z-10">
              <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
                {/* Left: Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Avatar glow effect */}
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    <Avatar className="w-64 h-64 border-4 border-primary shadow-2xl shadow-primary/30 relative">
                      <AvatarImage src="/avatars/profile.png" alt="Profile" />
                      <AvatarFallback className="text-6xl">TR</AvatarFallback>
                    </Avatar>
                    {/* Level badge overlay */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Level 42
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground">Tristan</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>

                {/* Right: Story */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">My Journey</h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Started coding at age 15, driven by curiosity and a passion for creating. 
                        Over the years, I've evolved from building simple websites to architecting 
                        complex full-stack applications.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I believe in writing code that's not just functional, but elegant and maintainable. 
                        Every project is an opportunity to learn, grow, and push the boundaries of what's possible.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        When I'm not coding, you'll find me exploring new technologies, contributing to 
                        open-source projects, or sharing knowledge with the developer community.
                      </p>
                    </div>
                  </div>

                  {/* Core Values - Compact */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="flex flex-col items-center text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-2xl mb-1">💡</div>
                      <div className="text-xs font-semibold text-foreground">Innovation</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-2xl mb-1">🎨</div>
                      <div className="text-xs font-semibold text-foreground">Design-First</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-2xl mb-1">⚙️</div>
                      <div className="text-xs font-semibold text-foreground">Performance</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gamified Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {expertise.map((category) => (
            <div key={category.category} className="relative">
              {/* Gaming border SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`grad-${category.category}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.6" />
                    <stop offset="100%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <g opacity="0.8">
                  <path d="M0 0 L40 0 L30 10 L10 10 L10 30 L0 40 Z" fill={`url(#grad-${category.category})`} />
                  <path d="M0 0 L40 0 M0 0 L0 40" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                  
                  <path d="M300 0 L260 0 L270 10 L290 10 L290 30 L300 40 Z" fill={`url(#grad-${category.category})`} />
                  <path d="M300 0 L260 0 M300 0 L300 40" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                  
                  <path d="M0 400 L40 400 L30 390 L10 390 L10 370 L0 360 Z" fill={`url(#grad-${category.category})`} />
                  <path d="M0 400 L40 400 M0 400 L0 360" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                  
                  <path d="M300 400 L260 400 L270 390 L290 390 L290 370 L300 360 Z" fill={`url(#grad-${category.category})`} />
                  <path d="M300 400 L260 400 M300 400 L300 360" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
                </g>
              </svg>
              
              <Card className="relative border-border bg-card hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <Badge variant="secondary" className="text-xs">Lv {category.level}</Badge>
                  </div>
                  {/* Category level bar */}
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                      style={{ width: `${category.level}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      {/* Skill XP bar */}
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-700 shadow-sm`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.title} className="border-border bg-card hover:border-primary transition-colors text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-semibold text-foreground mb-2">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="shadow-lg shadow-primary/20">
            Let's Work Together
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AboutMeSection