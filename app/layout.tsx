import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FavoritesProvider } from "@/contexts/favorites-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Waking Life 2025 Timetable",
  description: "Festival timetable and lineup for Waking Life 2025",
  manifest: "/manifest.json",
  themeColor: "#ec4899",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}
