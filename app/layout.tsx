import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AUR - Crafting Unique Membership Wearables",
  description:
    "Bespoke pieces by leading designers that have the power to enhance our collective memory and bridge physical and digital worlds",
  openGraph: {
    title: "AUR - Crafting Unique Membership Wearables",
    description:
      "Bespoke pieces by leading designers that have the power to enhance our collective memory and bridge physical and digital worlds",
    images: [
      {
        url: "/images/aur-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "AUR - Crafting unique membership wearables",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUR - Crafting Unique Membership Wearables",
    description:
      "Bespoke pieces by leading designers that have the power to enhance our collective memory and bridge physical and digital worlds",
    images: ["/images/aur-thumbnail.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
