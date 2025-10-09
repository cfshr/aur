"use client"

import { use, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Circle, Instagram, ShoppingCart, Minus, Plus, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

// Product data structure
const products = {
  cybohr: {
    id: "cybohr",
    name: "Cybohr",
    artist: "Lucid Infusion",
    price: 125,
    currency: "EUR",
    description:
      "The Cybohr piece represents the intersection of organic form and technological innovation. Featuring a sculptural design that exposes the NFC technology within, this piece celebrates the beauty of circuitry and connectivity. Handcrafted with precision, each Cybohr is a unique statement of cyborg aesthetics.",
    details: [
      "Sterling silver construction",
      "Integrated NFC chip for digital connectivity",
      "Hand-finished by master craftspeople",
      "Programmable digital identity",
      "Comes with authentication certificate",
      "Free worldwide shipping",
    ],
    defaultImage: "/images/cybohr-default.png",
    hoverImage: "/images/cybohr-hover.png",
    images: ["/images/cybohr-default.png", "/images/cybohr-hover.png"],
  },
  pointer: {
    id: "pointer",
    name: "Pointer",
    artist: "Mistress Sybil",
    price: 125,
    currency: "EUR",
    description:
      "Pointer is a bold statement ring that bridges the physical and digital worlds. With its exposed NFC coil and transparent resin construction, it showcases the technology that powers the connection. Designed by Mistress Sybil, this piece embodies the fusion of craft and code.",
    details: [
      "Sterling silver and resin construction",
      "Visible NFC antenna design",
      "Available in multiple ring sizes",
      "Programmable digital functions",
      "Waterproof and durable",
      "Includes digital setup guide",
    ],
    defaultImage: "/images/ring-default.png",
    hoverImage: "/images/ring-hover.png",
    images: ["/images/ring-default.png", "/images/ring-hover.png"],
  },
  precious: {
    id: "precious",
    name: "PrecIOus",
    artist: "Data Werkstadt",
    price: 125,
    currency: "EUR",
    description:
      "PrecIOus is an elegant pendant that embodies the concept of data as treasure. The twisted flame design holds the NFC component at its heart, symbolizing the value of digital connection. Created by Data Werkstadt, this piece transforms technology into wearable art.",
    details: [
      "Sterling silver pendant with chain",
      "Integrated NFC technology",
      "Adjustable chain length (16-18 inches)",
      "Lifetime warranty on craftsmanship",
      "Digital identity management included",
      "Ethically sourced materials",
    ],
    defaultImage: "/images/precious-default.png",
    hoverImage: "/images/precious-hover.png",
    images: ["/images/precious-default.png", "/images/precious-hover.png"],
  },
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const product = products[resolvedParams.slug as keyof typeof products]

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-foreground mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      artist: product.artist,
      price: product.price,
      quantity: quantity,
      image: product.defaultImage,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
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
              <span className="text-xl font-light tracking-[0.2em] text-foreground">AUR</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="text-foreground hover:bg-accent">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </Button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-6 h-6" strokeWidth={1} />
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="bg-background border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-accent relative">
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? "border-foreground" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-muted-foreground font-light mb-2">by {product.artist}</p>
              <h1 className="text-4xl font-light text-foreground mb-4 tracking-wide">{product.name}</h1>
              <p className="text-3xl font-light text-foreground">
                €{product.price.toFixed(2)}
                <span className="text-lg text-muted-foreground ml-2">{product.currency}</span>
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-light text-foreground tracking-wide">Description</h2>
              <p className="text-muted-foreground font-light leading-relaxed">{product.description}</p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-light text-foreground tracking-wide">Details</h2>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground font-light">
                    <Check className="w-4 h-4 text-foreground mt-1 flex-shrink-0" strokeWidth={1} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  className="border-border text-foreground hover:bg-accent bg-transparent"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-2xl font-light text-foreground min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="border-border text-foreground hover:bg-accent bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-wide"
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center font-light">
                Free worldwide shipping • 30-day returns
              </p>
            </div>

            {/* Additional Info */}
            <Card className="bg-muted border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-light text-foreground mb-3">NFC Technology</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Each piece includes programmable NFC technology that allows you to store digital identity, connect
                  with communities, and unlock exclusive experiences. Setup instructions included.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
