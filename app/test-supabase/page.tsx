"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Circle, CheckCircle2, XCircle, Loader2, AlertCircle, Copy } from "lucide-react"

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [insertStatus, setInsertStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [connectionDetails, setConnectionDetails] = useState<any>(null)
  const [envVars, setEnvVars] = useState<any>(null)

  useEffect(() => {
    // Check client-side env vars
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      urlValid: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("supabase.co") || false,
    })
  }, [])

  const handleTestConnection = async () => {
    setConnectionStatus("testing")
    setErrorMessage("")
    setConnectionDetails(null)

    try {
      const response = await fetch("/api/test-supabase")
      const result = await response.json()

      setConnectionDetails(result)

      if (result.success) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
        setErrorMessage(result.error || "Unknown error")
      }
    } catch (error: any) {
      setConnectionStatus("error")
      setErrorMessage(error.message)
      setConnectionDetails({ error: error.message })
    }
  }

  const handleTestInsert = async () => {
    setInsertStatus("testing")
    setErrorMessage("")

    try {
      const response = await fetch("/api/test-supabase/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_type: "enthusiast",
          first_name: "Test",
          last_name: "User",
          email: `test-${Date.now()}@example.com`,
          design_interests: ["Local Designers", "Touch technology"],
          agreed_to_terms: true,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setInsertStatus("success")
      } else {
        setInsertStatus("error")
        setErrorMessage(result.error || "Unknown error")
      }
    } catch (error: any) {
      setInsertStatus("error")
      setErrorMessage(error.message)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent font-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Circle className="w-6 h-6 text-foreground" strokeWidth={1} />
              <span className="text-xl font-light tracking-wide text-foreground">Supabase Diagnostics</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-foreground mb-4 tracking-wide">Supabase Connection Test</h1>
            <p className="text-muted-foreground font-light">Diagnose and test your Supabase database connection</p>
          </div>

          {/* Environment Variables Check */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-light tracking-wide flex items-center justify-between">
                <span>Environment Variables</span>
                {envVars?.hasKey && envVars?.urlValid ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono text-muted-foreground">NEXT_PUBLIC_SUPABASE_URL</span>
                  <span className={`text-sm font-semibold ${envVars?.urlValid ? "text-green-600" : "text-red-600"}`}>
                    {envVars?.urlValid ? "✓ Valid" : "✗ Invalid"}
                  </span>
                </div>
                {envVars?.url && envVars.url !== "NOT SET" && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs font-mono break-all">
                    <span className="flex-1">{envVars.url}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => copyToClipboard(envVars.url)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono text-muted-foreground">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                  <span className={`text-sm font-semibold ${envVars?.hasKey ? "text-green-600" : "text-red-600"}`}>
                    {envVars?.hasKey ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
              </div>

              {(!envVars?.hasKey || !envVars?.urlValid) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800 font-light mb-2">
                    <strong>⚠️ Configuration Issue</strong>
                  </p>
                  <p className="text-xs text-yellow-700 font-light">
                    Make sure your environment variables are set correctly. You may need to restart your development
                    server after adding them.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Server-Side Connection Test */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-light tracking-wide flex items-center justify-between">
                <span>1. Server Connection Test</span>
                {connectionStatus === "success" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {connectionStatus === "error" && <XCircle className="w-6 h-6 text-red-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-light text-sm">
                Tests connection from server-side (avoids CORS issues)
              </p>
              <Button
                onClick={handleTestConnection}
                disabled={connectionStatus === "testing"}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-light"
              >
                {connectionStatus === "testing" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>

              {connectionStatus === "success" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 text-sm font-light mb-1">✅ Connection successful!</p>
                  {connectionDetails?.recordCount !== undefined && (
                    <p className="text-xs text-green-700">Found {connectionDetails.recordCount} record(s)</p>
                  )}
                </div>
              )}

              {connectionStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded space-y-2">
                  <p className="text-red-800 text-sm font-semibold">❌ Connection Failed</p>
                  <p className="text-xs text-red-700 font-mono">{errorMessage}</p>
                  {connectionDetails && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-600 cursor-pointer hover:underline">
                        Show error details
                      </summary>
                      <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                        {JSON.stringify(connectionDetails, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Insert Test */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-light tracking-wide flex items-center justify-between">
                <span>2. Test Insert</span>
                {insertStatus === "success" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {insertStatus === "error" && <XCircle className="w-6 h-6 text-red-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-light text-sm">Create a test user in the database</p>
              <Button
                onClick={handleTestInsert}
                disabled={insertStatus === "testing" || connectionStatus !== "success"}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-light"
              >
                {insertStatus === "testing" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Inserting...
                  </>
                ) : (
                  "Test Insert"
                )}
              </Button>

              {connectionStatus !== "success" && <p className="text-xs text-yellow-600">⚠️ Run connection test first</p>}

              {insertStatus === "success" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 text-sm font-light">
                    ✅ Test user created! Check your Supabase dashboard.
                  </p>
                </div>
              )}

              {insertStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 text-sm font-semibold">❌ Insert Failed</p>
                  <p className="text-xs text-red-700 font-mono mt-1">{errorMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-light tracking-wide">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">If connection fails:</p>
                <ul className="space-y-1 text-muted-foreground font-light text-xs ml-4">
                  <li>• Check that environment variables are set correctly</li>
                  <li>• Restart your development server (Ctrl+C and run again)</li>
                  <li>
                    • Verify the table exists in{" "}
                    <a
                      href="https://supabase.com/dashboard/project/mcteqetdotzzxfqhushx/editor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      Supabase
                    </a>
                  </li>
                  <li>• Check RLS policies allow public access</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
