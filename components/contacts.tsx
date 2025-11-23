"use client"

import type React from "react"

import { Mail, Linkedin, Github, Globe, Zap, MapPin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import ModuleHeader from "./module-header"
import { cn } from "@/lib/utils"

interface ContactItem {
  label: string
  value: string
  icon: React.ReactNode
  href?: string
}

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "gtristan543@gmail.com",
    icon: <Mail size={18} />,
    href: "mailto:gtristan543@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mark-tristan-garcia-36086b370",
    icon: <Linkedin size={18} />,
    href: "https://www.linkedin.com/in/mark-tristan-garcia-36086b370",
  },
  {
    label: "GitHub",
    value: "github.com/tristan8100",
    icon: <Github size={18} />,
    href: "https://github.com/tristan8100",
  },
  {
    label: "Portfolio",
    value: "mark-tristan-garcia-portfolio.netlify.app",
    icon: <Globe size={18} />,
    href: "https://mark-tristan-garcia-portfolio.netlify.app",
  },
  {
    label: "Availability",
    value: "Open for internship",
    icon: <Zap size={18} />,
  },
  {
    label: "Location",
    value: "Baliwag Bulacan, Philippines",
    icon: <MapPin size={18} />,
    href: "https://www.google.com/maps/place/Baliwag,+Bulacan/@14.7894816,120.9282612,13z/data=!4m5!3m4!1s0x3397c8e0b6c6c5d1:0x9d9a7a9a9a9a9a9a!8m2!3d14.7894816!4d120.9282612",
  },
]

export function ContactModule() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-32 mb-32 p-4" id="contacts">
      <ModuleHeader
        title="Contacts"
        title2="contact information"
        description="My contact details and availability."
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} index={index} />
        ))}
      </div>
    </section>
  )
}

function ContactCard({ contact, index }: { contact: ContactItem; index: number }) {
  const isLink = !!contact.href
  const Component = isLink ? motion.a : motion.div

  return (
    <Component
      href={contact.href}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950/50 p-4 backdrop-blur-sm transition-all duration-300",
        isLink && "hover:border-cyan-500/50 hover:bg-cyan-950/10 cursor-pointer",
      )}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />

      <div className="relative flex items-start gap-4">
        {/* Icon Container */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] transition-all duration-300">
            <div className="text-slate-400 group-hover:text-cyan-400 transition-colors">{contact.icon}</div>
          </div>
          {/* Decorative line */}
          <div className="absolute -bottom-2 left-1/2 w-px h-2 bg-gradient-to-b from-slate-800 to-transparent group-hover:from-cyan-500/50 transition-colors" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 group-hover:text-cyan-300/70 transition-colors">
              {contact.label}
            </span>
            {isLink && (
              <ExternalLink
                size={12}
                className="text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
              />
            )}
          </div>
          <div className="mt-1 font-mono text-sm text-slate-300 truncate group-hover:text-cyan-100 transition-colors">
            {contact.value}
          </div>

          {/* Availability Indicator */}
          {contact.label === "Availability" && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wide text-emerald-400">Online</span>
            </div>
          )}
        </div>
      </div>

      {/* Scanning Line Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
        <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent absolute top-0 -left-2 animate-scan-fast" />
      </div>
    </Component>
  )
}
