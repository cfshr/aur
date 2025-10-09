"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Users, Zap, ArrowRight, Circle, Instagram } from "lucide-react"
import { JewelerWaitlistPopup } from "@/components/jeweler-waitlist-popup"

export default function PiratePage() {
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowWaitlistPopup(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Waitlist Popup */}
      <JewelerWaitlistPopup isOpen={showWaitlistPopup} onClose={() => setShowWaitlistPopup(false)} />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white fixed w-full z-40">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Circle className="w-8 h-8 text-gray-900" strokeWidth={1} />
            <span className="text-2xl font-light tracking-[0.2em] text-gray-900">AURRR</span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Instagram className="w-6 h-6" strokeWidth={1} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oct_06__1847_4s_202510061922_2oji9-Ygy8NXp18Wqwb1iQEVKhlbOg8RRW95.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 tracking-tight leading-tight drop-shadow-lg">
            Craftin' legendary
            <span className="block font-light mt-4 sm:mt-6 md:mt-8">crew</span>
            <span className="block mt-4 sm:mt-6 md:mt-8">treasures</span>
          </h1>

          <p className="text-xl text-white mb-12 max-w-3xl font-light leading-relaxed drop-shadow-md">
            Bespoke treasures by legendary craftsmen that have the power t' preserve our crew's tales and bridge the
            seven seas with the digital realm
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-gray-900 font-light tracking-wide px-8">
              <Link href="/collections" className="flex items-center">
                Find a local craftsman
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white hover:bg-white/10 border-white font-light tracking-wide px-8 bg-transparent"
            >
              <Link href="/collections">Browse Treasure Hoards</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-wide">The Craftin' Voyage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Unitin' master craftsmen an' crews t' forge legendary treasures that bridge the physical seas with digital
              waters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-500">
              <CardContent className="p-8 text-center">
                <Compass className="w-12 h-12 text-gray-900 mx-auto mb-6" strokeWidth={1} />
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">Master Craftsman Skills</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Seasoned craftsmen bring their expertise t' each creation, combinin' ancient techniques with modern
                  sorcery.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-500">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-900 mx-auto mb-6" strokeWidth={1} />
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">Crew's Voice</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Crews collaborate 'round shared aesthetics an' the pirate code, co-creatin' collections that reflect
                  their vision.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-500">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-gray-900 mx-auto mb-6" strokeWidth={1} />
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">Magic Technology</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  NFC sorcery bridges physical an' digital realms, allowin' each treasure t' carry its tale an' connect
                  with other buccaneers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-wide">Legendary Treasures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Discover unique treasures that showcase the collaboration between master craftsmen an' their crews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Cybohr",
                artist: "The Geometric Crew",
                defaultImage: "/images/cybohr-default.png",
                hoverImage: "/images/cybohr-hover.png",
              },
              {
                name: "Quantum Ring",
                artist: "Tech Buccaneers",
                defaultImage: "/images/ring-default.png",
                hoverImage: "/images/ring-hover.png",
              },
              {
                name: "Organic Flow",
                artist: "Nature's Raiders",
                defaultImage: "/images/pendant-default.png",
                hoverImage: "/images/pendant-hover.png",
              },
            ].map((piece, index) => (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    <img
                      src={piece.defaultImage || "/placeholder.svg"}
                      alt={piece.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src={piece.hoverImage || "/placeholder.svg"}
                      alt={`${piece.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-light border border-gray-200">
                        NFC
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-gray-900 font-light mb-2 tracking-wide">{piece.name}</h3>
                    <p className="text-gray-600 text-sm font-light mb-4">by {piece.artist}</p>
                    <Button size="sm" variant="ghost" className="text-gray-900 hover:bg-gray-50 font-light">
                      View Treasure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-light text-gray-900 mb-8 tracking-wide">
            Ready t' set
            <span className="block font-light">sail, matey?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join our crew o' craftsmen an' treasure hunters forgin' the future o' connected treasures.
          </p>
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide px-12 py-4">
            <Link href="/signup">Join the Crew</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Circle className="w-6 h-6 text-gray-900" strokeWidth={1} />
            <span className="text-xl font-light tracking-[0.2em] text-gray-900">AURRR</span>
          </div>
          <p className="text-gray-600 font-light tracking-wide">
            Distributed Cyborg Jeweler • Where Craft Meets the High Seas
          </p>
        </div>
      </footer>
    </div>
  )
}
