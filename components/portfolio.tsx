import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import { Clock, Loader2, ArrowUpRight, Database, Trophy } from "lucide-react"
import Link from "next/link"
import ModuleHeader from "./module-header"

interface Portfolio {
  id: number
  title: string
  thumbnail?: string
  rank?: string
  time_to_develop?: string
  created_at?: string
  stack?: string[]
}

export default function PortfolioShowcase() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/portfolio")
        const data = await res.json()

        const normalizedData = data.map((item: any) => ({
          ...item,
          rank: ["S", "A", "B", "C", "E", "F"].includes(item.rank?.toUpperCase()) 
            ? item.rank?.toUpperCase() 
            : "F",
        }))

        setPortfolios(normalizedData)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolios()
  }, [])


  // Rank ordering for sizing (S is largest)
  const rankOrder = { S: 0, A: 1, B: 2, C: 3, E: 4, F: 5 }

  // Bento grid layout pattern based on rank
  const getBentoClass = (rank: string) => {
    switch (rank) {
      case "S":
        return "md:col-span-2 md:row-span-2" // Large featured
      case "A":
        return "md:col-span-2 md:row-span-1" // Wide
      case "B":
        return "md:col-span-1 md:row-span-2" // Tall
      case "C":
        return "md:col-span-1 md:row-span-1" // Regular
      case "E":
        return "md:col-span-1 md:row-span-1" // Regular
      case "F":
      default:
        return "md:col-span-1 md:row-span-1" // Regular
    }
  }

  // Sort projects to optimize grid layout
  const sortedPortfolios = [...portfolios].sort((a, b) => {
    const rankOrderMap = rankOrder as Record<string, number>
    return (rankOrderMap[a.rank as keyof typeof rankOrder] ?? 5) - (rankOrderMap[b.rank as keyof typeof rankOrder] ?? 5)
  })

  const isLargeCard = (rank: string) => {
    return rank === "S"
  }

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-[#020617] py-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />
            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
          </div>
          <div className="font-mono text-cyan-400 animate-pulse">SYSTEM INITIALIZING...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-[#020617] py-20 overflow-hidden min-h-screen" id="projects">
      {/* System Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-20" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #020617 100%)" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* System Header */}

          <ModuleHeader title="PORTFOLIO" title2="PROJECTS" description={`AVAILABLE PROJECTS: ${portfolios.length}`} />

        {/* Bento Grid */}
        {portfolios.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-cyan-500/20 rounded-lg bg-cyan-950/5">
            <p className="text-cyan-400/50 font-mono">SERVER ERROR - ERROR FETCHING PROJECTS</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-6">
            {portfolios
              .sort((a, b) => rankOrder[a.rank as keyof typeof rankOrder] - rankOrder[b.rank as keyof typeof rankOrder])
              .map((project) => {
              const isLarge = isLargeCard(project.rank || "F")
              const isHovered = hoveredId === project.id

              return (
                <Link
                  href={`/portfolio/${project.id}`}
                  key={project.id}
                  className={`group relative transition-all duration-500 cursor-pointer ${getBentoClass(project.rank || "F")}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Card Container */}
                  <div className="absolute inset-0 bg-[#0a0f1e]/80 backdrop-blur-sm border border-cyan-900/50 overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    {/* Background Image with System Overlay */}
                    <div className="absolute inset-0 z-0">
                      {project.thumbnail ? (
                        <>
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
                          {/* Grid Overlay on Image */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-cyan-950/10 flex items-center justify-center">
                          <Database className="w-12 h-12 text-cyan-900/40" />
                        </div>
                      )}
                    </div>

                    {/* System UI Overlays */}
                    <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
                      {/* Top Bar */}
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          {project.rank && (
                            <div className="flex items-center gap-2">
                              <Badge className="bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 font-mono rounded-none px-2">
                                RANK: {project.rank}
                              </Badge>
                              {project.rank === "S" && <Trophy className="w-3 h-3 text-yellow-500" />}
                            </div>
                          )}
                        </div>

                        {/* Corner Decoration */}
                        <div
                          className={`w-8 h-8 border-t-2 border-r-2 transition-colors duration-300 ${isHovered ? "border-cyan-400" : "border-cyan-800/30"}`}
                        />
                      </div>

                      {/* Content Area */}
                      <div className="space-y-4">
                        <div>
                          <h3
                            className={`font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors ${isLarge ? "text-3xl" : "text-xl"}`}
                          >
                            {project.title}
                          </h3>

                          {project.time_to_develop && (
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/60 mt-2">
                              <Clock className="h-3 w-3" />
                              <span>TIME_TO_DEVELOP: {project.time_to_develop} MONTH(S)</span>
                            </div>
                          )}
                        </div>

                        {/* Tech Stack / Skills */}
                        {project.stack && project.stack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.stack.slice(0, isLarge ? 6 : 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-1.5 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-cyan-300/80 uppercase"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.stack.length > (isLarge ? 6 : 3) && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-cyan-300/80">
                                +{project.stack.length - (isLarge ? 6 : 3)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action Line */}
                        <div className="flex items-center justify-between pt-2 border-t border-cyan-500/10">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-1.5 w-1.5 rounded-full ${isHovered ? "bg-cyan-400 shadow-[0_0_5px_#22d3ee]" : "bg-cyan-900"}`}
                            />
                            <span className="text-[10px] font-mono text-cyan-500/50 tracking-wider">
                              STATUS: COMPLETE
                            </span>
                          </div>
                          <ArrowUpRight
                            className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${isHovered ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corners */}
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-800/30 group-hover:border-cyan-400 transition-colors duration-300" />

                    {/* Scanning Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent translate-y-[-100%] transition-transform duration-1000 ${isHovered ? "translate-y-[100%]" : ""}`}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}