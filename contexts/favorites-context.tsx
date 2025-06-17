"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (artistId: string) => void
  isFavorite: (artistId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("festival-favorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const toggleFavorite = (artistId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(artistId) ? prev.filter((id) => id !== artistId) : [...prev, artistId]

      localStorage.setItem("festival-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (artistId: string) => favorites.includes(artistId)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
