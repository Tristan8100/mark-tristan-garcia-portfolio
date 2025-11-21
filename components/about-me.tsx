'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { InView } from '@/components/ui/in-view';
import Module from 'module'
import ModuleHeader from './module-header'

const AboutMeSection: React.FC = () => {

  return (
    <section className="relative w-full bg-background py-20 overflow-hidden" id="about-me">
      {/* Backgrounds */}
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
        <ModuleHeader title="ABOUT ME" title2="Everything You Need to Know" description="Learn more about me and my journey as a developer." />

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
          <Card className="relative border-border bg-background overflow-hidden">
            <CardContent className="p-8 lg:p-12 relative z-10">
              <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
                {/* Left: Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Avatar glow effect */}
                    <div className="absolute bg-primary/20 blur-2xl rounded-full"></div>
                      <img src="/profile1.jpg" alt="Profile" className='object-cover rounded-full w-64 h-64 border-4 border-primary shadow-2xl shadow-primary/30' />
                    {/* Level badge overlay 
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Level 42
                    </div> */}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground">Tristan</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>

                {/* Right: Story */}
                <div className="space-y-6">
                  {/* Right: Enhanced About Me Again! */}
                  <div className="space-y-6 h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-secondary/20">
                    <h3 className="text-2xl font-bold text-foreground mb-4">My Journey</h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        I&apos;m a student full-stack developer, passionate about creating applications that are both functional and elegant. 
                        I enjoy exploring different approaches to solving problems and continuously improving my coding skills.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Beyond writing code, I focus on understanding how systems work, designing maintainable solutions, and developing a mindset for long-term growth. 
                        I strive to balance learning new technologies with applying them in practical ways.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I approach challenges with curiosity, dedication, and persistence, always looking for opportunities to grow and contribute meaningfully to projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='py-12 text-center text-sm'>Scroll down</div>
        {/* First Section */}
        <div className='flex h-[500px] items-end justify-center px-4 mt-64 md:mt-16'>
          <InView
            variants={{
              hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            viewOptions={{ margin: '0px 0px -200px 0px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Left */}
              <div className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4">
                {/* SVG  */}
                <img
                  src="/programming2.svg"
                  alt="computer"
                  className="w-96 h-96 opacity-90"
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center md:text-left mt-16">
                <p className='my-4'>
                  I&apos;m currently 4th year student at Baliuag Polytechnic College with a degree of Bachelor of Science in Information Technology.
                </p>
                <p>I started programming last february 2023. I first study HTML, CSS and JavaScript. I also have some experience with Python and Java.</p>
                <p className='my-4'>
                  Througout the years, I have worked on various projects ranging from simple websites to complex web applications.
                </p>
              </div>
            </div>
          </InView>
        </div>

        {/* Second Section*/}
        <div className='flex h-[500px] items-end justify-center px-4 mt-96 md:mt-16'>
          <InView
            variants={{
              hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            viewOptions={{ margin: '0px 0px -200px 0px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">

              {/* Left */}
              <div className="flex-1 text-center md:text-left mt-16">
                <p className='my-4'>
                  My long-term goal is to become a highly capable developer who can 
  build scalable, production-ready applications from scratch.
                </p>
                <p>
                  I&apos;m working toward improving my backend architecture skills, and aim to learn more about cloud computing and DevOps practices.
                </p>
                <p className='my-4'>
                  In todays tech world, I will keep improving my skills and stay updated with the latest trends and technologies.
                </p>
              </div>

              {/* Right */}
              <div className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end gap-4">
                {/* SVG  */}
                <img
                  src="/programming3.svg"
                  alt="computer"
                  className="w-96 h-96 opacity-90"
                />
              </div>
            </div>
          </InView>
        </div>
        
      </div>
    </section>
  )
}

export default AboutMeSection