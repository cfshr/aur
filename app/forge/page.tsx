"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, Instagram } from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

// 3D Disk Component
function Disk({ shape, material, uploadedImage }: { shape: string; material: string; uploadedImage?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Material properties
  const getMaterialProps = () => {
    switch (material) {
      case "plywood":
        return { color: "#D2B48C", roughness: 0.8, metalness: 0.1 }
      case "plastic":
        return { color: "#4A5568", roughness: 0.3, metalness: 0.2 }
      case "resin":
        return { color: "#E2E8F0", roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.9 }
      default:
        return { color: "#D2B48C", roughness: 0.8, metalness: 0.1 }
    }
  }

  // Shape geometry
  const getGeometry = () => {
    switch (shape) {
      case "circle":
        return <cylinderGeometry args={[1, 1, 0.1, 32]} />
      case "square":
        return <boxGeometry args={[2, 2, 0.1]} />
      case "hexagon":
        return <cylinderGeometry args={[1, 1, 0.1, 6]} />
      default:
        return <cylinderGeometry args={[1, 1, 0.1, 32]} />
    }
  }

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      {getGeometry()}
      <meshStandardMaterial {...getMaterialProps()} />

      {/* Laser cut pattern overlay */}
      {uploadedImage && (
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial map={uploadedImage as any} transparent opacity={0.8} color="#000000" />
        </mesh>
      )}
    </mesh>
  )
}

export default function ForgePage() {
  const [selectedShape, setSelectedShape] = useState("circle")
  const [selectedMaterial, setSelectedMaterial] = useState("plywood")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const shapes = [
    { name: "Circle", value: "circle" },
    { name: "Square", value: "square" },
    { name: "Hexagon", value: "hexagon" },
  ]

  const materials = [
    {
      name: "Plywood",
      value: "plywood",
      description: "Natural wood with visible grain patterns",
    },
    {
      name: "Recycled Cast Plastic",
      value: "plastic",
      description: "Sustainable plastic with visible recycled bits",
    },
    {
      name: "Cast Resin",
      value: "resin",
      description: "Clear, durable resin with smooth finish",
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
              <span className="text-xl font-light tracking-wide text-gray-900">Design Studio</span>
            </div>
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
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  <Environment preset="studio" />

                  <Disk shape={selectedShape} material={selectedMaterial} uploadedImage={uploadedImage} />

                  <OrbitControls enablePan={false} enableZoom={true} />
                </Canvas>
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center font-light">Drag to rotate • Scroll to zoom</p>
            </CardContent>
          </Card>

          {/* Customization Panel */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 font-light tracking-wide">Customize Your Disk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Shape Selection */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Shape</Label>
                <Tabs value={selectedShape} onValueChange={setSelectedShape}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    {shapes.map((shape) => (
                      <TabsTrigger
                        key={shape.value}
                        value={shape.value}
                        className="text-gray-900 data-[state=active]:bg-white font-light"
                      >
                        {shape.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Material Selection */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Material</Label>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <button
                      key={material.value}
                      onClick={() => setSelectedMaterial(material.value)}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedMaterial === material.value
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-light text-gray-900 mb-1">{material.name}</div>
                      <div className="text-sm text-gray-600 font-light">{material.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-gray-900 mb-4 block font-light tracking-wide">Laser Cut Design</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadedImage ? (
                    <div className="space-y-3">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded design"
                        className="w-20 h-20 object-cover mx-auto rounded border"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-900 border-gray-300 font-light"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" strokeWidth={1} />
                      <div>
                        <p className="text-gray-900 font-light mb-1">Upload your design</p>
                        <p className="text-gray-600 text-sm font-light">PNG, JPG up to 10MB</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-900 border-gray-300 font-light"
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
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
                  <span className="text-gray-900 font-light">$45</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-light">NFC Chip:</span>
                  <span className="text-gray-600 font-light">$25</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-light">Laser Cutting:</span>
                  <span className="text-gray-600 font-light">$15</span>
                </div>
                <div className="flex justify-between items-center mb-6 pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-light tracking-wide">Total:</span>
                  <span className="text-gray-900 font-semibold text-lg">$85</span>
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
