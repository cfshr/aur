"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Circle, Instagram, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  const handleCheckout = () => {
    // TODO: Integrate with Shopify/Stripe checkout
    alert("Checkout functionality will be integrated with Shopify/Stripe")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-background">
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-6 h-6" strokeWidth={1} />
            </a>
          </div>
        </header>

        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" strokeWidth={1} />
            <h1 className="text-3xl font-light text-foreground mb-4 tracking-wide">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 font-light">
              Discover our collection of unique NFC-enabled jewelry pieces.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-light">
              <Link href="/">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-6 h-6" strokeWidth={1} />
          </a>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light text-foreground tracking-wide">Shopping Cart</h1>
            <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-foreground">
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-background border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-light text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground font-light">by {item.artist}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 border-border text-foreground hover:bg-accent"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-foreground font-light min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 border-border text-foreground hover:bg-accent"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-light text-foreground">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-background border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-foreground font-light tracking-wide">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Shipping</span>
                      <span className="text-foreground">Free</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-foreground text-xl font-light mb-6">
                      <span>Total</span>
                      <span>€{getTotalPrice().toFixed(2)}</span>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-wide"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>

                  <div className="pt-4 space-y-2 text-sm text-muted-foreground font-light">
                    <p>✓ Free worldwide shipping</p>
                    <p>✓ 30-day returns</p>
                    <p>✓ Secure checkout</p>
                    <p>✓ Lifetime warranty</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
