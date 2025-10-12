import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl,
    })

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
        },
      })
    }

    // Create client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test query
    const { data, error } = await supabase.from("users").select("id").limit(1)

    if (error) {
      console.error("Query error:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Connection successful",
      recordCount: data?.length || 0,
    })
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Unknown error",
      stack: error.stack,
    })
  }
}
