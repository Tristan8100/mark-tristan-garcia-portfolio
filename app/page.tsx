'use client';
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";
import ShapeHero from "@/components/shape-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroHeader } from "@/components/nav-bar";
import GameProfileCard from "@/components/id";
import HeroSection from "@/components/sample-hero";
import AboutMeSection from "@/components/about-me";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import SkillSection from "@/components/skills-compoment";

export default function Home() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <AboutMeSection />
      <SkillSection />
      


    </div>
  );
}

