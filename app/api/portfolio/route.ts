import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("portfolio")
    .select("id, title, thumbnail, rank, time_to_develop, created_at, stack")
    .order("rank", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json([], { status: 500 }); // always return array
  }

  return NextResponse.json(data || []); // if data is null, return empty array
}
