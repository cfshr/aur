"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Compass } from "lucide-react"
import Link from "next/link"

// Simple 3D Components
function SimpleHand({ ringColor = "#374151" }: { ringColor?: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.8, 0.12, 2]} />
        <meshStandardMaterial color="#D1D5DB" />
      </mesh>
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.06, 0.8]} rotation={[-Math.PI / 12, 0, i * 0.1]}>
          <boxGeometry args={[0.1, 0.1, 0.6]} />
          <meshStandardMaterial color="#D1D5DB" />
        </mesh>
      ))}
      <mesh position={[0.1, 0.12, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.025, 8, 16]} />
        <meshStandardMaterial color={ringColor} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function SimpleEar({ earringColor = "#374151" }: { earringColor?: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#D1D5DB" />
      </mesh>
      <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={earringColor} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function SimpleNeck({ necklaceColor = "#374151" }: { necklaceColor?: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.2, 16]} />
        <meshStandardMaterial color="#D1D5DB" />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 8, 32]} />
        <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={necklaceColor} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ForgePage() {
  const [selectedType, setSelectedType] = useState("ring")
  const [selectedColor, setSelectedColor] = useState("#374151")
  const [selectedMaterial, setSelectedMaterial] = useState("silver")
  const [selectedSize, setSelectedSize] = useState([7])

  const colors = [
    { name: "Silver", value: "#6B7280" },
    { name: "Gold", value: "#F59E0B" },
    { name: "Rose Gold", value: "#F97316" },
    { name: "Black", value: "#1F2937" },
  ]

  const materials = [
    { name: "Sterling Silver", value: "silver" },
    { name: "Gold Plated", value: "gold" },
    { name: "Stainless Steel", value: "steel" },
    { name: "Titanium", value: "titanium" },
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
              <span className="text-xl font-light tracking-wide text-gray-900">Design Studio</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Visualization */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 font-light tracking-wide flex items-center gap-3">
                3D Preview
                <span className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-xs font-light">NFC Enabled</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-50 rounded-lg overflow-hidden">
                <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Environment preset="studio" />

                  {selectedType === "ring" && <SimpleHand ringColor={selectedColor} />}
                  {selectedType === "earring" && <SimpleEar earringColor={selectedColor} />}
                  {selectedType === "necklace" && <SimpleNeck necklaceColor={selectedColor} />}

                  <OrbitControls enablePan={false} enableZoom={true} />
                </Canvas>
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center font-light">Drag to rotate • Scroll to zoom</p>
            </CardContent>
          </Card>

          {/* Customization Panel */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 font-light tracking-wide">Customize Your Piece</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Type Selection */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Jewelry Type</Label>
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    <TabsTrigger value="ring" className="text-gray-900 data-[state=active]:bg-white font-light">
                      Ring
                    </TabsTrigger>
                    <TabsTrigger value="earring" className="text-gray-900 data-[state=active]:bg-white font-light">
                      Earring
                    </TabsTrigger>
                    <TabsTrigger value="necklace" className="text-gray-900 data-[state=active]:bg-white font-light">
                      Necklace
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Color */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Color</Label>
                <div className="grid grid-cols-2 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedColor === color.value
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: selectedColor === color.value ? undefined : color.value }}
                    >
                      <span className="text-gray-900 text-sm font-light">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Material</Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="bg-white border-gray-200 text-gray-900 font-light">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.value} value={material.value} className="font-light">
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Size: {selectedSize[0]}</Label>
                <Slider
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  max={selectedType === "necklace" ? 24 : 12}
                  min={selectedType === "necklace" ? 16 : 4}
                  step={selectedType === "necklace" ? 2 : 0.5}
                  className="w-full"
                />
              </div>

              {/* NFC Features */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-gray-900 font-light mb-3 tracking-wide">NFC Features</h4>
                <ul className="text-gray-600 text-sm space-y-2 font-light">
                  <li>• Secure data storage</li>
                  <li>• Contactless interaction</li>
                  <li>• Authenticity verification</li>
                  <li>• Personalized experiences</li>
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-900 font-light tracking-wide">Base Price:</span>
                  <span className="text-gray-900 font-light">$89</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-light">NFC Chip:</span>
                  <span className="text-gray-600 font-light">$25</span>
                </div>
                <div className="flex justify-between items-center mb-6 pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-light tracking-wide">Total:</span>
                  <span className="text-gray-900 font-semibold text-lg">$114</span>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
