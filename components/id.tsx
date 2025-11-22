"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type React from "react"
import { motion } from "framer-motion"

interface DevProfileProps {
  name: string
  level: string
  avatarUrl?: string
  title?: string
  topSkills?: string[]
  year?: string
  course?: string
  school?: string
  projects?: string
  capstone?: string
  jobs?: string
  xp?: string
  className?: string
}

const DevProfileCard: React.FC<DevProfileProps> = ({
  name,
  level,
  avatarUrl,
  title,
  topSkills = [],
  year,
  course,
  school,
  projects,
  capstone,
  jobs,
  xp,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full max-w-lg mx-auto font-mono ${className}`}
    >
      {/* HUD / Neon overlay (gaming feel) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* HUD corners / accents - Optimized for visibility */}
        <g filter="url(#glow)" className="text-cyan-500">
          <path d="M-2 -2 L60 -2 L50 8 L10 8 L10 50 L-2 60 Z" fill="url(#neonGlow)" opacity="0.2" />
          <path d="M-2 -2 L60 -2 M-2 -2 L-2 60" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="50" r="2" fill="currentColor" />
        </g>
        <g filter="url(#glow)" className="text-cyan-500">
          <path d="M402 -2 L340 -2 L350 8 L390 8 L390 50 L402 60 Z" fill="url(#neonGlow)" opacity="0.2" />
          <path d="M402 -2 L340 -2 M402 -2 L402 60" stroke="currentColor" strokeWidth="2" />
          <circle cx="350" cy="8" r="2" fill="currentColor" />
          <circle cx="390" cy="50" r="2" fill="currentColor" />
        </g>
        <g filter="url(#glow)" className="text-cyan-500">
          <path d="M-2 302 L60 302 L50 292 L10 292 L10 252 L-2 242 Z" fill="url(#neonGlow)" opacity="0.2" />
          <path d="M-2 302 L60 302 M-2 302 L-2 242" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="292" r="2" fill="currentColor" />
          <circle cx="10" cy="252" r="2" fill="currentColor" />
        </g>
        <g filter="url(#glow)" className="text-cyan-500">
          <path d="M402 302 L340 302 L350 292 L390 292 L390 252 L402 242 Z" fill="url(#neonGlow)" opacity="0.2" />
          <path d="M402 302 L340 302 M402 302 L402 242" stroke="currentColor" strokeWidth="2" />
          <circle cx="350" cy="292" r="2" fill="currentColor" />
          <circle cx="390" cy="252" r="2" fill="currentColor" />
        </g>
      </svg>

      {/* System Header Label */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-slate-950 border border-cyan-500/50 px-6 py-1 text-[10px] text-cyan-400 uppercase tracking-[0.2em] clip-path-polygon-[10%_0,90%_0,100%_100%,0%_100%] shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          Profile
        </div>
      </div>

      {/* Card content */}
      <Card className="relative bg-background border border-cyan-900/50 overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Scanline Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan pointer-events-none z-0"></div>

        <CardHeader className="lg:flex flex-row items-start space-x-4 p-6 pb-4 z-10 border-b border-cyan-900/30 relative">
          <div className="relative shrink-0 flex justify-center">
            {/* Avatar Container */}
            <div className="w-24 h-24 relative">
              <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg rotate-3 transition-transform group-hover:rotate-0"></div>
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-lg -rotate-3 transition-transform group-hover:rotate-0"></div>
              <div className="w-full h-full border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-900 overflow-hidden relative z-10">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} className="object-cover" />
                  <AvatarFallback className="bg-slate-900 text-cyan-400 text-2xl font-bold rounded-none">
                    {name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              {/* Level Tag 
              <div className="absolute -bottom-2 -right-2 bg-slate-950 border border-cyan-400 text-cyan-300 text-xs font-bold px-2 py-0.5 shadow-lg z-20">
                LV.{level}
              </div> */}
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1 flex flex-col justify-center align-center">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] text-cyan-600 uppercase tracking-wider font-bold">Player Name</div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500/20 rounded-full"></div>
              </div>
            </div>
            <CardTitle className="text-2xl text-white tracking-wide font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] mb-1 truncate">
              {name}
            </CardTitle>
            {title && (
              <div className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/50">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 shadow-[0_0_5px_cyan]"></span>
                <CardDescription className="text-cyan-100 text-xs font-medium truncate">{title}</CardDescription>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 z-10 space-y-6 relative">
          {/* Character Info (school, year, course) */}
          <div className="space-y-3">
            <h3 className="text-[10px] text-cyan-600 uppercase tracking-widest flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-cyan-900/50">
              Background
            </h3>
            <div className="flex flex-wrap gap-2">
              {year && (
                <Badge
                  variant="outline"
                  className="bg-slate-900/50 text-cyan-100 border-cyan-800 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all"
                >
                  Year: {year}
                </Badge>
              )}
              {course && (
                <Badge
                  variant="outline"
                  className="bg-slate-900/50 text-cyan-100 border-cyan-800 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all"
                >
                  Class: {course}
                </Badge>
              )}
              {school && (
                <Badge
                  variant="outline"
                  className="bg-slate-900/50 text-cyan-100 border-cyan-800 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all"
                >
                  School: {school}
                </Badge>
              )}
            </div>
          </div>

          {/* Top 5 Skills */}
          {topSkills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] text-cyan-600 uppercase tracking-widest flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-cyan-900/50">
                Active Skills
              </h3>
              {/* Flex wrap to prevent overflow */}
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, i) => (
                  <Badge
                    key={skill}
                    className="bg-cyan-950/40 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/60 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-default py-1 px-3 text-xs rounded-sm group relative overflow-hidden"
                  >
                    <span className="relative z-10">{skill}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Achievements / Stats */}
          <div className="space-y-3">
            <h3 className="text-[10px] text-cyan-600 uppercase tracking-widest flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-cyan-900/50">
              Quest Records
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Projects", value: projects },
                { label: "Capstone", value: capstone },
                { label: "Jobs", value: jobs },
                { label: "Total XP", value: xp },
              ].map(
                (stat, idx) =>
                  stat.value && (
                    <div
                      key={idx}
                      className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-sm relative group hover:border-cyan-600/50 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>

                      <div className="text-[10px] text-slate-500 uppercase mb-1">{stat.label}</div>
                      <div className="text-white font-bold text-sm tracking-wide">{stat.value}</div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DevProfileCard
