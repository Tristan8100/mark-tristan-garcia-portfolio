import { Database } from "lucide-react";
import { Badge } from "./ui/badge";

export default function ModuleHeader({ title, title2, description }: { title: string, title2?: string, description?: string }) {
    return (
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-cyan-500/20 blur-sm" />
            <Badge
              variant="outline"
              className="relative mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-950/30 px-4 py-1 font-mono tracking-widest uppercase"
            >
              <Database className="w-3 h-3 mr-2" />
              {title2}
            </Badge>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-white tracking-tight relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">{title}</span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-cyan-400/60 font-mono text-sm">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>{description}</span>
          </div>

          <div className="mt-8 mx-auto w-full max-w-md h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-[#020617] border-x border-cyan-500/50" />
          </div>
        </div>
    );
}