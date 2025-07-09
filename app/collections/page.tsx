import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Users, Compass, Moon, Sun, Leaf, Zap, Circle } from "lucide-react"

export default function CollectionsPage() {
  const collections = [
    {
      name: "The Geometrists",
      description: "Precision-engineered designs inspired by mathematical patterns",
      members: 89,
      artisans: 7,
      focus: "Clean geometric forms with embedded smart technology",
      icon: Compass,
      featured: true,
    },
    {
      name: "Lunar Collective",
      description: "Designs that capture the elegance of celestial movements",
      members: 156,
      artisans: 12,
      focus: "Silver and moonstone pieces with subtle NFC integration",
      icon: Moon,
      featured: true,
    },
    {
      name: "Solar Artisans",
      description: "Bold, warm designs that make a statement",
      members: 203,
      artisans: 15,
      focus: "Gold-toned pieces with prominent design elements",
      icon: Sun,
      featured: false,
    },
    {
      name: "Organic Network",
      description: "Nature-inspired patterns with sustainable materials",
      members: 134,
      artisans: 9,
      focus: "Eco-friendly designs with organic flowing forms",
      icon: Leaf,
      featured: true,
    },
    {
      name: "Tech Collective",
      description: "Cutting-edge designs for the digitally connected",
      members: 67,
      artisans: 5,
      focus: "Modern aesthetic with advanced NFC capabilities",
      icon: Zap,
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
              <Users className="w-6 h-6 text-gray-900" strokeWidth={1} />
              <span className="text-xl font-light tracking-wide text-gray-900">Collections</span>
            </div>
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
            Create Collection
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-wide">Design Collections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Each collection represents a unique design philosophy, bringing together artisans and community members
            around shared aesthetics and collaborative creation.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {collections.map((collection, index) => {
            const IconComponent = collection.icon
            return (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <Circle className="w-16 h-16 text-gray-300" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent
                          className="w-8 h-8 text-gray-900 group-hover:text-gray-700 transition-colors"
                          strokeWidth={1}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2 tracking-wide">{collection.name}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{collection.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-sm font-light leading-relaxed">{collection.focus}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-2xl font-light text-gray-900">{collection.members}</div>
                      <div className="text-xs text-gray-600 tracking-wide">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-gray-900">{collection.artisans}</div>
                      <div className="text-xs text-gray-600 tracking-wide">Artisans</div>
                    </div>
                  </div>

                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
                    Join Collection
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Create Collection CTA */}
        <div className="text-center">
          <Card className="bg-gray-50 border-gray-200 max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="mb-6">
                <Circle className="w-16 h-16 text-gray-900 mx-auto mb-4" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">Create Your Collection</h3>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                Start a new design collection and invite artisans and community members to collaborate on unique
                NFC-enabled jewelry pieces.
              </p>
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide px-8">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
