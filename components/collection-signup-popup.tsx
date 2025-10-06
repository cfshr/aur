"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface CollectionSignupPopupProps {
  isOpen: boolean
  onClose: () => void
  collectionName?: string
}

export function CollectionSignupPopup({ isOpen, onClose, collectionName }: CollectionSignupPopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual MailerLite API integration
      const response = await fetch("/api/mailerlite/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "collection_signup",
          collection: collectionName,
        }),
      })

      if (response.ok) {
        console.log("Collection signup email submitted:", email)
        setIsSubmitted(true)

        // Auto-close after success
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setEmail("")
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to submit email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with frost effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={onClose} />

      {/* Popup content */}
      <div className="relative bg-white border border-gray-200 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="text-center">
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">Join the Waitlist</h3>
            <p className="text-gray-600 text-sm font-light mb-6 leading-relaxed">
              Enter your email and we'll let you know when we go live
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900"
                placeholder="Enter your email"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <h3 className="text-xl font-light text-gray-900 mb-2 tracking-wide">Thank You!</h3>
            <p className="text-gray-600 text-sm font-light">We'll be in touch when we launch.</p>
          </div>
        )}
      </div>
    </div>
  )
}
