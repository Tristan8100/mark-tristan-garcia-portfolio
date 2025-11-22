"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Module from "module"
import ModuleHeader from "./module-header"
import { Button } from "./ui/button"

// --- Types ---
interface SkillProps {
  name: string
  logo: string
  level: number
  color: string
  category: string
  yearsOfExperience: number
  projectsCount: number
  proficiency: string
  my_remarks: string
}

// --- Data ---
const skills: SkillProps[] = [
  {
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    level: 60,
    color: "red",
    category: "Backend",
    yearsOfExperience: 1,
    projectsCount: 10,
    proficiency: "Intermediate",
    my_remarks: "I'm most proficient in this framework, I've tried breeze auth, blade, inertia using react, livewire but I mostly prefer creating API with it, I've done most of my projects in this framework including our capstone project.",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    level: 35,
    color: "gray",
    category: "Backend",
    yearsOfExperience: 0.5,
    projectsCount: 4,
    proficiency: "Beginner",
    my_remarks: "pretty straight forward, but will be a mess if you scale a larger system, that's why I prefer Nest js.",
  },
  {
    name: "Nest js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    level: 35,
    color: "rose",
    category: "Backend",
    yearsOfExperience: 0.1,
    projectsCount: 1,
    proficiency: "Beginner",
    my_remarks: "A perfect combination of Express unopinionated and Laravel opinionated approach. This will be my new tech stack on the backend from now on.",
  },
  {
    name: "Node js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: 45,
    color: "green",
    category: "Runtime",
    yearsOfExperience: 1,
    projectsCount: 1,
    proficiency: "Beginner",
    my_remarks: "Useful to run server side using JavaScript.",
  },
  {
    name: "Php",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    level: 50,
    color: "indigo",
    category: "Language",
    yearsOfExperience: 1.5,
    projectsCount: 8,
    proficiency: "Intermediate",
    my_remarks: "My first server side programming language where I created my own MVC pattern.",
  },
  {
    name: "Typescript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: 50,
    color: "blue",
    category: "Language",
    yearsOfExperience: 1,
    projectsCount: 6,
    proficiency: "Intermediate",
    my_remarks: "This is no longer an option, it is required, though I still use 'any' sometimes and forgot to add data types.",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    level: 45,
    color: "purple",
    category: "Styling",
    yearsOfExperience: 1.5,
    projectsCount: 1,
    proficiency: "Beginner",
    my_remarks: "My first CSS framework, it has jQuery for some components interactivity which helps a lot when I'm starting, though it's not that customizable.",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    level: 55,
    color: "teal",
    category: "Styling",
    yearsOfExperience: 1,
    projectsCount: 8,
    proficiency: "Intermediate",
    my_remarks: "One of the standards in using React with Shadcn, I prefer this over bootstrap since most component libraries use tailwind.",
  },
  {
    name: "React js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: 50,
    color: "cyan",
    category: "Frontend",
    yearsOfExperience: 1,
    projectsCount: 7,
    proficiency: "Intermediate",
    my_remarks: "Will never go back to vanilla JavaScript.",
  },
  {
    name: "Next js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: 45,
    color: "white",
    category: "Framework",
    yearsOfExperience: 1,
    projectsCount: 6,
    proficiency: "Beginner",
    my_remarks: "I haven't fully utilized the server side capabilities of this framework since all my projects use csr since it doesn't need seo, but still a great framework and will be my permanent tech stack on the frontend.",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: 30,
    color: "sky",
    category: "DevOps",
    yearsOfExperience: 0.8,
    projectsCount: 3,
    proficiency: "Beginner",
    my_remarks: "I've used it on my Laravel projects, given the lack of a free hosting provider, I decided to use Dockerfile on laravel to host on Render, I'm surprised that this Docker is indeed a game changer.",
  },
  {
    name: "firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    level: 40,
    color: "yellow",
    category: "Backend-as-a-Service",
    yearsOfExperience: 0.8,
    projectsCount: 1,
    proficiency: "Beginner",
    my_remarks: "This is my first time dealing with a nosql database and backend as a service, perfect for a simple web app but I'm not into nosql.",
  },
  {
    name: "supabase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    level: 45,
    color: "emerald",
    category: "Database",
    yearsOfExperience: 0.3,
    projectsCount: 1,
    proficiency: "Beginner",
    my_remarks: "My first time using postgresql in this portfolio project, perfect for small to medium web apps that need to host quickly.",
  },
];

// --- Components ---

