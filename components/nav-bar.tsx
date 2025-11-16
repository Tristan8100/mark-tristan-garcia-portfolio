'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { useScroll, motion } from 'motion/react'
import { cn } from '@/lib/utils'

const menuItems = [
  { name: 'About Me', href: '#link' },
  { name: 'Skills', href: '#link' },
  { name: 'Projects', href: '#link' },
  { name: 'Contacts', href: '#link' },
]

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollYProgress } = useScroll()

  React.useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
    return () => unsub()
  }, [scrollYProgress])

  return (
    <header>
      <nav className="fixed z-20 w-full mt-4">
        <div
          className={cn(
            'mx-auto max-w-7xl border rounded-3xl px-6 lg:px-12 transition-all duration-300',
            scrolled && 'bg-background/50 backdrop-blur-2xl'
          )}
        >
          <motion.div
            key={1}
            className={cn(
              'relative flex items-center justify-between py-3 lg:py-4 gap-6 duration-200',
              scrolled && 'lg:py-3'
            )}
          >
            {/* LEFT — Logo + mobile menu */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-12">
              <Link href="/" className="flex items-center space-x-2 font-medium">
                Tristan
              </Link>

              {/* Mobile burger */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            {/* CENTER — Desktop nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mobile dropdown menu */}
          {menuState && (
            <div className="lg:hidden bg-background w-full flex flex-col items-center justify-start space-y-6 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none mt-2">
              <ul className="w-full text-base flex flex-col items-center space-y-6">
                {menuItems.map((item, index) => (
                  <li key={index} className="w-full text-center">
                    <Link
                      href={item.href}
                      className="block text-muted-foreground hover:text-accent-foreground duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
