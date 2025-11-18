import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface SkillProps {
  name: string
  logo: string
  level: number // 0-100
  color?: string
  category?: string
  yearsOfExperience?: number
  projectsCount?: number
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  my_remarks?: string
}

const Skill: React.FC<SkillProps> = ({
  name,
  logo,
  level,
  color = 'from-primary to-primary/60',
  category,
  yearsOfExperience,
  projectsCount,
  proficiency = 'Intermediate',
  my_remarks
}) => {
  const proficiencyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Expert: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }

  return (
    <div className="relative group">
      {/* Gaming HUD Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        viewBox="0 0 300 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`skill-grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.6" />
            <stop offset="100%" className="[stop-color:oklch(0.6912_0.1569_240.2888)]" stopOpacity="0.3" />
          </linearGradient>
          <filter id={`skill-glow-${name}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Top-left corner */}
        <g filter={`url(#skill-glow-${name})`}>
          <path d="M0 0 L50 0 L40 10 L10 10 L10 40 L0 50 Z" fill={`url(#skill-grad-${name})`} />
          <path d="M0 0 L50 0 M0 0 L0 50" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
          <circle cx="40" cy="10" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
        </g>
        
        {/* Top-right corner */}
        <g filter={`url(#skill-glow-${name})`}>
          <path d="M300 0 L250 0 L260 10 L290 10 L290 40 L300 50 Z" fill={`url(#skill-grad-${name})`} />
          <path d="M300 0 L250 0 M300 0 L300 50" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
          <circle cx="260" cy="10" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
        </g>
        
        {/* Bottom-left corner */}
        <g filter={`url(#skill-glow-${name})`}>
          <path d="M0 400 L50 400 L40 390 L10 390 L10 360 L0 350 Z" fill={`url(#skill-grad-${name})`} />
          <path d="M0 400 L50 400 M0 400 L0 350" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
          <circle cx="40" cy="390" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
        </g>
        
        {/* Bottom-right corner */}
        <g filter={`url(#skill-glow-${name})`}>
          <path d="M300 400 L250 400 L260 390 L290 390 L290 360 L300 350 Z" fill={`url(#skill-grad-${name})`} />
          <path d="M300 400 L250 400 M300 400 L300 350" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="2" />
          <circle cx="260" cy="390" r="3" className="[fill:oklch(0.6912_0.1569_240.2888)]" />
        </g>

        {/* Side scan lines */}
        <line x1="5" y1="100" x2="5" y2="140" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
        <line x1="5" y1="260" x2="5" y2="300" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
        <line x1="295" y1="100" x2="295" y2="140" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
        <line x1="295" y1="260" x2="295" y2="300" className="[stroke:oklch(0.6912_0.1569_240.2888)]" strokeWidth="1.5" opacity="0.5" />
      </svg>

      {/* Card */}
      <Card className="relative border-border bg-card hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/20 overflow-hidden">
        <CardHeader className="pb-3">
          {/* Top row: Category + Level badge */}
          <div className="flex items-center justify-between mb-3">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">
              Lv {level}
            </Badge>
          </div>

          {/* Logo + Name */}
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
              <div className="relative w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center p-2 border border-border group-hover:border-primary transition-colors">
                <img 
                  src={logo} 
                  alt={name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span class="text-2xl">${name.charAt(0)}</span>`;
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{name}</h3>
              <Badge className={`${proficiencyColors[proficiency]} text-xs mt-1 border`}>
                {proficiency}
              </Badge>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>XP Progress</span>
              <span>{level}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${color} transition-all duration-700 ease-out shadow-lg`}
                style={{ 
                  width: `${level}%`,
                  boxShadow: `0 0 10px currentColor`
                }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            {yearsOfExperience !== undefined && (
              <div className="bg-secondary/30 rounded-lg p-3 text-center border border-border/50">
                <div className="text-xl font-bold text-primary">{yearsOfExperience}</div>
                <div className="text-xs text-muted-foreground">Years Exp</div>
              </div>
            )}
            {projectsCount !== undefined && (
              <div className="bg-secondary/30 rounded-lg p-3 text-center border border-border/50">
                <div className="text-xl font-bold text-primary">{projectsCount}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
            )}
          </div>

          {/* My Remarks */}
          {my_remarks && (
            <div className="bg-secondary/20 rounded-lg p-3 border border-border/50">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">💭</span>
                <div>
                  <div className="text-xs font-semibold text-foreground mb-1">My Thoughts</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{my_remarks}</p>
                </div>
              </div>
            </div>
          )}

          {/* Proficiency indicator dots */}
          <div className="flex items-center justify-center gap-1 pt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < ['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(proficiency) + 1
                    ? 'bg-primary scale-100'
                    : 'bg-secondary scale-75'
                }`}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Skill;