const HexagonFrame = ({ isActive, color }: { isActive: boolean; color: string }) => (
  <svg
    className={cn(
      "absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none",
      isActive ? "opacity-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "opacity-40",
    )}
    viewBox="0 0 100 100"
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Outer Hexagon */}
    <path
      d="M50 2 L93.3 27 V77 L50 102 L6.7 77 V27 Z"
      fill="none"
      stroke={isActive ? "#06b6d4" : "#1e293b"}
      strokeWidth={isActive ? "2" : "1"}
      className="transition-all duration-300"
    />
    {/* Inner Decorative Lines */}
    {isActive && (
      <>
        <path d="M50 10 L85 30 V70 L50 90 L15 70 V30 Z" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.5" />
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          className="animate-spin-slow"
        />
      </>
    )}
  </svg>
)

const SkillDetailWindow = ({ skill, onClose }: { skill: SkillProps; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#020617]/90 border border-cyan-500/50 p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)",
        }}
      >
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 border-b border-cyan-900/50 pb-4">
          <div className="w-16 h-16 p-2 bg-cyan-950/30 border border-cyan-500/30 rounded-md">
            <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-cyan-400 tracking-wider font-mono uppercase">{skill.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-300 bg-cyan-950/30 font-mono text-xs">
                {skill.category.toUpperCase()}
              </Badge>
              <span className="text-xs text-cyan-600 font-mono">LVL.{skill.level}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-cyan-950/10 p-3 border border-cyan-900/30">
            <div className="text-[10px] text-cyan-600 font-mono uppercase mb-1">Proficiency</div>
            <div className="text-cyan-100 font-mono">{skill.proficiency}</div>
          </div>
          <div className="bg-cyan-950/10 p-3 border border-cyan-900/30">
            <div className="text-[10px] text-cyan-600 font-mono uppercase mb-1">Experience</div>
            <div className="text-cyan-100 font-mono">{skill.yearsOfExperience} Years</div>
          </div>
          <div className="bg-cyan-950/10 p-3 border border-cyan-900/30 col-span-2">
            <div className="text-[10px] text-cyan-600 font-mono uppercase mb-1">Projects Completed</div>
            <div className="w-full bg-cyan-950/50 h-2 mt-1 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-cyan-500"
                style={{ width: `${(skill.projectsCount / 30) * 100}%` }}
              />
            </div>
            <div className="text-right text-[10px] text-cyan-400 font-mono mt-1">{skill.projectsCount} Missions</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-cyan-950/20 p-4 border-l-2 border-cyan-500 mb-6">
          <div className="text-[10px] text-cyan-600 font-mono uppercase mb-2">System Analysis</div>
          <p className="text-sm text-cyan-100/80 font-mono leading-relaxed">"{skill.my_remarks}"</p>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full py-3 bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-400 font-mono text-sm uppercase tracking-widest transition-colors"
        >
          Close Window
        </Button>
      </div>
    </motion.div>
  )
}

export default function SkillSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillProps | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("https://www.myinstants.com/media/sounds/system-notifikason-solo-leveling.mp3")
    audioRef.current.volume = 0.2
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.05
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <section className="relative min-h-screen bg-background py-24 overflow-hidden" id="skills">
      {/* Background Grid & Scanlines */}
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <ModuleHeader title="My Skills" title2="My Skills" description="My Skills" />

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto perspective-1000">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="relative group w-32 h-36 md:w-40 md:h-44 cursor-pointer"
              onMouseEnter={() => {
                setHoveredSkill(skill.name)
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => { setSelectedSkill(skill); playSound(); }}
            >
              {/* Hexagon Container */}
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 group-hover:z-10">
                <HexagonFrame isActive={hoveredSkill === skill.name} color={skill.color} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20">
                  <div
                    className={cn(
                      "w-12 h-12 md:w-16 md:h-16 mb-2 transition-all duration-300",
                      hoveredSkill === skill.name
                        ? "scale-110 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                        : "grayscale opacity-70",
                    )}
                  >
                    <img
                      src={skill.logo || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div
                    className={cn(
                      "text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300",
                      hoveredSkill === skill.name ? "text-cyan-300" : "text-slate-500",
                    )}
                  >
                    {skill.name}
                  </div>

                  {/* Level Indicator */}
                  <div
                    className={cn(
                      "absolute -bottom-4 px-2 py-0.5 bg-cyan-950 border border-cyan-500/50 rounded text-[9px] font-mono text-cyan-400 transition-opacity duration-300",
                      hoveredSkill === skill.name ? "opacity-100" : "opacity-0",
                    )}
                  >
                    LVL.{skill.level}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSkill && <SkillDetailWindow skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
      </AnimatePresence>
    </section>
  )
}
