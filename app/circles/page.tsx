import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Eye, Compass, Moon, Sun, Leaf, Zap, Circle } from "lucide-react"

export default function CirclesPage() {
  const circles = [
    {
      name: "Geometric Designs",
      philosophy: "Mathematics in precious metals",
      members: 89,
      artisans: 7,
      essence: "Precision meets design",
      icon: Compass,
      aura: "from-blue-900/20 to-indigo-950/40",
      featured: true,
    },
    {
      name: "Lunar Designs",
      philosophy: "Celestial rhythms in craft",
      members: 156,
      artisans: 12,
      essence: "Moonlit designs in silver and stone",
      icon: Moon,
      aura: "from-slate-900/20 to-blue-950/40",
      featured: true,
    },
    {
      name: "Solar Designs",
      philosophy: "Eternal flame in golden expressions",
      members: 203,
      artisans: 15,
      essence: "Radiant forms",
      icon: Sun,
      aura: "from-yellow-900/20 to-orange-950/40",
      featured: false,
    },
    {
      name: "Mycelial Designs",
      philosophy: "Organic growth inspires designs",
      members: 134,
      artisans: 9,
      essence: "Living metal",
      icon: Leaf,
      aura: "from-green-900/20 to-emerald-950/40",
      featured: true,
    },
    {
      name: "Quantum Designs",
      philosophy: "Probability becomes beauty",
      members: 67,
      artisans: 5,
      essence: "Crafted uncertainty",
      icon: Zap,
      aura: "from-purple-900/20 to-violet-950/40",
      featured: false,
    },
    {
      name: "The Observer Designs",
      philosophy: "Consciousness shapes creation",
      members: 298,
      artisans: 23,
      essence: "Witnessing transforms matter",
      icon: Eye,
      aura: "from-amber-900/20 to-yellow-950/40",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-amber-50">
      {/* Header */}
      <header className="border-b border-amber-900/20 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-amber-200 hover:bg-amber-900/20 font-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-amber-500" strokeWidth={1} />
              <span className="text-xl font-light tracking-wide text-amber-100">Collections</span>
            </div>
          </div>
          <Button className="bg-amber-800 hover:bg-amber-700 text-amber-100 border border-amber-600/50 font-light tracking-wide">
            Form Circle
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-amber-100 mb-6 tracking-wide">
            Design
            <span className="block italic text-amber-400 font-light">Collections</span>
          </h1>
          <p className="text-xl text-amber-200/80 max-w-3xl mx-auto font-light leading-relaxed">
            Each collection represents a unique design philosophy, gathering kindred spirits around shared visions.
          </p>
        </div>

        {/* Featured Circles */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-amber-100 mb-8 text-center tracking-wide">Featured Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {circles
              .filter((c) => c.featured)
              .map((circle, index) => {
                const IconComponent = circle.icon
                return (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${circle.aura} border-amber-800/30 backdrop-blur-sm hover:border-amber-600/50 transition-all duration-700 group`}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          <Circle className="w-16 h-16 text-amber-500/30" strokeWidth={1} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <IconComponent
                              className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors"
                              strokeWidth={1}
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-light text-amber-100 mb-2 tracking-wide">{circle.name}</h3>
                      <p className="text-amber-200/70 text-sm font-light italic leading-relaxed">
                        "{circle.philosophy}"
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-center mb-6">
                        <p className="text-amber-200/80 text-sm font-light leading-relaxed">{circle.essence}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                        <div>
                          <div className="text-2xl font-light text-amber-100">{circle.members}</div>
                          <div className="text-xs text-amber-200/70 tracking-wide">Seekers</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-amber-100">{circle.artisans}</div>
                          <div className="text-xs text-amber-200/70 tracking-wide">Artisans</div>
                        </div>
                      </div>

                      <Button className="w-full bg-amber-900/30 hover:bg-amber-800/50 text-amber-100 border border-amber-600/30 font-light tracking-wide">
                        Enter Circle
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>

        {/* All Circles */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-amber-100 mb-8 text-center tracking-wide">All Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {circles.map((circle, index) => {
              const IconComponent = circle.icon
              return (
                <Card
                  key={index}
                  className="bg-amber-950/10 border-amber-800/20 backdrop-blur-sm hover:bg-amber-950/20 hover:border-amber-600/40 transition-all duration-700 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Circle className="w-12 h-12 text-amber-500/30" strokeWidth={1} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-amber-400" strokeWidth={1} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-amber-100 tracking-wide flex items-center gap-2">
                          {circle.name}
                          {circle.featured && (
                            <Badge className="bg-amber-900/50 text-amber-300 border-amber-700/50 text-xs font-light">
                              Illuminated
                            </Badge>
                          )}
                        </h3>
                        <p className="text-amber-200/70 text-sm font-light">
                          {circle.members} seekers • {circle.artisans} artisans
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-amber-200/80 text-sm font-light italic mb-4 leading-relaxed">
                      "{circle.philosophy}"
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full text-amber-200 hover:bg-amber-900/20 border border-amber-700/30 font-light tracking-wide"
                    >
                      Contemplate
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Form Circle CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-amber-950/20 to-amber-900/20 border-amber-600/30 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="mb-6">
                <Circle className="w-16 h-16 text-amber-500 mx-auto mb-4" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-light text-amber-100 mb-4 tracking-wide">Create Your Collection</h3>
              <p className="text-amber-200/80 mb-8 font-light leading-relaxed">
                Gather those who share your vision. Create a sacred space where artisans and seekers can collaborate in
                the manifestation of conscious adornment.
              </p>
              <Button
                size="lg"
                className="bg-amber-800 hover:bg-amber-700 text-amber-100 border border-amber-600/50 font-light tracking-wide px-8"
              >
                Begin Formation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
