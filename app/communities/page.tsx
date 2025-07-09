import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, Crown, Sparkles, Package, TrendingUp } from "lucide-react"

export default function CommunitiesPage() {
  const communities = [
    {
      name: "Tech Innovators",
      description: "Cutting-edge designs for the tech community",
      members: 1247,
      collections: 8,
      discount: 25,
      featured: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Artistic Souls",
      description: "Creative and unique jewelry for artists",
      members: 892,
      collections: 12,
      discount: 20,
      featured: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Minimalist Club",
      description: "Clean, simple designs for modern living",
      members: 2156,
      collections: 6,
      discount: 30,
      featured: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Gaming Guild",
      description: "Jewelry inspired by gaming culture",
      members: 756,
      collections: 15,
      discount: 15,
      featured: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Eco Warriors",
      description: "Sustainable and eco-friendly designs",
      members: 1834,
      collections: 9,
      discount: 22,
      featured: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Crypto Collective",
      description: "Blockchain-inspired jewelry designs",
      members: 634,
      collections: 7,
      discount: 18,
      featured: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Communities</span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Create Community
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Join a Community</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Connect with like-minded creators, access exclusive collections, and enjoy bulk discounts on community
            designs.
          </p>
        </div>

        {/* Featured Communities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Featured Communities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .filter((c) => c.featured)
              .map((community, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={community.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white">{community.name}</CardTitle>
                          <CardDescription className="text-white/70">{community.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{community.members.toLocaleString()}</div>
                        <div className="text-xs text-white/70">Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{community.collections}</div>
                        <div className="text-xs text-white/70">Collections</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{community.discount}%</div>
                        <div className="text-xs text-white/70">Discount</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            All Communities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={community.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {community.name}
                        {community.featured && <Crown className="w-4 h-4 text-yellow-400" />}
                      </CardTitle>
                      <CardDescription className="text-white/70">{community.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {community.members.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {community.collections}
                      </span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {community.discount}% off
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Community CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Start Your Own Community</CardTitle>
              <CardDescription className="text-white/70 text-lg">
                Create exclusive collections, set member benefits, and build your jewelry community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Create Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
