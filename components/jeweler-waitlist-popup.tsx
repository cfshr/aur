"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface JewelerWaitlistPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function JewelerWaitlistPopup({ isOpen, onClose }: JewelerWaitlistPopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual MailerLite API integration
      // Example MailerLite API call:
      // const response = await fetch('/api/mailerlite/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, listId: 'jeweler-waitlist' })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Designer email submitted to waitlist:", email)
      setIsSubmitted(true)

      // Auto-close after success
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setEmail("")
      }, 2000)
    } catch (error) {
      console.error("Failed to submit email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !hasScrolled) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 max-w-sm mx-auto sm:mx-0">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <p className="text-gray-900 text-sm font-light mb-3 pr-4">
              Are you a designer who wants to make unique pieces for collectives? Send us your email and we'll message
              you when we go live.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-200 text-gray-900 font-light focus:border-gray-900 text-sm flex-1"
                placeholder="Email"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-gray-800 text-white font-light text-sm px-3 whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Join waitlist"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-gray-900 text-sm font-light">Thanks! We'll be in touch.</p>
          </div>
        )}
      </div>
    </div>
  )
}
