'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, setUser } = useAuth();

    useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error checking session:', error)
      } else if (session) {
        console.log('You are still logged in:', session)
      } else {
        console.log('Not logged in')
      }

      // 1. Get logged-in user ID
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()

      console.log("Logged in user:", user)

      if (userError || !user) {
        console.error("No user logged in")
        return
      }

      console.log("Fetching user data for ID:", user.id)

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)

      console.log("Profile query result:", data)


      }

    checkSession()
  }, [])


  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center justify-center bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
