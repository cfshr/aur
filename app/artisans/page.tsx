import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Compass, Star, Instagram } from "lucide-react"

export default function CraftersPage() {
  const crafters = [
    {
      name: "Zara Moonweaver",
      craft: "Lunar Metallurgy",
      philosophy:
        "Specializes in shaping metals using traditional hammering techniques and incorporating lunar-inspired designs.",
      collections: ["Lunar Collective", "The Observers"],
      pieces: 23,
      rating: 4.9,
      avatar: "/placeholder.svg?height=80&width=80",
      featured: true,
    },
    {
      name: "Kai Geometrist",
      craft: "Sacred Mathematics",
      philosophy:
        "Employs precise geometric patterns and mathematical ratios to create balanced and harmonious metalwork.",
      collections: ["The Geometrists", "Tech Collective"],
      pieces: 31,
      rating: 4.8,
      avatar: "/placeholder.svg?height=80&width=80",
      featured: true,
    },
    {
      name: "River Earthsong",
      craft: "Organic Synthesis",
      philosophy:
        "Draws inspiration from natural forms and uses lost-wax casting to create intricate, nature-inspired sculptures.",
      collections: ["Organic Network", "Solar Crafters"],
      pieces: 18,
      rating: 4.9,
      avatar: "/placeholder.svg?height=80&width=80",
      featured: false,
    },
  ]

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
              <Compass className="w-6 h-6 text-gray-900" strokeWidth={1} />
              <span className="text-xl font-light tracking-wide text-gray-900">Crafters</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
              Become Crafter
            </Button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-6 h-6" strokeWidth={1} />
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-wide">Featured Crafters</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover talented crafters, each with unique techniques and design approaches.
          </p>
        </div>

        {/* Crafters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {crafters.map((crafter, index) => (
            <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border border-gray-200">
                    <AvatarImage src={crafter.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-100 text-gray-900">
                      {crafter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-gray-900 mb-1 tracking-wide">{crafter.name}</h3>
                    <p className="text-gray-600 text-sm font-light mb-2">{crafter.craft}</p>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(crafter.rating) ? "fill-gray-900 text-gray-900" : "text-gray-300"
                          }`}
                          strokeWidth={1}
                        />
                      ))}
                      <span className="text-gray-600 text-xs ml-1">({crafter.rating})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm font-light mb-4 leading-relaxed">{crafter.philosophy}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 text-sm font-light">{crafter.pieces} pieces</span>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
                  View Work
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Become Crafter CTA */}
        <div className="text-center">
          <Card className="bg-gray-50 border-gray-200 max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="mb-6">
                <Compass className="w-16 h-16 text-gray-900 mx-auto mb-4" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">Become a Crafter</h3>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                Join our community of skilled craftspeople and share your unique approach to jewelry design.
              </p>
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide px-8">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
