'use client'
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function AdminRegister() {
  const registerAdmin = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "gtristan543@gmail.com",
      password: "loomloom",
    });

    if (error) {
      console.log("Signup error:", error);
    } else {
      console.log("Admin created:", data);
    }
  };

  const resendVerification = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: "gtristan543@gmail.com",
    })

    if (error) console.error('Resend failed:', error.message)
    else 
  console.log('Verification email resent:')
}

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
    }

    checkSession()
  }, [])

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
  email: 'gtristan543@gmail.com',
  password: 'loomloom'
})

console.log(data, error)
}


  return (
    <div className="p-10">
      <h1>Admin Registration</h1>
      <button onClick={registerAdmin}>Register Admin</button>
      <button className="border mt-4" onClick={resendVerification}>Resend Verification Email</button>
      <button className="border mt-4" onClick={login}>Login</button>
    </div>
  );
}
