"use client"

import { GitHubCalendar } from "react-github-calendar"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function GithubChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full bg-slate-950 border-cyan-800/50 p-8 h-[300px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="text-cyan-500/50 font-mono animate-pulse">INITIALIZING SYSTEM LOG...</div>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-slate-950 border-cyan-800/50 p-8 relative overflow-hidden group">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center gap-3 border-b border-cyan-800/30 pb-3">
        <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
        <h3 className="text-cyan-400 font-mono uppercase tracking-widest text-sm font-bold">
          GitHub <span className="text-cyan-800 mx-2">//</span> Contribution Data
        </h3>
        <div className="ml-auto flex gap-1">
          <div className="w-1 h-1 bg-cyan-800 rounded-full" />
          <div className="w-1 h-1 bg-cyan-800 rounded-full" />
          <div className="w-1 h-1 bg-cyan-800 rounded-full" />
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative z-10 flex flex-col items-center justify-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-slate-950">
        <div className="text-cyan-400 font-mono text-lg mb-2">Tristan8100</div>
        <GitHubCalendar
          username="tristan8100"
          colorScheme="dark"
          blockMargin={4}
          blockSize={14}
          fontSize={12}
          theme={{
            dark: [
              "#0f172a", // level 0 (slate-900)
              "#0e7490", // level 1 (cyan-700)
              "#06b6d4", // level 2 (cyan-500)
              "#22d3ee", // level 3 (cyan-400)
              "#a5f3fc", // level 4 (cyan-200)
            ],
          }}
          style={{
            color: "#94a3b8",
            fontFamily: "monospace",
          }}
        />
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-px w-full animate-scan pointer-events-none" />
    </Card>
  )
}
