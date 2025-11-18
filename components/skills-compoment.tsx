"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import Skill from "./skill"
import { SkillProps } from "./skill"
import { useState, useEffect } from "react"
import { Badge } from "./ui/badge"

export default function SkillSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([])

  // Generate particles on client only (fix hydration mismatch)
  useEffect(() => {
    const arr = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`,
    }))
    setParticles(arr)
  }, [])

  const skills: SkillProps[] = [
    {
      name: "React.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 90,
      color: "from-cyan-500 to-blue-500",
      category: "Frontend",
      yearsOfExperience: 2.5,
      projectsCount: 15,
      proficiency: "Advanced",
      my_remarks: "Love how it makes building UIs intuitive with component-based architecture. The ecosystem is massive!",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 85,
      color: "from-blue-500 to-blue-700",
      category: "Language",
      yearsOfExperience: 2,
      projectsCount: 12,
      proficiency: "Advanced",
      my_remarks: "Type safety saves so much debugging time. Makes refactoring confident and safe.",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 80,
      color: "from-green-500 to-green-700",
      category: "Backend",
      yearsOfExperience: 2,
      projectsCount: 10,
      proficiency: "Advanced",
      my_remarks: "JavaScript everywhere! Perfect for building fast, scalable server-side applications.",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      level: 88,
      color: "from-gray-700 to-gray-900",
      category: "Framework",
      yearsOfExperience: 1.5,
      projectsCount: 8,
      proficiency: "Advanced",
      my_remarks: "The best React framework for production apps. SSR, routing, and optimization out of the box!",
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      level: 75,
      color: "from-blue-600 to-indigo-600",
      category: "Database",
      yearsOfExperience: 1.5,
      projectsCount: 7,
      proficiency: "Intermediate",
      my_remarks: "Powerful and reliable database. Still learning advanced query optimization techniques.",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      level: 92,
      color: "from-teal-400 to-cyan-500",
      category: "Styling",
      yearsOfExperience: 2,
      projectsCount: 20,
      proficiency: "Expert",
      my_remarks: "Never going back to traditional CSS. Utility-first approach is a game changer for rapid development.",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      level: 92,
      color: "from-teal-400 to-cyan-500",
      category: "tools",
      yearsOfExperience: 2,
      projectsCount: 20,
      proficiency: "Beginner",
      my_remarks: "Great for containerizing applications, ensuring consistency across environments.",
    },
  ]

  const playHoverSound = () => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLYiTcIGWi77eefTRAMUKfj8LZjHAY4ktfyzngsBS1+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBSh+zPLaizsKG2S57OihUxELTKXh8bllHgU2jdT00H4vBQ=="
    )
    audio.volume = 0.2
    audio.play().catch(() => {})
  }

  return (
    <div className="relative min-h-screen bg-background py-20 overflow-hidden">
      {/* Particles — safe on client only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            ⚡ Tech Arsenal
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
            My Tech Stack
          </h1>

          <p className="text-muted-foreground text-lg">Click on any skill to learn more</p>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* SKILL GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 place-items-center max-w-4xl mx-auto">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`relative group ${idx % 2 === 1 ? "md:mt-12 mt-0" : "mt-0"}`}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br ${skill.color}`}
                style={{ transform: "scale(1.5)" }}
              ></div>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="relative w-32 h-32 cursor-pointer focus:outline-none"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={playHoverSound}
                  >
                    {/* HUD Frame */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-all duration-300"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <filter id={`glow-${idx}`}>
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <polygon
                        points="50,5 90,28 90,72 50,95 10,72 10,28"
                        fill="none"
                        stroke="oklch(0.6912 0.1569 240.2888)"
                        strokeWidth="1"
                        className={`transition-all duration-300 ${
                          hoveredSkill === skill.name
                            ? "opacity-100 stroke-[2]"
                            : "opacity-40"
                        }`}
                        filter={hoveredSkill === skill.name ? `url(#glow-${idx})` : ""}
                      />
                    </svg>

                    {/* Skill Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`relative transition-all duration-300 ${
                          hoveredSkill === skill.name ? "scale-110" : "scale-100"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${skill.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                        ></div>

                        <div className="relative w-20 h-20 rounded-lg bg-card/80 backdrop-blur-sm border border-border group-hover:border-primary flex items-center justify-center p-3 transition-all duration-300">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Level */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Lv {skill.level}
                    </div>
                  </button>
                </PopoverTrigger>

                <PopoverContent side="top" className="w-96 p-0 border-border shadow-2xl" sideOffset={16}>
                  <Skill {...skill} />
                </PopoverContent>
              </Popover>

              {/* Name */}
              <div className="text-center mt-4">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Float Animation */}
      <style jsx>
        {`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            50% {
              transform: translateY(-100px) translateX(50px);
              opacity: 0.5;
            }
            90% {
              opacity: 0.3;
            }
          }
          .animate-float {
            animation: float linear infinite;
          }
        `}
      </style>
    </div>
  )
}
