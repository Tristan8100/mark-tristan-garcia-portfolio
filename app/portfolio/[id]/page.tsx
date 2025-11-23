"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Calendar,
  Code2,
  Globe,
  Server,
  Layers,
  Cpu,
  Shield,
  Terminal,
  XIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';

interface Project {
  id: string
  title: string
  description?: string
  thumbnail: string
  rank?: string
  time_to_develop?: number
  images?: string[]
  urls?: {
    live?: string
    frontend?: string
    backend?: string
    monolith?: string
  }
  stack?: string[]
  created_at?: string
}

// System UI Components
const SystemPanel = ({
  children,
  className,
  title,
}: { children: React.ReactNode; className?: string; title?: string }) => (
  <div className={cn("relative bg-card/40 backdrop-blur-md border border-primary/30 overflow-hidden group", className)}>
    {/* Corner Accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />

    {/* Header Line */}
    {title && (
      <div className="absolute top-0 left-0 right-0 h-8 bg-primary/10 border-b border-primary/20 flex items-center px-3">
        <span className="text-xs font-mono text-primary tracking-widest uppercase">{title}</span>
      </div>
    )}

    <div className={cn("p-4", title && "pt-12")}>{children}</div>
  </div>
)

const SystemStat = ({ label, value, icon: Icon }: { label: string; value: string | number; icon?: any }) => (
  <div className="flex items-center justify-between py-2 border-b border-primary/10 last:border-0 group hover:bg-primary/5 transition-colors px-2">
    <div className="flex items-center gap-2 text-muted-foreground">
      {Icon && <Icon className="w-4 h-4 text-primary/70" />}
      <span className="text-sm font-mono uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-primary font-mono font-bold system-text-glow">{value}</span>
  </div>
)

