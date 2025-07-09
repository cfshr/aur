"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Circle, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-gray-100 font-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Circle className="w-6 h-6 text-gray-900" strokeWidth={1} />
              <span className="text-xl font-light tracking-wide text-gray-900">Welcome Back</span>
            </div>
          </div>
          <Link href="/signup" className="text-gray-600 hover:text-gray-900 transition-colors font-light tracking-wide">
            Need an account?
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">Log In</h1>
            <p className="text-gray-600 font-light leading-relaxed">Continue your journey with AUR</p>
          </div>

          {/* Login Form */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 font-light tracking-wide text-center">Access Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-900 mb-2 block font-light tracking-wide">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-gray-900 mb-2 block font-light tracking-wide">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                    />
                    <Label htmlFor="remember" className="text-gray-600 text-sm font-light cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-gray-900 hover:underline text-sm font-light tracking-wide"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide py-3"
                >
                  Log In
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-light mb-4">Or continue with</p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-900 hover:bg-gray-50 font-light bg-transparent flex-1"
                    >
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-900 hover:bg-gray-50 font-light bg-transparent flex-1"
                    >
                      Apple
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm font-light">
              Don't have an account?{" "}
              <Link href="/signup" className="text-gray-900 hover:underline font-light tracking-wide">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
