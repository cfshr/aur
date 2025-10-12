"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Circle, Users, Compass, Eye, CheckCircle2, AlertCircle } from "lucide-react"
import { createUserSignup } from "@/lib/supabase"

export default function SignUpPage() {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    interests: [] as string[],
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const interests = [
    "Local Designers",
    "Touch technology",
    "Cyborg aesthetics",
    "Exclusivity",
    "Natural materials",
    "Post-phone",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Create user signup entry in Supabase
      await createUserSignup({
        user_type: userType as "enthusiast" | "artisan" | "collector",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        design_interests: formData.interests,
        agreed_to_terms: formData.agreeToTerms,
      })

      setSubmitStatus("success")

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          interests: [],
          agreeToTerms: false,
        })
        setUserType("")
        setSubmitStatus("idle")
      }, 3000)
    } catch (error: any) {
      console.error("Signup error:", error)
      setSubmitStatus("error")
      setErrorMessage(error.message || "Failed to create account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
              <span className="text-xl font-light tracking-wide text-gray-900">Join AUR</span>
            </div>
          </div>
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-light tracking-wide">
            Log in
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">Join the Community</h1>
            <p className="text-gray-600 font-light leading-relaxed">
              Connect with artisans and fellow enthusiasts to create unique, NFC-enabled jewelry pieces.
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <Card className="bg-green-50 border-green-200 mb-6">
              <CardContent className="p-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-green-900 font-light">Account created successfully!</p>
                  <p className="text-green-700 text-sm font-light">Welcome to the AUR community.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <Card className="bg-red-50 border-red-200 mb-6">
              <CardContent className="p-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-red-900 font-light">Error creating account</p>
                  <p className="text-red-700 text-sm font-light">{errorMessage}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sign Up Form */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 font-light tracking-wide text-center">Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <Label className="text-gray-900 mb-3 block font-light tracking-wide">I am a...</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserType("enthusiast")}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        userType === "enthusiast"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Users className="w-6 h-6 text-gray-900 mx-auto mb-2" strokeWidth={1} />
                      <span className="text-gray-900 text-sm font-light block">Enthusiast</span>
                      <span className="text-gray-600 text-xs font-light">Collect & collaborate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserType("artisan")}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        userType === "artisan" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Compass className="w-6 h-6 text-gray-900 mx-auto mb-2" strokeWidth={1} />
                      <span className="text-gray-900 text-sm font-light block">Artisan</span>
                      <span className="text-gray-600 text-xs font-light">Create & craft</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserType("collector")}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        userType === "collector"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Eye className="w-6 h-6 text-gray-900 mx-auto mb-2" strokeWidth={1} />
                      <span className="text-gray-900 text-sm font-light block">Collector</span>
                      <span className="text-gray-600 text-xs font-light">Curate & discover</span>
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-900 mb-2 block font-light tracking-wide">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-900 mb-2 block font-light tracking-wide">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                      required
                    />
                  </div>
                </div>

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
                    required
                  />
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-900 mb-2 block font-light tracking-wide">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-900 mb-2 block font-light tracking-wide">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-gray-900 mb-3 block font-light tracking-wide">Design Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                          className="border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                        />
                        <Label htmlFor={interest} className="text-gray-600 text-sm font-light cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    className="border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 mt-1"
                    required
                  />
                  <Label htmlFor="terms" className="text-gray-600 text-sm font-light leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-gray-900 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-gray-900 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide py-3"
                  disabled={!userType || !formData.agreeToTerms || isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