const RankBadge = ({ rank }: { rank: string }) => {
  const getRankColor = (r: string) => {
    switch (r.toUpperCase()) {
      case "S":
        return "text-yellow-400 border-yellow-400 shadow-yellow-400/50"
      case "A":
        return "text-purple-400 border-purple-400 shadow-purple-400/50"
      case "B":
        return "text-blue-400 border-blue-400 shadow-blue-400/50"
      default:
        return "text-primary border-primary shadow-primary/50"
    }
  }

  return (
    <div
      className={cn(
        "relative w-16 h-16 flex items-center justify-center border-2 rounded-full bg-background/50 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]",
        getRankColor(rank),
      )}
    >
      <span className="text-3xl font-black font-mono">{rank}</span>
      <div className="absolute inset-0 rounded-full border border-current opacity-20 animate-ping" />
    </div>
  )
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [bootSequence, setBootSequence] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  useEffect(() => {
    // Simulate system boot sequence
    const timer = setTimeout(() => setBootSequence(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("portfolio").select("*").eq("id", params.id).single()

      if (!error && data) {
        setProject(data)
        setSelectedImage(data.thumbnail || data.images?.[0] || "")
      }
      setLoading(false)
    }

    if (params.id) {
      loadProject()
    }
  }, [params.id])

  if (bootSequence || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="z-10 flex flex-col items-center gap-4 w-64">
          <div className="w-full h-1 bg-primary/20 overflow-hidden">
            <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: "100%" }} />
          </div>
          <div className="font-mono text-primary text-sm animate-pulse">SYSTEM INITIALIZING...</div>
          <div className="text-xs text-primary/50 font-mono">LOADING PROJECT DATA [ID: {params.id}]</div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <SystemPanel className="max-w-md w-full text-center p-8 border-destructive/50">
          <h2 className="text-2xl font-bold mb-2 text-destructive font-mono">ERROR 404</h2>
          <p className="text-muted-foreground mb-6 font-mono">PROJECT_DATA_NOT_FOUND</p>
          <Button
            onClick={() => router.push("/#projects")}
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            RETURN TO LOBBY
          </Button>
        </SystemPanel>
      </div>
    )
  }

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean)

  return (
    <div className={cn("min-h-screen bg-[#020617] text-foreground relative overflow-x-hidden selection:bg-primary/30 selection:text-primary", isDialogOpen && "backdrop-blur-sm")}>
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
      </div>

      {/* Floating Particles/Dust (CSS only for performance) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 animate-pulse bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between mb-12 border-b border-primary/20 pb-4 backdrop-blur-sm sticky top-0 z-50 bg-[#020617]/80">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/#projects")}
              className="text-primary hover:text-primary hover:bg-primary/10 font-mono gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              SYSTEM_LOBBY
            </Button>
            <div className="h-4 w-[1px] bg-primary/20" />
            <span className="text-xs font-mono text-muted-foreground tracking-widest">PROJECT_VIEWER_V2.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-xs font-mono text-primary/70">ONLINE</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Main Visuals (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title Section */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
              <h1 className="text-4xl lg:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-white tracking-tight uppercase font-mono">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 text-sm font-mono text-primary/60">
                <span>ID: {project.id.slice(0, 8).toUpperCase()}</span>
                <span>•</span>
                <span>CLASS: {project.stack?.[0] || "UNKNOWN"}</span>
              </div>
            </div>

            {/* Main Display */}
            <SystemPanel title="VISUAL_FEED" className="p-0">
              <MorphingDialog
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
              <div className="relative w-full overflow-hidden bg-black/50 group">
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none z-10 scanline opacity-10" />
                <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <MorphingDialogTrigger>
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onClick={() => {setIsDialogOpen(true), console.log("Image clicked")}}
                  />
                </MorphingDialogTrigger>
                
                <MorphingDialogContainer>
                  <MorphingDialogContent>
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className='fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1'
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <XIcon className='h-5 w-5 text-zinc-500' />
                  </MorphingDialogClose>
                </MorphingDialogContainer>

                {/* HUD Overlay on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 border-l-2 border-primary">
                    <span className="text-xs font-mono text-primary">IMG_SOURCE_01</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1 h-4 bg-primary/50" />
                    ))}
                  </div>
                </div>
              </div>
              </MorphingDialog>
            </SystemPanel>

            {/* Gallery Grid */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "relative aspect-video overflow-hidden border transition-all duration-300 group",
                      selectedImage === img
                        ? "border-primary shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                        : "border-primary/20 hover:border-primary/60 opacity-60 hover:opacity-100",
                    )}
                  >
                    <div className="absolute inset-0 bg-primary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description Panel */}
            <SystemPanel title="MISSION_BRIEFING">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans text-lg">
                {project.description}
              </p>
            </SystemPanel>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 space-y-6">
            {/* Rank Card */}
            <div className="flex items-center justify-between bg-card/30 border border-primary/20 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">Project Rank</h3>
                <div className="text-xs text-primary/50 font-mono">EVALUATION COMPLETE</div>
              </div>
              <RankBadge rank={project.rank || "B"} />
            </div>

            {/* stats panel */}
            <SystemPanel title="SYSTEM_ATTRIBUTES">
              <div className="space-y-1">
                <SystemStat label="Development Time" value={`${project.time_to_develop || 0} MONTH(S)`} icon={Clock} />
                <SystemStat label="Tech Stack Count" value={project.stack?.length || 0} icon={Layers} />
                {/*}
                {project.created_at && (
                  <SystemStat label="Date" value={new Date(project.created_at).toLocaleDateString()} icon={Calendar} />
                )} */}
              </div>
            </SystemPanel>

            {/* Tech Stack Grid */}
            <SystemPanel title="EQUIPPED_SKILLS">
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-primary/5 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary transition-all font-mono rounded-none"
                  >
                    [{tech}]
                  </Badge>
                ))}
              </div>
            </SystemPanel>

            {/* Links */}
            <SystemPanel title="AVAILABLE_ACTIONS">
              <div className="space-y-3">
                {project.urls?.live && (
                  <Button
                    className="w-full justify-between bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 hover:border-primary group h-12"
                    onClick={() => window.open(project.urls?.live, "_blank")}
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <Globe className="h-4 w-4" />
                      INITIATE_DEMO
                    </span>
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {project.urls?.frontend && (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 bg-transparent"
                      onClick={() => window.open(project.urls?.frontend, "_blank")}
                    >
                      <Code2 className="h-4 w-4" />
                      <span className="font-mono text-xs">FRONTEND</span>
                    </Button>
                  )}
                  {project.urls?.backend && (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 bg-transparent"
                      onClick={() => window.open(project.urls?.backend, "_blank")}
                    >
                      <Server className="h-4 w-4" />
                      <span className="font-mono text-xs">BACKEND</span>
                    </Button>
                  )}
                </div>

                {project.urls?.monolith && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 bg-transparent"
                    onClick={() => window.open(project.urls?.monolith, "_blank")}
                  >
                    <Terminal className="h-4 w-4" />
                    <span className="font-mono text-xs">SOURCE_CODE</span>
                  </Button>
                )}
              </div>
            </SystemPanel>

            {/* Logs, might change */}
            <div className="p-4 border border-primary/10 bg-black/40 font-mono text-[10px] text-primary/40 space-y-1 h-32 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
              <p>{">"} SYSTEM_CHECK_COMPLETE</p>
              <p>{">"} RENDERING_PROJECT_ASSETS...</p>
              <p>{">"} CONNECTION_ESTABLISHED: STABLE</p>
              <p>{">"} USER_ACCESS_LEVEL: ADMIN</p>
              <p>{">"} LOADING_TEXTURES: 100%</p>
              <p>{">"} WAITING_FOR_INPUT...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
