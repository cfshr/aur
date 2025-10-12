import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
      })
    }

    const body = await request.json()
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase.from("users").insert([body]).select().single()

    if (error) {
      console.error("Insert error:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
      })
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data,
    })
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Unknown error",
    })
  }
}
