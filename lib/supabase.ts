import { createClient } from "@supabase/supabase-js"

// Check if environment variables are properly loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!")
  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing")
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Set" : "✗ Missing")
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: false,
  },
})

export type UserSignup = {
  user_type: "enthusiast" | "artisan" | "collector"
  first_name: string
  last_name: string
  email: string
  design_interests: string[]
  agreed_to_terms: boolean
}

export async function createUserSignup(data: UserSignup) {
  try {
    const { data: user, error } = await supabase.from("users").insert([data]).select().single()

    if (error) {
      // Handle specific error types
      if (error.code === "23505") {
        throw new Error("This email is already registered")
      }
      console.error("Supabase insert error:", error)
      throw new Error(error.message || "Failed to create account")
    }

    return user
  } catch (error: any) {
    console.error("Create user signup error:", error)
    throw error
  }
}

// Test connection function
export async function testSupabaseConnection() {
  try {
    // First check if env vars are set
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Environment variables not configured")
      return {
        success: false,
        error: "Environment variables not configured",
        details: {
          url: supabaseUrl ? "Set" : "Missing",
          key: supabaseAnonKey ? "Set" : "Missing",
        },
      }
    }

    console.log("Testing connection to:", supabaseUrl)

    // Try to query the users table
    const { data, error } = await supabase.from("users").select("id").limit(1)

    if (error) {
      console.error("Connection test query failed:", error)
      return {
        success: false,
        error: error.message,
        details: error,
      }
    }

    console.log("✅ Supabase connection successful!")
    return {
      success: true,
      error: null,
      details: { recordCount: data?.length || 0 },
    }
  } catch (error: any) {
    console.error("Connection test error:", error)
    return {
      success: false,
      error: error.message || "Unknown error",
      details: error,
    }
  }
}

// Get environment info for debugging
export function getSupabaseConfig() {
  return {
    url: supabaseUrl || "Not set",
    hasKey: !!supabaseAnonKey,
    urlValid: supabaseUrl?.includes("supabase.co"),
  }
}
